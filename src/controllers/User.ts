import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import { ComposeResponse } from "src/modules/response";
const prisma = new PrismaClient();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // run inside `async` function
      const users = await prisma.user.findMany();  
      res.json(ComposeResponse(res.statusCode.toString(), users))
    
    }
     catch (error) {
      res.json( ComposeResponse(res.statusCode.toString(), undefined, new Error(JSON.stringify(error))));
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

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateUser = await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
      });
      res.json({ message: "patch user", updateUser});
      return;
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteUser = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    })
      res.json({ message: "delete user" });
      return;
    } catch (error) {
      next(error);
    }
  }
};
