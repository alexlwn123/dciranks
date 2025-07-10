import React, { useState } from "react";
import { EventCard } from "./EventCard";
import { ScoreCard } from "./ScoreCard";
import { useScoreData } from "../hooks/useScoreData";
import { Event } from "../types";
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react";

export const EventsView: React.FC = () => {
	const { events, loading, getCorpsById, getPerformancesByEvent } =
		useScoreData();
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (selectedEvent) {
		const eventPerformances = getPerformancesByEvent(selectedEvent.id);

		return (
			<div className="space-y-6">
				<div className="flex items-center space-x-4">
					<button
						onClick={() => setSelectedEvent(null)}
						className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Events
					</button>
					<h1 className="text-3xl font-bold text-gray-900">
						{selectedEvent.name}
					</h1>
				</div>

				<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
						<div className="flex items-center justify-center">
							<Calendar className="w-5 h-5 text-gray-400 mr-2" />
							<span className="text-gray-600">
								{new Date(selectedEvent.date).toLocaleDateString()}
							</span>
						</div>
						<div className="flex items-center justify-center">
							<MapPin className="w-5 h-5 text-gray-400 mr-2" />
							<span className="text-gray-600">{selectedEvent.location}</span>
						</div>
						<div className="flex items-center justify-center">
							<Users className="w-5 h-5 text-gray-400 mr-2" />
							<span className="text-gray-600">
								{selectedEvent.competingCorps.length} corps
							</span>
						</div>
						<div className="flex items-center justify-center">
							<Clock className="w-5 h-5 text-gray-400 mr-2" />
							<span className="text-gray-600">{selectedEvent.type}</span>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{eventPerformances.map((performance) => {
							const performanceCorps = getCorpsById(performance.corpsId);

							if (!performanceCorps) return null;

							return (
								<ScoreCard
									key={performance.id}
									performance={performance}
									corps={performanceCorps}
									event={selectedEvent}
									showEvent={false}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900">Events</h1>
				<div className="text-sm text-gray-600">
					{events.length} events this season
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{events.map((event) => (
					<EventCard
						key={event.id}
						event={event}
						onClick={() => setSelectedEvent(event)}
					/>
				))}
			</div>
		</div>
	);
};
