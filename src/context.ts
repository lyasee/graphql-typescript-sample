import { PrismaClient } from "@prisma/client";
import { User } from "./user/User";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: {
    user?: User;
  };
}

export function createContext(req: any): Context {
  return {
    ...req,
    prisma,
  };
}

export const context = {
  prisma: prisma,
};
