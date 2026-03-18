# Cloudy | Intelligent Weather Assistant

Cloudy is a modern, AI-powered weather application designed to provide actionable insights, lifestyle recommendations, and creative advice based on current and future weather conditions.

## 🌟 Features

- **Hyper-Local Forecasts**: Real-time conditions and 7-day outlooks for global cities.
- **AI Insights**: A smart assistant that explains exactly what the weather means for your day.
- **Lifestyle Advisors**:
  - **Clothing Advisor**: Suggests optimal layers and accessories.
  - **Garden Guru**: Tips for watering and protecting your plants.
  - **Lens & Light**: Expert photography advice for outdoor shooters.
  - **Comfort Food**: Weather-matched recipe suggestions.
- **Planning Tools**:
  - **Outdoor Vibe Score**: A playful rating of current conditions.
  - **Routine Optimizer**: Finds the best window for runs, coffee, or dog walks.
  - **Travel Assistant**: Helps plan activities and trips based on forecast trends.
- **Voice Assistant**: Natural language weather queries via a floating interface.
- **Safety First**: Immediate, AI-generated safety plans for severe weather alerts.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI Engine**: [Genkit](https://github.com/firebase/genkit)
- **Model Provider**: OpenAI (via `genkitx-openai`)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React

## 🚀 Getting Started

### 1. Environment Setup
Create a `.env` file in the root directory and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Development
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:9002`.

## 🏗 Architecture

The application leverages **Genkit Flows** to encapsulate AI logic. Each AI feature (Gardening, Photography, Recipes, etc.) is implemented as a separate flow in `src/ai/flows/`.

- `src/ai/genkit.ts`: Central Genkit configuration.
- `src/ai/flows/`: Individual AI agents and logic.
- `src/components/weather/`: React components providing the user interface for AI features.
- `src/app/lib/weather-service.ts`: Data provider for current and forecasted weather.

## 📄 License
MIT
