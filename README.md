# Moodify

Moodify is a mood-based Spotify playlist recommendation app. Select how you're feeling and instantly get a curated set of Spotify playlists that match your vibe. Click any playlist to browse its tracks.

## What It Does

- Presents 8 mood options (Happy, Sad, Energetic, Chill, Romantic, Angry, Focused, Party)
- Queries the Spotify API for playlists matching the selected mood
- Displays a grid of up to 12 matching playlists with cover art, name, and description
- Clicking a playlist shows its full track listing with album art, artist names, and durations

## Project Structure

```
music/
├── backend/              Express.js API server
│   ├── src/
│   │   ├── index.js      Entry point
│   │   ├── routes/       Route definitions
│   │   ├── controllers/  Request handlers
│   │   └── services/     Spotify API integration
│   ├── .env.example
│   └── package.json
└── frontend/             Next.js 14 app
    ├── app/              App Router pages
    ├── components/       React components
    ├── lib/              API utility functions
    ├── .env.local.example
    └── package.json
```

## Prerequisites

- Node.js 18 or higher
- A Spotify Developer account and app credentials

## Getting Spotify Credentials

1. Visit https://developer.spotify.com/dashboard
2. Log in and click **Create app**
3. Fill in any name and description; set the redirect URI to `http://localhost:3000`
4. After creation, open the app settings and copy the **Client ID** and **Client Secret**

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
PORT=5000
```

Start the dev server:

```bash
npm run dev
```

The backend runs on http://localhost:5000

## Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

The default `.env.local` points to `http://localhost:5000`, which is correct if the backend is running locally. Then start the dev server:

```bash
npm run dev
```

The frontend runs on http://localhost:3000

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/spotify/token` | Get a Spotify access token |
| GET | `/api/spotify/recommendations?mood=happy` | Get playlists for a mood |
| GET | `/api/spotify/playlist/:id/tracks` | Get tracks for a playlist |

## Supported Moods

`happy` · `sad` · `energetic` · `chill` · `romantic` · `angry` · `focused` · `party`
