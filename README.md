# CodeAlpha Internship - Task 2: React Calculator

A modern, component-driven Calculator web application built with **React 19**, **Vite**, and **CSS3**, featuring the requested **Pinterest aesthetic wallpaper background** and an interactive glassmorphic interface.

![Status](https://img.shields.io/badge/Status-Completed-success)
![Framework](https://img.shields.io/badge/Framework-React%2019-61dafb?logo=react)
![Bundler](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite)

---

## 🏗️ Fresh React Project Architecture

```plaintext
Task_2/
├── public/
│   ├── background.jpg             # Pinterest pin aesthetic wallpaper
│   └── favicon.svg                # Calculator app icon
├── src/
│   ├── components/                # Modular React UI components
│   │   ├── Header/
│   │   │   ├── Header.jsx         # App branding & control toolbar
│   │   │   └── Header.css
│   │   ├── Display/
│   │   │   ├── Display.jsx        # Expression, live preview & auto-scaling text
│   │   │   └── Display.css
│   │   ├── Keypad/
│   │   │   ├── Keypad.jsx         # Interactive buttons & keyboard hints
│   │   │   └── Keypad.css
│   │   └── HistoryDrawer/
│   │       ├── HistoryDrawer.jsx  # Slide-over past calculation records
│   │       └── HistoryDrawer.css
│   ├── hooks/
│   │   ├── useCalculator.js       # Complete arithmetic state & operation logic
│   │   └── useKeyboard.js         # Global keyboard bindings & button flash
│   ├── utils/
│   │   ├── calculator.js          # Pure arithmetic engine with floating-point fix
│   │   └── audio.js               # Web Audio API tactile feedback synthesizer
│   ├── App.jsx                    # Root composition & background management
│   ├── App.css                    # App layout, background layers & animations
│   ├── index.css                  # CSS Variables & base reset
│   └── main.jsx                   # React DOM root entry
├── dist/                          # Production build bundle
├── .gitignore                     # Git ignore rules for node_modules & dist
├── index.html                     # Vite HTML entry point
├── package.json                   # Dependencies & build scripts
├── vite.config.js                 # Vite bundler configuration
└── README.md                      # Project documentation
```

---

## 🎯 Task Requirements Checklist

| Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Built with React** | ✅ | Pure modern React 19 architecture with custom hooks ([`useCalculator`](file:///c:/Intership_CodeAlpha/Task_2/src/hooks/useCalculator.js), [`useKeyboard`](file:///c:/Intership_CodeAlpha/Task_2/src/hooks/useKeyboard.js)) and modular components. |
| **Pinterest Aesthetic Background** | ✅ | Implemented from [Pinterest Pin 402016704235354375](https://www.pinterest.com/pin/calculator-background--402016704235354375/) with dual cover / pattern toggle. |
| **All Arithmetic Operations** | ✅ | Addition (`+`), Subtraction (`−`), Multiplication (`×`), Division (`÷`), plus Percentage (`%`) and Sign Negation (`±`). |
| **User Interface** | ✅ | Glassmorphism card, rounded buttons, crisp typography (`JetBrains Mono` + `Outfit`), and multi-tier display. |
| **Input Handling & Clearing** | ✅ | Full operand input, `AC` (All Clear), and backspace (`⌫`) character deletion. |
| **Real-Time Result Display** | ✅ | Live calculated preview shown in real-time as operands and operators are typed before pressing `=`. |
| **Bonus: Keyboard Support** | ✅ | Full desktop keyboard mapping with tactile active button flash on keypress. |
| **Bonus: Styling Enhancements** | ✅ | Light / Dark theme toggle, background pattern/cover switcher, calculation history drawer, and Web Audio API click sound. |

---

## 🚀 Key Features

1. **Pinterest Aesthetic Background & Glassmorphism**
   - Direct integration of the requested aesthetic background (`public/background.jpg`) with an ambient frosted overlay (`backdrop-filter: blur(5px)`).
   - Header switcher (🖼️ button) to toggle between **Full Cover** and **Tiled Pattern**.

2. **Precision Arithmetic Engine**
   - Eliminates standard floating-point inaccuracies (e.g., `0.1 + 0.2` outputs cleanly as `0.3`).
   - Zero-division protection (`Cannot divide by 0`).
   - Dynamic font-size auto-scaling (`font-lg`, `font-md`, `font-sm`, `font-xs`) to prevent long numbers from overflowing.

3. **Real-Time Result Preview**
   - Typing an expression like `25 × 4` automatically computes and displays `= 100` beneath the active line before pressing `=`.

4. **Desktop Keyboard Support**
   - Numbers `0`–`9` and decimal `.`
   - Operations `+`, `-`, `*` or `x`, `/`
   - Calculate with `Enter` or `=`
   - Delete single digit with `Backspace`
   - Reset with `Escape` or `c`
   - Calculate percentage with `%`

5. **Calculation History Drawer**
   - Click the 📜 icon to inspect previous calculation records.
   - Click any past result to load it right back into the display.
   - Saved in `localStorage`.

6. **Web Audio Feedback & Theme Switcher**
   - Crisp mechanical click sounds generated dynamically via the **Web Audio API** (toggleable 🔊 / 🔇).
   - Seamless switch between Dark Mode and Light Mode with instant CSS variable transitions.

---

## 💻 How to Run the Application

### Option 1: Development Server (Vite)
Open your terminal in `c:\Intership_CodeAlpha\Task_2`:
```bash
npm run dev
```
Open your browser at the provided local URL (default: `http://localhost:3000`).

### Option 2: Production Build & Preview
To run the optimized production bundle:
```bash
npm run build
npm run preview
```
Or view the compiled production build directly in [dist/index.html](file:///c:/Intership_CodeAlpha/Task_2/dist/index.html).
