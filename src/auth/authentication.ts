import { AuthChecker } from "type-graphql";
import jwt from "jsonwebtoken";
import secret from "../config/secret";
import { User } from "../user/User";

export const customAuthChecker: AuthChecker<any> = async ({ root, args, context, info }, roles) => {
  const authHeader = context.req.get("Authorization");

  try {
    const user = jwt.verify(authHeader.replace("Bearer ", ""), secret.tokenSecret);

    if (typeof user === "object" && Object.keys(user).find((key) => key === "id")) {
      const u: User = JSON.parse(JSON.stringify(user));
      context.req.user = u;
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
