// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

//TODOS DELETE THIS

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.pokemondb.net",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
