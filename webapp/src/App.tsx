import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import TabsContent from "./Table";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<TabsContent />} />
    </Routes>
  );
}

export default App;
