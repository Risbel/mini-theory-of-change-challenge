# 🎯 Mini Theory of Change

A modern, interactive web application for creating and managing Theory of Change frameworks. Built with React and Vite, this tool helps organizations and individuals map out their impact pathways through a clean, drag-and-drop interface.

## ✨ Features

### 🎨 **Interactive Drag & Drop Interface**

- Vertical drag and drop outcomes in columns
- Real-time visual feedback with drop indicators
- Intuitive card-based layout for easy organization

### 📊 **Comprehensive Theory of Change Components**

- **Reason for Existence**: Define the core purpose of your initiative
- **Target People/Groups**: Tag and categorize your beneficiaries
- **Assumptions**: Document key assumptions with certainty levels (Very, Moderate, Uncertain)
- **Direct Outcomes**: Primary results with detailed sub-outcomes
- **Indirect Outcomes**: Secondary effects of your work
- **Ultimate Impact**: Long-term transformation goals

### 🔧 **Advanced Functionality**

- **Real-time Validation**: Form validation with Zod schema validation
- **Auto-save & Reset**: Save data to localStorage and reset form after submission
- **Editable Components**: In-line editing for all text fields and outcomes
- **Sub-outcome Management**: Add, edit, and delete sub-outcomes for detailed planning
- **Toast Notifications**: User-friendly feedback with Sonner toast system

### 🎭 **Modern UI/UX**

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessible Components**: Built with Radix UI for accessibility compliance
- **Modern Styling**: Tailwind CSS with custom components and animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Risbel/mini-theory-of-change-challenge.git
   cd mini-theory-of-change-challenge
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── SaveButton/      # Save functionality with validation
│   ├── TableCard/       # Assumptions table component
│   ├── TagInputCard/    # People/groups tagging system
│   ├── TextareaCard/    # Reason for existence input
│   ├── ToCBoardCard/    # Main drag-and-drop board
│   │   ├── AddItemInput.jsx
│   │   ├── AddSubOutcomeInput.jsx
│   │   ├── Column.jsx
│   │   ├── ColumnCardWrapper.jsx
│   │   ├── DraggableItem.jsx
│   │   ├── DropIndicator.jsx
│   │   ├── SubOutcomeItem.jsx
│   │   └── ToCBoardCard.jsx
│   └── ui/              # Base UI components (Radix UI + Tailwind)
├── contexts/            # React Context for state management
│   ├── theoryOfChangeContext.js
│   └── TheoryOfChangeProvider.jsx
├── hooks/               # Custom React hooks
│   └── useTheoryOfChangeContext.js
├── schemas/             # Zod validation schemas
│   └── theoryOfChangeSchema.js
├── constants/           # Application constants
│   └── actionTypes.js
├── lib/                 # Utility functions
│   └── utils.js
├── pages/               # Page components
│   └── MiniTheoryOfChange.jsx
└── assets/              # Static assets
```

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript features

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management

### State Management & Validation

- **React Context + useReducer** - Global state management
- **Zod** - TypeScript-first schema validation
- **localStorage** - Client-side data persistence

### Developer Experience

- **ESLint** - Code linting and formatting
- **Sonner** - Toast notifications
- **class-variance-authority** - Component variant management

### Key Features in Action

- **Real-time Validation**: The save button shows validation status
- **Auto-reset**: Form clears after successful save for new entries
- **Persistent Storage**: Your data is saved locally in the browser
- **Responsive Design**: Works on all device sizes

## 🚀 Deployment

### GitHub Pages (Current Setup)

```bash
npm run build
npm run deploy
```

### Other Deployment Options

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- UI components powered by Radix UI
- Styled with Tailwind CSS
- Icons by Lucide React

---

**Live Demo**: [View the application](https://Risbel.github.io/mini-theory-of-change-challenge/)

**Repository**: [GitHub](https://github.com/Risbel/mini-theory-of-change-challenge)

---

_This tool helps organizations and individuals create clear, logical pathways to impact through structured Theory of Change planning._
