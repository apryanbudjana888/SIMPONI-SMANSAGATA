import React from 'react';
import { StatCardColor, StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ value, label, color, icon }) => {
  const colorClasses = {
    [StatCardColor.Green]: { iconBg: 'bg-emerald-500' },
    [StatCardColor.Yellow]: { iconBg: 'bg-amber-500' },
    [StatCardColor.Red]: { iconBg: 'bg-red-500' },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      <div className={`p-3 rounded-full mr-4 ${colorClasses[color].iconBg}`}>
        <div className="h-8 w-8 text-white">
            {icon}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
