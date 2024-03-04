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

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit http://localhost:3000 to view the application.

### Available Scripts

- npm run dev: Start the development server.
- npm run build: Build the production-ready bundle.
- npm run serve: Serve the production build locally for testing.
- npm run lint: Run ESLint to check for linting errors.
- npm run format: Format code using Prettier.
