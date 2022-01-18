import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Quizinstructions = () => (
  <Fragment>
    <Helmet>
      {" "}
      <title>Programming assignment - Quiz App</title>
    </Helmet>

    <div className="instructions container">
      <h1> How to Play the Game</h1>
      <h5>Answer Corecctly and you'll get the points</h5>
      <ul className="browser-default" id="main-list">
        <li>
            <p>
            When the game begins, the player is presented with ten questions, one
            by one, from a pool of more than ten questions. The questions are to
            be presented in a random order, but the player should not receive the
            same question twice until all the other questions have been answered.
            A question can have a text or an image, and four alternative answers.
            Only one of the answers is correct. The player has 15 seconds to
            answer each question. The remaining time should be visible to the
            player. When the time is up for a question, that question is
            considered unanswered. The player has two lifelines, one called
            “50/50” that removes two incorrect answers, and one called “+10 s”
            that gives the player ten extra seconds for the current question. Each
            lifeline can only be used once during a game. Once the player has
            answered all questions (or run out of time) a summary
            </p>
        </li>
      </ul>
      <div>
        <span className="left button">
          <Link to="/"> NO, Take me Back</Link>
        </span>
        <span className="right button">
          <Link to="/play/quiz"> YES, Let's Play</Link>
        </span>
      </div>
    </div>
  </Fragment>
);

export default Quizinstructions;
