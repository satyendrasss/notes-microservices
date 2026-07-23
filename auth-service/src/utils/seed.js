import prisma from "../config/prisma.js";
import bcrypt from "bcrypt"

async function main() {

    const existingAdmin = await prisma.user.findFirst({
        where: {
            role: "ADMIN"
        }
    });

    if (!existingAdmin) {
        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(
            "admin123",
            10
        );
        // CREATE ADMIN
        await prisma.user.create({
            data: {
                name: "Administrator",
                email: "admin@gmail.com",
                password: hashedPassword,
                role: "ADMIN"
            }
        });

        console.log("Default admin created");
    }
    else {
        console.log("Admin already exists");
    }
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });