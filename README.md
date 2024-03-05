# B7-Locator Frontend with React and Typescript

## Project Structure

- `src`: Contains the source code for the React application.

  - `config/axios`: Configuration for Axios, including backend URL.
  - `authentication`: Manages the user state using `UserProvider`.
  - `components`: Reusable UI components.
  - `routes/sections`: Contains sections of the application, organize routes.
  - `pages`: React components representing different pages/routes of the application.
  - `section`: Page views with API folder inside.
  - `utils`: Utility functions for handling other data-related tasks.
  - `App.tsx`: Main application component.
  - `index.tsx`: Entry point of the application.

- `public`: Contains static assets like images, fonts, etc.
- `vite.config.ts`: Configuration file for Vite.
- `global.d.ts`: Type declaration file for global types or interfaces.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/daptheHuman/b7-locator-front-end/
   ```

2. Navigate to the project directory:

   ```bash
   cd b7-locator-front-end
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Environment Variables

To configure environment-specific variables, you can use a `.env` file in the root directory of the project.

### `.env` Configuration

- `VITE_APP_BACKEND_URL`: The URL of the backend API server.

### Creating or Updating the `.env` File

1. If you haven't already, create a copy of the provided `.env.sample` file:

   ```bash
   cp .env.sample .env
   ```

2. Open the `.env` file in a text editor.

3. Add or update the variable with the appropriate value

4. Save the changes to the `.env` file.

## Running the Application

After setting up the `.env` file with the desired variable, you can run the development server as usual:

```bash
npm run dev
```

This will start the development server with the specified backend URL. Any API requests made from the frontend will be directed to this URL.

### Available Scripts

- npm run dev: Start the development server.
- npm run build: Build the production-ready bundle.
- npm run serve: Serve the production build locally for testing.
- npm run lint: Run ESLint to check for linting errors.
- npm run format: Format code using Prettier.
