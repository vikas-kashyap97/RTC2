# Voice Changer App

A real-time voice changer application with chat and file sharing capabilities.

## Deployment Guide

### Client (Netlify)

1. Environment Variables Required:
   ```
   VITE_SOCKET_URL=https://your-backend-url.com
   ```

2. Build Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18.x

### Server Deployment

1. Environment Variables Required:
   ```
   CORS_ORIGIN=https://your-app-name.netlify.app
   PORT=3001
   ```

   IMPORTANT: Replace 'your-app-name' with your actual Netlify app name

2. Server Requirements:
   - Node.js 18.x or higher
   - HTTPS enabled
   - Websocket support

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file:
   ```bash
   cp .env.example .env
   ```

4. Start development servers:
   ```bash
   # Terminal 1 - Client
   npm run dev

   # Terminal 2 - Server
   npm run server
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run server` - Start WebSocket server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features

- [x] Real-time voice modulation
- [x] Multiple voice effects
- [x] Text chat
- [x] File sharing
- [x] Dark/Light mode
- [x] User presence
- [x] Share invite links

## Troubleshooting

1. Socket Connection Issues:
   - Verify VITE_SOCKET_URL is correct
   - Ensure CORS_ORIGIN matches your Netlify URL exactly
   - Check if server is running and accessible

2. Audio Issues:
   - Allow microphone permissions
   - Check browser console for errors
   - Verify WebRTC support in browser

## Version History

- 1.0.0: Initial release
  - Basic voice modulation
  - Chat functionality
  - File sharing
  - Dark/Light mode