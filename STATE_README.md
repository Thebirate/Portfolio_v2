# Portfolio_v2

This is a personal portfolio website built with React, TypeScript, and Vite.

## Project Structure

The project is structured as follows:

```
/
├── public/
│   ├── vite.svg
│   └── images/
│       ├── crdsrvl.png
│       ├── dsasterrecoveryactch.png
│       ├── eventdriven.png
│       └── threetieratch.png
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Projects.tsx
│   │   └── SpotifyPlayer.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Components

The project is made up of the following components:

*   `Header.tsx`: The header of the portfolio.
*   `Projects.tsx`: A component to display projects.
*   `SpotifyPlayer.tsx`: A component to play music from Spotify.
*   `Footer.tsx`: The footer of the portfolio.

## Styling

The project is styled using Tailwind CSS. The configuration file is `tailwind.config.js`. There are also some global styles in `src/index.css` and component-specific styles in `src/App.css`.

## Packages and Dependencies

The project uses the following packages and dependencies:

*   **React**: A JavaScript library for building user interfaces.
*   **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
*   **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

### Dependencies

*   `react`
*   `react-dom`

### Dev Dependencies

*   `@types/react`
*   `@types/react-dom`
*   `@typescript-eslint/eslint-plugin`
*   `@typescript-eslint/parser`
*   `eslint`
*   `eslint-plugin-react-hooks`
*   `eslint-plugin-react-refresh`
*   `typescript`
*   `vite`
*   `@vitejs/plugin-react`
*   `autoprefixer`
*   `postcss`
*   `tailwindcss`

## How to run the project

1.  Install the dependencies:
    ```
    npm install
    ```
2.  Start the development server:
    ```
    npm run dev
    ```
