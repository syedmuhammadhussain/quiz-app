import { render, screen } from "@testing-library/react";
import Home from "./home"
import { BrowserRouter as Router } from 'react-router-dom';

//test block
test("check button text", () => {
    // render the component on virtual dom
    render(
        <Router>
            <Home />,
        </Router>,
    );

    const text = screen.getByTestId("start");
    expect(text).toHaveTextContent("Start Quiz");
});