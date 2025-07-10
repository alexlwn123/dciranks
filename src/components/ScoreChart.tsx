import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Performance, Corps } from "../types";

interface ScoreChartProps {
	performances: Performance[];
	corps: Corps[];
	title?: string;
}

export const ScoreChart: React.FC<ScoreChartProps> = ({
	performances,
	corps,
	title = "Score Progression",
}) => {
	const getCorpsName = (corpsId: string) => {
		const foundCorps = corps.find((c) => c.id === corpsId);
		return foundCorps ? foundCorps.name : "Unknown";
	};

	// Group performances by corps and create data series
	const data = corps
		.map((corpsItem) => {
			const corpsPerformances = performances
				.filter((p) => p.corpsId === corpsItem.id)
				.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
				);

			return {
				id: corpsItem.name,
				data: corpsPerformances.map((performance) => ({
					x: new Date(performance.date).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
					}),
					y: performance.overallScore,
				})),
			};
		})
		.filter((series) => series.data.length > 0);

	return (
		<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
			<h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
			<div className="h-80">
				<ResponsiveLine
					data={data}
					margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
					xScale={{ type: "point" }}
					yScale={{
						type: "linear",
						min: "auto",
						max: "auto",
						stacked: false,
						reverse: false,
					}}
					yFormat=" >-.2f"
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: -45,
						legend: "Competition Date",
						legendOffset: 36,
						legendPosition: "middle",
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "Score",
						legendOffset: -40,
						legendPosition: "middle",
					}}
					pointSize={8}
					pointColor={{ theme: "background" }}
					pointBorderWidth={2}
					pointBorderColor={{ from: "serieColor" }}
					pointLabelYOffset={-12}
					useMesh={true}
					legends={[
						{
							anchor: "bottom-right",
							direction: "column",
							justify: false,
							translateX: 100,
							translateY: 0,
							itemsSpacing: 0,
							itemDirection: "left-to-right",
							itemWidth: 80,
							itemHeight: 20,
							itemOpacity: 0.75,
							symbolSize: 12,
							symbolShape: "circle",
							symbolBorderColor: "rgba(0, 0, 0, .5)",
							effects: [
								{
									on: "hover",
									style: {
										itemBackground: "rgba(0, 0, 0, .03)",
										itemOpacity: 1,
									},
								},
							],
						},
					]}
					colors={{ scheme: "category10" }}
					theme={{
						background: "transparent",
						text: {
							fontSize: 11,
							fill: "#374151",
							outlineWidth: 0,
							outlineColor: "transparent",
						},
						axis: {
							domain: {
								line: {
									stroke: "#E5E7EB",
									strokeWidth: 1,
								},
							},
							legend: {
								text: {
									fontSize: 12,
									fill: "#374151",
								},
							},
							ticks: {
								line: {
									stroke: "#E5E7EB",
									strokeWidth: 1,
								},
								text: {
									fontSize: 11,
									fill: "#6B7280",
								},
							},
						},
						grid: {
							line: {
								stroke: "#F3F4F6",
								strokeWidth: 1,
							},
						},
					}}
				/>
			</div>
		</div>
	);
};
