import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { questions } from './data'
import { HandleButtons } from './HandleButtons'
import Questions from './Questions'
import { ReAttempt } from './ReAttempt'

const Quiz = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [introvert, setIntrovert] = useState(0)
    const [extrovert, setExtrovert] = useState(0)
    const [question, setQuestion] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [answerOptions, setAnswerOptions] = useState([])
    const [isPrev, setIsPrev] = useState(false)
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        setQuestion(questions[currentQuestion])
    }, [])

    useEffect(() => {
        if (location.search !== '') {
            doLogicIfParamsExist()
        }
    }, [location]);



    const doLogicIfParamsExist = () => {
        const state = JSON.parse(location.search.split("=").pop())
        if (state.length !== questions.length) {
            setQuestion(questions[state.length])
            setCurrentQuestion(state.length)
            for (let index = 0; index < state.length; index++) {
                const ele = state[index];
                const answerIndex = questions[index].answerOptions.findIndex(x => x.id === ele)
                questions[index].answerOptions[answerIndex].isSelected = true
            }
            setIsPrev(true)

        } else {
            setIntrovert(0)
            setExtrovert(0)
            const state = JSON.parse(location.search.split("=").pop())
            for (let index = 0; index < questions.length; index++) {
                const ele = questions[index];
                const correctAnswer = ele.answerOptions.filter(x => x.id === state[index])
                switch (true) {
                    case correctAnswer[0].isExtrovert:
                        setExtrovert((prev) => prev + 1)
                        break;
                    case correctAnswer[0].isIntrovert:
                        setIntrovert((prev) => prev + 1)
                        break;
                    default:
                        break
                }
            }
            setShowScore(true)
        }
    }

    return (
        <div className='app'>
            {showScore && <ReAttempt
                isPrev={isPrev}
                isNext={isNext}
                setShowScore={setShowScore}
                setCurrentQuestion={setCurrentQuestion}
                questions={questions}
                navigate={navigate}
                setQuestion={setQuestion}
                setIsNext={setIsNext}
                setIsPrev={setIsPrev}
                setAnswerOptions={setAnswerOptions}
            />}
            {showScore ? (
                <div className='score-section'>
                    <h3>{introvert > extrovert ? "You're an Introvert" : "You're an Extrovert"}</h3>
                </div>
            ) : (
                <>
                    <Questions
                        setIsNext={setIsNext}
                        setSelectedOption={setSelectedOption}
                        currentQuestion={currentQuestion}
                        question={question}
                        questions={questions}
                    />

                    <HandleButtons
                        isNext={isNext}
                        isPrev={isPrev}
                        setAnswerOptions={setAnswerOptions}
                        setCurrentQuestion={setCurrentQuestion}
                        setQuestion={setQuestion}
                        selectedOption={selectedOption}
                        answerOptions={answerOptions}
                        currentQuestion={currentQuestion}
                        setIsNext={setIsNext}
                        setIsPrev={setIsPrev}
                        doLogic={doLogicIfParamsExist}
                        questions={questions}
                    />
                </>
            )}
        </div>
    )
}

export default Quiz