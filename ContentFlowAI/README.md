# ContentFlow AI 🚀

An AI-powered content lifecycle assistant built for students, early professionals, and first-generation creators from Tier-2 and Tier-3 regions of India. ContentFlow AI helps you generate platform-optimized content for LinkedIn, Instagram, and YouTube with just a topic input.

![ContentFlow AI](https://img.shields.io/badge/AI-Powered-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

## 🌟 Features

### Core Features
- **🎯 Multi-Platform Content Generation**: Create optimized content for LinkedIn, Instagram, and YouTube simultaneously
- **🧠 AI-Powered Strategy**: Uses Google's Gemini AI (gemini-1.5-flash) for intelligent content creation
- **📊 Performance Simulation**: AI estimates reach scores, engagement probability, and viral potential
- **💡 Smart Idea Generation**: Generates 3 unique content ideas and selects the best one strategically
- **✨ Quality Scoring**: Comprehensive quality analysis across clarity, engagement, platform optimization, and originality
- **🔄 Fallback Demo Mode**: Graceful degradation when API quota is exceeded - never crashes!

### Advanced Features
- **🎨 Content Breakdown**: 
  - 30-second reel scripts
  - Twitter/X thread (5 tweets)
  - Instagram carousel slides (5 slides)
- **🇮🇳 Bharat Growth Mode**: 
  - Low-budget growth tips
  - Tier-2/Tier-3 creator strategies
  - 5-day content calendar
  - Cross-platform content repurposing roadmap
- **⚡ Engagement Optimization**: Hook improvements, CTA enhancements, hashtag strategies
- **🎭 Persona-Based Content**: Tailored for students, early professionals, and creators
- **🌐 Multi-Language Support**: English and Hinglish content modes
- **🎨 Brand Tone Options**: Professional, casual, motivational, storytelling, and authoritative tones

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite 7.3.1** - Lightning-fast build tool
- **Tailwind CSS 4.2.1** - Utility-first CSS framework
- **Framer Motion 12.34.3** - Smooth animations
- **Lucide React 0.575.0** - Beautiful icons
- **Axios 1.13.5** - HTTP client
- **Recharts 3.7.0** - Data visualization

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **Google Generative AI 0.24.0** - Gemini API integration
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.4.5** - Environment configuration

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- Google Gemini API key

### Clone the Repository
```bash
git clone https://github.com/Puneeth6699/AI4BHARAT.git
cd AI4BHARAT/ContentFlowAI
```

### Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

**Get your Gemini API key:**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy and paste it into your `.env` file

### Frontend Setup
```bash
cd ../client
npm install
```

## 🚀 Running the Project

### Development Mode

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```
Server will run on: `http://localhost:5000`

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
```
Client will run on: `http://localhost:5173`

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
```

**Preview Production Build:**
```bash
npm run preview
```

## 📁 Project Structure

```
ContentFlowAI/
├── client/                      # Frontend React application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/             # Images and media
│   │   ├── components/         # React components
│   │   │   ├── ContentWorkspace.tsx    # Main content display
│   │   │   ├── IdeaSelectionStep.tsx   # Idea selection UI
│   │   │   ├── InputStep.tsx           # Initial input form
│   │   │   └── QualityScorePanel.tsx   # Quality metrics
│   │   ├── pages/              # Page components
│   │   │   ├── GeneratorPage.tsx       # Main generator page
│   │   │   └── LandingPage.tsx         # Landing page
│   │   ├── services/           # API services
│   │   │   └── api.ts          # API client
│   │   ├── App.tsx             # Root component
│   │   ├── main.tsx            # Entry point
│   │   └── types.ts            # TypeScript definitions
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                      # Backend Express server
│   ├── routes/
│   │   └── generate.js         # Content generation API
│   ├── server.js               # Express app setup
│   ├── list-models.js          # Helper to list AI models
│   ├── test-api.js             # API testing utility
│   ├── package.json
│   └── .env                    # Environment variables
│
└── README.md                   # This file
```

## 🔌 API Endpoints

### POST `/api/generate`

Generate AI-powered content for multiple platforms.

**Request Body:**
```json
{
  "topic": "How to grow on LinkedIn as a student",
  "audience_type": "students",
  "selected_platforms": ["linkedin", "instagram", "youtube"],
  "language_mode": "English",
  "brand_tone": "professional",
  "refinement_request": ""
}
```

**Response Structure:**
```json
{
  "ideas": [...],
  "selected_idea_outline": {...},
  "platform_content": [...],
  "performance_simulation": [...],
  "engagement_optimization": {...},
  "quality_score": {...},
  "refinement": {...},
  "content_breakdown": {...},
  "bharat_growth_mode": {...}
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "ContentFlow AI server is running"
}
```

## 💡 Usage Guide

### Step 1: Enter Topic
Start by entering your content topic (e.g., "How to build a personal brand on LinkedIn")

### Step 2: Select Audience
Choose your target audience:
- Students
- Early Professionals
- First-generation Creators

### Step 3: Choose Platforms
Select one or more platforms:
- LinkedIn (Professional networking)
- Instagram (Visual storytelling)
- YouTube (Long-form video content)

### Step 4: Configure Options
- **Language Mode**: English or Hinglish
- **Brand Tone**: Professional, Casual, Motivational, Storytelling, or Authoritative

### Step 5: Generate Content
Click "Generate Content" and the AI will:
1. Generate 3 strategic content ideas
2. Select the best idea
3. Create platform-optimized content
4. Simulate performance metrics
5. Provide engagement optimization tips
6. Generate content breakdowns (reels, threads, carousels)
7. Offer Bharat-specific growth strategies

### Step 6: Review & Copy
- Switch between platform tabs to view content
- Use copy buttons to grab content instantly
- Review quality scores and optimization suggestions
- Export content for your chosen platforms

## 🛡️ Error Handling & Fallback Mode

ContentFlow AI includes robust error handling:

### Automatic Model Fallback
The system tries multiple Gemini models in order:
1. `gemini-1.5-flash` (primary)
2. `gemini-2.5-flash` (fallback 1)
3. `gemini-2.0-flash` (fallback 2)

### Demo Mode
When API quota is exceeded or network errors occur, the system automatically switches to **Demo Mode**:
- Returns pre-configured sample content
- Ensures the application never crashes
- Provides realistic example output
- Users can still explore features and UI

### Rate Limiting
- Automatic retry on rate limits
- Smart delay calculation
- Transparent error messages

## 🎨 Customization

### Modify Demo Content
Edit the fallback content in `server/routes/generate.js`:
```javascript
// Modify the demo data returned when API fails
return {
  ideas: [...],
  platform_content: [...],
  // ... customize as needed
}
```

### Add New Platforms
1. Update `server/routes/generate.js` prompt
2. Add platform metadata in `client/src/components/ContentWorkspace.tsx`
3. Update TypeScript types in `client/src/types.ts`

### Change AI Models
Update `MODEL_FALLBACKS` array in `server/routes/generate.js`:
```javascript
const MODEL_FALLBACKS = [
  'gemini-1.5-flash',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
];
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
killall node
```

### API Key Issues
- Ensure `GEMINI_API_KEY` is set correctly in `.env`
- Check if API key has billing enabled
- Verify quota limits at [Google AI Studio](https://aistudio.google.com)

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Ensure backend is running on port 5000
- Check CORS configuration in `server/server.js`

## 🔐 Environment Variables

### Backend (.env)
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
SUPABASE_PROJECT_ID=optional
SUPABASE_URL=optional
SUPABASE_ANON_KEY=optional
```

## 📊 Performance Metrics

The AI provides estimated metrics:
- **Reach Score**: Predicted audience reach (1-100)
- **Engagement Probability**: Low/Medium/High
- **Viral Potential**: Low/Medium/High
- **CTA Effectiveness**: Call-to-action impact (1-100)
- **Best Posting Time**: Optimal time for India (IST)

## 🌐 API Rate Limits

**Gemini Free Tier:**
- 15 requests per minute
- 1,500 requests per day
- Automatic fallback to demo mode when exceeded

**Paid Tier:** Higher limits with billing enabled

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Puneeth** - Initial work - [Puneeth6699](https://github.com/Puneeth6699)

## 🙏 Acknowledgments

- Google Gemini AI for powerful content generation
- AI4BHARAT initiative for supporting Indian creators
- Open source community for amazing tools and libraries

## 📧 Contact & Support

- GitHub: [@Puneeth6699](https://github.com/Puneeth6699)
- Repository: [AI4BHARAT](https://github.com/Puneeth6699/AI4BHARAT)
- Issues: [Report a bug](https://github.com/Puneeth6699/AI4BHARAT/issues)

## 🚀 Future Roadmap

- [ ] Add more platforms (Twitter/X, Facebook, TikTok)
- [ ] Content scheduling and calendar
- [ ] Analytics dashboard
- [ ] User authentication and saved content
- [ ] Team collaboration features
- [ ] Multi-language support (Hindi, Tamil, Telugu)
- [ ] Image generation for posts
- [ ] Video script generation
- [ ] SEO optimization suggestions

---

**Made with ❤️ for Indian Creators | Powered by Antigravity Intelligence**
