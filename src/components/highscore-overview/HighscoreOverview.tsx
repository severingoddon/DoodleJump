import React from 'react';
import './highscoreOverview-css.css';
import {NavLink} from 'react-router-dom';
import {HighscoreList} from './HighscoreList';

let backgroundClass = 'highscoreOverview-screen';
let buttonClass = 'homeButtonClass';
let scoresClass = 'scores';
let titleClass = 'highscoreTitle';

export const setThemeHighscoreScreen = (isDark: boolean) =>{
    if(isDark) {
        backgroundClass = 'highscoreOverview-screen-dark';
        buttonClass = 'homeButtonClass-dark';
        scoresClass = 'scores-dark';
        titleClass = 'highscoreTitle-dark';
    }
    else {
        backgroundClass = 'highscoreOverview-screen';
        buttonClass = 'homeButtonClass';
        scoresClass = 'scores';
        titleClass = 'highscoreTitle';
    }
};


export default () => {

    const style = {};

    return(
        <div className={backgroundClass} style={style}>
            <h1 id={titleClass}>DoJu Highscores</h1>
            <div id={scoresClass}>
                <HighscoreList/>
            </div>
            <NavLink to="/">
                <button id={buttonClass}>Home</button>
            </NavLink>
        </div>
    );
};