import { Request, Response } from "express";
import prisma from "../../config/prisma.js";

const getAuth = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in getUsers: ${error}`,
        });
    }
};

export default { getAuth };
