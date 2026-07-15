# 🌐 Dynamic Portfolio with Built-in CMS

A full-stack personal portfolio website with a custom Content Management System (CMS), featuring a public-facing profile for visitors and a secure admin dashboard for authenticated content management — built with the MERN stack.

---

## 🔗 Links

- **Live Demo:** [portfolio-project-lake-xi.vercel.app](https://portfolio-project-lake-xi.vercel.app)
- **GitHub:** [github.com/srijan110705/portfolio_project](https://github.com/srijan110705/portfolio_project.git)

---

## ✨ Features

### Public Profile
- View About, Skills, Projects, Education, Achievements, and Positions of Responsibility
- Fully responsive UI built with React.js and Tailwind CSS
- Data fetched dynamically from the backend — no hardcoding

### Admin Dashboard
- Secure login accessible only to the admin
- JWT-protected routes with role-based access control
- CRUD operations across all portfolio sections through dedicated edit interfaces
- File upload support for images and documents

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| File Uploads | Multer (storage service) |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
portfolio_project/
├── portfolio_frontend/         # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Achievements.jsx
│   │   │   └── Position.jsx
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminHome.jsx
│   │   │   ├── EditAbout.jsx
│   │   │   ├── EditSkills.jsx
│   │   │   ├── EditProjects.jsx
│   │   │   ├── EditEducation.jsx
│   │   │   ├── EditAchievements.jsx
│   │   │   └── EditPosition.jsx
│   │   └── App.jsx
│   └── vite.config.js
│
├── portfolio_backend/          # Node.js + Express backend
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── edit.controller.js
│   ├── models/
│   │   ├── admin.model.js
│   │   ├── education.model.js
│   │   └── project.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── edit.routes.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── services/
│   │   └── storage.service.js
│   └── db.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/srijan110705/portfolio_project.git
cd portfolio_project
```

### 2. Backend Setup
```bash
cd portfolio_backend
npm install
```

Create a `.env` file in `portfolio_backend/`:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd portfolio_frontend
npm install
```

Create a `.env` file in `portfolio_frontend/`:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

---

## 🔐 Authentication Flow

```
Admin visits /admin/login
        ↓
Enters credentials
        ↓
Backend validates and returns JWT token
        ↓
Token stored in cookies/localStorage
        ↓
Protected routes accessible via auth middleware
        ↓
Admin can CRUD all portfolio sections
```

---

## 📦 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com) via `vercel.json` configuration
- **Backend** deployed on [Render](https://render.com)
- CORS configured to allow secure cross-origin communication between frontend and backend

---

## 👤 Author

**Srijan Ponaganti**
- GitHub: [@srijan110705](https://github.com/srijan110705)
- LinkedIn: [Srijan Ponaganti](https://www.linkedin.com/in/srijan-ponaganti-70491b367)
- Email: rao.srijan1175@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
