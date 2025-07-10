import { Calendar, Filter, MapPin, Search, Users } from "lucide-react";
import type React from "react";
import type { Corps, Event, ScoreFilter } from "../types";

interface FilterBarProps {
	corps: Corps[];
	events: Event[];
	filter: ScoreFilter;
	onFilterChange: (filter: ScoreFilter) => void;
	searchTerm: string;
	onSearchChange: (term: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
	corps,
	events,
	filter,
	onFilterChange,
	searchTerm,
	onSearchChange,
}) => {
	const divisions = ["World Class", "Open Class", "All Age"];

	return (
		<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
			<div className="flex items-center mb-4">
				<Filter className="w-5 h-5 text-gray-600 mr-2" />
				<h3 className="text-lg font-semibold text-gray-900">Filter Results</h3>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
				{/* Search */}
				<div className="relative">
					<Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
					<input
						type="text"
						placeholder="Search corps..."
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				{/* Corps Filter */}
				<div className="relative">
					<Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
					<select
						value={filter.corps || ""}
						onChange={(e) =>
							onFilterChange({ ...filter, corps: e.target.value || undefined })
						}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
					>
						<option value="">All Corps</option>
						{corps.map((c) => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
				</div>

				{/* Event Filter */}
				<div className="relative">
					<Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
					<select
						value={filter.event || ""}
						onChange={(e) =>
							onFilterChange({ ...filter, event: e.target.value || undefined })
						}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
					>
						<option value="">All Events</option>
						{events.map((e) => (
							<option key={e.id} value={e.id}>
								{e.name}
							</option>
						))}
					</select>
				</div>

				{/* Division Filter */}
				<div className="relative">
					<MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
					<select
						value={filter.division || ""}
						onChange={(e) =>
							onFilterChange({
								...filter,
								division: e.target.value || undefined,
							})
						}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
					>
						<option value="">All Divisions</option>
						{divisions.map((d) => (
							<option key={d} value={d}>
								{d}
							</option>
						))}
					</select>
				</div>

				{/* Date Range */}
				<div className="space-y-2">
					<input
						type="date"
						value={filter.dateRange?.start || ""}
						onChange={(e) =>
							onFilterChange({
								...filter,
								dateRange: {
									start: e.target.value,
									end: filter.dateRange?.end || "",
								},
							})
						}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
					/>
					<input
						type="date"
						value={filter.dateRange?.end || ""}
						onChange={(e) =>
							onFilterChange({
								...filter,
								dateRange: {
									start: filter.dateRange?.start || "",
									end: e.target.value,
								},
							})
						}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
					/>
				</div>
			</div>
		</div>
	);
};
