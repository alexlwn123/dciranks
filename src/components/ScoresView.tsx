import React, { useState } from 'react';
import { ScoreCard } from './ScoreCard';
import { FilterBar } from './FilterBar';
import { useScoreData } from '../hooks/useScoreData';
import { ScoreFilter } from '../types';

export const ScoresView: React.FC = () => {
  const { corps, events, performances, loading, getCorpsById, getEventById, filterPerformances } = useScoreData();
  const [filter, setFilter] = useState<ScoreFilter>({});
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredPerformances = filterPerformances(filter);
  const searchFilteredPerformances = filteredPerformances.filter(performance => {
    const performanceCorps = getCorpsById(performance.corpsId);
    return performanceCorps && performanceCorps.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Competition Scores</h1>
        <div className="text-sm text-gray-600">
          Showing {searchFilteredPerformances.length} of {performances.length} performances
        </div>
      </div>

      <FilterBar
        corps={corps}
        events={events}
        filter={filter}
        onFilterChange={setFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchFilteredPerformances.map((performance) => {
          const performanceCorps = getCorpsById(performance.corpsId);
          const performanceEvent = getEventById(performance.eventId);
          
          if (!performanceCorps || !performanceEvent) return null;

          return (
            <ScoreCard
              key={performance.id}
              performance={performance}
              corps={performanceCorps}
              event={performanceEvent}
            />
          );
        })}
      </div>

      {searchFilteredPerformances.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No performances found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};