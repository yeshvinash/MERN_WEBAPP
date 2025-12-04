# React Frontend – Vite, Tailwind, and Auth Admin Panel

This project is the frontend for a modern authentication/admin dashboard app. It uses **React** (with hooks and functional components), **Vite** for fast dev/build, and **Tailwind CSS** for utility-first styling.

## Features

- ⚡ Fast Vite-based dev/build config
- 🎨 Tailwind CSS out of the box
- 📋 User authentication (login, register) via JWT (connected to backend)
- 🔑 Admin users panel – view, edit, delete users (if admin)
- 📬 Contact form
- 🚦 Toast notifications (react-toastify)
- Organized component/page structure

## Getting Started

### Prerequisites

- Node.js >= 16
- Backend API up & running (see `/backend` for details)

### Installation

1. Clone this repo, then `cd frontend`
2. Install packages:

   ```bash
   npm install
   # or
   yarn
   ```

3. Configure API base URL if needed: check `src/api/axiosInstance.js`

### Scripts

- `npm run dev` — Start dev server ([http://localhost:5173](http://localhost:5173))
- `npm run build` — Production build
- `npm run preview` — Preview prod build

## Folder Structure

- `src/pages/` — Main pages & admin dashboard
- `src/components/` — Reusable components (form, navbar, etc)
- `src/api/` — Axios instance and API methods
- `src/styles/` — Styles (mostly Tailwind)

## Main Pages

- `/` — Home/Landing
- `/login` — Login form
- `/register` — Register form
- `/admin/users` — Admin dashboard: view/delete/edit users
- `/admin/contacts` — View contact form records

## Notes

- All API calls expect the backend (Node/Express w/ JWT) on `/api`.
- User/admin state is handled locally (no Redux).
- For customizing tailwind: see `tailwind.config.js`.
- For notifications: [react-toastify](https://github.com/fkhadra/react-toastify) is used.

## Example `.env` (not required unless customizing API base URL)

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Development Tips

- Most API logic in: `src/api/authApi.js`
- To add new admin routes/pages, add to `src/pages/Admin*`
- Tailwind classes are used throughout for layout & color
- Use dev tools and console for debugging API errors

---

For backend setup and endpoints, see [`/backend/README.md`](../backend/README.md).

Questions? See the code or contact the repo maintainer.
