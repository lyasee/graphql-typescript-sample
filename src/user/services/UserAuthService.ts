import "reflect-metadata";
import { context } from "../../context";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../User";
import secret from "../../config/secret";
import { Field, InputType, ObjectType } from "type-graphql";

class UserAuthService {
  /**
   * 로그인
   * @param data UserLoginInput
   * @returns UserLoginResponse
   */
  async login(data: UserLoginInput): Promise<UserLoginObject> {
    const user = await context.prisma.user.findFirst({
      where: {
        username: data.username,
        social: "LOCAL",
      },
      rejectOnNotFound: true,
    });

    const verified = await bcrypt.compare(data.password, user.password);

    if (!verified) {
      throw new Error("Invalid Password");
    }

    const token = this.getToken(user);

    return {
      ...user,
      token,
    };
  }

  /**
   * 회원가입
   * @param data UserLoginInput
   * @returns UserLoginResponse
   */
  async register(data: UserRegisterInput): Promise<UserLoginObject> {
    const password = await bcrypt.hash(data.password, 14);

    const user = await context.prisma.user.create({
      data: {
        ...data,
        password,
      },
    });

    const token = this.getToken(user);

    return {
      ...user,
      token,
    };
  }

  /**
   * 토큰 생성
   * @param body User
   * @returns
   */
  private getToken = (body: User) => {
    const copyBody = JSON.parse(JSON.stringify(body));
    delete copyBody.password;

    return jwt.sign(copyBody, secret.tokenSecret, {
      expiresIn: "30 day",
    });
  };
}

export default new UserAuthService();

@InputType()
export class UserLoginInput {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}

@InputType()
export class UserRegisterInput extends UserLoginInput {
  @Field({ nullable: true, defaultValue: "LOCAL" })
  social: "LOCAL" | "APPLE" | "KAKAO";
}

@ObjectType()
export class UserLoginObject extends User {
  @Field()
  token: string;
}
