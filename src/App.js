import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/quiz/play';
import Quizinstructions from './components/quiz/Quizinstructions'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/play/instructions" exact element={<Quizinstructions />} />
          <Route path="/play/Quiz" exact element={<Play />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
