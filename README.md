# TrackMyFitness
TrackMyFitness is a full-stack application built with React and NestJS for managing and analyzing fitness and workout data. Its goal is to go beyond data collection by visualizing information clearly, interpreting it, and helping users identify potential adjustments based on algorithms and machine learning.

## Roadmap & Features
### ✅ Implemented
- [x] User registration and session management
- [x] **Onboarding** (gender, age, height, goal, activity level) 
- [x] **Bodyweight tracking** 
- [x] **Calorie & macro estimation** based on bodyweight and fitness goal
### 🚀 Planned
- [ ] **Advanced UI** with animations
- [ ] **Rebranded dashboard** & mobile support
- [ ] **Workout management**
- [ ] **Visualize training progress** with graphs 
- [ ] **Workout data analysis** to assess user’s progress
- [ ] **Trend and pattern detection** in training data
- [ ] **Personalized insights & adjustments** based on machine learning

## Getting Started
### Requirements
Make sure the following tools are installed in your system:
- Node.js **v24.X.X**
- pnpm **v10.0.0**
- Git

You will also need a running **PostgreSQL server** and a valid [Resend](https://resend.com) API key for sending OTP emails. 

### 1. Clone the repository 
```bash
git clone https://github.com/vldeg/trackmyfitness.git
cd trackmyfitness
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Setup environment file
```bash
cd apps/api
cp .env.example .env
```

### 4. Setup database
```bash
pnpm prisma generate
```

### 5. Start the app
API:
```bash
pnpm run dev:api
```
Client:
```bash
pnpm run dev:client
```


