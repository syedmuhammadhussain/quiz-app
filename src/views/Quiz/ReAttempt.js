import React from 'react'

export const ReAttempt = ({ setShowScore, setCurrentQuestion, questions, navigate, setQuestion, setIsNext, setIsPrev, setAnswerOptions }) => {
    const reAttempt = () => {
        setShowScore(false)
        setCurrentQuestion(0)
        for (let i = 0; i < questions.length; i++) {
            const ele = questions[i]
            for (let j = 0; j < ele.answerOptions.length; j++) {
                questions[i].answerOptions[j].isSelected = false;
            }
        }
        navigate({
            pathname: "",
            search: ""
        })
        setQuestion(questions[0])
        setIsNext(false)
        setIsPrev(false)
        setAnswerOptions([])

    }
    return (
        <button className='re-attempt' onClick={reAttempt}>Re-attempt</button>
    )
}
