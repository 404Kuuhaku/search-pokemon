"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { POKEMON_LIST_INIT } from "@/libs/const";
import { Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

interface IPokemonList {
	id: string;
	name: string;
	image: string;
}

export default function AutoCompleteSearchBar() {
	const [pokemonList, setPokemonList] =
		useState<IPokemonList[]>(POKEMON_LIST_INIT);

	// const POKEMON_LIST_QUERY = gql`
	// 	query GetAllPokemons {
	// 		pokemons(first: 151) {
	// 			id
	// 			name
	// 			image
	// 		}
	// 	}
	// `;
	const POKEMON_LIST_QUERY = gql`
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
	const [fetchPokemon, { data, loading, error }] =
		useLazyQuery(POKEMON_LIST_QUERY);

	const handleSearch = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const searchTerm = e.target.value;
			console.log(`searchTerm : ${searchTerm}`);

			if (searchTerm) {
				fetchPokemon();
			}
		},
		[fetchPokemon]
	);
	// Debounce the search function
	const debouncedList = useMemo(
		() => debounce(handleSearch, 500),
		[handleSearch]
	);

	useEffect(() => {
		console.log(`data: ${data}`);

		if (data && data.pokemons) {
			setPokemonList([data.pokemons]);
		}
	}, [data]);

	useEffect(() => {
		return () => {
			debouncedList.cancel();
		};
	}, [debouncedList]);

	return (
		// <Autocomplete
		// 	id="Pokémon-autocomplete"
		// 	sx={{ width: 300 }}
		// 	options={pokemonList || []}
		// 	autoHighlight
		// 	getOptionLabel={(option) => option.name}
		// 	renderOption={(props, option) => {
		// 		const { key, ...optionProps } = props;
		// 		return (
		// 			<Box
		// 				key={option.id}
		// 				component="li"
		// 				sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
		// 				{...optionProps}
		// 			>
		// 				<Box
		// 					component="img"
		// 					sx={{
		// 						// height: 233,
		// 						width: 20,
		// 						// maxHeight: { xs: 233, md: 167 },
		// 						// maxWidth: { xs: 350, md: 250 },
		// 					}}
		// 					// loading="lazy"
		// 					alt={option.name}
		// 					src={option.image}
		// 				/>
		// 				{option.name}
		// 			</Box>
		// 		);
		// 	}}
		// 	renderInput={(params) => (
		// 		<TextField
		// 			{...params}
		// 			label="Choose a Pokémon"
		// 			variant="standard"
		// 			onChange={debouncedList}
		// 		/>
		// 	)}
		// />

		<Paper
			component="form"
			sx={{
				p: "2px 4px",
				display: "flex",
				alignItems: "center",
				width: 500,
				borderRadius: 1,
				boxShadow: 1,
			}}
			onSubmit={(e) => {
				e.preventDefault();
				onSearch();
			}}
		>
			<IconButton sx={{ p: "10px" }} aria-label="menu">
				<MenuIcon />
			</IconButton>
			<Autocomplete
				id="Pokémon-autocomplete"
				sx={{ flex: 1 }}
				// options={pokemonList || []}
				options={pokemonList}
				autoHighlight
				getOptionLabel={(option) => option.name}
				renderOption={(props, option) => (
					<Box
						component="li"
						sx={{ "& > img": { mr: 2, flexShrink: 0 }, p: 1 }}
						{...props}
					>
						<Box
							component="img"
							sx={{ width: 20 }}
							alt={option.name}
							src={option.image}
						/>
						{option.name}
					</Box>
				)}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder="Search Pokémon"
						variant="standard"
						onChange={debouncedList}
						sx={{
							ml: 1,
							flex: 1,
							input: {
								padding: "4px 0", // Adjust padding if needed
							},
						}}
					/>
				)}
			/>
			<IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}
