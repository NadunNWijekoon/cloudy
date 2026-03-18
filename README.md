# ☁️ Cloudy | Intelligent AI Weather Assistant

Cloudy is a next-generation weather application that transforms raw data into actionable lifestyle intelligence. Built with **Next.js 15**, **Tailwind CSS**, and **Firebase Genkit**, it uses advanced AI to help you plan your day, protect your home, and enjoy the outdoors.

## ✨ Key AI-Powered Features

- **🧠 Smart Insights**: A daily briefing that interprets the forecast into human-friendly advice (e.g., "The UV index is high, don't forget your sunscreen").
- **🧥 Clothing Advisor**: Personalized outfit suggestions based on temperature, wind, humidity, and specific weather conditions.
- **🌱 Garden Care**: Expert horticultural tips on watering needs and plant protection based on upcoming trends.
- **📸 Lens & Light**: Photography advice for capturing the best shots given current lighting and weather conditions.
- **🍳 Mood Food**: Comfort food recipe suggestions that match the vibe of the weather.
- **🏃 Routine Optimizer**: Find the best windows for outdoor activities like running or walking the dog.
- **✈️ Travel Assistant**: Plan adventures with AI-driven weather analysis for any destination.
- **🛡️ Safety Guide**: Immediate, actionable safety plans generated when severe weather alerts are active.
- **🎙️ Voice Assistant**: Natural language weather queries through a simple floating interface.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Integration**: [Genkit](https://github.com/firebase/genkit) (v1.x)
- **Model Provider**: OpenAI (via `genkitx-openai`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### 1. Environment Configuration
Create a `.env` file in the root directory and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Install Dependencies
The project uses `npm`. Simply run:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:9002](http://localhost:9002) in your browser.

## 📁 Project Structure

- `src/ai/`: Central Genkit configuration (`genkit.ts`) and individual AI flows for various features.
- `src/components/weather/`: Modular React components for each weather widget and AI assistant.
- `src/app/lib/`: Weather service mock and data management utilities.
- `src/hooks/`: Custom React hooks for mobile detection and UI state.

## 📄 License
MIT
