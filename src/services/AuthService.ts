import UserRepo from "@src/repos/UserRepo";
import { ILogin, IRegister } from "@src/types/User";
import { signRefreshToken, signToken } from "@src/util/jwt";
// eslint-disable-next-line n/no-extraneous-import
import bcrypt from "bcryptjs";

const register = async (userDetails: IRegister) => {
  const existingUser = await UserRepo.findUserByEmail(userDetails.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  userDetails.password = await bcrypt.hash(userDetails.password, 10);

  const user = await UserRepo.createUser(userDetails);

  const accessToken = signToken({
    userId: user.id,
  });
  const refreshToken = signRefreshToken({
    userId: user.id,
  });

  return {
    user: { ...user, password: undefined },
    accessToken,
    refreshToken,
  };
};

const login = async (account: ILogin) => {
  const existingUser = await UserRepo.findUserByEmail(account.email);

  if (!existingUser) {
    throw new Error("Email or Password is invalid");
  }

  const isValid = bcrypt.compare(account.password, existingUser.password);

  if (!isValid) {
    throw new Error("Email or Password is invalid");
  }

  const accessToken = signToken({
    userId: existingUser.id,
  });
  const refreshToken = signRefreshToken({
    userId: existingUser.id,
  });

  return {
    user: { ...existingUser, password: undefined },
    accessToken,
    refreshToken,
  };
};

export default {
  register,
  login,
} as const;
