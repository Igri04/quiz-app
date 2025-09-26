import { useState } from "react";
import questions from "../questions";
import results from "../results";


function Quiz() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [tagScores, setTagScores] = useState({
    software: 0,
    data: 0,
    AI: 0,
    cyber: 0,
    robotics: 0,
    ux: 0,
    devops: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  let currentQuestion;
  if (!showResult) {
    currentQuestion = questions[currentIndex];
  }

  function handleSelect(optionIdx) {
    setSelectedOption(optionIdx);
  }

  function handleNext() {
    if (selectedOption === null) return;
    const option = currentQuestion.options[selectedOption];
    const updatedScores = { ...tagScores };
    option.tags.forEach(tag => {
      updatedScores[tag] += 1;
    });
    setTagScores(updatedScores);

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  }

  let topTag = null;

  if (showResult) {
    let max = -1;
    for (const tag in tagScores) {
      if (tagScores[tag] > max) {
        max = tagScores[tag];
        topTag = tag;
      }
    }
  }

  return (
    <div>
      {showResult ? (
        <div>
          <h2>Your Recommended Career Path:</h2>
          <h3>{results[topTag].title}</h3>
          <p>{results[topTag].description}</p>
        </div>
      ) : (
        <div>
          <h2>{currentQuestion.question}</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {currentQuestion.options.map((option, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => handleSelect(index)}
                  style={{
                    padding: '0.7rem 1.5rem',
                    fontSize: '1rem',
                    borderRadius: '20px',
                    border: selectedOption === index ? '3px solid #ff512f' : '2px solid #fff',
                    background: selectedOption === index ? 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)' : 'rgba(255,255,255,0.1)',
                    color: selectedOption === index ? '#fff' : '#fff',
                    fontWeight: selectedOption === index ? 700 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {option.text}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            style={{
              padding: '0.7rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#fff',
              background: selectedOption !== null ? 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' : 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '30px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
              marginTop: '1.5rem',
              transition: 'background 0.2s, transform 0.2s'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz; 