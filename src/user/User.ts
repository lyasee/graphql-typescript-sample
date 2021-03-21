import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { IsDate } from "class-validator";
import { Post } from "../post/Post";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field((type) => String, { nullable: true })
  nickname?: string | null;

  @Field((type) => String, { nullable: true })
  phone?: string | null;

  @Field((type) => [Post], { nullable: true })
  posts?: [Post] | null;

  @IsDate()
  @Field(() => Date)
  updatedAt?: Date | null;

  @IsDate()
  @Field(() => Date)
  createdAt?: Date;
}
