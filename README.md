# JCS Canada

This site now uses a static admin page at `admin.html`.

## Admin Login

Approved admins are defined in `assets/js/admin-users.js`.

Each admin entry needs:

- `name`
- `email`
- `role`
- `passwordHash`

## Change An Admin Password

1. Choose the new plain password.
2. Generate a SHA-256 hash on your computer:

```bash
printf '%s' 'NewPasswordHere' | shasum -a 256
```

3. Replace that admin's `passwordHash` value in `assets/js/admin-users.js`.
4. Commit and redeploy the static files.

## Notes

- This is a static soft-login setup, not a secure server-side authentication system.
- Admin-created events and announcements are stored in the browser's `localStorage`.
- Uploaded files are stored as browser data URLs, so content is tied to the browser where it was created.
