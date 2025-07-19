import React from 'react';

const CustomSpinner = () => {
  return (
    <div className="flex">
      <div className="relative">
        {/* Spinning Ring */}
        <div className="w-16 h-16 border-4 border-orange-500 border-y-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default CustomSpinner;



