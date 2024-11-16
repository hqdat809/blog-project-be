/* eslint-disable n/no-process-env */
import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";

export interface ISignTokenPayload {
  userId: string;
}

export const signToken = (payload: ISignTokenPayload) => {
  const options = { expiresIn: process.env.EXPIRED_AT_ACCESS_TOKEN };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY ?? "", options);
};

export const signRefreshToken = (payload: ISignTokenPayload) => {
  const options = { expiresIn: process.env.EXPIRED_AT_REFRESH_TOKEN };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY ?? "", options);
};

interface IJwtPayload extends JwtPayload {
  userId: string;
}

export const verifyToken = (token: string, options?: VerifyOptions) => {
  const { ...verifyOpts } = options ?? {};
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY ?? "", {
      ...verifyOpts,
    }) as IJwtPayload;
    return {
      payload,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
