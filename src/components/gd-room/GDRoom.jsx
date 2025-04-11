import React from 'react';

const GDRoom = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold text-sky-600">00:45:00</div>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <span className="sr-only">Mute</span>
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <span className="sr-only">Raise Hand</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                <span className="sr-only">User</span>
              </div>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <span className="text-sm text-gray-500">Moderator</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-80 bg-white border-l">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Discussion Chat</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDRoom;