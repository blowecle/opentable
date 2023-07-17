import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../data";
import { PrismaClient, Table } from "@prisma/client";

const prisma = new PrismaClient();

export const findAvailableTables = async ({
    res,
    time,
    slug,
    day,
    restaurant
}: {
    res: NextApiResponse,
    time: string,
    slug: string,
    day: string,
    restaurant: {
        slug: string,
        tables: Table[],
        open_time: string,
        close_time: string,
    }
}) => {

    //within times data, find the time slot that matches the time query param
    let searchTimes = times.find(timeSlot => {
        return timeSlot.time === time;
    })?.searchTimes;

    //if no time slot is found, return an error
    if(!searchTimes){
        return res.status(400).json({errorMessage: "Invalid time"});
    }

    //get all bookings within the time slot
    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
            }
        },
        select: {
            number_of_people: true,
            booking_time: true,
            tables: true
        }
    })

    //restructuring data
    const bookingTablesObject: { [key: string]: {[key: number]: true}} = {};
    bookings.forEach(booking => {
        bookingTablesObject[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
            return {
                ...obj,
                [table.table_id]: true
            }
        },{})
    })

    //if no restaurant is found, return an error
    if(!restaurant){
        return res.status(400).json({errorMessage: "Invalid data provided"});
    }

    //filter out times that are outside of the restaurant's open and close time
    searchTimes = searchTimes.filter(searchTime => parseInt(searchTime.split(":")[0]) >= parseInt(restaurant.open_time.split(":")[0]) && parseInt(searchTime.split(":")[0]) <= parseInt(restaurant.close_time.split(":")[0]))
    
    //if the restaurant opens halfway through the hour, remove the first time slot
    if(parseInt(restaurant.open_time.split(":")[1]) === 30) {
        searchTimes.shift();
    }
    //get all tables from the restaurant
    const tables = restaurant.tables;

    //map over searchTimes and add all slots for filtering
    const searchTimesWithTables = searchTimes.map(searchTime => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables
        }
    })

    //filter out tables that are already booked
    searchTimesWithTables.forEach(t => {
        t.tables = t.tables.filter(table => {
            if(bookingTablesObject[t.date.toISOString()]){
                if(bookingTablesObject[t.date.toISOString()][table.id]){
                    return false;
                }
            }
            return true;
        })
    })
    return searchTimesWithTables;
}