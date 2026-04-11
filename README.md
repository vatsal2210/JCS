# JCS Admin Deployment

This project now runs as a Node/Express app so the admin login can be protected server-side.

## Requirements

- Node.js 18+ recommended
- npm

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

3. Set your super admin credentials in `.env`:

```env
PORT=3000
HOST=0.0.0.0
SUPERADMIN_NAME=smruti
SUPERADMIN_EMAIL=smrutishah2610@gmail.com
SUPERADMIN_PASSWORD=smrutiShah@2610
```

4. Start the server:

```bash
npm start
```

5. Open:

```text
http://localhost:3000/admin.html
```

## Important behavior

- `server-data/admins.json` is created automatically on first run.
- The initial super admin comes from `.env`.
- If `server-data/admins.json` already exists, changing `.env` will not change the existing stored admin automatically.
- To recreate the first admin from `.env`, delete `server-data/admins.json` and restart the server.

## Production deployment

Deploy this repo to any host that can run Node.js.

### Production requirements

- Run `npm install`
- Set environment variables on the server
- Run `npm start`
- Expose the app through your domain

### Required environment variables

- `PORT`
- `SUPERADMIN_EMAIL`
- `SUPERADMIN_PASSWORD`

### Optional environment variables

- `HOST`
- `SUPERADMIN_NAME`

## Useful routes

- `/admin.html`
- `/api/admin/login`
- `/api/admin/session`
- `/api/admin/logout`
- `/api/admin/users`
- `/api/health`

## Notes

- Static hosting alone is not enough anymore because admin authentication now depends on Express routes.
- If your live domain is `https://jcscanada.org`, then after deployment the admin page can be:

```text
https://jcscanada.org/admin.html
```
