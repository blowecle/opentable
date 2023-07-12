import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import * as jose from "jose";
import { setCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { serialize } from 'cookie'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        const {
            email,
            password
        } = req.body;
        const errors: string[] = [];

        const validationSchema = [
            {
                valid: validator.isEmail(email),
                errorMessage: "Email is not valid"
            },
            {
                valid: validator.isLength(password),
                errorMessage: "Please enter your password"
            }
        ];

        validationSchema.forEach((check) => {
            if(!check.valid){
                errors.push(check.errorMessage);
            }
        })

        if(errors.length) {
            return res.status(400).json({errorMessage: errors[0]});
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user){
            return res.status(401).json({errorMessage: "Email or password is invalid"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({errorMessage: "Email or password is invalid"});
        }

        const alg = "HS256";

        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        
        const token = await new jose.SignJWT({
            email: user.email
        }).setProtectedHeader({alg}).setExpirationTime('24h').sign(secret);
        
        setCookie("jwt", token, {req, res, maxAge: 60 * 6 * 24})
        
        
        res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            city: user.city,
            phone: user.phone
        })
        
    } else return res.status(404).json("Uknown endpoint")
}