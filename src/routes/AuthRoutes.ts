import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "./common/types";
import AuthService from "@src/services/AuthService";
import { loginSchema, registerSchema } from "@src/schema/auth.schema";
import { clearAuthCookies, setAuthCookies } from "@src/util/cookies";
import catchErrors from "@src/util/catchErrors";

const login = catchErrors(async (req: IReq, res: IRes) => {
  const request = loginSchema.parse({
    ...req.body,
  });

  const { accessToken, refreshToken } = await AuthService.login(request);

  setAuthCookies({ res, accessToken, refreshToken })
    .status(HttpStatusCodes.OK)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
});

const register = catchErrors(async (req: IReq, res: IRes) => {
  const request = registerSchema.parse({
    ...req.body,
  });

  const { accessToken, refreshToken } = await AuthService.register(request);

  setAuthCookies({ res, accessToken, refreshToken })
    .status(HttpStatusCodes.CREATED)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
});

const logout = (req: IReq, res: IRes) => {
  clearAuthCookies(res)
    .status(HttpStatusCodes.OK)
    .json({ message: "Logout successfully" });
};

export default {
  login,
  register,
  logout,
} as const;
