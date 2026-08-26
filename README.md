# Mini Appointment App

A simple appointment management application that allows users to create appointments, view appointments, filter by status, and update appointment status.

## 1. Setup and Run

### Prerequisites

- Node.js
- npm
- PostgreSQL

### Clone the repository

```bash
git clone https://github.com/kittithatlwork/mini-appointment-app.git
cd mini-appointment-app
```

## 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE "ooca-appointment";
```

Run the database schema from the project root:

```bash
psql -U postgres -d ooca-appointment -f schema.sql
```

> **`psql` not found / not recognized?**
> This means `psql` isn't in your system `PATH`. Here's how to add it:
>
> **Windows**
> 1. Find your PostgreSQL install folder, usually:
>    `C:\Program Files\PostgreSQL\<version>\bin`
> 2. Press `Win`, search for **"Edit the system environment variables"**, and open it.
> 3. Click **Environment Variables** → under **System variables** (or **User variables**), select **Path** → **Edit**.
> 4. Click **New** and paste the `bin` path from step 1.
> 5. Click **OK** on all windows, then **close and reopen** your terminal.
> 6. Verify with:
>    ```bash
>    psql --version
>    ```
>
> **macOS (Postgres.app)**
> 1. Open (or create) `~/.zshrc` (or `~/.bash_profile` if using bash):
>    ```bash
>    nano ~/.zshrc
>    ```
> 2. Add this line at the bottom:
>    ```bash
>    export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"
>    ```
> 3. Save (`Ctrl+O`, `Enter`, `Ctrl+X`), then reload:
>    ```bash
>    source ~/.zshrc
>    ```
> 4. Verify with `psql --version`.
>
> **macOS/Linux (Homebrew)**
> 1. Install PostgreSQL if you haven't:
>    ```bash
>    brew install postgresql
>    ```
> 2. Homebrew usually links `psql` into `/opt/homebrew/bin` or `/usr/local/bin`, which are already in `PATH`. If `psql --version` still fails, add the printed path manually:
>    ```bash
>    echo 'export PATH="/opt/homebrew/opt/postgresql/bin:$PATH"' >> ~/.zshrc
>    source ~/.zshrc
>    ```
>
> **Linux (apt)**
> ```bash
> sudo apt update
> sudo apt install postgresql-client
> ```
> This installs `psql` into `/usr/bin`, which is already in `PATH`.
>
> **No PATH changes needed**: run `psql` using its full path instead, e.g.
> ```bash
> "C:\Program Files\PostgreSQL\<version>\bin\psql.exe" -U postgres -d ooca-appointment -f schema.sql
> ```
>
> Alternatively, open the database in **pgAdmin** and run the contents of `schema.sql` via its Query Tool.

The schema creates the `appointments` table with:

- id
- patientname
- appointmentat
- status
- createdat

## 3. Backend Setup

Open a terminal in the project root:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory (see `server/.env.example` for the template):

```env
USER=postgres
HOST=localhost
DATABASE=ooca-appointment
PASSWORD=your_password
DATABASE_PORT=5432
SERVER_PORT=5000
```

Replace `your_password` with your PostgreSQL password.

Start the backend:

```bash
npm run dev
```

The backend will run on:

```
http://localhost:5000
```

## 4. Frontend Setup

Open a new terminal from the project root:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory (see `client/.env.example` for the template):

```env
VITE_SERVER_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the URL provided by Vite in your browser.

## 5. Features

### Create Appointment

Users can create an appointment by providing:

- Patient name
- Appointment date and time
- Status

The application validates:

- Patient name cannot be empty
- Appointment time must be in the future
- Status must be one of:
  - pending
  - confirmed
  - cancelled

The application also prevents overlapping appointments.

Each appointment slot is assumed to be 30 minutes.

### View Appointments

The application displays all appointments stored in PostgreSQL.

Users can also filter appointments by status:

- All Status
- Pending
- Confirmed
- Cancelled

### Update Appointment Status

Users can change the appointment status using:

- Confirm
- Cancel

The status is updated through the backend API.

### Loading and Empty States

The application handles:

- Loading state while appointments are being fetched
- Empty state when there are no appointments
- API errors with user-friendly error messages

## 6. API Endpoints

| Method | Endpoint                     | Purpose                       |
| ------ | ----------------------------- | ------------------------------ |
| POST   | `/appointments`               | Create an appointment          |
| GET    | `/appointments`               | List all appointments          |
| GET    | `/appointments?status=pending`| Filter appointments by status  |
| PATCH  | `/appointments/:id`           | Update appointment status      |

### Create Appointment

```
POST /appointments
```

Example request:

```json
{
  "patientname": "John Doe",
  "appointmentat": "2026-08-30T10:00:00",
  "status": "pending"
}
```

### Update Status

```
PATCH /appointments/:id
```

Example request:

```json
{
  "status": "confirmed"
}
```

## 7. HTTP Status Codes

The API uses the following status codes:

| Status Code | Meaning                                    |
| ----------- | ------------------------------------------- |
| 200         | Request successful                          |
| 201         | Appointment created successfully            |
| 400         | Invalid input                               |
| 404         | Appointment not found                       |
| 409         | Appointment time conflicts with another one |
| 500         | Internal server error                       |

For overlapping appointments, the API returns `409 Conflict` with an understandable error message.

Example:

```json
{
  "error": "This appointment time is already booked. Please choose another time."
}
```

## 8. Tech Stack

### Frontend

**React**
Used to build the user interface with reusable components such as appointment cards, forms, modals, loading states, and empty states.

**TypeScript**
Used to provide type safety and make the code easier to maintain.

**Tailwind CSS**
Used for styling the application and creating the UI with utility classes.

### Backend

**Node.js**
Used as the JavaScript runtime for the backend application.

**Express**
Used to create the REST API and handle HTTP requests and responses.

**TypeScript**
Used to provide type safety and improve maintainability of the backend code.

### Database

**PostgreSQL**
Used as the relational database for storing appointment data persistently.

## 9. Project Structure

```
mini-appointment-app/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── service/
│   │   ├── types/
│   │   └── App.tsx
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── appointments/
│   │   ├── db/
│   │   └── ...
│   ├── .env.example
│   └── package.json
│
├── schema.sql
├── README.md
└── .gitignore
```

## 10. What I Did Not Finish

The core requirements of the assignment have been implemented.

If I had more time, I would improve the following:

- Add automated tests for the API and validation logic
- Add more comprehensive error handling for network failures
- Improve accessibility of the UI
- Add more detailed success feedback after updating an appointment
- Add additional edge-case validation
- Improve the UI for different screen sizes

## 11. AI Tools Usage

I used AI tools as a development assistant during this project.

AI was used for:

- Discussing project structure and implementation approaches
- Debugging errors and understanding error messages
- Reviewing API and validation logic
- Getting suggestions for React component structure
- Improving user-facing error messages
- Reviewing and improving the README structure

I reviewed the suggestions provided by the AI and made the final implementation decisions myself.

I understand the code submitted in this project and can explain the implementation and logic of the code.
