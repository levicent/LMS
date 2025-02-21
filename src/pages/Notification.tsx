import { useState } from 'react';
import { Bell, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'New chapter added to "Advanced React Patterns"',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      message: 'You have successfully enrolled in "Python for Beginners"',
      time: '1 day ago',
      read: true,
    },
    {
      id: 3,
      message: 'Your next live session for "Data Structures" starts in 1 hour',
      time: '3 hours ago',
      read: false,
    },
    {
      id: 4,
      message: 'Instructor replied to your question in "Web Development"',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 5,
      message: 'Completed 5 courses! Keep up the great work!',
      time: '2 days ago',
      read: true,
    }
  ]);

  //@ts-ignore
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleBack = () => {
    navigate(-1); // Goes back to previous page
  };

  return (
    <>
    <div className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/* Blur SVG Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <svg className="absolute w-full h-full opacity-30" viewBox="0 0 1000 1000">
          <defs>
            <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
            </filter>
          </defs>
          <g filter="url(#blur)">
            <circle cx="300" cy="300" r="200" fill="#60A5FA" />
            <circle cx="700" cy="400" r="250" fill="#34D399" />
            <circle cx="500" cy="700" r="180" fill="#A78BFA" />
          </g>
        </svg>
      </div>

      {/* Glassmorphism Header */}
      <div className="sticky top-0 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm z-10 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-2xl mx-auto p-4 flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="hover:bg-white/30 p-2 rounded-full transition-all duration-300 active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Notifications</h1>
        </div>
      </div>

      {/* Notifications Container */}
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 backdrop-blur-sm bg-white/40 rounded-2xl">
            <Bell className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="flex justify-between items-start gap-3 group animate-fade-in"
            >
              <div className="flex-1">
                <div 
                  className={`relative p-4 rounded-2xl max-w-full break-words
                    transition-all duration-300 hover:shadow-lg
                    ${notification.read 
                      ? 'backdrop-blur-sm bg-white/40 hover:bg-white/60' 
                      : 'backdrop-blur-sm bg-blue-50/70 hover:bg-blue-50/90'
                    }`}
                >
                  <p className="text-gray-800">{notification.message}</p>
                  <span className="text-xs text-gray-500 mt-2 block dark:text-white">
                    {notification.time}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteNotification(notification.id)}
                className="p-1 opacity-0 group-hover:opacity-100  hover:bg-red-700 rounded-full
                  transition-all duration-300 backdrop-blur-sm"
                aria-label="Delete notification"
              >
                <X className="w-4 h-4 text-white dark:text-gray-400" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default NotificationPage;