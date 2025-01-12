import { NOT_FOUND, OK } from "../constants/http";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import Session from "../models/session.model";
import User from "../models/user.model";
import appAssert from "../utils/appAssert";

export const getSessionsHandler = asyncHandler(async (req, res) => {
  const sessions = await Session.find(
    {
      userId: req.userId,
      expiresAt: { $gt: new Date() },
    },
    {
      _id: 1,
      userAgent: 1,
      createdAt: 1,
    },
    {
      sort: { createdAt: -1 }, //descending newest first
    }
  );

  appAssert(sessions, NOT_FOUND, "Session not found");

  return res.status(OK).json(
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === req.sessionId && {
        isCurrect: true,
      }),
    }))
  );
});
