import React from 'react';
import './game-over-css.css';

let scoreClassName = 'result-score';

export const setThemeGameOverScore = (isDark: boolean) =>{
    if(isDark) scoreClassName = 'result-score-dark';
    else scoreClassName = 'result-score';
};

export default (props: any) => {

    const style = {};

    return(
        <div className="game-over-screen" style={style}>
            <div className="game-over">Game over!</div>
            <div data-testid="finalscore" className={scoreClassName}>Your score is: {props.score}</div>
        </div>
    );
};