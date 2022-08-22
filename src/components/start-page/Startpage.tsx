import React, {useEffect, useState} from 'react';
import './startpage-css.css';
import {NavLink} from 'react-router-dom';
import {setGameDifficultyLevel, setGameRunning} from '../../game-helpers/gameHelpers';
import {setTheme} from '../game-objects/GameObject';
import {setThemeGameScreen} from '../game/Game';
import {setThemeJumper} from '../jumper/Jumper';
import {setThemeHighscoreScreen} from '../highscore-overview/HighscoreOverview';
import {setThemeHowToPlayScreen} from '../how-to-play/HowToPlay';
import {setThemeScore} from '../score/Score';
import {setThemeGameOverScore} from '../game-over/GameOver';

export const Startpage = ({count, handleLightClick, handleDarkClick }:any) => {
    const [backgroundClassname, setBackgroundClassname] = useState('startScreen');
    const [playButtonClassname, setPlayButtonClassname] = useState('playButton');
    const [howToPlayButtonClassname, setHowToPlayButtonClassname] = useState('howToPlayButton');
    const [highscoreButtonClassname, setHighscoreButtonClassname] = useState('highscoreOverviewButton');
    const [doodlerClassname, setDoodlerClassname] = useState('doodler');
    const [dropdownClassname, setDropdownClassname] = useState('difficulty');
    const [themeButtonClassname, setThemeButtonClassname] = useState('themeButtons');
    const [gameTitleClassname, setGameTitleClassname] = useState('gameTitle');
    const [authorsClassName, setAuthorsClassName] = useState('authors');

    const style = {};
    const difficultyLevels = ['easy', 'medium', 'hard'];
    let selectedDifficultyLevel = 'medium';

    useEffect(() => {
        if(count===0)setGameTheme(true);
        else setGameTheme(false);
    });

    const setGameTheme = (isDark: boolean) =>{
            setTheme(isDark);
            setThemeGameScreen(isDark);
            setThemeJumper(isDark);
            setThemeHighscoreScreen(isDark);
            setThemeHowToPlayScreen(isDark);
            setThemeScore(isDark);
            setThemeGameOverScore(isDark);
            if(isDark) {
                setBackgroundClassname('startScreen-dark');
                setPlayButtonClassname('playButtonDark');
                setHowToPlayButtonClassname('howToPlayButtonDark');
                setHighscoreButtonClassname('highscoreOverviewButtonDark');
                setDoodlerClassname('doodler-dark');
                setDropdownClassname('difficulty-dark');
                setThemeButtonClassname('themeButtons-dark');
                setGameTitleClassname('gameTitle-dark');
                setAuthorsClassName('authors-dark');
                handleDarkClick();
            }
            else{
                setBackgroundClassname('startScreen');
                setPlayButtonClassname('playButton');
                setHowToPlayButtonClassname('howToPlayButton');
                setHighscoreButtonClassname('highscoreOverviewButton');
                setDoodlerClassname('doodler');
                setDropdownClassname('difficulty');
                setThemeButtonClassname('themeButtons');
                setGameTitleClassname('gameTitle');
                setAuthorsClassName('authors');
                handleLightClick();
            }
    };

    const setDifficulty = (e:any) =>{
         if(e.target.value === 'easy') {
             selectedDifficultyLevel = 'easy';
             setGameDifficultyLevel(0.2);
         }
         else if(e.target.value === 'medium') {
             selectedDifficultyLevel = 'medium';
             setGameDifficultyLevel(1);
         }
         else if(e.target.value === 'hard') {
             selectedDifficultyLevel = 'hard';
             setGameDifficultyLevel(5);
         }
    };

    return(
        <div className={backgroundClassname} style={style}>
            <h1 id={gameTitleClassname}>{'Let\'s play DoodleJump!'}</h1>
            <h4 id={authorsClassName}>Doodle Jump by Severin</h4>
            <div id={doodlerClassname}/>
            <NavLink className="links" to="/game">
                <button onClick={() => setGameRunning(true)} id={playButtonClassname}>Play</button>
            </NavLink>
            <NavLink className="links" to="/how-to-play">
                <button id={howToPlayButtonClassname}>How to Play</button>
            </NavLink>
            <NavLink className="links" to="/highscore-overview">
                <button id={highscoreButtonClassname}>Highscore</button>
            </NavLink>

            <select className={dropdownClassname} name="select" onChange={setDifficulty}>
                {difficultyLevels.map(function(n) {
                    return (<option key={n} value={n} defaultChecked={selectedDifficultyLevel === n}>{n}</option>);
                })}
            </select>
            <div id="themeButtonsContainer">
                <button className={themeButtonClassname} onClick={() => setGameTheme(true)}>dark</button>
                <button className={themeButtonClassname} onClick={() => setGameTheme(false)}>light</button>
            </div>
        </div>
    );
};