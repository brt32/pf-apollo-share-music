// import ApolloClient from "apollo-boost";

// const client = new ApolloClient({
//   uri: "https://pf-apollo-music.hasura.app/v1/graphql",
//   headers: {
//     "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET,
//   },
// });

// export default client;

import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: "wss://pf-apollo-music.hasura.app/v1/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET,
        },
      },
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
