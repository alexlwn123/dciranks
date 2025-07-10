import { v4 as uuidv4 } from "uuid";
import type { Corps, Event, Performance } from "../types";

export const mockCorps: Corps[] = [
	{
		id: uuidv4(),
		name: "Blue Devils",
		location: "Concord, CA",
		division: "World Class",
		founded: 1957,
	},
	{
		id: uuidv4(),
		name: "Santa Clara Vanguard",
		location: "Santa Clara, CA",
		division: "World Class",
		founded: 1967,
	},
	{
		id: uuidv4(),
		name: "Carolina Crown",
		location: "Fort Mill, SC",
		division: "World Class",
		founded: 1988,
	},
	{
		id: uuidv4(),
		name: "Bluecoats",
		location: "Canton, OH",
		division: "World Class",
		founded: 1972,
	},
	{
		id: uuidv4(),
		name: "Boston Crusaders",
		location: "Boston, MA",
		division: "World Class",
		founded: 1940,
	},
	{
		id: uuidv4(),
		name: "Phantom Regiment",
		location: "Rockford, IL",
		division: "World Class",
		founded: 1956,
	},
	{
		id: uuidv4(),
		name: "The Cavaliers",
		location: "Rosemont, IL",
		division: "World Class",
		founded: 1948,
	},
	{
		id: uuidv4(),
		name: "Blue Knights",
		location: "Denver, CO",
		division: "World Class",
		founded: 1958,
	},
	{
		id: uuidv4(),
		name: "The Cadets",
		location: "Allentown, PA",
		division: "World Class",
		founded: 1934,
	},
	{
		id: uuidv4(),
		name: "Blue Stars",
		location: "La Crosse, WI",
		division: "World Class",
		founded: 1964,
	},
	{
		id: uuidv4(),
		name: "Crossmen",
		location: "San Antonio, TX",
		division: "World Class",
		founded: 1975,
	},
	{
		id: uuidv4(),
		name: "Madison Scouts",
		location: "Madison, WI",
		division: "World Class",
		founded: 1938,
	},
	{
		id: uuidv4(),
		name: "Mandarins",
		location: "Sacramento, CA",
		division: "World Class",
		founded: 1963,
	},
	{
		id: uuidv4(),
		name: "Pacific Crest",
		location: "Diamond Bar, CA",
		division: "World Class",
		founded: 1993,
	},
	{
		id: uuidv4(),
		name: "Troopers",
		location: "Casper, WY",
		division: "World Class",
		founded: 1957,
	},
	{
		id: uuidv4(),
		name: "Colts",
		location: "Dubuque, IA",
		division: "World Class",
		founded: 1963,
	},
	{
		id: uuidv4(),
		name: "Spirit of Atlanta",
		location: "Atlanta, GA",
		division: "World Class",
		founded: 1979,
	},
	{
		id: uuidv4(),
		name: "Jersey Surf",
		location: "Camden County, NJ",
		division: "World Class",
		founded: 2001,
	},
	{
		id: uuidv4(),
		name: "Music City",
		location: "Nashville, TN",
		division: "World Class",
		founded: 2008,
	},
];

export const mockEvents: Event[] = [
	{
		id: uuidv4(),
		name: "DCI Tour Premiere",
		date: "2024-06-28",
		location: "Indianapolis, IN",
		city: "Indianapolis",
		state: "IN",
		type: "Regional",
		isLive: false,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
	{
		id: uuidv4(),
		name: "DCI Eastern Classic",
		date: "2024-06-30",
		location: "Allentown, PA",
		city: "Allentown",
		state: "PA",
		type: "Regional",
		isLive: false,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
	{
		id: uuidv4(),
		name: "DCI Minnesota",
		date: "2024-07-02",
		location: "Minneapolis, MN",
		city: "Minneapolis",
		state: "MN",
		type: "Regional",
		isLive: false,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
	{
		id: uuidv4(),
		name: "DCI Atlanta Regional",
		date: "2024-07-03",
		location: "Atlanta, GA",
		city: "Atlanta",
		state: "GA",
		type: "Regional",
		isLive: false,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
	{
		id: uuidv4(),
		name: "DCI San Antonio",
		date: "2024-07-05",
		location: "San Antonio, TX",
		city: "San Antonio",
		state: "TX",
		type: "Regional",
		isLive: false,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
	{
		id: uuidv4(),
		name: "DCI Denver",
		date: "2024-07-06",
		location: "Denver, CO",
		city: "Denver",
		state: "CO",
		type: "Regional",
		isLive: false,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
	{
		id: uuidv4(),
		name: "DCI Broken Arrow",
		date: "2024-07-07",
		location: "Broken Arrow, OK",
		city: "Broken Arrow",
		state: "OK",
		type: "Regional",
		isLive: true,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
	{
		id: uuidv4(),
		name: "DCI World Championships Semifinals",
		date: "2024-08-08",
		location: "Indianapolis, IN",
		city: "Indianapolis",
		state: "IN",
		type: "Championship",
		isLive: false,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
	{
		id: uuidv4(),
		name: "DCI World Championships Finals",
		date: "2024-08-10",
		location: "Indianapolis, IN",
		city: "Indianapolis",
		state: "IN",
		type: "Finals",
		isLive: false,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
	{
		id: uuidv4(),
		name: "DCI West Coast Classic",
		date: "2024-07-13",
		location: "Stanford, CA",
		city: "Palo Alto",
		state: "CA",
		type: "Premier",
		isLive: false,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
	{
		id: uuidv4(),
		name: "DCI Eastern Championship",
		date: "2024-07-20",
		location: "Allentown, PA",
		city: "Allentown",
		state: "PA",
		type: "Championship",
		isLive: false,
		competingCorps: mockCorps.slice(0, 19).map((c) => c.id),
	},
];

// Generate mock performance data
export const mockPerformances: Performance[] = [];

mockEvents.forEach((event) => {
	// Shuffle corps for each event to create realistic ranking changes
	const shuffledCorps = [...event.competingCorps].sort(
		() => Math.random() - 0.5,
	);

	shuffledCorps.forEach((corpsId, index) => {
		// Create more realistic score distribution
		const topTierCorps = [
			"Blue Devils",
			"Santa Clara Vanguard",
			"Carolina Crown",
			"Bluecoats",
		];
		const corps = mockCorps.find((c) => c.id === corpsId);
		const isTopTier = corps && topTierCorps.includes(corps.name);

		let baseScore;
		if (index < 3) {
			baseScore = 92 + Math.random() * 6; // Top 3: 92-98
		} else if (index < 8) {
			baseScore = 86 + Math.random() * 6; // 4-8: 86-92
		} else if (index < 15) {
			baseScore = 78 + Math.random() * 8; // 9-15: 78-86
		} else {
			baseScore = 70 + Math.random() * 8; // 16+: 70-78
		}

		// Add some variance for top tier corps
		if (isTopTier) {
			baseScore += Math.random() * 2;
		}

		const performance: Performance = {
			id: uuidv4(),
			corpsId,
			eventId: event.id,
			date: event.date,
			overallScore: Math.round(baseScore * 100) / 100,
			placement: index + 1,
			captionScores: {
				music: Math.round((baseScore * 0.35 + Math.random() * 2) * 100) / 100,
				visual: Math.round((baseScore * 0.35 + Math.random() * 2) * 100) / 100,
				generalEffect:
					Math.round((baseScore * 0.3 + Math.random() * 2) * 100) / 100,
			},
			subCaptionScores: {
				musicBrass:
					Math.round((baseScore * 0.175 + Math.random() * 1) * 100) / 100,
				musicAnalysis:
					Math.round((baseScore * 0.175 + Math.random() * 1) * 100) / 100,
				visualPerformance:
					Math.round((baseScore * 0.175 + Math.random() * 1) * 100) / 100,
				visualAnalysis:
					Math.round((baseScore * 0.175 + Math.random() * 1) * 100) / 100,
				generalEffectMusic:
					Math.round((baseScore * 0.15 + Math.random() * 1) * 100) / 100,
				generalEffectVisual:
					Math.round((baseScore * 0.15 + Math.random() * 1) * 100) / 100,
			},
			penalties:
				Math.random() > 0.8 ? Math.round(Math.random() * 2 * 100) / 100 : 0,
			timestamp: new Date().toISOString(),
		};
		mockPerformances.push(performance);
	});
});

// Sort performances by score (highest first)
mockPerformances.sort((a, b) => b.overallScore - a.overallScore);

// Update placements based on sorted order within each event
mockEvents.forEach((event) => {
	const eventPerformances = mockPerformances.filter(
		(p) => p.eventId === event.id,
	);
	eventPerformances.forEach((performance, index) => {
		performance.placement = index + 1;
	});
});
