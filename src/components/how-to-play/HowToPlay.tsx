import React from 'react';
import './howToPlay-css.css';
import {NavLink} from 'react-router-dom';

let backgroundClass = 'howToPlay-screen';
let buttonClass = 'homeButton';
let howToPlayTitleClass = 'howToPlayTitle';

export const setThemeHowToPlayScreen = (isDark: boolean) =>{
    if(isDark) {
        backgroundClass = 'howToPlay-screen-dark';
        buttonClass = 'homeButton-dark';
        howToPlayTitleClass = 'howToPlayTitle-dark';
    }
    else {
        backgroundClass = 'howToPlay-screen';
        buttonClass = 'homeButton';
        howToPlayTitleClass = 'howToPlayTitle';
    }
};

export default () => {

    const style = {};

    return(
        <div className={backgroundClass} style={style}>
            <h1 id={howToPlayTitleClass}>How to play</h1>
            <div id="explanations">
                <h3 className="text">Jump to a higher platform to increase your score.</h3>
                <h3 className="text">Move right and left with A/D or arrow keys.</h3>
                <div className="explanation-wrappers">
                    <h3 className="text-with-img">Catch coins to gather points and get richer than any other player.</h3>
                    <div id="coin"/>
                </div>
                <div className="explanation-wrappers">
                    <h3 className="text-with-img">Avoid bombs, they will make you fall down into the abyss! </h3>
                    <div id="bomb"/>
                </div>
                <h3 className="text">Have fun :)</h3>

                <NavLink id="homeButtonLink" to="/">
                    <button id={buttonClass}>Home</button>
                </NavLink>
            </div>
        </div>
    );
};