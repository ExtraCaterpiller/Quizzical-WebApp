import React from "react";
import { BounceLoader } from "react-spinners";

function Quiz(){
    const [activeQuestion, setActivequestion] = React.useState(0)
    const [selectedAnswer, setSelectedAnswer] = React.useState('')
    const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState(null)
    const [showResult, setShowResult] = React.useState(false)
    const [quiz, setQuiz] = React.useState()
    const data = []
    const [result, setResult] = React.useState({
        score: 0,
        correctAnswer: 0,
        wrongAnswer: 0,
    })

    React.useEffect(function (){
        fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple&encode=base64")
            .then(res => res.json())
            .then(data => setQuiz(data))
    }, [])

    if(!quiz){
        return <div className="loading">
                    <div className="loading--box">
                    <BounceLoader
                            size={60}
                            color="#36d7b7" />
                    </div>
                </div>
    }

    const {results} = quiz || []

    for(let i=0; i<results.length; i++){
        const question = atob(results[i].question)
        const correct_answer = atob(results[i].correct_answer)
        const incorrect_answers = results[i].incorrect_answers.map(answer => atob(answer))
        data.push({
          "question" : question,
          "choices" : incorrect_answers,
          "correct_answer" : correct_answer
        })
        data[i].choices.push(correct_answer)
    }

    const onClickNext = () =>{
        setSelectedAnswerIndex(null)
        setResult(prev => 
            selectedAnswer ? {
                ...prev,
                score: prev.score + 5,
                correctAnswer : prev.correctAnswer +1
            } :
            {
                ...prev,
                wrongAnswer : prev.wrongAnswer +1
            }
            )
        if(activeQuestion !== data.length -1){
            setActivequestion(prevNum => prevNum +1)
        } else {
            setActivequestion(0)
            setShowResult(true)
        }
    }

    const {question, choices, correct_answer} = data[activeQuestion]


    const onAnswerSelected = (item, index) => {
        if (item === correct_answer){
            setSelectedAnswer(true)
            console.log('right')
        } else {
            setSelectedAnswer(false)
            console.log('wrong')
        }
        setSelectedAnswerIndex(index)
    }

    const addLeadingZero = (number) => number>9 ? number : `0${number}`

    return (
            <div className="quiz-container">
                {!showResult ? (
                    <div className="quiz">
                        <div className="number">
                        <span className="quiz--number">{addLeadingZero(activeQuestion + 1)}</span>
                        <span className="quiz--total">/{data.length}</span>
                        </div>
                        <h1 className="quiz--question">{decodeURIComponent(data[activeQuestion].question)}</h1>
                        <h3 className="quiz--answers">{choices.map((item, index) => {
                            return <button className={selectedAnswerIndex === index ? "quiZ--item-1" : null } onClick={() => onAnswerSelected(item, index)} key={item}>{item}</button>
                        })}</h3>
                        <button className="quiz--button" onClick={onClickNext} disabled={selectedAnswerIndex === null}>{activeQuestion === data.length-1? "Finish" : "Next"}</button>
                    </div>
                ) : (
                    <div className="result">
                        <div className="result--box">
                            <h3 className="result--title">Result</h3>
                            <div className="result--socond-box">
                                <p>
                                    Total Question: <span>{data.length}</span>
                                </p>
                                <p>
                                    Total Score:<span> {result.score}</span>
                                </p>
                                <p>
                                    Correct Answers:<span> {result.correctAnswer}</span>
                                </p>
                                <p>
                                    Wrong Answers:<span> {result.wrongAnswer}</span>
                                </p>
                            </div>
                        </div>   
                    </div>
                )}
            </div>
    )
}


export default Quiz