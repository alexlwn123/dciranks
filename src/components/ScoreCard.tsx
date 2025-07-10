import React from "react";
import { Performance, Corps, Event } from "../types";
import { Trophy, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface ScoreCardProps {
	performance: Performance;
	corps: Corps;
	event: Event;
	showEvent?: boolean;
	showCorps?: boolean;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
	performance,
	corps,
	event,
	showEvent = true,
	showCorps = true,
}) => {
	const getPlacementColor = (placement: number) => {
		if (placement === 1) return "text-yellow-600 bg-yellow-50";
		if (placement === 2) return "text-gray-600 bg-gray-50";
		if (placement === 3) return "text-amber-600 bg-amber-50";
		return "text-blue-600 bg-blue-50";
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
		>
			<div className="p-6">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-3">
						<div
							className={`px-3 py-1 rounded-full text-sm font-semibold ${getPlacementColor(performance.placement)}`}
						>
							<Trophy className="w-4 h-4 inline mr-1" />#{performance.placement}
						</div>
						<div className="text-3xl font-bold text-gray-900">
							{performance.overallScore}
						</div>
						{performance.penalties > 0 && (
							<div className="text-red-600 text-sm font-medium">
								-{performance.penalties} penalty
							</div>
						)}
					</div>
					{event.isLive && (
						<div className="flex items-center space-x-2 text-red-600">
							<div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
							<span className="text-sm font-medium">LIVE</span>
						</div>
					)}
				</div>

				{showCorps && (
					<div className="mb-3">
						<h3 className="text-xl font-bold text-gray-900 mb-1">
							{corps.name}
						</h3>
						<p className="text-gray-600 text-sm">{corps.location}</p>
					</div>
				)}

				{showEvent && (
					<div className="mb-4 p-3 bg-gray-50 rounded-lg">
						<h4 className="font-semibold text-gray-900 mb-1">{event.name}</h4>
						<div className="flex items-center space-x-4 text-sm text-gray-600">
							<div className="flex items-center">
								<Clock className="w-4 h-4 mr-1" />
								{new Date(event.date).toLocaleDateString()}
							</div>
							<div className="flex items-center">
								<MapPin className="w-4 h-4 mr-1" />
								{event.location}
							</div>
						</div>
					</div>
				)}

				<div className="grid grid-cols-3 gap-4 text-center">
					<div className="bg-blue-50 p-3 rounded-lg">
						<div className="text-sm font-medium text-blue-600 mb-1">Music</div>
						<div className="text-lg font-bold text-blue-900">
							{performance.captionScores.music}
						</div>
					</div>
					<div className="bg-green-50 p-3 rounded-lg">
						<div className="text-sm font-medium text-green-600 mb-1">
							Visual
						</div>
						<div className="text-lg font-bold text-green-900">
							{performance.captionScores.visual}
						</div>
					</div>
					<div className="bg-purple-50 p-3 rounded-lg">
						<div className="text-sm font-medium text-purple-600 mb-1">GE</div>
						<div className="text-lg font-bold text-purple-900">
							{performance.captionScores.generalEffect}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
