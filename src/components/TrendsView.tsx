import React, { useState } from "react";
import { ScoreChart } from "./ScoreChart";
import { useScoreData } from "../hooks/useScoreData";
import { Corps } from "../types";
import { TrendingUp, Users, Target, Award } from "lucide-react";

export const TrendsView: React.FC = () => {
	const { corps, performances, loading, getPerformancesByCorps } =
		useScoreData();
	const [selectedCorps, setSelectedCorps] = useState<Corps[]>([]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	const toggleCorps = (selectedCorpsItem: Corps) => {
		setSelectedCorps((prev) => {
			const exists = prev.find((c) => c.id === selectedCorpsItem.id);
			if (exists) {
				return prev.filter((c) => c.id !== selectedCorpsItem.id);
			} else {
				return [...prev, selectedCorpsItem];
			}
		});
	};

	const selectedPerformances =
		selectedCorps.length > 0
			? performances.filter((p) =>
					selectedCorps.some((c) => c.id === p.corpsId),
				)
			: performances;

	const getCorpsStats = (selectedCorpsItem: Corps) => {
		const corpsPerformances = getPerformancesByCorps(selectedCorpsItem.id);
		const scores = corpsPerformances.map((p) => p.overallScore);
		const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
		const highScore = Math.max(...scores);
		const lowScore = Math.min(...scores);

		return {
			avgScore: avgScore.toFixed(2),
			highScore: highScore.toFixed(2),
			lowScore: lowScore.toFixed(2),
			performances: corpsPerformances.length,
		};
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900">Score Trends</h1>
				<div className="text-sm text-gray-600">
					Compare corps performance over time
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Select Corps to Compare
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
					{corps.map((corpsItem) => (
						<button
							key={corpsItem.id}
							onClick={() => toggleCorps(corpsItem)}
							className={`p-3 rounded-lg border transition-colors ${
								selectedCorps.find((c) => c.id === corpsItem.id)
									? "border-blue-500 bg-blue-50 text-blue-700"
									: "border-gray-200 hover:border-gray-300 text-gray-700"
							}`}
						>
							<div className="font-medium">{corpsItem.name}</div>
							<div className="text-sm text-gray-500">{corpsItem.location}</div>
						</button>
					))}
				</div>
			</div>

			{selectedCorps.length > 0 && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{selectedCorps.map((corpsItem) => {
						const stats = getCorpsStats(corpsItem);
						return (
							<div
								key={corpsItem.id}
								className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
							>
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									{corpsItem.name}
								</h3>
								<div className="grid grid-cols-2 gap-4">
									<div className="flex items-center space-x-3">
										<div className="p-2 bg-blue-100 rounded-lg">
											<TrendingUp className="w-4 h-4 text-blue-600" />
										</div>
										<div>
											<p className="text-sm text-gray-600">Average Score</p>
											<p className="font-bold text-gray-900">
												{stats.avgScore}
											</p>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<div className="p-2 bg-green-100 rounded-lg">
											<Award className="w-4 h-4 text-green-600" />
										</div>
										<div>
											<p className="text-sm text-gray-600">High Score</p>
											<p className="font-bold text-gray-900">
												{stats.highScore}
											</p>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<div className="p-2 bg-red-100 rounded-lg">
											<Target className="w-4 h-4 text-red-600" />
										</div>
										<div>
											<p className="text-sm text-gray-600">Low Score</p>
											<p className="font-bold text-gray-900">
												{stats.lowScore}
											</p>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<div className="p-2 bg-purple-100 rounded-lg">
											<Users className="w-4 h-4 text-purple-600" />
										</div>
										<div>
											<p className="text-sm text-gray-600">Performances</p>
											<p className="font-bold text-gray-900">
												{stats.performances}
											</p>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}

			<ScoreChart
				performances={selectedPerformances}
				corps={corps}
				title={
					selectedCorps.length > 0
						? "Selected Corps Comparison"
						: "All Corps Score Trends"
				}
			/>
		</div>
	);
};
