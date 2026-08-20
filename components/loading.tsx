'use client';

import React from 'react';
import '../styles/globalStyles.css'; // Add custom styles for loading page

const Loading = () => {
  return (
    <div className="loading-container">
      <h2 className="text-4xl font-bold mb-4">Loading Assets</h2>
      <div className="loading-icon"></div>
    </div>
  );
};

export default Loading;
