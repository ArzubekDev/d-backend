import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findMany()
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in getUsers: ${error}`
        })
    }
}

export default {
    getUsers,
}