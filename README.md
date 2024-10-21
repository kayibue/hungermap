# HungerMap

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Feature Details](#feature-details)
- [Installation](#installation)
- [Deployment](#deployment)
- [Usage](#usage)

## Overview

HungerMap is an interactive web application designed to visualize food security data across Africa. The application utilizes Mapbox for dynamic mapping and presents various data layers, including the Integrated Food Security Phase Classification (IPC), food consumption score (FCS), climate data, and hazards information. Users can easily select countries to view detailed information and insights on food security.

## Features

- Interactive map visualizing food security data across Africa.
- Toggle between various data layers (IPC, climate, and hazards).
- Basic country information displayed on hover; detailed data shown on click.
- Dropdown menu for quick country selection.
- Responsive design with a minimalist and intuitive interface.

## Technologies Used

- **Frontend**: React.js
- **Build Tool**: Vite
- **State Management**: React Context API
- **Mapping**: Mapbox
- **Styling**: Tailwind CSS
- **Deployment**: AWS Amplify

## Project Structure

The project follows a feature-based structure for improved organization and maintainability:

```bash
src/
├───assets                      # Static assets (e.g., GeoJSON files)
│   ├───icons
│   ├───map
│   └───markers
├───features                    # Feature-specific components
│   ├───climate
│   ├───country
│   ├───fcs
│   ├───hazard
│   ├───ipc
│   └───map
├───libs
│   ├───components
├── pages/                      # Main pages of the application
│   └── HomePage.jsx            # Homepage layout and logic
└───routes
└── App.jsx                     # Root component that integrates everything
```

## Feature Details

### Map Component

The `MapComponent` displays the interactive map using Mapbox. It loads the GeoJSON file (`africa_shape.json`) for rendering the African continent. Data layers can be toggled through the `ToggleMenu`, and the map updates dynamically based on the selected layer.

### Context Management

- **MapContext**: Manages state related to map interactions, including zoom levels and selected countries.
- **CountryContext**: Stores and provides country-specific information fetched from APIs when a user selects a country.
- **ClimateContext, IPCContext, FCSContext, HazardContext**: Each context manages data related to their respective features and facilitates easy access throughout the application.

### Components

- **InfoPanel**: Displays quick information about the selected country. Updates dynamically based on user interactions.
- **Legend**: Provides context for the data being displayed on the map, helping users interpret the visualizations.
- **ToggleMenu**: Allows users to switch between different data layers (IPC, climate (rain, vegetation), hazards) to visualize various aspects of food security.
- **Dropdown**: Enables quick selection of countries for fast navigation and data retrieval.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/kayibue/hungermap.git
cd hungermap
```

2. Install dependencies:

```bash
npm install
```

1. Set an environment variable `VITE_MAPBOX_ACCESS_TOKEN` which holds the MAPBOX access token

```bash
VITE_MAPBOX_ACCESS_TOKEN = pk.xxxxxxxxx
```

1. Start the development server:

```bash
npm run dev
```

## Deployment

The project is deployed on AWS Amplify. You can access the live app [here](https://main.d2zx4v2ufrgwcl.amplifyapp.com/). For continuous deployment, connect your Git repository with AWS Amplify and configure the build settings as follows:

1. **Build command**: `npm run build`
2. **Output directory**: `dist`
3. **Set an environment variable `VITE_MAPBOX_ACCESS_TOKEN` which holds the MAPBOX access token**

## Usage

Once the application is running, you can:

- Use the dropdown menu at the top to select a country and view its food security data.
- Toggle between different data layers using the buttons on the right.
- Hover over countries to see basic info or click to zoom in for detailed insights.
- Refer to the legend at the bottom for data interpretation.
