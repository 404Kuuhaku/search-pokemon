// src/app/layout.tsx
import { ApolloWrapper } from "@/libs/apollo-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Search Pokemon",
	description:
		"search-pokemon application communicate between frontend and backend through graphql",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ApolloWrapper>{children}</ApolloWrapper>
			</body>
		</html>
	);
}
