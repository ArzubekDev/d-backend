import type { Request, Response } from "express";
import prisma from "../../config/prisma.js";

const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.quizCategory.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("GET CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while getting categories",
    });
  }
};

const postCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const addName = await prisma.quizCategory.create({
      data: {
        name,
      },
    });
    return res.status(200).json({
      success: true,
      addName,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error in postCategory: ${error}`,
    });
  }
};

const delCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await prisma.quizCategory.delete({
      where: { id: String(id) }, // эгер id number болсо
    });

    return res.status(200).json({
      success: true,
      deleted,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// const getQuestion = async (req: Request, res: Response) => {
//   try {
//     const question = await prisma.quizQuestion.findMany();
//     return res.status(200).json({
//       success: true,
//       question,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: `Error in getQuestion: ${error}`,
//     });
//   }
// };

const getQuestion = async (req: Request, res: Response) => {
  try {
    const { categoryId, limit = 15, level } = req.query;

    const questions = await prisma.quizQuestion.findMany({
      where: {
        ...(categoryId ? { categoryId: String(categoryId) } : {}),
        ...(level ? { level: String(level) } : {}),
      },
      take: Number(limit),
    });

    return res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error in getQuestion: ${error}`,
    });
  }
};

const addQuestion = async (req: Request, res: Response) => {
  try {
    const { question, options, answer, level, timer, categoryId } = req.body;

    const categoryExists = await prisma.quizCategory.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Category not found!",
      });
    }

    // Дубликат текшерүү (бир категорияда бир эле суроо болбош керек)
    const exists = await prisma.quizQuestion.findFirst({
      where: { question, categoryId },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Такой тест уже существует в этой категории!",
      });
    }

    // options JSON форматта экенин текшеребиз
    if (typeof options !== "object") {
      return res.status(400).json({
        success: false,
        message: "Options must be a JSON object!",
      });
    }

    const newQuestion = await prisma.quizQuestion.create({
      data: {
        question,
        options,
        answer,
        level,
        timer,
        categoryId,
      },
    });

    return res.status(200).json({
      success: true,
      newQuestion,
    });
  } catch (error) {
    console.error("POST QUESTION ERROR:", error);

    return res.status(500).json({
      success: false,
      error: `Error in postQuestion: ${error}`,
    });
  }
};

export default {
  getCategory,
  postCategory,
  delCategory,

  getQuestion,
  addQuestion,
};
