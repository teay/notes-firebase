# Notes Firebase

A minimal Apple Notes-style web app with real-time cloud sync, built as a PWA.

## Features

- Real-time sync with Firebase Firestore
- Rich text editing (TipTap)
- PWA support (Add to Home Screen)
- Google Authentication
- Dark mode toggle
- Mobile responsive (iPhone XR and similar)
- Character remaining counter (100,000 limit)
- Input validation via Firestore rules

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
  ├── title: string (max 500 chars)
  ├── content: string (max 100,000 chars)
  ├── createdAt: Timestamp
  └── updatedAt: Timestamp
```

## Security

- Firestore rules enforce auth + ownership
- Input validation on title (500 chars) and content (100,000 chars)
