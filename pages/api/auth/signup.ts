import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "POST"){
        const {
            firstName,
            lastName,
            email,
            city,
            phone,
            password
        } = req.body;

        const errors: string[] = [];
        
        const validationSchema = [
            {
                valid: validator.isLength(firstName, {min: 1, max: 25}),
                errorMessage: "First name must be between 1 and 25 characters"
            },
            {
                valid: validator.isLength(lastName, {min: 1, max: 25}),
                errorMessage: "Last name must be between 1 and 25 characters"
            },
            {
                valid: validator.isEmail(email),
                errorMessage: "Email is not valid"
            },
            {
                valid: validator.isMobilePhone(phone),
                errorMessage: "Phone number is not valid"
            },
            {
                valid: validator.isStrongPassword(password),
                errorMessage: "Use a stronger password"
            },
            {
                valid: validator.isLength(city, {min: 1, max: 25}),
                errorMessage: "City must be between 1 and 25 characters"
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

        const userWithEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(userWithEmail){
            return res.status(400).json({errorMessage: "Email already associated with another account, please login"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                password: hashedPassword,
                city,
                phone,
                email,
            }
        });
        res.status(200).json({
            hello: user,
        })    
    }
}
