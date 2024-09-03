"use client";

import HomeComponent from "@/components/home/Home";
import { Suspense } from "react";

const HomePage = () => {
	return (
		<Suspense>
			<HomeComponent />
		</Suspense>
	);
};

export default HomePage;
