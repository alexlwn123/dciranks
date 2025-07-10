import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import { Performance, Corps, Event } from '../types';
import { format, eachDayOfInterval, parseISO } from 'date-fns';

interface BumpChartProps {
  performances: Performance[];
  corps: Corps[];
  events: Event[];
}

export const BumpChart: React.FC<BumpChartProps> = ({ performances, corps, events }) => {
  // Get date range from events
  const eventDates = events.map(event => parseISO(event.date)).sort((a, b) => a.getTime() - b.getTime());
  const startDate = eventDates[0];
  const endDate = eventDates[eventDates.length - 1];
  
  // Generate all dates in the range
  const allDates = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Create a map of event dates for quick lookup
  const eventDateMap = new Map(events.map(event => [event.date, event]));
  
  // Define a custom color palette for 19 corps with high contrast
  const customColors = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
    '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5',
    '#c49c94', '#f7b6d3', '#c7c7c7', '#dbdb8d'
  ];
  
  // Create data structure for bump chart
  const data = corps.slice(0, 19).map((corpsItem, corpsIndex) => {
    const series = {
      id: corpsItem.name,
      data: [] as Array<{ 
        x: string; 
        y: number; 
        hasCompetition: boolean; 
        score?: number; 
        eventName?: string;
        placement?: number;
      }>
    };

    let lastKnownPlacement = corpsIndex + 1; // Start with initial seeding
    let lastKnownScore = 0;

    allDates.forEach(date => {
      const dateString = format(date, 'yyyy-MM-dd');
      const formattedDate = format(date, 'M/d');
      const event = eventDateMap.get(dateString);
      
      let hasCompetition = false;
      let currentScore = lastKnownScore;
      let currentPlacement = lastKnownPlacement;
      let eventName = '';

      if (event && event.competingCorps.includes(corpsItem.id)) {
        // Corps competed on this date
        const performance = performances.find(p => 
          p.corpsId === corpsItem.id && p.eventId === event.id
        );
        
        if (performance) {
          hasCompetition = true;
          currentScore = performance.overallScore;
          currentPlacement = performance.placement;
          eventName = event.name;
          
          // Update last known values
          lastKnownScore = currentScore;
          lastKnownPlacement = currentPlacement;
        }
      }

      series.data.push({
        x: formattedDate,
        y: currentPlacement,
        hasCompetition,
        score: currentScore > 0 ? currentScore : undefined,
        eventName: eventName || undefined,
        placement: currentPlacement
      });
    });

    return series;
  });

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="h-full p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">DCI World Class 2024</h1>
          <p className="text-lg text-slate-600">Season Rankings Progression</p>
        </div>
        
        <div className="h-5/6">
          <ResponsiveBump
            data={data}
            colors={customColors}
            lineWidth={4}
            activeLineWidth={6}
            inactiveLineWidth={2}
            inactiveOpacity={0.3}
            pointSize={12}
            activePointSize={16}
            inactivePointSize={8}
            pointColor={(point) => {
              const hasCompetition = (point.data as any).hasCompetition;
              return hasCompetition ? { theme: 'background' } : '#cbd5e1';
            }}
            pointBorderWidth={3}
            activePointBorderWidth={4}
            pointBorderColor={(point) => {
              const hasCompetition = (point.data as any).hasCompetition;
              return hasCompetition ? { from: 'serie.color' } : '#94a3b8';
            }}
            axisTop={null}
            axisBottom={{
              tickSize: 8,
              tickPadding: 12,
              tickRotation: -45,
              legend: 'Competition Date',
              legendPosition: 'middle',
              legendOffset: 60,
              format: (value) => value
            }}
            axisLeft={{
              tickSize: 8,
              tickPadding: 12,
              tickRotation: 0,
              legend: 'Rank',
              legendPosition: 'middle',
              legendOffset: -50,
              tickValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
            }}
            axisRight={{
              tickSize: 8,
              tickPadding: 12,
              tickRotation: 0,
              tickValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
            }}
            margin={{ top: 40, right: 200, bottom: 80, left: 80 }}
            yScale={{
              type: 'linear',
              min: 1,
              max: 19,
              reverse: true
            }}
            startLabel={(serie) => (
              <text
                x={-10}
                y={0}
                textAnchor="end"
                dominantBaseline="central"
                style={{
                  fill: customColors[data.findIndex(d => d.id === serie.id)],
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                {serie.id}
              </text>
            )}
            endLabel={(serie) => (
              <text
                x={10}
                y={0}
                textAnchor="start"
                dominantBaseline="central"
                style={{
                  fill: customColors[data.findIndex(d => d.id === serie.id)],
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                {serie.id}
              </text>
            )}
            tooltip={({ point }) => {
              const data = point.data as any;
              const corps = point.serie.id;
              const date = data.x;
              const placement = data.y;
              const hasCompetition = data.hasCompetition;
              const score = data.score;
              const eventName = data.eventName;

              return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl max-w-xs">
                  <div className="font-bold text-gray-900 text-lg mb-2">{corps}</div>
                  <div className="text-sm text-gray-600 mb-2">{date}</div>
                  {hasCompetition ? (
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-gray-800">
                        Rank #{placement}
                      </div>
                      {score && (
                        <div className="text-lg font-semibold text-blue-600">
                          Score: {score}
                        </div>
                      )}
                      {eventName && (
                        <div className="text-sm text-gray-500 mt-2 font-medium">
                          {eventName}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">
                        No competition
                      </div>
                      <div className="text-base font-medium text-gray-700">
                        Last rank: #{placement}
                      </div>
                      {score && score > 0 && (
                        <div className="text-sm text-gray-600">
                          Last score: {score}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }}
            theme={{
              background: 'transparent',
              text: {
                fontSize: 12,
                fill: '#374151',
                fontWeight: 500
              },
              axis: {
                domain: {
                  line: {
                    stroke: '#6b7280',
                    strokeWidth: 2
                  }
                },
                legend: {
                  text: {
                    fontSize: 14,
                    fill: '#374151',
                    fontWeight: 600
                  }
                },
                ticks: {
                  line: {
                    stroke: '#6b7280',
                    strokeWidth: 1
                  },
                  text: {
                    fontSize: 11,
                    fill: '#4b5563',
                    fontWeight: 500
                  }
                }
              },
              grid: {
                line: {
                  stroke: '#e5e7eb',
                  strokeWidth: 1,
                  strokeDasharray: '2 2'
                }
              }
            }}
          />
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Competition Day</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
              <span>No Competition</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};