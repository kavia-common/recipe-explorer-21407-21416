This folder exposes static assets for the application at runtime.
The build will serve files in this directory at /assets/*.

Place the provided Figma-derived assets (already present at repository root assets/) into this public path during build step.
For this template, we rely on the repository's /assets folder mounted to /public/assets by the environment.
If not available, ensure your deployment copies the assets folder into recipe_frontend/public/assets.
