import "reflect-metadata";
import { context } from "../../context";
import { User } from "../User";

class UserProfileService {
  async getProfile(id: number): Promise<User | null> {
    return context.prisma.user.findUnique({
      where: { id: id },
    });
  }
}

export default new UserProfileService();
