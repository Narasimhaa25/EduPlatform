import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { quizData } from '../data/QuizData';
import './Quiz.css';

const Quiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quizData[courseId]) {
      setQuestions(quizData[courseId]);
    } else {
      navigate('/quizzes');
    }
  }, [courseId, navigate]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const goBack = () => {
    navigate('/quizzes');
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz">
      <div className="container">
        {showScore ? (
          <motion.div 
            className="score-section"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Quiz Completed!</h2>
            <p>You scored {score} out of {questions.length}</p>
            <p>Percentage: {((score / questions.length) * 100).toFixed(2)}%</p>
            <button onClick={resetQuiz} className="btn btn-primary">Retake Quiz</button>
            <button onClick={goBack} className="btn btn-secondary">Back to Quizzes</button>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="question-section"
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Question {currentQuestion + 1}/{questions.length}</h2>
              <p>{questions[currentQuestion].question}</p>
            </motion.div>
            <motion.div 
              className="answer-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="btn btn-secondary"
                >
                  {option}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;

