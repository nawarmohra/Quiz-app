import React, {Component, Fragment} from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'

class QuizSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers:0,
            wrongAnswers:0,
            hintsUsed: 0,
            fiftyFiftyUsed: 0
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state) {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                hintsUsed: state.hintsUsed,
                fiftyFiftyUsed: state.fiftyFiftyUsed
            });
        }
    }

    render() {
        const { state } = this.props.location;
        let stats, remark;
        const useScore = this.state.score;

        if (useScore <= 30 ){
            remark = 'You need more practice!';
        } else if (useScore <= 30 && useScore <= 50){
            remark = 'Better luck next time!';
        } else if (useScore <= 70 && useScore <= 50) {
            remark = 'You can do better!';
        } else if (useScore <= 71 && useScore <= 84) {
            remark = 'You did greate!';
        } else {
            remark = 'You\'re an absolute genius!';
        }

        if (state !== undefined){
            stats = (
                <Fragment>
                <div className="quiz-container">
                    <div>
                        <span className="mdi mdi-check-circle-outline success-icon"></span>
                    </div>
                    <h1> Quiz has ended</h1>
                    <div className="container">
                        <h4>{remark}</h4>
                        <h2>Your score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total number of questions:</span>
                        <span className="right">{this.state.numberOfQuestions}</span><br />

                        <span className="stat left">Number of attempted questions:</span>
                        <span className="right">{this.state.numberOfAnsweredQuestions}</span><br />

                        <span className="stat left">Number of correct questions:</span>
                        <span className="right">{this.state.correctAnswers}</span><br />

                        <span className="stat left">Number of wrong questions:</span>
                        <span className="right">{this.state.wrongAnswers}</span><br />

                        <span className="stat left">Hints Used:</span>
                        <span className="right">{this.state.hintsUsed}</span><br /> 

                        <span className="stat left">50-50 Used:</span>
                        <span className="right">{this.state.fiftyFiftyUsed}</span><br /> 
                    </div>
                    <section className="buttons-setion">
                        <ul>
                            <li className="button-top">
                                <Link to ="/">Back to Home</Link>
                            </li>
                            <li className="button-down">
                                <Link to ="/play/quiz">Play Again</Link>
                            </li>
                        </ul>
                    </section>
                </div>
                </Fragment>
            );
        } else {
            stats = (
                <section>
                        <h1 className="no-stats">No statistics available</h1>
                        <ul>
                            <li>
                                <Link to ="/">Back to Home</Link>
                            </li>
                            <li>
                                <Link to ="/play/quiz">Play Again</Link>
                            </li>
                        </ul>
                </section>
                    );
        }

        return (
           <Fragment>
               <Helmet><title>Quiz App - Summary</title></Helmet>
               {stats}
           </Fragment>
        );
    }
}


export default QuizSummary;