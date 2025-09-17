import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

/**
 * Theme tokens are set in App.css. For future theming via .env or backend,
 * we leave a ThemeContext to toggle light/dark or apply dynamic palettes.
 */

// Theme context
const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: () => {}
});

// PUBLIC_INTERFACE
export function useTheme() {
  /** Hook to access and mutate theme. */
  return React.useContext(ThemeContext);
}

/**
 * Shell with navbar. Provides consistent layout.
 */
function Shell({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="brand" aria-label="Recipe Explorer Home">
            <div className="logo">R</div>
            <span>Recipe Explorer</span>
          </Link>
          <div className="nav-actions">
            <Link to="/recipes" className="btn" aria-label="Browse Recipes">Browse</Link>
            <button className="btn btn-amber" onClick={() => navigate('/recipes?view=grid')} aria-label="Grid View">Grid</button>
            <button className="btn" onClick={() => navigate('/recipes?view=list')} aria-label="List View">List</button>
            {location.pathname !== '/signin' ? (
              <Link to="/signin" className="btn btn-primary" aria-label="Sign In">Sign In</Link>
            ) : (
              <Link to="/recipes" className="btn" aria-label="Back to recipes">Enter App</Link>
            )}
          </div>
        </div>
      </nav>
      {children}
      <div className="footer-note">Ocean Professional • Blue & amber accents</div>
    </div>
  );
}

/**
 * Sidebar with simple filters/search controls.
 */
function SidebarFilters({ filters, onChange }) {
  return (
    <aside className="sidebar" aria-label="Filters">
      <div className="filter-section">
        <h3>Search</h3>
        <input
          className="input"
          type="search"
          placeholder="Search recipes..."
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
          aria-label="Search recipes"
        />
      </div>
      <div className="filter-section">
        <h3>Difficulty</h3>
        <select
          className="select"
          value={filters.difficulty}
          onChange={(e) => onChange({ ...filters, difficulty: e.target.value })}
          aria-label="Filter by difficulty"
        >
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="filter-section">
        <h3>Time (mins)</h3>
        <div className="row">
          <input
            className="input"
            type="number"
            min="0"
            placeholder="Min"
            value={filters.timeMin}
            onChange={(e) => onChange({ ...filters, timeMin: e.target.value })}
            aria-label="Minimum time"
          />
          <input
            className="input"
            type="number"
            min="0"
            placeholder="Max"
            value={filters.timeMax}
            onChange={(e) => onChange({ ...filters, timeMax: e.target.value })}
            aria-label="Maximum time"
          />
        </div>
      </div>
      <div className="filter-section">
        <button className="btn" onClick={() => onChange({ q: '', difficulty: '', timeMin: '', timeMax: '' })}>
          Clear Filters
        </button>
      </div>
    </aside>
  );
}

/**
 * Recipe card component
 */
function RecipeCard({ recipe, onOpen }) {
  return (
    <div className="card" role="article" aria-label={recipe.title}>
      <div className="card-media" aria-hidden="true">
        {recipe.title.substring(0, 1)}
      </div>
      <div className="card-body">
        <div className="badge" title="Category"><span>•</span>{recipe.category}</div>
        <h4 className="card-title">{recipe.title}</h4>
        <div className="card-meta">
          <span>{recipe.time}m</span>
          <span>{recipe.difficulty}</span>
        </div>
        <div className="card-actions">
          <button className="btn" onClick={() => onOpen(recipe)} aria-label={`Quick view ${recipe.title}`}>Quick View</button>
          <button className="btn btn-primary" onClick={() => onOpen(recipe)} aria-label={`Open ${recipe.title}`}>Open</button>
        </div>
      </div>
    </div>
  );
}

/**
 * Modal to show recipe details.
 */
function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Recipe details">
      <div className="modal">
        <div className="modal-head">
          <strong>{recipe.title}</strong>
          <button className="btn" onClick={onClose} aria-label="Close details">Close</button>
        </div>
        <div className="modal-body">
          <div className="row muted">
            <span>Category: {recipe.category}</span>
            <span>•</span>
            <span>Time: {recipe.time}m</span>
            <span>•</span>
            <span>Difficulty: {recipe.difficulty}</span>
          </div>
          <hr className="hr" />
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>
          <h4>Steps</h4>
          <ol>
            {recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}
          </ol>
        </div>
        <div className="modal-foot">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

/**
 * Recipes page: grid/list layout, sidebar filters, mock data only for layout.
 */
function RecipesPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const view = params.get('view') || 'grid';

  const [filters, setFilters] = React.useState({ q: '', difficulty: '', timeMin: '', timeMax: '' });
  const [openRecipe, setOpenRecipe] = React.useState(null);

  // Minimal static data to demonstrate layout (no mock backend)
  const recipes = React.useMemo(() => ([
    { id: 1, title: 'Lemon Garlic Salmon', category: 'Seafood', time: 25, difficulty: 'easy', ingredients: ['Salmon', 'Lemon', 'Garlic', 'Butter', 'Parsley'], steps: ['Preheat oven to 400F', 'Season salmon', 'Bake 12-15 mins'] },
    { id: 2, title: 'Spaghetti Carbonara', category: 'Pasta', time: 30, difficulty: 'moderate', ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Black Pepper'], steps: ['Cook pasta', 'Render pancetta', 'Temper eggs with pasta water', 'Combine'] },
    { id: 3, title: 'Grilled Chicken Bowl', category: 'Grill', time: 35, difficulty: 'easy', ingredients: ['Chicken', 'Rice', 'Veggies', 'Sauce'], steps: ['Marinate chicken', 'Grill', 'Assemble bowl'] },
    { id: 4, title: 'Vegetable Stir Fry', category: 'Vegan', time: 20, difficulty: 'easy', ingredients: ['Mixed Veg', 'Soy Sauce', 'Ginger', 'Garlic'], steps: ['Prep veggies', 'Stir fry', 'Add sauce'] },
    { id: 5, title: 'Beef Tacos', category: 'Mexican', time: 25, difficulty: 'easy', ingredients: ['Beef', 'Taco Shells', 'Lettuce', 'Cheese'], steps: ['Brown beef', 'Season', 'Assemble tacos'] },
    { id: 6, title: 'Pad Thai', category: 'Thai', time: 40, difficulty: 'hard', ingredients: ['Rice Noodles', 'Tamarind', 'Shrimp', 'Peanuts'], steps: ['Soak noodles', 'Stir fry sauce', 'Combine'] }
  ]), []);

  const filtered = recipes.filter(r => {
    if (filters.q && !r.title.toLowerCase().includes(filters.q.toLowerCase())) return false;
    if (filters.difficulty && r.difficulty !== filters.difficulty) return false;
    if (filters.timeMin && r.time < Number(filters.timeMin)) return false;
    if (filters.timeMax && r.time > Number(filters.timeMax)) return false;
    return true;
  });

  return (
    <Shell>
      <header className="container page-header">
        <h1 className="page-title">Discover Recipes</h1>
        <p className="page-subtitle">Browse, search, and manage your favorite dishes.</p>
      </header>
      <main className="container content">
        <SidebarFilters filters={filters} onChange={setFilters} />
        <section aria-label="Recipe results">
          {view === 'list' ? (
            <div style={{ display: 'grid', gap: 12 }}>
              {filtered.map(r => (
                <div key={r.id} className="card" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'stretch' }}>
                  <div className="card-media" aria-hidden="true">{r.title.substring(0,1)}</div>
                  <div className="card-body">
                    <div className="row">
                      <h4 className="card-title" style={{ marginRight: 'auto' }}>{r.title}</h4>
                      <span className="badge">{r.category}</span>
                    </div>
                    <div className="card-meta"><span>{r.time}m</span><span>{r.difficulty}</span></div>
                    <div className="card-actions">
                      <button className="btn" onClick={() => setOpenRecipe(r)}>Quick View</button>
                      <button className="btn btn-primary" onClick={() => setOpenRecipe(r)}>Open</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid">
              {filtered.map(r => <RecipeCard key={r.id} recipe={r} onOpen={setOpenRecipe} />)}
            </div>
          )}
        </section>
      </main>
      <RecipeModal recipe={openRecipe} onClose={() => setOpenRecipe(null)} />
    </Shell>
  );
}

/**
 * Sign-in page embedding Figma HTML/CSS within a React component.
 * We import assets from /assets and inject the HTML into the component safely.
 */
function SignInPage() {
  // Load the static HTML markup and styles
  // We will fetch the HTML and inject it. For CRA, public path works better,
  // but here we import as text via dynamic fetch from relative /assets.
  const [html, setHtml] = React.useState('');
  React.useEffect(() => {
    fetch('/assets/sign-in-11-235.html')
      .then(res => res.text())
      .then(setHtml)
      .catch(() => setHtml('<div style="padding:16px">Failed to load sign-in screen.</div>'));
  }, []);

  // Attach the small interactivity script after content mounts
  React.useEffect(() => {
    if (!html) return;
    const script = document.createElement('script');
    script.src = '/assets/app.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [html]);

  return (
    <Shell>
      <header className="container page-header">
        <h1 className="page-title">Welcome Back</h1>
        <p className="page-subtitle">Sign in to manage your recipes and collections.</p>
      </header>
      <div className="signin-frame">
        <div className="signin-card">
          {/* Inject CSS for the sign-in page */}
          <link rel="stylesheet" href="/assets/common.css" />
          <link rel="stylesheet" href="/assets/sign-in-11-235.css" />
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Shell>
  );
}

/**
 * Home page (redirects to /recipes)
 */
function Home() {
  return <Navigate to="/recipes" replace />;
}

/**
 * Root App with routing and theme provider.
 */
// PUBLIC_INTERFACE
function App() {
  /** Main entry for the Recipe Explorer frontend. Provides routing and theme. */
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<Navigate to="/recipes" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
