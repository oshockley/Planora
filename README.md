# Planora: AI Itinerary Builder 🛫

**No more overplanning or Googling. Just vibes + AI execution.**

Planora is an AI-powered travel planner designed for people who hate rigid tours or endless planning. Answer a few questions, choose your vibe, and get an instant multi-day itinerary that auto-adjusts for real-world conditions.tomWay: AI Itinerary Builder 🛫

**No more overplanning or Googling — just vibes + AI execution**

CustomWay is an AI-powered travel planner designed for people who hate rigid tours or endless planning. Answer a few questions, choose your vibe, and get an instant multi-day itinerary that auto-adjusts for real-world conditions.

## ✨ Features

### 🤖 AI-Powered Planning
- Answer a few simple questions about your travel preferences
- Get an instant, personalized multi-day itinerary
- No more hours of research or decision paralysis

### 🔄 Auto-Adjustments
- Real-time adjustments for weather conditions
- Traffic-aware scheduling and timing
- Fatigue detection and rest break recommendations
- Alternative activity suggestions

### 📱 Works Offline
- Download complete itineraries with maps
- Offline budget tracking and currency tools
- Emergency information and contacts
- Language packs with common phrases
- No internet? No problem!

### ✨ Vibe-Based Customization
Choose your travel style or mix multiple vibes:
- **Chill & Scenic** - Peaceful moments and beautiful views
- **Bougie Foodie** - Fine dining and gourmet experiences  
- **Urban Explorer** - Street art and hidden local gems
- **Adventure Seeker** - Thrilling outdoor activities
- **Culture Vulture** - Museums, history, and art
- **Nightlife Lover** - Bars, clubs, and late-night fun
- **Wellness & Retreat** - Spas, yoga, and self-care
- **Family Fun** - Kid-friendly activities and bonding
- **Custom Vibe** - Describe your unique travel style

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/planora-travel-app.git
cd planora-travel-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Project Structure

```
src/
├── features/
│   └── customway/
│       ├── CustomWay.js          # Main app component (Planora)
│       ├── Questionnaire.js      # User preferences questionnaire
│       ├── VibeSelector.js       # Travel vibe selection
│       ├── ItineraryBuilder.js   # AI itinerary generation
│       ├── OfflineSupport.js     # Offline functionality
│       └── *.css                 # Component styles
├── App.js                        # Root component
├── index.js                      # Entry point
└── *.css                         # Global styles
```

## 🎯 How It Works

1. **Questionnaire** - Answer questions about destination, budget, duration, interests
2. **Vibe Selection** - Choose or describe your travel style
3. **AI Generation** - Get a personalized itinerary in seconds
4. **Auto-Adjustments** - Real-time updates for weather, traffic, fatigue
5. **Offline Setup** - Download everything for offline access

## 🌟 Key Components

### Questionnaire
- Multi-step form with progress tracking
- Destination, budget, duration, and preference collection
- Smart validation and user-friendly interface

### Vibe Selector
- Visual vibe cards with detailed descriptions
- Multi-select functionality for mixed travel styles
- Custom vibe creation with AI interpretation

### Itinerary Builder
- AI-powered activity generation based on preferences
- Real-time adjustments for external factors
- Alternative suggestions and flexibility options

### Offline Support
- Complete travel kit download functionality
- Maps, budget tools, emergency info, and translations
- Storage management and offline mode detection

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🌍 Offline Functionality

Planora works completely offline once you download your travel kit:

- **Interactive Maps** - Downloadable map tiles with itinerary pins
- **Complete Itinerary** - All activities, times, and directions
- **Budget Tools** - Expense tracking, tip calculator, exchange rates
- **Emergency Info** - Local emergency numbers, embassies, hospitals
- **Language Pack** - Common phrases and pronunciation guides

## 🎨 Design Philosophy

Planora is built for travelers who want:
- **Spontaneity over rigid planning**
- **Vibe-based experiences over generic tours**
- **AI assistance without losing authenticity**
- **Offline reliability for real-world travel**
- **Adaptability for changing conditions**

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Designed for the modern traveler who values flexibility
- Inspired by the need for smarter, not harder, travel planning

---

**Planora** - Because your perfect trip should match your vibe, not someone else's plan. ✈️✨
