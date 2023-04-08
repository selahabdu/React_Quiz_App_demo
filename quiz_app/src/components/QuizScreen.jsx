import { useState } from "react";
import QuestionsList from "../data/questions.json";
import Question from "./Question";
import QuizResult from "./QuizResult";

function QuizScreen({ retry }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(QuestionsList.length)
  );
  const isQuestionEnd = currentQuestionIndex === QuestionsList.length;

  function calculateResult() {
    let correct = 0;
    QuestionsList.forEach((question, index) => {
      if (question.correctOptionIndex == markedAnswers[index]) {
        correct++;
      }
    });
    return {
      total: QuestionsList.length,
      correct: correct,
      percentage: Math.trunc((correct / QuestionsList.length) * 100),
    };
  }

  return (
    <div className="quiz-screen">
      {isQuestionEnd ? (
        <QuizResult result={calculateResult()} retry={retry} />
      ) : (
        <Question
          question={QuestionsList[currentQuestionIndex]}
          totalQuestions={QuestionsList.length}
          currentQuestion={currentQuestionIndex}
          setAnswer={(index) => {
            setMarkedAnswers((arr) => {
              let newArr = [...arr];
              newArr[currentQuestionIndex - 1] = index;
              return newArr;
            });
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }}
        />
      )}
    </div>
  );
}
export default QuizScreen;
