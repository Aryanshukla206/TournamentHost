import React from 'react';

const StatsCard = ({ title, value, icon, bgColor = 'bg-primary-50', textColor = 'text-primary-700' }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className={`${bgColor} p-3 rounded-lg mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-neutral-600 text-sm">{title}</p>
          <p className={`text-2xl font-bold ${textColor} mt-1`}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;