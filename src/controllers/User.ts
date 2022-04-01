import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // run inside `async` function
      const users = await prisma.user.findMany();
      res.json(users)
    }
     catch (error) {
       res.json({ error: error })
     }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      res.json(user);
    } catch (error) {
      res.json(error)
    }
  },
  
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user: Prisma.UserCreateInput      
      user = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      }
      const createUser = await prisma.user.create({ data: user })
      res.json({ message: "User created succesfully" , createUser})
    } catch (error) {
      res.json({error: error})
    }
  },

  put: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "put user" });
      return;
    } catch (error) {
      next(error);
    }
  },

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "patch user" });
      return;
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "delete user" });
      return;
    } catch (error) {
      next(error);
    }
  }
};
