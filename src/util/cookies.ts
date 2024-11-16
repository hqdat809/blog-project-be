import { CookieOptions, Response } from "express";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: true,
};

interface Params {
  res: Response;
  accessToken: string;
  refreshToken: string;
}

export const REFRESH_PATH = "/auth/refresh";

const getAccessTokenCookieOptions = () => ({
  ...defaults,
  expires: new Date(Date.now() + 15 * 60 * 1000),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  path: REFRESH_PATH,
});

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH });
