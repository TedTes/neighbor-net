import React, { useState, useEffect, useRef } from "react";

type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
};

type MessagingProps = {
  currentUser: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  typingIndicator?: boolean;
};

export const Messaging: React.FC<MessagingProps> = ({
  currentUser,
  messages,
  onSendMessage,
  typingIndicator = false,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messaging-container">
      <div className="message-list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === currentUser ? "my-message" : "their-message"
            }`}
          >
            <div className="message-sender">{msg.sender}</div>
            <div className="message-content">{msg.content}</div>
            <div className="message-timestamp">
              {msg.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        {typingIndicator && (
          <div className="typing-indicator">Someone is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          rows={2}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};
