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
TRUST_PROXY=false
FORCE_HTTPS=false
SSL_KEY_PATH=
SSL_CERT_PATH=
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

## Local HTTPS setup

If you want local HTTPS, generate or provide a local key/certificate pair and set these in `.env`:

```env
PORT=3000
HOST=0.0.0.0
SSL_KEY_PATH=./certs/localhost-key.pem
SSL_CERT_PATH=./certs/localhost-cert.pem
FORCE_HTTPS=false
TRUST_PROXY=false
```

Then start the server:

```bash
npm start
```

Open:

```text
https://localhost:3000/admin.html
```

If your browser warns that the certificate is not trusted, that is expected unless you use a locally trusted certificate tool such as `mkcert`.

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

### Recommended production HTTPS setup

Use a reverse proxy such as Nginx, Apache, or a platform load balancer:

- SSL/TLS terminates at the proxy
- the proxy forwards traffic to your Node app
- the Node app runs on an internal port such as `3000`

Recommended production env values:

```env
PORT=3000
HOST=0.0.0.0
TRUST_PROXY=true
FORCE_HTTPS=true
SUPERADMIN_NAME=smruti
SUPERADMIN_EMAIL=smrutishah2610@gmail.com
SUPERADMIN_PASSWORD=smrutiShah@2610
```

In this setup:

- the proxy serves `https://jcscanada.org`
- Express trusts the proxy
- HTTP requests are redirected to HTTPS by the app

### Direct HTTPS in Node

If you really want Node itself to serve HTTPS directly, set:

```env
SSL_KEY_PATH=/absolute/path/to/privkey.pem
SSL_CERT_PATH=/absolute/path/to/fullchain.pem
```

This works, but for production the reverse-proxy approach is usually easier and more standard.

### Required environment variables

- `PORT`
- `SUPERADMIN_EMAIL`
- `SUPERADMIN_PASSWORD`

### Optional environment variables

- `HOST`
- `TRUST_PROXY`
- `FORCE_HTTPS`
- `SSL_KEY_PATH`
- `SSL_CERT_PATH`
- `SUPERADMIN_NAME`

## Useful routes

- `/admin.html`
- `/admin`
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
