import React from 'react';
import { Event } from '../types';
import { Calendar, MapPin, Users, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Championship':
        return 'bg-yellow-100 text-yellow-800';
      case 'Premier':
        return 'bg-blue-100 text-blue-800';
      case 'Regional':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300 hover:border-blue-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getEventTypeColor(event.type)}`}>
          {event.type}
        </div>
        {event.isLive && (
          <div className="flex items-center space-x-2 text-red-600">
            <Radio className="w-4 h-4" />
            <span className="text-sm font-medium">LIVE</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">{event.name}</h3>

      <div className="space-y-2 text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">{event.competingCorps.length} corps competing</span>
        </div>
      </div>
    </motion.div>
  );
};