# 📝 Notes Firebase

A minimal Apple Notes-style web app with real-time cloud sync, built as a PWA.

## Features

- Real-time sync with Firebase Firestore
- Rich text editing (TipTap)
- PWA support (Add to Home Screen)
- Google Authentication

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite 5 |
| Styling | Tailwind CSS 3 |
| Editor | TipTap |
| Backend | Firebase (Firestore + Auth) |
| Deploy | GitHub Pages |

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run deploy` | Deploy to GitHub Pages |

## Firestore Schema

```
notes/{noteId}
  ├── userId: string
  ├── title: string
  ├── content: string (HTML)
  ├── createdAt: Timestamp
  └── updatedAt: Timestamp
```
