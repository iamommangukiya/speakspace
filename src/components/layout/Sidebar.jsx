import React from 'react';

const Sidebar = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Join GD', href: '/gd' },
    { name: 'Resume Tips', href: '/resume' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'History', href: '/history' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;