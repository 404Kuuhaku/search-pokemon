"use client";
import { Card, CardContent, Typography } from "@mui/material";

const TryCard: React.FC = () => {
	return (
		<>
			<Card>
				<CardContent>
					<Typography variant="h3" component="h1" gutterBottom>
						Try Search Pokémon
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default TryCard;
