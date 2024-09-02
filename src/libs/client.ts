import { HttpLink } from "@apollo/client";
import {
	registerApolloClient,
	ApolloClient,
	InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: "https://graphql-pokemon2.vercel.app/",
			// fetchOptions: { cache: "no-store" }, //TODOS DELETE OR ADD THIS
		}),
	});
});
