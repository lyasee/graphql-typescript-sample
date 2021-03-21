import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  Authorized,
} from "type-graphql";
import { Post } from "../post/Post";
import { User } from "./User";
import { Context } from "../context";
import UserAuthService, {
  UserLoginObject,
  UserLoginInput,
  UserRegisterInput,
} from "./services/UserAuthService";
import UserProfileService from "./services/UserProfileService";

@Resolver(User)
export class UserResolver {
  constructor(
    private userAuthService: typeof UserAuthService,
    private userProfileService: typeof UserProfileService
  ) {
    this.userAuthService = UserAuthService;
    this.userProfileService = UserProfileService;
  }

  @FieldResolver()
  async posts(@Root() user: User, @Ctx() ctx: Context): Promise<Post[]> {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .posts();
  }

  @Mutation((returns) => UserLoginObject)
  async signupUser(@Arg("data") data: UserRegisterInput): Promise<UserLoginObject> {
    return this.userAuthService.register(data);
  }

  @Mutation((returns) => UserLoginObject)
  async signinUser(@Arg("data") data: UserLoginInput): Promise<UserLoginObject> {
    return this.userAuthService.login(data);
  }

  @Authorized()
  @Query((returns) => User, { nullable: true })
  async user(@Arg("id", (type) => Int) id: number, @Ctx() ctx: Context) {
    return this.userProfileService.getProfile(id);
  }
}
