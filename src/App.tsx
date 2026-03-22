import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componente de tela branca absoluta
const BlankPage = () => <div className="min-h-screen bg-white" />;

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<BlankPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;