"use client";
import React, { ReactNode } from "react";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
	ApolloNextAppProvider,
	ApolloClient,
	InMemoryCache,
	SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";

function makeClient() {
	const httpLink = new HttpLink({
		uri: "https://graphql-pokemon2.vercel.app/",
		fetchOptions: { cache: "no-store" }, //TODOS DELETE OR ADD THIS
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link:
			typeof window === "undefined"
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
				  ])
				: httpLink,
	});
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
