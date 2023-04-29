import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
    const [questions,setQuestions] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then((questions) => setQuestions(questions))
    .catch((error) => console.log(error,"error"))

  },[])
  
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "POST",
      headers: { 
        "Content-Type": "application/json" ,
      },

    body: JSON.stringify({
  "prompt": "",
  "answers": [],
  "correctIndex": "",
})
    })
    .then((resp) => resp.json())
    .then(() => {
      const updatedItems = questions.filter((question) => question.id !== id)
      setQuestions(updatedItems)
    })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json" ,
      },
      body: JSON.stringify({
  "correctIndex": "",
})})
  .then((resp) => resp.json())
  .then((updatedQuestions) => {
      const updatedItems = questions.map((question) => {
        if(question.id === updatedQuestions.id) return updatedQuestions;
        return question;
      })
      setQuestions(updatedItems)
    })
}
  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questions.map((question) => (
       <QuestionItem key={question.id} question={question} onDelete={handleDelete} onAnswerChange={handleAnswerChange}/>
))}
      </ul>
    </section>
  );
}

export default QuestionList;
