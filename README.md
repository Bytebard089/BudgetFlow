# BudgetFlow

A full-stack personal finance management app with expense tracking and forecasting.

## Features

- **User Authentication** - Secure login/register with JWT
- **Transaction Management** - Add, edit, delete income & expenses
- **Filtering & Search** - Filter by type, date range, search descriptions
- **SMA Forecasting** - Predict next month's expenses using 3-month average
- **Dashboard** - View stats, recent transactions, and forecasts

## Tech Stack

**Frontend:** React, Vite, TailwindCSS, React Router  
**Backend:** Node.js, Express, Prisma ORM  
**Database:** PostgreSQL (Neon)  
**Deployment:** Vercel (frontend), Render (backend)

## Installation

### Prerequisites

- Node.js v16+
- PostgreSQL database

### Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secret-key"
PORT=5000
```

Run database setup:

```bash
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the app:

```bash
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Transactions (Protected)
- `GET /api/transactions` - Get transactions (supports filters)
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Reports (Protected)
- `GET /api/reports/sma-forecast` - Get expense forecast

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| type | `Income` or `Expense` |
| startDate | Start date (YYYY-MM-DD) |
| endDate | End date (YYYY-MM-DD) |
| search | Search in description |
| sortBy | `date` or `amount` |
| sortOrder | `asc` or `desc` |
| page | Page number |
| limit | Items per page |

## Project Structure

```
BudgetFlow/
├── backend/
│   ├── middleware/auth.js
│   ├── prisma/schema.prisma
│   ├── routes/
│   │   ├── auth.js
│   │   ├── transactions.js
│   │   └── reports.js
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── utils/
└── README.md
```

## Deployment

### Backend (Render)
1. Create Web Service, connect GitHub
2. Build: `npm install && npx prisma generate`
3. Start: `npm start`
4. Add env variables: `DATABASE_URL`, `JWT_SECRET`

### Frontend (Vercel)
1. Import repo, select Vite preset
2. Add `VITE_API_URL` env variable

### Database (Neon)
1. Create project on [neon.tech](https://neon.tech)
2. Copy connection string to backend `DATABASE_URL`

## License

MIT
