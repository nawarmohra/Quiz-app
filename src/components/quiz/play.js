import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import M from "materialize-css";
import questions from "../../questions.json";
import isEmpty from "../../utils/is-empty";
import correctNotification from "../../assets/audio/correct-answer.mp3";
import wrongNotification from "../../assets/audio/wrong-answer.mp3";
import buttonNotification from "../../assets/audio/button-sound.mp3";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
      time: {},
    };
    this.interval = null;
  }

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } =
      this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    this.startTimer();
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        numberOfQuestions: questions.length,
        answer,
      },() => {
        this.showOptions();
        this.handleDisableButton();
    });
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      setTimeout(() => {
        document.getElementById("correct-sound").play();
      }, 500);
      this.correctAnswer();
    } else {
      setTimeout(() => {
        document.getElementById("wrong-sound").play();
      }, 500);
      this.wrongAnswer();
    }
  };

  handelNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handelPreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };
  
  handelQuitButtonClick = () => {
    this.playButtonSound();
    
    if (window.confirm('Are You Sure You Want To Exit The Quiz?')) {
        this.props.history.push('/');
    }
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handelNextButtonClick();
        break;

      case "previous-button":
        this.handelPreviousButtonClick();
        break;

      case "quit-button":
        this.handelQuitButtonClick();
        break;

      default:
        break;
    }
  };

  playButtonSound = () => {
    document.getElementById("button-sound").play();
  };

  correctAnswer = () => {
    M.toast({
      html: "correct Answer",
      classes: " toast-valid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        this.displayQuestions(
          this.state.questions,
          this.state.currentQuestion,
          this.state.nextQuestion,
          this.state.previousQuestion
        );
      }
    );
  };

  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: "wrong Answer",
      classes: " toast-invalid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        this.displayQuestions(
          this.state.questions,
          this.state.currentQuestion,
          this.state.nextQuestion,
          this.state.previousQuestion
        );
        this.startTimer();
      }
    );
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));

    options.forEach(option => {
        option.style.visibility = 'visible';
    });
}

handelHints = () => {
    if (this.state.hints > 0) {
        const options = Array.from(document.querySelectorAll('.option'));
        let indexofAnswer;

        options.forEach((option, index) => {
            if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                indexofAnswer = index;
            }
        });

        while (true) {
            const randomNumber = Math.round(Math.random() * 3);
            if (randomNumber !== indexofAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
                options.forEach((option, index) => {
                    if (index === randomNumber) {
                        option.style.visibility = 'hidden';
                        this.setState((prevState) => ({
                            hints: prevState.hints - 1,
                            previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                        }));
                    }
                });
                break;
            }
            if (this.state.previousRandomNumbers.length >= 3) break;
        }   
    }
}

handelFiftyFifty = () => {
  if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
    const options = document.querySelectorAll('.option');
    const randomNumbers = [];
    let indexofAnswer;

    options.forEach((option, index) => {
      if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
        indexofAnswer = index;
      }
    });

    let count = 0;
    do {
      const randomNumber = Math.round(Math.random() * 3);
      if (randomNumber !== indexofAnswer){
        if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexofAnswer));
        randomNumbers.push(randomNumber);
        count ++;
      } else {
         while (true) {
           const newRandomNumber = Math.round(Math.random() * 3);
           if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexofAnswer)){
             randomNumbers.push(newRandomNumber);
             count ++;
             break;
           }
        }
      }
    } while (count < 2);
    options.forEach((option, index) => {
      option.style.visibility = 'hidden';
    });
    this.setState(prevState => ({
      fiftyFifty: prevState.fiftyFifty - 1,
      usedFiftyFifty: true
    }));
  }
}

  startTimer = () => {
    const countDownTime = Date.now() + 180000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            }
          }, () => {
            alert('Time has ended!');
            this.props.history.push('/');
          }
        );
      } else {
        this.setState({
          minutes,
          seconds,
        });
      }
    }, 1000);
  }

  handleDisableButton = () => {
    if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0){
      this.setState({
        previousButtonDisabled: true
      });
    } else {
      this.setState({
        previousButtonDisabled: false
      });
    }

    if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions){
      this.setState({
        previousButtonDisabled: true
      });
    } else {
      this.setState({
        nextButtonDisabled: false
      });
    }

  }


  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      //correctAnswers,
      numberOfQuestions,
      hints,
      fiftyFifty,
      time
    } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>Programming assignment - Quiz Page</title>
        </Helmet>
        <Fragment>
          <audio id="correct-sound" src={correctNotification}></audio>
          <audio id="wrong-sound" src={wrongNotification}></audio>
          <audio id="button-sound" src={buttonNotification}></audio>
        </Fragment>
        <div className="questions">
          <div className="lifeline-container">
            <p>
              <span onClick={this.handelFiftyFifty} className="mdi mdi-set-center mdi-24px lifeline-icon">
                <span className="lifeline">{fiftyFifty}</span>
              </span>
            </p>
            <p>
              <span onClick={this.handelHints} className="mdi mdi-lightbulb mdi-24px lifeline-icon">
                <span>{hints}</span>
              </span>  
            </p>
          </div>
          <div className="timer-container">
            <p>
              <span className="left">
                {currentQuestionIndex + 1}/{numberOfQuestions}
              </span>
              <span className="right">{time.minutes}:{time.seconds}
                <span className="mdi mdi-clock-outline mdi-24px"></span>
              </span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>
          <div className="option-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionA}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="option-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionC}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
            </p>
          </div>
          <div className="button-container">
            <button 
              //className={classnames('', {'disable': this.state.previousButtonDisabled})}
              id="previous-button"  
              onClick={this.handleButtonClick}>
              Previous
            </button>
            <button 
              id="next-button" 
              onClick={this.handleButtonClick}>
              Next
            </button>
            <button id="quit-button" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Play;
