"use client";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useState,
	Suspense,
} from "react";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import CardSkeleton from "@/components/card/CardSkeleton";
import PokemonCard from "@/components/card/PokemonCard";
import PokemonNotFoundCard from "@/components/card/PokemonNotFoundCard";
import TryCard from "@/components/card/TryCard";

const Home = () => {
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
		if (!search) return;
		router.push(pathname + "?" + createQueryString("name", search));
	}, [createQueryString, pathname, router, search]);
	useEffect(() => {
		if (!search) return;
		setPokemonName(search);
	}, [search]);

	const POKEMON_QUERY = useMemo(
		() => gql`
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
		`,
		[]
	);
	const { data, loading, error } = useQuery(POKEMON_QUERY, {
		variables: { name: search },
		fetchPolicy: "cache-first",
		skip: !search,
	});
	const pokemon = useMemo(() => data?.pokemon, [data?.pokemon]);

	const onSearch = () => {
		router.push(pathname + "?" + createQueryString("name", pokemonName));
	};
	const handleEvolutionClick = (name: string) => {
		router.push(pathname + "?" + createQueryString("name", name));
	};

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
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
						<SearchBar
							pokemonName={pokemonName}
							setPokemonName={setPokemonName}
							onSearch={onSearch}
						/>
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
						{loading ? (
							<CardSkeleton />
						) : pokemon === null ? (
							<PokemonNotFoundCard />
						) : pokemon === undefined ? (
							<TryCard />
						) : (
							<PokemonCard
								pokemon={pokemon}
								onEvolutionClick={handleEvolutionClick}
							/>
						)}
					</Box>
				</Box>
			</Suspense>
		</>
	);
};

export default Home;
