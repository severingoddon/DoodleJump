import React from 'react';
import './score-css.css';

let scoreClass = 'score-field';

export const setThemeScore = (isDark: boolean) =>{
    if(isDark) scoreClass = 'score-field-dark';
    else scoreClass = 'score-field';
};

export default (props: any) => {
    return(
        <div data-testid="score" className={scoreClass}>
            {props.scoreText}
        </div>
    );
};