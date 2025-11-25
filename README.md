# Calculator

## Task

[Project Requirements](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0#heading=h.5dt3hghpa22f)

## How to run the app

### Install dependencies

npm install

### Run in development mode

npm run dev

### Build project

npm run build

Built files will appear in the `dist/` folder

### Code linting

npm run lint

## Folder Structure

### `/src` - Application source code

- **`/ts`** - TypeScript files (calculator logic, event handlers, utilities)
- **`/scss`** - SCSS styles (variables, calculator styles, themes, reset styles)
- **`index.html`** - Main HTML file

### `/dist` - Built files (generated automatically)

- Production-ready HTML and JS files

### `/css` - Compiled CSS files

- Result of SCSS to CSS compilation

### Other files

- **`webpack.config.cjs`** - Webpack bundler configuration
- **`tsconfig.json`** - TypeScript settings
- **`eslint.config.mjs`** - ESLint linter configuration
- **`.prettierrc`** - Code formatting settings
- **`.husky`** - Git hooks for automatic code checking
