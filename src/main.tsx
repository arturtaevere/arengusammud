
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add enhanced error boundary for the entire app
const renderApp = () => {
  try {
    console.log('Starting to render the application...');
    const root = document.getElementById("root");
    
    if (!root) {
      console.error('Root element not found in the DOM');
      return;
    }
    
    // Check for any React or DOM related issues
    if (!createRoot) {
      console.error('React createRoot function is not available');
      return;
    }
    
    // Add window error listener to catch any uncaught errors
    window.addEventListener('error', (event) => {
      console.error('Uncaught error:', event.error);
    });
    
    // Add unhandled promise rejection listener
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
    
    console.log('Attempting to render the App component...');
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
          <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
        </div>
      `;
    }
  }
};

// Execute the render function
console.log('Initializing application...');
renderApp();
