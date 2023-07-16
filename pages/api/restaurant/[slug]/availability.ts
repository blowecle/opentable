import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    const { slug, day, time, partySize} = req.query as {
        slug: string,
        day: string,
        time: string,
        partySize: string
    };

    if(!day || !time || !partySize){
        return res.status(400).json({errorMessage: "Missing query parameters"});
    }

    return res.json({
        slug,
        day,
        time,
        partySize
    })
}