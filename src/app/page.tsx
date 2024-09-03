"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchBar from "@/components/SearchBar";
import AutoCompleteSearchBar from "@/components/AutoComplete";
import CardSkeleton from "@/components/card/CardSkeleton";
import PokemonCard from "@/components/card/PokemonCard";

const Home = () => {
	//search params
	const [pokemonName, setPokemonName] = useState("");
	const searchParams = useSearchParams();
	const search = searchParams.get("name");
	const router = useRouter();
	const pathname = usePathname();
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);
	useEffect(() => {
		// createQueryString('name', 'pikachu')
		// router.push(pathname + "?" + createQueryString("name", "pikachu"));
		if (!search) return;
		console.log(`Search URL : ${search}`);
		router.push(pathname + "?" + createQueryString("name", search));
		console.log("createQueryString is created");
	}, [createQueryString, pathname, router, search]);

	//Search Bar
	const onSearch = () => {
		router.push(pathname + "?" + createQueryString("name", pokemonName));
	};

	useEffect(() => {
		if (!search) return;
		setPokemonName(search);
	}, [search]);

	//cookies
	const cookies = useCookies();
	const jwtToken: string | undefined = cookies.get("jwtToken");

	// API query
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

	const { data, loading, error } = useQuery(POKEMON_QUERY, {
		variables: { name: search },
		// context: {
		//     headers: {
		//         Authorization: `Bearer ${jwtToken}`,
		//     },
		// },
		skip: !search, // Skip query if no search term
	});

	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

	// if (error) {
	// 	return <div>Error: {error.message}</div>;
	// }

	const pokemon = data?.pokemon;

	const handleEvolutionClick = (name: string) => {
		router.push(pathname + "?" + createQueryString("name", name));
	};

	return (
		<>
			<AutoCompleteSearchBar></AutoCompleteSearchBar>
			<Box sx={{ display: "block", pb: 5 }}>
				<Box
					// sx={{ width: "100%", mb: 3 }}
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
					<SearchBar
						pokemonName={pokemonName}
						setPokemonName={setPokemonName}
						onSearch={onSearch}
					/>
				</Box>
			</Box>
			<Box sx={{ display: "block", pb: 5 }}>
				<Box
					// sx={{
					// 	padding: { xs: "0 2%", sm: "0 5%", md: "0 10%", lg: "0 20%" },
					// 	maxWidth: 500,
					// }}
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
						// height: "100vh",
					}}
				>
					{loading ? (
						<CardSkeleton />
					) : (
						<PokemonCard
							pokemon={pokemon}
							onEvolutionClick={handleEvolutionClick}
						/>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Home;
