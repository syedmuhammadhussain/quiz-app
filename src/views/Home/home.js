import React from 'react'
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const startQuiz = () => {
        navigate({ pathname: "/quiz" })
    }
    return (
        <div className='home'>
            <h4>Are you sure want to start quiz?</h4>
            <button className='start-btn' type='button' onClick={startQuiz}>Start Quiz</button>
        </div>
    )
}

export default Home