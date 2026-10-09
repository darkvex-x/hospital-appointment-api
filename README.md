\# Hospital Appointment API



A REST API backend project for managing patients, doctors, and hospital appointments using TypeScript, Node.js, Prisma ORM, and PostgreSQL.



\## Features



\- Create, retrieve, search, update, and delete patients.

\- Create and list doctors by specialty.

\- Book and retrieve appointments.

\- View upcoming appointments for a doctor.

\- Update appointment status and cancel scheduled appointments.

\- Seed the database with sample data.



\## Technologies Used



\- Node.js

\- TypeScript

\- Prisma ORM

\- PostgreSQL



\## Setup



1\. Install dependencies:



&#x20;  ```bash

&#x20;  npm install

&#x20;  ```



2\. Configure your database connection in a `.env` file using `DATABASE\_URL`.



3\. Generate the Prisma client:



&#x20;  ```bash

&#x20;  npx prisma generate

&#x20;  ```



4\. Apply the database schema using the project's configured Prisma migration workflow.



\## Testing



Run the CRUD test script:



```bash

npm run test:crud

```



\## Project Structure



\- `src/patients.ts` — Patient operations

\- `src/doctors.ts` — Doctor operations

\- `src/appointments.ts` — Appointment operations

\- `src/seed.ts` — Sample data

\- `src/test.ts` — CRUD tests

\- `prisma/schema.prisma` — Database schema



\## Security



Keep database credentials in `.env`. Never commit secrets to GitHub.

