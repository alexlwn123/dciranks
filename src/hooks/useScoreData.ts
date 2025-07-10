import { useEffect, useState } from "react";
import { mockCorps, mockEvents, mockPerformances } from "../data/mockData";
import type { Corps, Event, Performance, ScoreFilter } from "../types";

export const useScoreData = () => {
	const [corps, setCorps] = useState<Corps[]>([]);
	const [events, setEvents] = useState<Event[]>([]);
	const [performances, setPerformances] = useState<Performance[]>([]);
	const [loading, setLoading] = useState(true);
	const [liveEvents, setLiveEvents] = useState<Event[]>([]);

	useEffect(() => {
		// Simulate API call delay
		const loadData = async () => {
			setLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setCorps(mockCorps);
			setEvents(mockEvents);
			setPerformances(mockPerformances);
			setLiveEvents(mockEvents.filter((event) => event.isLive));
			setLoading(false);
		};

		loadData();
	}, []);

	const getCorpsById = (id: string): Corps | undefined => {
		return corps.find((c) => c.id === id);
	};

	const getEventById = (id: string): Event | undefined => {
		return events.find((e) => e.id === id);
	};

	const getPerformancesByCorps = (corpsId: string): Performance[] => {
		return performances.filter((p) => p.corpsId === corpsId);
	};

	const getPerformancesByEvent = (eventId: string): Performance[] => {
		return performances
			.filter((p) => p.eventId === eventId)
			.sort((a, b) => a.placement - b.placement);
	};

	const getLatestPerformances = (limit: number = 10): Performance[] => {
		return performances
			.sort(
				(a, b) =>
					new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
			)
			.slice(0, limit);
	};

	const getTopPerformances = (limit: number = 10): Performance[] => {
		return performances
			.sort((a, b) => b.overallScore - a.overallScore)
			.slice(0, limit);
	};

	const filterPerformances = (filter: ScoreFilter): Performance[] => {
		return performances.filter((performance) => {
			if (filter.corps && performance.corpsId !== filter.corps) return false;
			if (filter.event && performance.eventId !== filter.event) return false;
			if (filter.dateRange) {
				const performanceDate = new Date(performance.date);
				const startDate = new Date(filter.dateRange.start);
				const endDate = new Date(filter.dateRange.end);
				if (performanceDate < startDate || performanceDate > endDate)
					return false;
			}
			return true;
		});
	};

	return {
		corps,
		events,
		performances,
		loading,
		liveEvents,
		getCorpsById,
		getEventById,
		getPerformancesByCorps,
		getPerformancesByEvent,
		getLatestPerformances,
		getTopPerformances,
		filterPerformances,
	};
};
