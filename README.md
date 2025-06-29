# Admin Dashboard

A modern, customizable React Admin Dashboard built with Vite, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- Customizable themes (light, dark, blue, purple)
- Responsive sidebar navigation
- Dashboard overview with stats and charts
- Data tables with sorting and search
- Calendar integration
- Kanban board with drag-and-drop
- Toast notifications
- Accessible UI components

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [react-router-dom](https://reactrouter.com/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [recharts](https://recharts.org/) (charts)
- [react-big-calendar](https://github.com/jquense/react-big-calendar) (calendar)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) (kanban)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
git clone <YOUR_REPO_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

### Running the App

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

## Project Structure

- `src/components/` - UI and dashboard components
- `src/pages/` - Page components (Dashboard, Tables, Calendar, Kanban, NotFound)
- `src/App.tsx` - Main app entry with routing
- `src/index.css` - Tailwind and theme styles

## Customization

- Edit `src/index.css` to adjust theme colors and design tokens.
- Add or modify pages in `src/pages/`.
- Extend UI components in `src/components/ui/`.

## License

MIT
