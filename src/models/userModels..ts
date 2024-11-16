import { prisma } from "@src/config/db";
import { IRegister } from "@src/types/User";

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const createUser = async (userData: IRegister) => {
  return await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      password: userData.password,
    },
  });
};

export default {
  createUser,
  findUserByEmail,
} as const;
