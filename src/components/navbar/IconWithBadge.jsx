import React from 'react';
import { Link } from 'react-router-dom';

/**
 * IconWithBadge - Icon link with badge counter
 * @param {string} to - Link destination
 * @param {ReactNode} icon - Icon to display
 * @param {number} count - Badge count
 */
const IconWithBadge = ({ to, icon, count }) => (
  <Link to={to} className="relative text-2xl hover:text-red-500 transition-colors">
    {icon}
    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
        {count > 99 ? '99+' : count}
      </span>
    )}
  </Link>
);

export default IconWithBadge;
