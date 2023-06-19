import React from "react"
import Intro from "./Intro"
import Quiz from "./Quiz"
import he from "he"

export default function App() {
    
  const [startQuiz, setStartQuiz] = React.useState(false)
  const [data, setData] = React.useState([])
  const [questionData, setQuestionData] = React.useState([])
  const [quizElements, setQuizElements] = React.useState([])
  const [submitQuiz, setSubmitQuiz] = React.useState(false)
  const [playedGame, setPlayedGame] = React.useState(false)
    
    /* Pulling QAs from API */
  React.useEffect(() => {
      console.log('Component mounted');
      fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => {
          setData(data.results)
      })

      return () => {
        console.log('Component unmounted');
      }
  }, [])

    /* Start Quiz */
  function handleClick() {
      setStartQuiz(!startQuiz)
      setPlayedGame(false)
  }    
    
    // Create array with question and answers
  React.useEffect (() => {
    console.log("questionData updated")

    const questionsAndAnswers = data.map((item, index) => {

      const questionNumber = index + 1

      const allAnswers = item.incorrect_answers
      
      const indexForCorrectAnswer = Math.floor(Math.random() * (allAnswers.length + 1))

      allAnswers.splice(indexForCorrectAnswer, 0, item.correct_answer )

      return {
        number: questionNumber,
        question: item.question,
        answers: allAnswers,
        correct: item.correct_answer,
        selected: ""
      }
    }) 
    

    setQuestionData(questionsAndAnswers)

    return() => {
      console.log("questionData cleanup")
    }

  }, [data])

function clickedQuestion(e) {

  const value = e.target.value

  if (value === "submit" && !submitQuiz) {
    setSubmitQuiz(!submitQuiz)
    setPlayedGame(!playedGame)
  } else if (value==="submit" && playedGame){
    setPlayedGame(false)
    setSubmitQuiz(false); // Reset submitQuiz
    setQuestionData([]); // Reset questionData
    setQuizElements([]); // Reset quizElements
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  }
  
  const answersMap = questionData.map(question => {
    if (question.number === parseInt(value[0])) {
      return {
        ...question,
        selected: value.slice(1, )
      }
    } else {
      return question;
    }
  })

  setQuestionData(answersMap)

  }

  React.useEffect(() => {
    console.log("quizElements updated")

    const quizElems = questionData.map((elem, index) => (

      <Quiz 
        index={index}
        question={he.decode(elem.question)} 
        correct={elem.correct}
        answers={elem.answers}
        clickedQuestion={clickedQuestion}
        selected={elem.selected}
        submitQuiz = {submitQuiz}
      />
      
    ))

    setQuizElements(quizElems)

    return () => {
      console.log("quizElements cleanup")
    }

  }, [questionData])

  const correctFilter = questionData.filter (item => {
      if (item.selected === item.correct) {
        return item.selected
      }
  })

    return (
       <div className="app-container">
        <div className="blob1"></div>
        <div className="blob2"></div>
            {!startQuiz ? 
                <Intro handleClick={handleClick} /> : 
                  <div> 
                      {quizElements}
                      <div>
                        {submitQuiz && <h3>You scored {correctFilter.length}/5 correct answers</h3>}
                        <button 
                            className="submit" 
                            type="submit" 
                            value="submit" 
                            onClick={(e) => clickedQuestion(e)}>
                                {submitQuiz? "Play again" : "Check answers"}
                        </button>
                      </div>
                  </div>
            }
       </div>
    )
}
