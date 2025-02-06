export const ChatBot = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <div 
      className={`fixed inset-0 z-50 bg-black/20 transition-opacity
        ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div 
        className={`absolute bottom-20 right-4 md:bottom-24 md:right-6 
          w-[calc(100vw-2rem)] max-w-[400px] h-[600px] md:h-[650px] 
          max-h-[80vh] bg-white rounded-lg shadow-xl
          transition-transform  transform overflow-hidden
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <iframe 
          src="https://typebot.co/customer-support-9j5k20i" 
          className="w-full h-full  border-none"
          title="Customer Support Chat"
        />
      </div>
    </div>
  );
};
