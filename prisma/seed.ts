import "dotenv/config";
import { categories } from "./data/categories";
import { products } from "./data/products";
import { employees } from "./data/employees";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log(" Seeding database with categories and products...");
    try {
        // Seed categories first
        console.log(" Inserting categories...");
        const categoriesResult = await prisma.category.createMany({
            data: categories,
            skipDuplicates: true,
        });
        console.log(` Categories inserted: ${categoriesResult.count}`);

        // Then products
        console.log(" Inserting products...");
        const productsResult = await prisma.product.createMany({
            data: products,
            skipDuplicates: true,
        });
        console.log(` Products inserted: ${productsResult.count}`);

        // Then employees
        console.log(" Inserting employees...");
        const employeesResult = await prisma.employee.createMany({
            data: employees,
            skipDuplicates: true,
        });
        console.log(` Employees inserted: ${employeesResult.count}`);
        
        console.log(" Seeding completed successfully!");
    } catch (error) {
        console.error(" Seed failed:", error);
        throw error;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log(" Disconnected from database");
    })
    .catch(async (e) => {
        console.error(" Fatal error:", e);
        await prisma.$disconnect();
        process.exit(1);
    });

