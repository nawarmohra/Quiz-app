import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Quizinstructions = () => (
    <Fragment>
        <Helmet> <title>Programming assignment - Quiz App</title></Helmet>

        <div className="instructions container">
            <h1> How to Play the Game</h1>
            <p>Answer Corecctly and you'll get the points</p>
            <ul className="browser-default" id="main-list">
                <li>text1</li>
                <li>text2</li>
                <li>text2</li>
            </ul>
            <div>
                <span className="left"><Link to="/"> NO, Take me Back</Link></span>
                <span className="right"><Link to="/play/quiz"> YES, Let's Play</Link></span>
            </div>
        </div>
    </Fragment>
);

export default Quizinstructions;