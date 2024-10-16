import React, { useState } from "react";
import { useAuth } from "../hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NewsFeed } from "../components/Dashboard";
import { Events } from "../components/Events";
import { ChatWindow } from "../components/Messaging";
import { PrivateRoute, SignIn, SignUp } from "../components/Authentication/";
import { Explore } from "../components/Dashboard";
import { Marketplace } from "../components/Marketplace";
const eventProps = {
  id: "1",
  title: "React Conference",
  date: "2024-08-24",
  time: "10:00 AM",
  location: "Online",
};
type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
};
export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Alice",
      content: "Hey, are you going to the BBQ tonight?",
      timestamp: new Date("2024-08-30T16:00:00"),
    },
    {
      id: "2",
      sender: "You",
      content: "Yes! I’ll be there.",
      timestamp: new Date("2024-08-30T16:05:00"),
    },
  ]);
  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      sender: "You",
      content,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<NewsFeed />} />
      <Route path="/feed" element={<NewsFeed />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route
        path="/signin"
        element={<SignIn onSignIn={() => {}} errorMessage="test" />}
      />

      {/* Private Routes */}
      <Route
        path="/events"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Events />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat"
        element={
          // <PrivateRoute isAuthenticated={isAuthenticated}>
          <ChatWindow
          // // currentUser="You"
          // messages={messages}
          // onSendMessage={handleSendMessage}
          // typingIndicator={true}
          />
          // </PrivateRoute>
        }
      />

      {/* 404 Route */}
      {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
    </Routes>
  );
};
