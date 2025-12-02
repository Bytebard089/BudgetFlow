<div align="center">

# 💰 BudgetFlow

### Your Personal Finance & Forecasting Companion

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Track your finances • Visualize spending patterns • Forecast future expenses**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation--setup) • [API Reference](#-api-reference) • [Deployment](#-deployment)

</div>

---

## 📖 Overview

BudgetFlow is a modern, full-stack personal finance management application built with React and Node.js. It empowers users to take control of their finances through intuitive transaction tracking, powerful filtering capabilities, and intelligent expense forecasting using Simple Moving Average (SMA) analysis.

### Why BudgetFlow?

- 🎯 **Simple & Intuitive** - Clean interface designed for ease of use
- 📊 **Data-Driven Insights** - Understand your spending with visual analytics
- 🔮 **Smart Forecasting** - Predict future expenses based on historical data
- 🔒 **Secure by Design** - Enterprise-grade security with JWT authentication
- 💱 **INR Currency Support** - Built for Indian users with ₹ formatting

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Security
- Secure user registration & login
- JWT-based session management
- Password hashing with bcryptjs
- Protected API routes
- User data isolation

</td>
<td width="50%">

### 💳 Transaction Management
- Add income & expense entries
- Edit & delete transactions
- Categorize transactions
- Custom descriptions & dates
- Real-time balance updates

</td>
</tr>
<tr>
<td width="50%">

### 🔍 Advanced Filtering
- Filter by transaction type
- Date range selection
- Search by description
- Sort by date or amount
- Ascending/descending order

</td>
<td width="50%">

### 📈 Analytics & Forecasting
- Total income/expense stats
- Net balance calculation
- 3-month SMA forecast
- Monthly spending trends
- Visual data representation

</td>
</tr>
</table>

### Dashboard Highlights

| Feature | Description |
|---------|-------------|
| 📊 **Stats Cards** | Real-time view of income, expenses, and balance |
| 📈 **SMA Forecast** | Predictive analytics for next month's expenses |
| � **Recent Activity** | Quick glance at latest transactions |
| ⚡ **Quick Actions** | One-click access to common tasks |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks & context |
| **Vite** | Lightning-fast build tool |
| **React Router v6** | Client-side routing |
| **TailwindCSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Lucide React** | Modern icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **PostgreSQL** | Relational database |
| **Prisma** | Type-safe ORM |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password encryption |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting |
| **Render** | Backend hosting |
| **Neon** | Serverless PostgreSQL database |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) or **yarn**
- **PostgreSQL** (v13 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Bytebard089/BudgetFlow.git
cd BudgetFlow
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/budgetflow?schema=public"

# Authentication
JWT_SECRET="your-secure-random-string-min-32-characters"

# Server
PORT=5000
NODE_ENV=development
```

Initialize the database:

```bash
# Run migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Start development server
npm run dev
```

✅ Backend running at `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

✅ Frontend running at `http://localhost:5173`

---

## 📡 API Reference

### Base URL
```
Development: http://localhost:5000/api
Production:  https://your-backend-url.com/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Create new user account | ❌ |
| `POST` | `/auth/login` | Authenticate user | ❌ |

<details>
<summary><b>Request/Response Examples</b></summary>

**Register**
```json
// POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Login**
```json
// POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
</details>

### Transaction Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/transactions` | List all transactions | ✅ |
| `POST` | `/transactions` | Create transaction | ✅ |
| `PUT` | `/transactions/:id` | Update transaction | ✅ |
| `DELETE` | `/transactions/:id` | Delete transaction | ✅ |

**Query Parameters for `GET /transactions`**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | - | Filter: `Income` or `Expense` |
| `startDate` | string | - | Start date (YYYY-MM-DD) |
| `endDate` | string | - | End date (YYYY-MM-DD) |
| `search` | string | - | Search in description |
| `sortBy` | string | `date` | Sort field: `date`, `amount` |
| `sortOrder` | string | `desc` | Order: `asc`, `desc` |
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Items per page |

### Reports Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/reports/sma-forecast` | Get expense forecast | ✅ |

---

## 📊 SMA Forecasting

BudgetFlow uses **Simple Moving Average (SMA)** to predict future expenses:

```
SMA = (Month₁ + Month₂ + Month₃) / 3
```

### How It Works

1. **Data Collection** - Aggregates expenses from the last 3 months
2. **Calculation** - Computes average monthly spending
3. **Prediction** - Projects expected expenses for next month
4. **Visualization** - Displays forecast on dashboard

### Benefits

- 📉 Identify spending trends early
- 💡 Make informed budget decisions
- ⚠️ Get alerts for unusual spending
- 📅 Plan for future expenses

---

## 🗂️ Project Structure

```
BudgetFlow/
│
├── 📁 backend/
│   ├── 📁 middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── 📁 prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── 📁 migrations/       # Database migrations
│   ├── 📁 routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── transactions.js      # Transaction CRUD routes
│   │   └── reports.js           # Analytics & forecasting
│   ├── server.js                # Express app entry point
│   ├── package.json
│   └── README.md
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── Sidebar.jsx      # Vertical sidebar
│   │   │   ├── PrivateRoute.jsx # Route protection
│   │   │   └── AnimatedBackground.jsx
│   │   ├── 📁 context/
│   │   │   ├── AuthContext.jsx  # Authentication state
│   │   │   └── ToastContext.jsx # Notifications
│   │   ├── 📁 pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   ├── Transactions.jsx # Transaction list
│   │   │   ├── NewEntry.jsx     # Add transaction
│   │   │   ├── Login.jsx        # User login
│   │   │   └── Register.jsx     # User registration
│   │   ├── 📁 utils/
│   │   │   └── api.js           # API helper functions
│   │   ├── App.jsx              # Root component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md                    # This file
```

---

## 🚀 Deployment

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com/)
2. Connect your GitHub repository
3. Configure settings:
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
4. Add environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `JWT_SECRET` - Your secret key
   - `NODE_ENV` - `production`
5. Deploy! 🚀

### Frontend → Vercel

1. Import project on [Vercel](https://vercel.com/)
2. Select **Vite** framework preset
3. Configure settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL` - Your Render backend URL
5. Deploy! 🚀

### Database → Neon

1. Create project on [Neon](https://neon.tech/)
2. Navigate to **Dashboard** → **Connection Details**
3. Copy the **Connection string** (pooled recommended)
4. Update `DATABASE_URL` in your backend environment

---

## 🔐 Security Best Practices

| Feature | Implementation |
|---------|----------------|
| **Password Security** | Hashed with bcryptjs (salt rounds: 10) |
| **Authentication** | JWT tokens with expiration |
| **Route Protection** | Middleware-based auth checks |
| **Data Isolation** | Users can only access own data |
| **Input Validation** | Server-side validation on all endpoints |
| **CORS** | Configured for allowed origins |

---

## 🎯 Usage Guide

### Getting Started

1. **Create Account** - Navigate to `/register` and sign up
2. **Login** - Access your dashboard at `/login`

### Managing Transactions

1. **Add Entry** - Click "New Entry" or use quick actions
2. **Select Type** - Choose Income or Expense
3. **Fill Details** - Amount (₹), description, category, date
4. **Save** - Submit to record transaction

### Viewing Analytics

1. **Dashboard** - Overview of financial stats
2. **Forecast** - Check SMA prediction card
3. **Transactions** - Full history with filters
4. **Search** - Find specific transactions

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Built with ❤️ as a Full-Stack Capstone Project**

Demonstrating expertise in:
- Modern React development
- RESTful API design
- Database management
- Authentication systems
- Cloud deployment

</div>

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**[Report Bug](https://github.com/Bytebard089/BudgetFlow/issues)** • **[Request Feature](https://github.com/Bytebard089/BudgetFlow/issues)**

---

**Happy Budgeting! 💰📊**

</div>
