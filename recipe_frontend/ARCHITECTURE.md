# Recipe Explorer Frontend

- Theme: Ocean Professional (blue and amber accents), implemented via CSS variables in src/App.css.
- Routing:
  - /recipes: Main browsing page with sidebar filters and grid/list toggle via `?view=grid|list`.
  - /signin: Sign-in screen using Figma-derived HTML/CSS/JS from /assets.
  - /: redirects to /recipes.
- Components:
  - Navbar with brand and actions.
  - SidebarFilters: search, difficulty, and time range inputs.
  - RecipeCard: card layout.
  - RecipeModal: modal dialog for details.
- Data: Minimal static array strictly for layout; no mock backend APIs included.
- Assets:
  - Figma sign-in assets are requested from `/assets/*`. Ensure these are served from `public/assets` in deployment.
- Extensibility:
  - ThemeContext ready for future dynamic theming.
  - Replace static `recipes` with API integration; wire filters to backend queries.
