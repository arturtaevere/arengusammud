
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import App from './App.tsx'
import './index.css'

// Wrap in try/catch to help identify any startup errors
try {
  console.log("App starting...");
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Failed to find the root element");
  }
  
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log("App rendered successfully");
} catch (error) {
  console.error("Failed to start the application:", error);
  // Display error on screen for easier debugging
  document.body.innerHTML = `
    <div style="color: red; margin: 20px;">
      <h2>Application Failed to Load</h2>
      <p>${error instanceof Error ? error.message : String(error)}</p>
    </div>
  `;
}
