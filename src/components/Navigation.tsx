import React from "react";
import { Home, Trophy, Calendar, TrendingUp, Radio } from "lucide-react";

interface NavigationProps {
	activeView: string;
	onViewChange: (view: string) => void;
	liveEventCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
	activeView,
	onViewChange,
	liveEventCount,
}) => {
	const navItems = [
		{ id: "dashboard", label: "Dashboard", icon: Home },
		{ id: "scores", label: "Scores", icon: Trophy },
		{ id: "events", label: "Events", icon: Calendar },
		{ id: "trends", label: "Trends", icon: TrendingUp },
		{ id: "live", label: "Live", icon: Radio, badge: liveEventCount },
	];

	return (
		<nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<h1 className="text-2xl font-bold text-blue-600">DCI Scores</h1>
						</div>
					</div>

					<div className="flex space-x-8">
						{navItems.map((item) => {
							const Icon = item.icon;
							return (
								<button
									key={item.id}
									onClick={() => onViewChange(item.id)}
									className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
										activeView === item.id
											? "bg-blue-100 text-blue-700"
											: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
									}`}
								>
									<Icon className="w-4 h-4 mr-2" />
									{item.label}
									{item.badge && item.badge > 0 && (
										<span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
											{item.badge}
										</span>
									)}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</nav>
	);
};
