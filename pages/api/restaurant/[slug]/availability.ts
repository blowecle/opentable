import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { PrismaClient } from "@prisma/client";
import { findAvailableTables } from "../../../../services/restaurant/findAvailableTables";
import { Table } from "@mui/material";


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

        //get restaurant data
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                slug: slug
            },
            select: {
                slug: true,
                tables: true,
                open_time: true,
                close_time: true,
            }
        });

        if(!restaurant){
            return res.status(400).json({errorMessage: "Restaurant not found"});
        }
        
    //find available tables
    const searchTables = await findAvailableTables({
        slug,
        day,
        time,
        res, 
        restaurant
    })

    if(!searchTables){
        return res.status(400).json({errorMessage: "Invalid data provided"});
    }

    const availabilities = searchTables.map(t => {
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