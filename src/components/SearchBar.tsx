// "use client";
// import React, { useEffect, useCallback } from "react";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import { debounce } from "lodash";

// interface SearchBarProps {
// 	pokemonName: string;
// 	setPokemonName: React.Dispatch<React.SetStateAction<string>>;
// 	onSearch: () => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({
// 	pokemonName,
// 	setPokemonName,
// 	onSearch,
// }) => {
// 	// Debounce the onSearch function
// 	const debouncedSearch = useCallback(
// 		debounce(() => {
// 			onSearch();
// 		}, 300), // Adjust the delay (in milliseconds) as needed
// 		[pokemonName]
// 	);

// 	// Trigger search on every change with debouncing
// 	useEffect(() => {
// 		if (pokemonName.trim()) {
// 			debouncedSearch();
// 		}
// 		return () => {
// 			debouncedSearch.cancel();
// 		};
// 	}, [pokemonName, debouncedSearch]);

// 	return (
// 		<Paper
// 			component="form"
// 			sx={{
// 				p: "2px 4px",
// 				display: "flex",
// 				alignItems: "center",
// 				width: 400,
// 			}}
// 			onSubmit={(e) => {
// 				e.preventDefault();
// 				onSearch();
// 			}}
// 		>
// 			<IconButton sx={{ p: "10px" }} aria-label="menu">
// 				<MenuIcon />
// 			</IconButton>
// 			<InputBase
// 				sx={{ ml: 1, flex: 1 }}
// 				placeholder="Search Pokemon"
// 				value={pokemonName}
// 				onChange={(e) => setPokemonName(e.target.value)}
// 				aria-label="search pokemon"
// 			/>
// 			<IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
// 				<SearchIcon />
// 			</IconButton>
// 			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
// 		</Paper>
// 	);
// };

// export default SearchBar;

"use client";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { debounce } from "lodash";

interface SearchBarProps {
	pokemonName: string;
	setPokemonName: React.Dispatch<React.SetStateAction<string>>;
	onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
	pokemonName,
	setPokemonName,
	onSearch,
}) => {
	useEffect(() => {
		const debouncedSearch = debounce(() => {
			if (pokemonName.trim()) {
				onSearch();
			}
		}, 2000); // Adjust the delay (in milliseconds) as needed

		debouncedSearch();

		return () => {
			debouncedSearch.cancel();
		};
	}, [pokemonName, onSearch]);

	return (
		<Paper
			component="form"
			sx={{
				p: "2px 4px",
				display: "flex",
				alignItems: "center",
				width: 400,
			}}
			onSubmit={(e) => {
				e.preventDefault();
				onSearch();
			}}
		>
			<IconButton sx={{ p: "10px" }} aria-label="menu">
				<MenuIcon />
			</IconButton>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search Pokemon"
				value={pokemonName}
				onChange={(e) => setPokemonName(e.target.value)}
				aria-label="search pokemon"
			/>
			<IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
				<SearchIcon />
			</IconButton>
			{/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
		</Paper>
	);
};

export default SearchBar;
