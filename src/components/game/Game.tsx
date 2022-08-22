import React, {Component} from 'react';
import GameObject from '../game-objects/GameObject';
import Jumper, {setRocket} from '../jumper/Jumper';
import Score from '../score/Score';
import GameOver from '../game-over/GameOver';
import {createGame, setGameRunning} from '../../game-helpers/gameHelpers';
import {checkCollision} from '../../game-helpers/gameHelpers';
import {doJumperMove} from '../../game-helpers/gameHelpers';
import {Highscore} from '../highscore/Highscore';
import {saveHighscore} from '../highscore/Highscore';
import {doPlatformMove} from '../../game-helpers/gameHelpers';
import {doHorizontalPlatformMove} from '../../game-helpers/gameHelpers';
import './game-css.css';
import {NavLink} from 'react-router-dom';

const initialState = createGame();
let backgroundClass = 'game-area';
let buttonClass = 'buttons';

export const setThemeGameScreen = (isDark: boolean) =>{
    if(isDark) {
        backgroundClass = 'game-area-dark';
        buttonClass = 'buttons-dark';
    }
    else {
        backgroundClass = 'game-area';
        buttonClass = 'buttons';
    }
};

class Game extends Component {

    state = initialState;

    constructor(props: any) {
        super(props);
        this.restartGame = this.restartGame.bind(this);
    }

    componentDidMount = () => {
        document.onkeydown = this.onKeyDown;
        document.onkeyup = this.onKeyUp;
        this.setState(createGame());
        setInterval(this.movePlatforms, this.state.platformMovingSpeed);
        setInterval(this.movePlatformsHorizontally, 2);
        this.jump();
    };


    onKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'KeyA':
            case 'ArrowLeft':
                this.setState({
                    cancelled: true,
                    standingStill: false,
                    movingLeft: true
                });
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.setState({
                    cancelled: true,
                    standingStill: false,
                    movingLeft: false
                });
                break;
            case 'Enter':
                if(!this.state.gameRunning) this.restartGame();
        }
    };

    onKeyUp = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'KeyA':
            case 'ArrowLeft':
                this.fadeOut();
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.fadeOut();
                break;
        }
    };

    fadeOut = () =>{
        let localInterval = 50;
        let localCounter = 10;
        this.setState({cancelled: false});
        const fadeOutFunction = () => {
            if (this.state.cancelled) {
                this.setState({horizontalMovingSpeed: this.state.defaultHorizontalMovingSpeed});
                return;
            }
            this.setState({horizontalMovingSpeed: (localCounter * localCounter * 4) / 100});
            localCounter -= 1;
            if (localCounter === 0) {
                this.setState({standingStill: true});
                this.setState({horizontalMovingSpeed: this.state.defaultHorizontalMovingSpeed});
                return;
            } //jumping up finished, falling down is next step
            setTimeout(fadeOutFunction, localInterval);
        };
        setTimeout(fadeOutFunction, localInterval);
    };

    jump = () => {
        this.setState({stepsize: 5});  //set the starting stepsize (how many pixels the doodler moves each step)
        let counter = this.state.jumpingHeight;
        const myFunction = () => {
            if (this.state.jumpingUp) {
                this.setState({platformStepSize: counter});
                let collision = checkCollision(this.state.doodlerCoords, this.state.objectCoords, false, this.state.rocketOn);
                this.handleCollision(collision);
                this.movePlatforms();
                this.moveJumper();
                this.setState({stepsize: (counter * counter * 4) / 100});//x^2 * 4 -> Hyperbel
                if(!this.state.rocketOn)counter -= 1;
                if (counter === 0) this.setState({jumpingUp: false}); //jumping up finished, falling down is next step
            } else {
                if(this.state.jumpingHeight>21) this.setState({jumpingHeight: 21});
                let collision = checkCollision(this.state.doodlerCoords, this.state.objectCoords, true, this.state.rocketOn);
                this.handleCollision(collision);
                if (collision[0]) {
                    this.setState({jumpingUp: true});
                    this.jump();
                    return;
                }
                this.setState({stepsize: (counter * counter * 4) / 100});
                counter -= 1;
                this.moveJumper();
            }
            if(this.state.gameRunning) setTimeout(myFunction, this.state.jumpingSpeed);
        };
        setTimeout(myFunction, this.state.jumpingSpeed);
    };

    handleCollision = (collision: Array<any>) => {
        if(collision[2]==='BROKEN') this.setState({objectCoords: collision[1]});
        else if(collision[2]==='COIN') this.setState({score: this.state.score + 200 });
        else if(collision[2]==='BOMB') this.setState({gameRunning: false});
        else if(collision[2]==='TRAMPOLINE') this.setState({jumpingHeight: 50});
        else if(collision[2]==='ROCKET') {
            this.setState({
                jumpingHeight: 30,
                rocketOn:true
            });
            setRocket(true);
            setTimeout(this.deactivateRocket,4000);
        }
    };

    deactivateRocket = () =>{
        this.setState({rocketOn:false});
        setRocket(false);
    };

    moveJumper = () =>{
        if(this.state.gameRunning) {
            if (this.state.doodlerCoords[1] < 0) {
                saveHighscore(this.state.score);
                this.setState({gameRunning: false});
            }
            if (this.state.jumpingUp) {
                if (this.state.doodlerCoords[1] < this.state.jumpingHeightBarrier) {
                    this.setState({doodlerCoords: doJumperMove(this.state.doodlerCoords, this.state.stepsize, 'UP', this.state.horizontalMovingSpeed)});
                }
            }
            if (!this.state.jumpingUp) this.setState({doodlerCoords: doJumperMove(this.state.doodlerCoords, this.state.stepsize, 'DOWN', this.state.horizontalMovingSpeed)});
            if (this.state.movingLeft && !this.state.standingStill) this.setState({
                doodlerImageScale: -1,
                doodlerCoords: doJumperMove(this.state.doodlerCoords, this.state.stepsize, 'LEFT', this.state.horizontalMovingSpeed)
            });
            if (!this.state.movingLeft && !this.state.standingStill) this.setState({
                doodlerImageScale: 1,
                doodlerCoords: doJumperMove(this.state.doodlerCoords, this.state.stepsize, 'RIGHT', this.state.horizontalMovingSpeed)
            });
        }
    };

    movePlatforms = () => {
        let scoreBefore = this.state.objectCoords[0][1];
        let coords = doPlatformMove(this.state.doodlerCoords,this.state.objectCoords, this.state.platformStepSize);
        let scoreAfter = this.state.objectCoords[0][1];
        let scoreDifference = Math.round(scoreBefore-scoreAfter);
        if(scoreDifference<0)scoreDifference=0;
        if(this.state.gameRunning)this.setState({
            score: this.state.score + scoreDifference,
            objectCoords: coords
        });
    };

    movePlatformsHorizontally = () =>{
        if(this.state.gameRunning) {
            let coords = doHorizontalPlatformMove(this.state.objectCoords);
            this.setState({objectCoords: coords});
        }
    };

    restartGame = () =>{
        this.setState(createGame());
        this.jump();
    };

    render = () => {
        return this.state.gameRunning ?  (
            <div data-testid="wrapper-for-game-area" id="wrapper">
                <div data-testid="game-area" className={backgroundClass}>
                    <GameObject data-testid="rendered-doodle-platform" objectCoords={this.state.objectCoords}/>
                    <Jumper image={this.state.doodlerImageScale} doodlerCoords={this.state.doodlerCoords}/>
                    <Score scoreText={this.state.score}/>
                </div>
                <Highscore/>
            </div>
        ) : (
            <div className={backgroundClass}>
                <GameOver score={this.state.score}/>
                <div id="restart-button-div">
                    <button className={buttonClass} onClick={this.restartGame} id="restart-button">restart game</button>
                </div>
                <NavLink id="home-button-link" to="/">
                    <button className={buttonClass} onClick={() => setGameRunning(false)} id="home-button">Home</button>
                </NavLink>
            </div>
        );
    };
}

export default Game;