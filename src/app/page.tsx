"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchBar from "@/components/SearchBar";

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

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const pokemon = data?.pokemon;

	return (
		<>
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
					height: "100vh",
				}}
			>
				<Card>
					<CardMedia
						component="img"
						height={300}
						image={pokemon?.image}
						alt={pokemon?.name}
						sx={{ objectFit: "contain" }}
					/>
					<CardContent>
						<Typography variant="h4" component="h1" gutterBottom>
							{pokemon?.name}
						</Typography>

						<Typography variant="h5" component="h2" gutterBottom>
							Fast Attacks:
						</Typography>
						<Grid container spacing={2}>
							{pokemon?.attacks.fast.map(
								(attack: any, index: number) => (
									<Grid size={{ xs: 12, sm: 6 }} key={index}>
										<Box>
											<Typography variant="body1">
												{attack.name} ({attack.type})
											</Typography>
											<Typography variant="body2">
												Damage: {attack.damage}
											</Typography>
										</Box>
									</Grid>
								)
							)}
						</Grid>

						<Typography variant="h5" component="h2" gutterBottom>
							Special Attacks:
						</Typography>
						<Grid container spacing={2}>
							{pokemon?.attacks.special.map(
								(attack: any, index: number) => (
									<Grid size={{ xs: 12, sm: 6 }} key={index}>
										<Box>
											<Typography variant="body1">
												{attack.name} ({attack.type})
											</Typography>
											<Typography variant="body2">
												Damage: {attack.damage}
											</Typography>
										</Box>
									</Grid>
								)
							)}
						</Grid>

						<Typography variant="h5" component="h2" gutterBottom>
							Evolutions:
						</Typography>
						<Grid container spacing={2}>
							{pokemon?.evolutions.map(
								(evolution: any, index: number) => (
									<Grid size={{ xs: 12, sm: 6 }} key={index}>
										<CardMedia
											component="img"
											height="150"
											image={evolution.image}
											alt={evolution.name}
											sx={{ objectFit: "contain" }}
										/>
										<Typography variant="body1">
											{evolution.name}
										</Typography>
									</Grid>
								)
							)}
						</Grid>
					</CardContent>
				</Card>
			</Box>
		</>
	);
};

export default Home;
