import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import ResumeProcessor from './components/ResumeProcessor';

function App() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setIsClient(typeof window !== 'undefined');
  }, []);

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="App">
      {isClient && (
        <BrowserRouter>
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <Navbar />
            <main>
              <ResumeProcessor />
            </main>
          </GoogleOAuthProvider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;