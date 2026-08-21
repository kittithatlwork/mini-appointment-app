import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import pg from "./db";

import appointmentRoutes from "./appointments/appointment.routes"


const app = express();

app.use(cors());
app.use(express.json());

async function verifyConnection() {
    try {
        const client = await pg.connect();
        console.log("Connected to PostgreSQL database");
        client.release();
    } catch (error) {
        console.log('Error connecting to the database:', error);
    }
}
verifyConnection();

app.use(appointmentRoutes);

export default app;