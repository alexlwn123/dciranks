# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a DCI (Drum Corps International) scores tracking application built with React, TypeScript, and Vite. It displays competitive scores, trends, and live events for drum corps performances.

## Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint

# Preview production build
pnpm preview
```

## Architecture

### Core Structure

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **Data Visualization**: Nivo charts (@nivo/line, @nivo/bump)
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Key Components

- `App.tsx`: Main application with view routing
- `Navigation.tsx`: Top navigation with view switching
- `Dashboard.tsx`: Main dashboard view
- `ScoresView.tsx`: Detailed score listings
- `EventsView.tsx`: Event information and results
- `TrendsView.tsx`: Score trends and analytics
- `LiveView.tsx`: Live event tracking

### Data Layer

- `useScoreData.ts`: Custom hook for data management
- `mockData.ts`: Mock data for corps, events, and performances
- `types/index.ts`: TypeScript interfaces for all data structures

### Data Models

- **Corps**: Drum corps organizations with metadata
- **Event**: Competitions with location and type information
- **Performance**: Individual corps scores at events
- **CaptionScore**: Broken down by Music, Visual, General Effect
- **SubCaptionScore**: Detailed subcaption breakdowns

## Key Features

### Multi-View Interface

The app uses a single-page routing system with 5 main views:

- Dashboard: Overview with charts and recent scores
- Scores: Detailed performance listings with filters
- Events: Competition schedule and results
- Trends: Historical performance analysis
- Live: Real-time event tracking

### Data Visualization

- Line charts for score trends over time
- Bump charts for ranking changes
- Score cards with detailed breakdowns
- Live event indicators

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive navigation and layouts
- Touch-friendly interface elements

## Development Notes

### Mock Data System

The application uses a comprehensive mock data system that simulates:

- 19 drum corps with realistic information
- 11 competitive events across the season
- Generated performance data with realistic score distributions
- Live event simulation

### State Management

- Uses React hooks for local state
- Custom `useScoreData` hook centralizes data logic
- No external state management library needed

### Component Patterns

- Functional components with hooks
- Props-based component communication
- Conditional rendering for different views
- Loading states and error handling

## File Structure Notes

- Components are organized by feature in `/src/components/`
- Types are centralized in `/src/types/index.ts`
- Data hooks are in `/src/hooks/`
- Mock data is in `/src/data/`
- Tailwind config includes custom styling extensions
