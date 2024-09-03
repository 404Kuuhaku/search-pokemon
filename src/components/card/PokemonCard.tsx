"use client"
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PokemonCardProps } from "@/libs/interface";

const PokemonCard: React.FC<PokemonCardProps> = ({
	pokemon,
	onEvolutionClick,
}) => {
	return (
		<>
			<Card>
				<CardMedia
					component="img"
					height={300}
					image={pokemon?.image}
					alt={pokemon?.name}
					sx={{ objectFit: "contain" }}
				/>
				<CardContent>
					<Typography variant="h4" component="h1" gutterBottom sx={{fontWeight: 700}}>
						{pokemon?.name}
					</Typography>

					<Typography variant="h5" component="h2" gutterBottom sx={{pt:1}}>
						Fast Attacks:
					</Typography>
					<Grid container spacing={2} >
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

					<Typography variant="h5" component="h2" gutterBottom sx={{pt:3}}>
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

					<Typography variant="h5" component="h2" gutterBottom sx={{pt:3}}>
						Evolutions:
					</Typography>

					<Grid container spacing={2}>
						{pokemon?.evolutions &&
						pokemon.evolutions.length > 0 ? (
							pokemon.evolutions.map(
								(evolution: any, index: number) => (
									<Grid size={{ xs: 12, sm: 6 }} key={index}>
										<Box
											onClick={() =>
												onEvolutionClick(evolution.name)
											}
											sx={{ cursor: "pointer" }}
										>
											<CardMedia
												component="img"
												height="150"
												image={evolution.image}
												alt={evolution.name}
												sx={{ objectFit: "contain" }}
											/>
										</Box>
										<Button
											variant="text"
											size="large"
											onClick={() =>
												onEvolutionClick(evolution.name)
											}
										>
											{evolution.name}
										</Button>
									</Grid>
								)
							)
						) : (
							<Grid size={{ xs: 12 }}>
								<Typography variant="body1">
									No evolutions
								</Typography>
							</Grid>
						)}
					</Grid>
				</CardContent>
			</Card>
		</>
	);
};

export default PokemonCard;
