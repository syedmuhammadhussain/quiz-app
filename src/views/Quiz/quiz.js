import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
const questions = [
    {
        id: 0,
        questionText: 'You’re really busy at work and a colleague is telling you their life story and personal woes. You:',
        answerOptions: [
            { id: 1, answerText: 'Don’t dare to interrupt them', isSelected: false, isIntrovert: true, isExtrovert: false },
            { id: 2, answerText: 'Think it’s more important to give them some of your time; work can wait', isSelected: false, isIntrovert: false, isExtrovert: true },
            { id: 3, answerText: 'Listen, but with only with half an ear', isSelected: false, isIntrovert: false, isExtrovert: true },
            { id: 4, answerText: 'Interrupt and explain that you are really busy at the moment', isSelected: false, isIntrovert: true, isExtrovert: false },
        ],
    },
    {
        id: 1,
        questionText: 'You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:',
        answerOptions: [
            { id: 1, answerText: 'Look at your watch every two minutes', isSelected: false, isIntrovert: true, isExtrovert: false },
            { id: 2, answerText: 'Bubble with inner anger, but keep quiet', isSelected: false, isIntrovert: true, isExtrovert: false },
            { id: 3, answerText: 'Explain to other equally impatient people in the room that the doctor is always running late', isSelected: false, isIntrovert: false, isExtrovert: true },
            { id: 4, answerText: 'Complain in a loud voice, while tapping your foot impatiently', isSelected: false, isIntrovert: true, isExtrovert: false },
        ],
    },
    {
        id: 2,
        questionText: 'You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:',
        answerOptions: [
            { id: 1, answerText: 'Don’t dare contradict them', isSelected: false, isIntrovert: true, isExtrovert: false },
            { id: 2, answerText: 'Think that they are obviously right', isSelected: false, isIntrovert: false, isExtrovert: true },
            { id: 3, answerText: 'Defend your own point of view, tooth and nail', isSelected: false, isIntrovert: true, isExtrovert: false },
            { id: 4, answerText: 'Continuously interrupt your colleague', isSelected: false, isIntrovert: false, isExtrovert: true },
        ],
    },
    {
        id: 3,
        questionText: 'During dinner parties at your home, you have a hard time with people who:',
        answerOptions: [
            { id: 1, answerText: 'Ask you to tell a story in front of everyone else', isSelected: false, isIntrovert: true, isExtrovert: false },
            { id: 2, answerText: 'Talk privately between themselves', isSelected: false, isIntrovert: false, isExtrovert: true },
            { id: 3, answerText: 'Hang around you all evening', isSelected: false, isIntrovert: false, isExtrovert: true },
            { id: 4, answerText: 'Always drag the conversation back to themselves', isSelected: false, isIntrovert: false, isExtrovert: true },
        ],
    },
]
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
            doLogic()
        }
    }, [location]);

    const handleAnswerOptionClick = (selectedOption, selectedQuestion) => {
        const questionIndex = questions.findIndex(x => x.id === selectedQuestion.id)
        const answerIndex = questions[questionIndex].answerOptions.findIndex(x => x.id === selectedOption.id)
        for (let index = 0; index < questions[questionIndex].answerOptions.length; index++) {
            questions[questionIndex].answerOptions[index].isSelected = false
        }
        questions[questionIndex].answerOptions[answerIndex].isSelected = true
        setQuestion(questions[currentQuestion])
        setIsNext(true)
        setSelectedOption(selectedOption.id)
    }

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

    const doLogic = () => {
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
        <div className='app'>
            {showScore && <button className='re-attempt' onClick={reAttempt}>Re-attempt</button>}
            {showScore ? (
                <div className='score-section'>
                    <h3>{introvert > extrovert ? "You're an Introvert" : "You're an Extrovert"}</h3>
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    )
}

export default Quiz