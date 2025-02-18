import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react';

const MessagingInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Smith',
      role: 'Teacher',
      content: "Hello class, I've uploaded the new materials for next week's lesson. Please review them before our session.",
      timestamp: '10:30 AM',
      status: 'read',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Thank you! I had a question about the third module. Could we discuss it during office hours?',
      timestamp: '10:32 AM',
      status: 'read',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 3,
      sender: 'John Smith',
      role: 'Teacher',
      content: 'Of course! My office hours are tomorrow from 2-4 PM. Feel free to drop by anytime.',
      timestamp: '10:35 AM',
      status: 'sent',
      avatar: '/api/placeholder/32/32'
    }
  ]);

  const [contacts] = useState([
    {
      id: 1,
      name: 'John Smith',
      role: 'Course Teacher',
      subject: 'Web Development',
      status: 'online',
      lastSeen: 'online',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Assistant Teacher',
      subject: 'UI/UX Design',
      status: 'offline',
      lastSeen: '2 hours ago',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 3,
      name: 'Michael Brown',
      role: 'Course Teacher',
      subject: 'Data Science',
      status: 'online',
      lastSeen: 'online',
      avatar: '/api/placeholder/32/32'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const timestamp = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      const message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: timestamp,
        status: 'sent',
        avatar: '/api/placeholder/32/32'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const getStatusIcon = (status : any) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex h-[600px] max-w-6xl mx-auto border rounded-lg overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r bg-gray-50">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search messages..."
              className="pl-10"
            />
          </div>
          
          <div className="space-y-2">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedContact.id === contact.id 
                    ? 'bg-blue-50' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.role}</p>
                    <p className="text-xs text-gray-400">{contact.subject}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="w-10 h-10 rounded-full"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                selectedContact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            </div>
            <div>
              <h2 className="font-medium">{selectedContact.name}</h2>
              <p className="text-sm text-gray-500">
                {selectedContact.status === 'online' ? 'Online' : `Last seen ${selectedContact.lastSeen}`}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'You' ? 'flex-row-reverse' : ''
              }`}
            >
              <img
                src={message.avatar}
                alt={message.sender}
                className="w-8 h-8 rounded-full"
              />
              <div className={`max-w-[70%] ${
                message.sender === 'You' ? 'items-end' : 'items-start'
              }`}>
                <div className={`rounded-lg p-3 ${
                  message.sender === 'You'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100'
                }`}>
                  {message.content}
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  {message.timestamp}
                  {message.sender === 'You' && getStatusIcon(message.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessagingInterface;