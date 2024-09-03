import { Card, CardContent, Typography } from "@mui/material";

const PokemonNotFoundCard: React.FC = () => {
	return (
		<>
			<Card>
				<CardContent>
					<Typography variant="h3" component="h1" gutterBottom>
						Pokémon Not Found
					</Typography>
					<Typography variant="h5" component="h1" gutterBottom>
						Please Try Again or Check Pokémon Name
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default PokemonNotFoundCard;
