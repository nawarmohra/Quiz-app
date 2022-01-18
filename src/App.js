import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/quiz/play';
import Quizinstructions from './components/quiz/Quizinstructions'

function App() {
  return (
<Router>

<Switch>
<Route exact path="/" component={Home} />
<Route path="/play/instructions" exact component={Quizinstructions} />
    <Route path="/play/Quiz" exact component={Play} />

</Switch>

</Router>
  )
}

export default App;
