import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../services/mail.service.js";

function generateToken(user) {
    if (!process.env.JWT_SECRET) {
        throw ApiError.internal("JWT secret is not configured");
    }

    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
}

export async function register(data) {
    const { name, email, password } = data;

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw ApiError.conflict("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const token = generateToken(user);

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
}



export async function login(data) {

    const { email, password } = data;

    if (!email || !password) {
        throw ApiError.badRequest(
            "Email and password are required"
        );
    }


    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });


    if (!user) {
        throw ApiError.unauthorized(
            "Invalid email or password"
        );
    }


    const matched = await bcrypt.compare(
        password,
        user.password
    );


    if (!matched) {
        throw ApiError.unauthorized(
            "Invalid email or password"
        );
    }


    const token = generateToken(user);


    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };


    return {
        token,
        user: safeUser
    };
}

export async function getProfile(userId) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
            status: true,
            emailVerified: true,
            lastLoginAt: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return user;
}

export const forgotPassword = async (email) => {

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    // Do not reveal if email exists
    if (!user) {
        return;
    }

    const token = crypto.randomBytes(32).toString("hex");
    

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            resetToken: token,
            resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
        },
    });

    await sendResetPasswordEmail(user.email, token);

};