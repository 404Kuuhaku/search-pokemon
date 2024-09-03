"use server";
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import CardSkeleton from "@/components/card/CardSkeleton";
import PokemonCard from "@/components/card/PokemonCard";
import PokemonNotFoundCard from "@/components/card/PokemonNotFoundCard";
const HomePage = async ({ params }: any) => {
    const search = params.name || ""
    console.log(`search: ${search}`);
    
	const POKEMON_QUERY = gql`
		query GetPokemon($name: String!) {
			pokemon(name: $name) {
				id
				name
				image
				attacks {
					fast {
						name
						type
						damage
					}
					special {
						name
						type
						damage
					}
				}
				evolutions {
					name
					image
				}
			}
		}
	`;

	// const { data, loading, error } = useQuery(POKEMON_QUERY, {
	// 	variables: { name: search },
	// 	fetchPolicy: "cache-first",
	// 	// context: {
	// 	//     headers: {
	// 	//         Authorization: `Bearer ${jwtToken}`,
	// 	//     },
	// 	// },
	// 	skip: !search,
	// });

	// if (error) {
	// 	return <div>Error: {error.message}</div>;
	// }

	// const pokemon = data?.pokemon;
	return (
		<>
			<Box sx={{ display: "block", py: 5 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: {
							xs: "2% 2%",
							sm: "2% 5%",
							md: "2% 10%",
							lg: "2% 20%",
						},
						maxWidth: 500,
						margin: "0 auto",
					}}
				>
					{/* <SearchBar
						pokemonName={pokemonName}
						setPokemonName={setPokemonName}
						onSearch={onSearch}
					/> */}
				</Box>
			</Box>
			<Box sx={{ display: "block", pb: 5 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: {
							xs: "0 2%",
							sm: "0 5%",
							md: "0 10%",
							lg: "0 20%",
						},
						maxWidth: 500,
						margin: "0 auto",
					}}
				>
					{/* {loading ? (
						<CardSkeleton />
					) : pokemon === null ? (
						<PokemonNotFoundCard />
					) : (
						// <PokemonCard
						// 	pokemon={pokemon}
						// 	onEvolutionClick={handleEvolutionClick}
						// />
                        <Typography>place holder</Typography>
					)} */}
				</Box>
			</Box>
		</>
	);
};

export default HomePage;
