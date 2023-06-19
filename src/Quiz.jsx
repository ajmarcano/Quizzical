import React from "react"
import he from "he"

export default function Quiz(props) {
    
    
    const questionAnswersMap = props.answers.map((answer, index) => {
    
    const isSelected = answer === props.selected;
    
    console.log(props.selected, props.correct, props.selected === props.correct)

    const getBackgroundColor = () => {
        
        if (props.submitQuiz && isSelected && props.selected === props.correct) {
            return "#94D7A2" //green
        } else if (props.submitQuiz && isSelected && props.selected != props.correct) {
            return "#F8BCBC" //red
        } else if (props.submitQuiz && !isSelected && answer === props.correct) {
            return "#94D7A2" //green
        } else if (!isSelected && props.submitQuiz && props.selected !== props.correct) {
            return "transparent"
        } else if (!props.submitQuiz && isSelected) {
            return "#D6DBF5" //blue
        }
        else {
            return "transparent";
        }
    };

    const getborder = () => {
        
        if (props.submitQuiz && isSelected && props.selected === props.correct) {
            return "solid 1px #94D7A2" //green
        } else if (props.submitQuiz && isSelected && props.selected != props.correct) {
            return "solid 1px #F8BCBC" //red
        } else if (props.submitQuiz && !isSelected && answer === props.correct) {
            return "solid 1px #94D7A2" //green
        } else if (!isSelected && props.submitQuiz && props.selected !== props.correct) {
            return "solid 1px #4D5B9E" //blue
        } else if (!props.submitQuiz && isSelected) {
            return "solid 1px #D6DBF5"
        }
        else {
            return "solid 1px #4D5B9E";
        }
    };

    const getOpacity = () => {
        if (props.submitQuiz && isSelected && props.selected === props.correct) {
            return "#293264"
        } else if (props.submitQuiz && isSelected && props.selected != props.correct) {
            return "0.5"
        } else if (props.submitQuiz && answer != props.correct) {
            return "0.5"
        }
    }

    console.log(props.selected)
        
     const styles = {
        backgroundColor: getBackgroundColor(),  
        color: "#293264",
        opacity: getOpacity(),
        border: getborder()
    } 
        return (

            <div className='question-answer' key={index}>
                <button 
                    className="answer-buttons"
                    value={`${props.index + 1}${answer}`}
                    onClick={(event) => props.clickedQuestion(event)}
                    style={styles}
                >
                    {he.decode(answer)}
                </button>
            </div>
        )
    })
    
    return (
        <div className="quiz-container">
            <h2 className="quiz-question">{props.question}</h2>
            <div className="answers-container">
                {questionAnswersMap}
            </div>
            <hr className="divisions"/>
        </div>
    )
}