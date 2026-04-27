# GearForge MVP Outline

## App Concept
GearForge is a Duolingo-style educational app for learning automotive engineering, vehicle systems, and mechanical concepts at a technician/engineering level.

### Scope Constraints
This app is purely educational and structured like a learning platform.

Do **not** include:
- Diagnostics or symptom checker
- User vehicle input or garage system
- Repair recommendations tied to a user's car
- Mechanic locator

## Core Idea
Users progress through structured learning paths based on vehicle regions (American, Japanese, European, etc.). Each path contains units, each unit contains lessons, and each lesson contains quizzes. Users earn XP, maintain streaks, and unlock new content.

## Tech Stack
- Expo React Native
- TypeScript
- Expo Router (file-based routing)
- AsyncStorage for local persistence
- Zustand or Context API for state management

## Navigation
Bottom tabs:
- Learn
- Practice
- Encyclopedia
- Progress
- Profile

## Project Structure

```text
/app
  /(tabs)
    learn.tsx
    practice.tsx
    encyclopedia.tsx
    progress.tsx
    profile.tsx

  lesson/[lessonId].tsx
  quiz/[quizId].tsx

/components
  PathCard.tsx
  UnitCard.tsx
  LessonCard.tsx
  ProgressBar.tsx
  XPDisplay.tsx
  StreakCounter.tsx
  QuizOption.tsx
  Badge.tsx

/data
  regions.ts
  units.ts
  lessons.ts
  quizzes.ts
  encyclopedia.ts

/store
  useProgressStore.ts

/types
  Region.ts
  Unit.ts
  Lesson.ts
  Quiz.ts
  UserProgress.ts
```

## Core Features

### 1. Learning System
- Region-based learning paths
- Units inside each region
- Lessons inside each unit
- Quiz after each lesson
- Locked progression system

### 2. Gamification
- XP system
- Streak system
- Levels
- Technician ranks:
  - Garage Rookie
  - Apprentice
  - Junior Technician
  - Certified Technician
  - Master Technician
  - Automotive Engineer

### 3. Practice Mode
- Review weak lessons
- Retry incorrect questions
- Random quiz generation
- Region-specific practice

### 4. Encyclopedia (Educational Reference Only)
- Car parts
- Systems
- Tools
- Fluids
- Engine types
- Transmission types

### 5. Progress Tracking
- Total XP
- Current streak
- Lessons completed
- Accuracy percentage
- Region mastery percentage

## Learning Paths

### 1. American Vehicles
Teach:
- Design philosophy
- V6 and V8 engines
- Pushrod vs overhead cam
- Trucks and SUVs
- RWD and 4WD systems
- Suspension and brakes
- Electrical systems
- Transmissions

### 2. Japanese Vehicles
Teach:
- Reliability-focused design
- Inline-4 engines
- VTEC and VVT systems
- CVTs and automatics
- Hybrid systems
- Boxer engines
- Efficient packaging

### 3. European Vehicles
Teach:
- Performance engineering
- Turbocharged engines
- Direct injection
- DSG and DCT transmissions
- Advanced electronics
- CAN bus systems
- Luxury systems

### 4. Korean Vehicles
Teach:
- Modern compact engineering
- Turbo small engines
- GDI systems
- Electrical systems
- Hybrid and EV growth

### 5. Electric and Hybrid Vehicles
Teach:
- Electric motors
- Battery systems
- Regenerative braking
- Inverters
- Charging systems
- Thermal management

### 6. Diesel and Heavy Duty Vehicles
Teach:
- Diesel combustion
- Turbo diesel systems
- DEF systems
- Heavy-duty transmissions
- Fleet maintenance principles

## Content Structure
Each region contains:
- 5 to 8 units

Each unit contains:
- 5 to 10 lessons

Each lesson contains:
- Teaching content
- Key takeaway
- 3 to 5 quiz questions

## Lesson Format
- Title
- Short explanation
- Real-world context
- Key takeaway
- Quiz

### Example Lesson
Title: What is a Differential?

Content:
A differential allows wheels on the same axle to rotate at different speeds. This is necessary when turning because the outer wheel travels farther than the inner wheel.

Key takeaway:
Differentials allow smooth turning and prevent tire drag.

Quiz:
Question: What is the main function of a differential?
A. Charge the battery
B. Allow wheels to rotate at different speeds
C. Cool the engine
D. Control fuel injection

Correct answer: B

## Quiz System
Each question includes:
- Question
- 4 options
- Correct answer
- Explanation

## XP System
- Lesson completion gives XP
- Quiz performance affects XP
- Streaks give bonus XP

## Streak System
- Completing at least one lesson per day increases streak
- Missing a day resets streak

## Badges
- First Lesson Completed
- 10 Lessons Completed
- Engine Basics Completed
- 7 Day Streak
- 100 XP Earned

## Practice Mode Logic
- Track incorrect answers
- Resurface weak topics
- Generate random quizzes

## Encyclopedia Structure
Each entry includes:
- Name
- Category
- Description
- Function
- Key facts

## Progress Screen
- Show XP
- Show streak
- Show rank
- Show completion progress for each region
- Show quiz accuracy

## Profile Screen
- Username
- XP
- Rank
- Achievements

## UI Design
- Dark theme
- Neon accent colors (green or blue)
- Rounded cards
- Progress bars
- Smooth transitions
- Locked content visuals

## MVP Requirements
Build:
- Expo app setup
- Bottom tab navigation
- Learn screen with at least 3 regions (American, Japanese, European)
- Unit screen
- Lesson screen
- Quiz screen
- XP tracking stored locally
- Progress tracking
- Basic UI styling

Use static data from local files first.

Do not connect to backend in MVP.
