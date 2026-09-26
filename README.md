# Portfolio — Prawar Karande

A premium, dark-themed portfolio website for an AI/ML Engineer & Python Developer.

## Architecture

```
frontend/   → React 19 + Vite (SPA)
backend/    → Django 6.1 + DRF (API + Admin)
database    → MySQL 8.x
```

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **MySQL** 8.x running locally

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

### 2. Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env with your MySQL credentials and a SECRET_KEY

# Create database (in MySQL)
# CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Run migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Django admin at [http://localhost:8000/admin/](http://localhost:8000/admin/).

### 3. MySQL Setup

```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

Then set `DB_NAME`, `DB_USER`, `DB_PASSWORD` in `backend/.env`.

## Environment Variables

See [`backend/.env.example`](backend/.env.example) for all required variables.

| Variable | Required | Description |
|----------|----------|-------------|
| `SECRET_KEY` | Yes | Django secret key |
| `DEBUG` | No | Debug mode (default: True) |
| `DB_NAME` | Yes | MySQL database name |
| `DB_USER` | Yes | MySQL username |
| `DB_PASSWORD` | Yes | MySQL password |
| `DB_HOST` | No | MySQL host (default: localhost) |
| `DB_PORT` | No | MySQL port (default: 3306) |
| `ALLOWED_HOSTS` | No | Comma-separated hosts |
| `CORS_ALLOWED_ORIGINS` | No | Comma-separated CORS origins |

## Django Admin Features

- **Projects**: Add/edit/reorder/feature projects with full case study content
- **Technologies**: Manage tech stack by category with ordering
- **Contact Messages**: Review submissions, mark as read, bulk actions

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact/` | Submit contact form (throttled: 5/hr) |
| `GET` | `/api/projects/` | List featured, active projects |
| `GET` | `/api/technologies/` | List active technologies |

## Production Build

```bash
cd frontend
npm run build
# Output in frontend/dist/
```

## Known Gaps

- Resume PDF placeholder — add real file at `frontend/public/assets/Prawar_Karande_Resume.pdf`
- Email address placeholder — update in `frontend/src/data/personal.js`
- Project GitHub URLs — add via Django admin when repos are published
- Email notification on contact — requires email service credentials in `.env`
