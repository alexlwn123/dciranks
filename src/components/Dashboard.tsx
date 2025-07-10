import type React from "react";
import { useScoreData } from "../hooks/useScoreData";
import { BumpChart } from "./BumpChart";

export const Dashboard: React.FC = () => {
	const { corps, events, performances, loading } = useScoreData();

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	return (
		<BumpChart performances={performances} corps={corps} events={events} />
	);
};
