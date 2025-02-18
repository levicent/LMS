import  { useState } from 'react';
import {  Hand, Mic, Video, Settings, Share2, MoreVertical, Send } from 'lucide-react';
interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  isTeacher: boolean;
}

interface Participant {
  id: string;
  name: string;
  role: string;
  isTeacher: boolean;
  isSpeaking: boolean;
}
export const LiveStreamInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      user: "Dr. Smith",
      message: "Welcome everyone to today's session on Advanced Mathematics",
      timestamp: "10:00 AM",
      isTeacher: true
    },
    {
      id: "2",
      user: "John Doe",
      message: "Thanks professor, excited for today's lecture!",
      timestamp: "10:01 AM",
      isTeacher: false
    }
  ]);

  const [participants] = useState<Participant[]>([
    {
      id: "1",
      name: "Dr. Smith",
      role: "Professor",
      isTeacher: true,
      isSpeaking: true
    },
    {
      id: "2",
      name: "John Doe",
      role: "Student",
      isTeacher: false,
      isSpeaking: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTeacher: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 p-4 flex items-center justify-between">
            <div>
              <h1 className="text-white text-lg font-semibold">Advanced Mathematics - Live Session</h1>
              <p className="text-gray-400 text-sm">Dr. Smith • Live Now</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video Area */}
          <div className="flex-1 bg-black relative">
            {/* Video stream container with aspect ratio */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Placeholder or actual video stream would go here */}
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-400">Live Stream Content</p>
                </div>
              </div>
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center justify-center gap-4">
                <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                  <Mic className="w-5 h-5" />
                </button>
                <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                  <Video className="w-5 h-5" />
                </button>
                <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                  <Hand className="w-5 h-5" />
                </button>
                <button className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-800 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => {
                setIsChatOpen(true);
                setIsParticipantsOpen(false);
              }}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                isChatOpen ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => {
                setIsChatOpen(false);
                setIsParticipantsOpen(true);
              }}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                isParticipantsOpen ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
              }`}
            >
              Participants
            </button>
          </div>

          {/* Chat Messages */}
          {isChatOpen && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${message.isTeacher ? 'text-blue-400' : 'text-gray-300'}`}>
                        {message.user}
                      </span>
                      <span className="text-gray-500 text-xs">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{message.message}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Participants List */}
          {isParticipantsOpen && (
            <div className="flex-1 overflow-y-auto p-4">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        participant.isTeacher ? 'text-blue-400' : 'text-gray-300'
                      }`}>
                        {participant.name}
                      </p>
                      <p className="text-gray-500 text-xs">{participant.role}</p>
                    </div>
                  </div>
                  {participant.isSpeaking && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
