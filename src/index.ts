import "reflect-metadata";
import * as tq from "type-graphql";
import { PostResolver } from "./post/PostResolver";
import { UserResolver } from "./user/UserResolver";
import { ApolloServer } from "apollo-server";
import { createContext } from "./context";
import { customAuthChecker } from "./auth/authentication";

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [PostResolver, UserResolver],
    authChecker: customAuthChecker,
  });

  new ApolloServer({ schema, context: createContext }).listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️  See sample queries: http://pris.ly/e/ts/graphql-typegraphql#using-the-graphql-api`
    )
  );
};

app();
