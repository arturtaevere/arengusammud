
import React from 'react';
import Navbar from '@/components/Navbar';
import FeedbackForm from '@/components/FeedbackForm';

const NewFeedback = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12">
        <FeedbackForm />
      </div>
    </div>
  );
};

export default NewFeedback;
