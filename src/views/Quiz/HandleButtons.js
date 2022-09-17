import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const HandleButtons = ({ doLogic, setQuestion, setCurrentQuestion, selectedOption, setAnswerOptions, answerOptions, currentQuestion, setIsNext, isNext, isPrev, setIsPrev, questions }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const handlePrev = () => {
        doLogic()
        const prevQuestion = currentQuestion - 1
        setQuestion(questions[prevQuestion])
        setCurrentQuestion(prevQuestion)
        if (prevQuestion < 1) {
            setIsPrev(false)
            setIsNext(true)
        } else {
            setIsPrev(true)
            setIsNext(true)
        }
    }

    const handleNext = () => {
        let selectedAnswerList;
        if (location.search !== '') {
            let state = JSON.parse(location.search.split("=").pop())
            state[currentQuestion] = selectedOption ? selectedOption : state[currentQuestion]
            selectedAnswerList = [...state]
            setAnswerOptions(selectedAnswerList)
        } else {
            selectedAnswerList = [...answerOptions, selectedOption]
            setAnswerOptions(selectedAnswerList)
        }
        const nextQuestion = currentQuestion + 1
        setCurrentQuestion(nextQuestion)
        setQuestion(questions[nextQuestion])
        setIsPrev(true)
        if (location.search !== '' && JSON.parse(location.search.split("=").pop()).length > nextQuestion) setIsNext(true)
        else setIsNext(false)
        navigate({
            search: `?answers=[${selectedAnswerList}]`
        })
    }

    return (
        <div className='act-btn'>
            <button
                disabled={!isPrev}
                type='button'
                className='prev-btn'
                onClick={() => handlePrev()}>Prev</button>
            <button
                disabled={!isNext}
                type='button'
                className='next-btn'
                onClick={() => handleNext()}>Next</button>
        </div>
    )
}
