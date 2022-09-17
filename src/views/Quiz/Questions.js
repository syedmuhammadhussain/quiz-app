import React from 'react'

const Questions = ({ setIsNext, setSelectedOption, currentQuestion, question, questions }) => {
    const handleAnswerOptionClick = (selectedOption, selectedQuestion) => {
        const questionIndex = questions.findIndex(x => x.id === selectedQuestion.id)
        const answerIndex = questions[questionIndex].answerOptions.findIndex(x => x.id === selectedOption.id)
        for (let index = 0; index < questions[questionIndex].answerOptions.length; index++) {
            questions[questionIndex].answerOptions[index].isSelected = false
        }
        questions[questionIndex].answerOptions[answerIndex].isSelected = true
        setIsNext(true)
        setSelectedOption(selectedOption.id)
    }

    return (
        <div>
            <div className='question-section'>
                <div className='question-count'>
                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{question && question.questionText}</div>
            </div>
            <div id='answers' className='answer-section'>
                {question && question.answerOptions.map((answerOption, index) => (
                    <button
                        key={index}
                        type='button'
                        className={`${answerOption.isSelected === true ? 'active' : ''}`}
                        onClick={() => handleAnswerOptionClick(answerOption, questions[currentQuestion])}
                    >{answerOption.answerText}</button>
                ))}
            </div>
        </div>
    )
}

export default Questions