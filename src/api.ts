import { GraphQLClient } from "graphql-request";
import { QueryClient } from "@tanstack/react-query";

import { getSdk } from "./generated/graphqlTypes";

const gqlClient = new GraphQLClient(
  `${process.env.NEXT_DOMAIN}/api/graphql`,
);

export const { getDogs, getDogByName } = getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
