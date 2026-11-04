# Joineazy Assignment & Review Dashboard

A responsive assignment management dashboard built using React, TypeScript and Tailwind CSS. It supports Admin and Student roles.

## Features

### Admin
- Create, edit and delete assignments.
- Assign tasks to all or selected students.
- Track student submissions.
- View assignment progress.
- Search, filter and sort assignments.
- Highlight overdue assignments.
- View students and their submission status.

### Student
- View assigned assignments.
- Open Google Drive links.
- Submit assignments with confirmation.
- Track pending and submitted status.
- View overall progress.

## Tech Stack

- React.js
- TypeScript
- Tailwind CSS
- Lucide React
- Context API
- LocalStorage

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/amrapalizade/joineazy-task1.git

2. Open the project folder:
    cd Joineazy-Task1

3.Install dependencies:
    npm install

4. Start the development server:
     npm run dev

5. Data Storage - The application uses browser LocalStorage to persist users, assignments and login state. No backend is required.
6. Project Structure
   src/
  components/
  context/
  data/
  hooks/
  pages/
  types/
  App.tsx
  index.css
  main.tsx

7. Login
The application includes mock Admin and Student accounts for testing. Select a user from the login screen to access the dashboard.

Author : Amrapali Zade