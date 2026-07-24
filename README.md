# Google OAuth 2.0 Authentication Module

A complete, end-to-end user registration, login, and session management system built with **Node.js**, **Express.js**, **Passport.js** (`passport-google-oauth20`), **JSON Web Tokens (JWT)** in secure `HttpOnly` cookies, **MongoDB** (Mongoose), and a vanilla HTML/CSS/JS frontend.

---

## 🚀 Features

- **Exclusive Google OAuth 2.0 Login:** Single sign-on without manual password entry.
- **Auto-Registration:** Queries MongoDB by `googleId` on login. Automatically registers new users with their Google profile details (`googleId`, `email`, `displayName`, `avatarUrl`).
- **Secure JWT Session Management:** Generates a signed JWT containing the user's MongoDB `_id` and stores it in a secure `HttpOnly` cookie to protect against XSS attacks.
- **Protected Routes & Middleware:** Express middleware (`authMiddleware.js`) validates the JWT cookie for protected resources (`/auth/me`).
- **Clean Logout Flow:** `/auth/logout` clears the `HttpOnly` cookie and redirects to the login screen.
- **Modern Glassmorphism UI:** Built with vanilla CSS, dynamic ambient glows, smooth loading skeletons, and responsive layouts.

---

## 🛠️ Tech Stack & Dependencies

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport.js (`passport-google-oauth20`), `jsonwebtoken`
- **Security & Utilities:** `cookie-parser`, `cors`, `dotenv`
- **Frontend:** Vanilla HTML5, Modern CSS3, JavaScript (Fetch API)

---

## 📁 Project Structure

```
Authentication/
├── public/
│   ├── index.html         # Login page with "Sign in with Google" button
│   ├── dashboard.html     # Protected dashboard displaying profile & avatar
│   ├── css/
│   │   └── style.css      # Glassmorphism styling and design system
│   └── js/
│       └── dashboard.js   # Client-side script fetching /auth/me
├── src/
│   ├── config/
│   │   ├── db.js          # MongoDB connection helper
│   │   └── passport.js    # Passport Google Strategy configuration
│   ├── middleware/
│   │   └── authMiddleware.js # JWT HttpOnly cookie authentication middleware
│   ├── models/
│   │   └── User.js        # Mongoose User model schema
│   ├── routes/
│   │   └── authRoutes.js  # OAuth, user profile, & logout routes
│   └── server.js          # Express app entry point
├── .env.example           # Environment variables template
├── package.json           # Project dependencies & scripts
└── README.md              # Project setup & Google Cloud Console guide
```

---

## 🔑 Google Cloud Console Configuration Guide

Follow these exact steps to obtain your Google OAuth Client ID and Secret:

### Step 1: Create a New Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown near the top navigation bar and select **New Project**.
3. Enter a Project Name (e.g., `Google-OAuth-App`) and click **Create**.

### Step 2: Configure the OAuth Consent Screen
1. In the left navigation menu, go to **APIs & Services** > **OAuth consent screen**.
2. Select **External** as the User Type and click **Create**.
3. Fill out the mandatory fields:
   - **App name:** e.g. `Google Auth Demo App`
   - **User support email:** Select your email address.
   - **Developer contact information:** Provide your email address.
4. Click **Save and Continue** through Scopes (the default `.../auth/userinfo.email` and `.../auth/userinfo.profile` are automatically requested).
5. Add your email address under **Test users** if your app remains in testing mode.
6. Click **Save and Continue**.

### Step 3: Create an OAuth Client ID
1. In the left menu, go to **APIs & Services** > **Credentials**.
2. Click **+ Create Credentials** at the top and select **OAuth client ID**.
3. Set **Application type** to **Web application**.
4. Set **Name** to `Web Auth Client`.

### Step 4: Set Authorized JavaScript Origins
1. Under **Authorized JavaScript origins**, click **+ Add URI**.
2. Enter your local base URL:
   ```text
   http://localhost:3000
   ```

### Step 5: Set Authorized Redirect URIs
1. Under **Authorized redirect URIs**, click **+ Add URI**.
2. Enter the callback route matching your backend server exactly:
   ```text
   http://localhost:3000/auth/google/callback
   ```

### Step 6: Copy Credentials to `.env`
1. Click **Create**.
2. Copy the generated **Client ID** and **Client Secret**.
3. Create a `.env` file in the root of this project (or copy from `.env.example`).
4. Paste the credentials into your `.env` file:
   ```env
   GOOGLE_CLIENT_ID=your_actual_google_client_id
   GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
   ```

---

## 💻 Local Setup & Installation

### 1. Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** running locally on `mongodb://127.0.0.1:27017` or a **MongoDB Atlas** connection string.

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/google_oauth_db
JWT_SECRET=super_secret_jwt_key_change_in_production
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
CLIENT_URL=http://localhost:3000
```

### 4. Start the Application
For production/standard mode:
```bash
npm start
```

For development mode (with `nodemon` auto-reload):
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## ⚡ API Endpoints Summary

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET /` | `GET` | Public | Serves the login page with Google OAuth button |
| `GET /auth/google` | `GET` | Public | Initiates the Google OAuth 2.0 sign-in flow |
| `GET /auth/google/callback` | `GET` | Public | Handles redirect from Google, issues JWT in `HttpOnly` cookie, redirects to `/dashboard` |
| `GET /auth/me` | `GET` | Private | Verifies JWT cookie via `authMiddleware.js` and returns current user details |
| `GET /auth/logout` | `GET` | Public/Private | Clears `HttpOnly` cookie (`token`) and redirects to `/` |
| `GET /dashboard` | `GET` | Public/Private | Serves the dashboard web page |

---

## 🔐 Security Highlights

1. **HttpOnly Cookies:** JWT tokens are stored in `HttpOnly` cookies, preventing client-side JavaScript access and shielding tokens from XSS vectors.
2. **SameSite Cookie Policy:** `sameSite: 'lax'` protection against Cross-Site Request Forgery (CSRF).
3. **No Password Storage Needed:** All identity verification is handled via Google OAuth 2.0 protocols.
