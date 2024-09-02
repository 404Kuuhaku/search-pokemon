// src/app/layout.tsx
import { ApolloWrapper } from "@/libs/apollo-wrapper";
import { CookiesProvider } from "next-client-cookies/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Search Pokemon",
	// description: "Generated by create next app", //TODOS DELETE OR ADD THIS
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<CookiesProvider>
					<ApolloWrapper>{children}</ApolloWrapper>
				</CookiesProvider>
			</body>
		</html>
	);
}
