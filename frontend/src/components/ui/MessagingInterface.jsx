import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import UserCard from './UserCard';
import useMessaging from '../../hooks/useMessaging';

const MessagingInterface = ({ className = '' }) => {
  const {
    conversations,
    activeConversation,
    messages,
    unreadCount,
    loading,
    error,
    fetchMessages,
    sendMessage,
    createConversation,
    markAsRead,
    deleteConversation,
    searchMessages,
    setActiveConversation
  } = useMessaging();

  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle conversation selection
  const handleSelectConversation = async (conversation) => {
    setActiveConversation(conversation);
    await fetchMessages(conversation.id);
    
    // Mark as read
    if (conversation.unreadCount > 0) {
      await markAsRead(conversation.id);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    try {
      await sendMessage(activeConversation.id, {
        content: newMessage.trim()
      });
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // Handle creating a new conversation
  const handleCreateConversation = async () => {
    if (selectedUsers.length === 0) return;
    
    try {
      const conversationData = {
        participants: selectedUsers.map(user => user.id),
        isGroup: selectedUsers.length > 1
      };
      
      const newConversation = await createConversation(conversationData);
      setActiveConversation(newConversation);
      setShowNewConversation(false);
      setSelectedUsers([]);
    } catch (err) {
      console.error('Error creating conversation:', err);
    }
  };

  // Format message timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      conv.title.toLowerCase().includes(query) ||
      conv.lastMessage?.content.toLowerCase().includes(query) ||
      conv.participants.some(p => 
        p.name.toLowerCase().includes(query) || 
        p.username.toLowerCase().includes(query)
      )
    );
  });

  if (loading && conversations.length === 0) {
    return (
      <div className={`flex justify-center items-center h-96 ${className}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-6 text-center ${className}`}>
        <div className="text-red-600 dark:text-red-400 font-medium mb-2">
          Error loading messages
        </div>
        <div className="text-red-500 dark:text-red-300 text-sm mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`flex h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Messages
            </h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <button
            onClick={() => setShowNewConversation(true)}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Message
          </button>
        </div>
        
        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No conversations yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Start a new conversation to connect with others.
              </p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 ${
                  activeConversation?.id === conversation.id 
                    ? 'bg-indigo-50 dark:bg-gray-750 border-l-4 border-l-indigo-500' 
                    : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {conversation.title}
                      </h3>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    {conversation.lastMessage && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm truncate mt-1">
                        {conversation.lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {conversation.lastMessage 
                      ? formatTime(conversation.lastMessage.createdAt) 
                      : formatTime(conversation.createdAt)}
                  </span>
                  {conversation.isGroup && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {conversation.participants.length} members
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  {activeConversation.title.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {activeConversation.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activeConversation.participants.length} participants
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => deleteConversation(activeConversation.id)}
                  className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Delete conversation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.isOwn ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {formatTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose a conversation from the list to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* New Conversation Modal */}
      {showNewConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  New Conversation
                </h3>
                <button
                  onClick={() => {
                    setShowNewConversation(false);
                    setSelectedUsers([]);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Select Participants
                </label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto">
                  {selectedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-2 mb-2">
                      <div className="flex items-center">
                        <img 
                          src={user.avatar || '/default-avatar.png'} 
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover mr-2"
                        />
                        <span className="text-gray-900 dark:text-white">{user.name}</span>
                      </div>
                      <button
                        onClick={() => setSelectedUsers(prev => prev.filter(u => u.id !== user.id))}
                        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  
                  {selectedUsers.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No participants selected
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowNewConversation(false);
                    setSelectedUsers([]);
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateConversation}
                  disabled={selectedUsers.length === 0}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  Create
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MessagingInterface;