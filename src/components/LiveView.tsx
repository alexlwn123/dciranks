import React, { useEffect, useState } from 'react';
import { ScoreCard } from './ScoreCard';
import { useScoreData } from '../hooks/useScoreData';
import { Radio, Clock, RefreshCw } from 'lucide-react';

export const LiveView: React.FC = () => {
  const { liveEvents, loading, getCorpsById, getPerformancesByEvent } = useScoreData();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (liveEvents.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Live Events</h1>
        <div className="text-center py-12">
          <Radio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No live events at this time.</p>
          <p className="text-gray-400 text-sm mt-2">Check back during competition season for live scores!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-gray-900">Live Events</h1>
          <div className="flex items-center space-x-2 text-red-600">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
            <span className="text-sm font-medium">LIVE</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Last update: {lastUpdate.toLocaleTimeString()}</span>
          </div>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              autoRefresh 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            <span>Auto Refresh</span>
          </button>
        </div>
      </div>

      {liveEvents.map((event) => {
        const eventPerformances = getPerformancesByEvent(event.id);
        
        return (
          <div key={event.id} className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{event.name}</h2>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span>{event.location}</span>
                  <span>•</span>
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="text-center py-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-red-600">
                  <Radio className="w-5 h-5" />
                  <span className="font-medium">Live scoring in progress</span>
                </div>
                <p className="text-sm text-red-500 mt-1">Scores update automatically every 30 seconds</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventPerformances.map((performance) => {
                const performanceCorps = getCorpsById(performance.corpsId);
                
                if (!performanceCorps) return null;

                return (
                  <ScoreCard
                    key={performance.id}
                    performance={performance}
                    corps={performanceCorps}
                    event={event}
                    showEvent={false}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};