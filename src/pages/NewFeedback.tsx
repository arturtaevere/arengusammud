
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewFeedback = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the observations page
    navigate('/observations');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
};

export default NewFeedback;
