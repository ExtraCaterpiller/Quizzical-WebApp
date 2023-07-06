import React from "react"

function Abc(){
  const [quiz, setQuiz] = React.useState([])
  const Data = []

  React.useEffect(function (){
    fetch("https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple&encode=url3986")
        .then(res => res.json())
        .then(data => setQuiz(data))
  }, [])

  const {results} = quiz || []
   
  for(let i=0; i<results.length; i++){
    const question = decodeURIComponent(results[i].question)
    const correct_answer = decodeURIComponent(results[i].correct_answer)
    const incorrect_answers = results[i].incorrect_answer.map(answer => decodeURIComponent(answer))
    Data.push({
      question : question,
      choices : incorrect_answers,
      correct_answer : correct_answer
    }
    )
    Data[i].choices.push(correct_answer)
  }
  return Data
}

export default Abc