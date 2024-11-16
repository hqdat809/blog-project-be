import { verifyToken } from "@src/util/jwt";
import { RequestHandler } from "express";

export const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;

  if (!accessToken) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const { error } = verifyToken(accessToken);

    if (error) {
      res.status(401).json({ error: error });
      return;
    }

    next();
  }
};

export const authenticateWithAuthor: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;

  if (!accessToken) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const { error, payload } = verifyToken(accessToken);

    if (error) {
      res.status(401).json({ error: error });
      return;
    }

    if (payload && req.body.authorId && payload?.userId !== req.body.authorId) {
      res.status(401).json({ error: "Forbiden" });
    }

    if (
      payload &&
      req.params.authorId &&
      payload?.userId !== req.params.authorId
    ) {
      res.status(401).json({ error: "Forbiden" });
    }

    next();
  }
};
