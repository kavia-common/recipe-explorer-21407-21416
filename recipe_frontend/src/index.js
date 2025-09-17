import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// PUBLIC_INTERFACE
function bootstrap() {
  /** Entrypoint: render the React application into #root. */
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

bootstrap();
