import React from "react"

export default function Intro(props) {
    return (
        <div className="intro-container">
            <h1 className="title">Quizzical</h1>
            <p className="description">Answer 5 questions and win!</p>
            <button className="quiz-start" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}