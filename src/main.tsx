
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add error boundary for the entire app
const renderApp = () => {
  try {
    console.log('Starting to render the application...');
    const root = document.getElementById("root");
    
    if (!root) {
      console.error('Root element not found in the DOM');
      return;
    }
    
    createRoot(root).render(<App />);
    console.log('Application rendered successfully');
  } catch (error) {
    console.error('Failed to render the application:', error);
    // Display a fallback UI for critical errors
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="font-family: sans-serif; padding: 20px; text-align: center;">
          <h2>Something went wrong</h2>
          <p>The application couldn't load properly. Please check the console for more details.</p>
        </div>
      `;
    }
  }
};

renderApp();
