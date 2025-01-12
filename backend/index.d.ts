import { userDocument } from "./src/models/user.model";
import { SessionDocument } from "./src/models/session.model";
interface User {
  email: string;
  emailVerified: boolean;
  userAgent?: string;
}
declare global {
  namespace Express {
    interface Request {
      userId: userDocument["_id"];
      sessionId: SessionDocument["_id"];
      user?: User
    }
  }
}
export {};