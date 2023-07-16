import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    //grab query params
    const { slug, day, time, partySize} = req.query as {
        slug: string,
        day: string,
        time: string,
        partySize: string
    };

    //validate query params
    if(!day || !time || !partySize){
        return res.status(400).json({errorMessage: "Missing query parameters"});
    }

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

    //get restaurant data
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug: slug
        },
        select: {
            tables: true,
            open_time: true,
            close_time: true
        }
    });

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

    const availabilities = searchTimesWithTables.map(t => {
        const sumSeats = t.tables.reduce((sum, table) => {
            return sum + table.seats;
        }, 0)
        return {
            time: t.time,
            available: sumSeats >= parseInt(partySize)
        }
    })

    return res.json(availabilities)
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-05-27&time=14:00:00.000Z&partySize=4