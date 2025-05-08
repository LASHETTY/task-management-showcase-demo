
# Task Management Application

## Project Overview

This is a Task Management application that allows users to create, read, update, delete, and search tasks. The application is designed to demonstrate CRUD operations in a web interface.

## Features

- **Create**: Add new tasks with title, description, due date, status, and remarks
- **Read**: View task details and list all tasks
- **Update**: Edit existing task information
- **Delete**: Remove tasks from the system
- **Search**: Find tasks based on different criteria

## Technologies Used

This project is built with the following technologies based on the assignment requirements:

### Programming Language
- TypeScript (JavaScript superset)

### Database
- Browser LocalStorage (current implementation)
- Can be extended to use PostgreSQL, MySQL, or other RDBMS

### Frontend Technologies
- React (Web-based frontend framework)
- Vite (Build tool)
- Tailwind CSS (Utility-first CSS framework)
- shadcn-ui (Component library)
- Zod for form validation
- React Hook Form for form state management
- React Router DOM for navigation

## Project Structure

- `src/components`: UI components including TaskForm, TaskList
- `src/context`: Contains TaskContext for state management
- `src/pages`: Different views/pages of the application
- `src/types`: TypeScript types and interfaces
- `src/hooks`: Custom React hooks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory
   ```sh
   cd task-management-app
   ```

3. Install dependencies
   ```sh
   npm install
   ```

4. Start the development server
   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:8080`

## Build

To build the project for production:

```sh
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
