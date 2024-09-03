"use client";
import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const CardMediaSkeleton: React.FC = () => {
	return (
		<>
			<Skeleton
				variant="rectangular"
				animation="wave"
				height={300}
				width={500}
			/>
		</>
	);
};

const CardNameSkeleton: React.FC = () => {
	return (
		<>
			<Typography component="div" variant="h4">
				<Skeleton width="60%" />
			</Typography>
		</>
	);
};

const CardContentSkeleton: React.FC<{ customPT?: number }> = ({
	customPT = 0,
}) => {
	return (
		<>
			<Typography variant="h5" component="h2" gutterBottom pt={customPT}>
				<Skeleton width="50%" />
			</Typography>

			<Grid container spacing={2}>
				{[...Array(2)].map((_, index) => (
					<Grid size={{ xs: 12, sm: 6 }} key={index}>
						<Box>
							<Typography component="div" variant="body1">
								<Skeleton width="80%" />
							</Typography>
							<Typography component="div" variant="body2">
								<Skeleton width="60%" />
							</Typography>
						</Box>
					</Grid>
				))}
			</Grid>
		</>
	);
};

const CardEvoSkeleton: React.FC = () => {
	return (
		<>
			<Typography variant="h5" component="h2" gutterBottom pt={5}>
				<Skeleton width="50%" />
			</Typography>
			<Grid container spacing={2}>
				{[...Array(2)].map((_, index) => (
					<Grid size={{ xs: 12, sm: 6 }} key={index}>
						<Skeleton variant="rectangular" height={150} />
						<Typography component="div" variant="body1">
							<Skeleton width="60%" />
						</Typography>
					</Grid>
				))}
			</Grid>
		</>
	);
};

const CardSkeleton: React.FC = () => {
	return (
		<>
			<Card>
				<CardMediaSkeleton />
				<CardContent>
					<CardNameSkeleton />
					<CardContentSkeleton customPT={3} />
					<CardContentSkeleton customPT={5} />
					<CardEvoSkeleton />
				</CardContent>
			</Card>
		</>
	);
};

export default CardSkeleton;
