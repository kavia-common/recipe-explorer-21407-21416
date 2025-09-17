# Recipe Explorer Frontend (Ocean Professional)

A modern, minimalist React app to browse, search, and manage recipes.

## Run

- npm start
- npm test
- npm run build

## Routes

- /recipes - main browsing page (add `?view=list` to switch layout)
- /signin - Sign In page (Figma-derived)

## Theme

Ocean Professional palette is defined in `src/App.css` via CSS variables.

## Assets

This app expects Figma-derived assets at `/assets/*`. Ensure your deployment copies repository-level `assets/` to `recipe_frontend/public/assets/`. The Sign In page loads:
- /assets/common.css
- /assets/sign-in-11-235.css
- /assets/sign-in-11-235.html
- /assets/app.js

## Integration

No backend calls included; ready for future integration by replacing the `recipes` array in `RecipesPage` with fetched data and wiring filters to query params.
