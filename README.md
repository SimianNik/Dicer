 # 🎲 Dicer – React Dice Roller

A lightweight, modular dice roller built with **React + TypeScript**, featuring a custom event-driven state architecture and cryptographically strong randomness.


## ✨ Features

- 🎲 Create **multiple Dice Trays** (one per player / scenario)
- ➕ Roll **any combination of dice sizes** (d4, d6, d8, d10, d12, d20…)
- 🧪 Create **custom sided dice** (d69? d100? go wild)
- 📜 Roll history persisted in `localStorage`
- 🔐 Uses `crypto.getRandomValues()` for randomness
- 🧠 Event-driven architecture with a single source of truth


## 🧠 Architecture

This project intentionally avoids storing application state inside React components.

Instead, it uses an **Event Pattern architecture**:

- All application logic lives in plain `.ts` modules
- This App layer acts as a **single source of truth**
- Components subscribe to state updates via custom hooks
- When the backend logic updates state → React re-renders

This keeps:

- UI layer clean and declarative
- Logic layer framework-agnostic
- State mutations centralized and predictable

In other words: React renders.  
The app logic lives elsewhere.


## 🔐 Randomness

Dice results are generated using the browser's cryptographic API — not `Math.random()`.

This prevents modulo bias and ensures uniform distribution.


## 🗂 Roll History

- Every roll is stored in localStorage
- History persists between sessions
- Can be cleared manually


## 🖼 UI

Modern dark-ish styled interface with:

- Independent dice trays
- Per-tray roll management
- Min/Max roll calculation preview
- Expandable roll history


##🛠 Built With

- React
- TypeScript
- Vite


## 🎯 Purpose

This project demonstrates:

- Clean separation of concerns
- Event-driven state management
- Deterministic UI rendering
- Better randomness handling
- Modular frontend architecture
