import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { EventsView } from "./components/EventsView";
import { LiveView } from "./components/LiveView";
import { Navigation } from "./components/Navigation";
import { ScoresView } from "./components/ScoresView";
import { TrendsView } from "./components/TrendsView";
import { useScoreData } from "./hooks/useScoreData";

function App() {
	const [activeView, setActiveView] = useState("dashboard");
	const { liveEvents } = useScoreData();

	const renderView = () => {
		switch (activeView) {
			case "dashboard":
				return <Dashboard />;
			case "scores":
				return <ScoresView />;
			case "events":
				return <EventsView />;
			case "trends":
				return <TrendsView />;
			case "live":
				return <LiveView />;
			default:
				return <Dashboard />;
		}
	};

	return (
		<div className="h-screen bg-gray-50 overflow-hidden">
			<Navigation
				activeView={activeView}
				onViewChange={setActiveView}
				liveEventCount={liveEvents.length}
			/>
			<main
				className={
					activeView === "dashboard"
						? "h-full"
						: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
				}
			>
				{renderView()}
			</main>
		</div>
	);
}

export default App;
