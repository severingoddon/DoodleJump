import React from 'react';
import sound from '../resources/audio/jump.mp3';
import sound2 from '../resources/audio/coinSound.mp3';
import sound3 from '../resources/audio/crack.mp3';
import sound4 from '../resources/audio/bombSound.mp3';
import sound5 from '../resources/audio/woosh.mp3';
import sound6 from '../resources/audio/rocketSound.mp3';
import sound7 from '../resources/audio/trampolineSound.mp3';
import {Type, Visibility, MovingDirection} from './Enums';

/*
example object coordinates:
object = [a, b, c, d, e]
a => left distance  (object[0])
b => bottom distance (object[1])
c => object type  (object[2])
d => object visible? (object[3])
e => platform moving direction
 */

let gameRunning = true;
let gameDifficulty = 240;
let gameDifficultyLevel = 0.5;
let lastPlatformWasBroke = false;
const jumpSound = new Audio(sound);
const coinSound = new Audio(sound2);
const crackSound = new Audio(sound3);
const bombSound = new Audio(sound4);
const wooshSound = new Audio(sound5);
const rocketSound = new Audio(sound6);
const trampolineSound = new Audio(sound7);

export const setGameRunning = (running: boolean) => {
    gameRunning = running;
    gameDifficulty = 240;
};

export const setGameDifficultyLevel = (difficultyLevel: number) => {
    gameDifficultyLevel = difficultyLevel;
};

export const createGame = () => {
    gameRunning = true;
    gameDifficulty = 240;
    return {
        objectCoords: [
            [0, 40, Type.BOTTOM_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [90, 40, Type.BOTTOM_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [180, 40, Type.BOTTOM_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [270, 40, Type.BOTTOM_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [360, 40, Type.BOTTOM_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 75, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 113, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 156, Type.BROKEN_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 189, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 222, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 270, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 311, Type.LEFTRIGHTMOVING_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 348, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 391, Type.ROCKET, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 428, Type.COIN, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 471, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 505, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 550, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 590, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
            [Math.random() * 360, 661, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],
        ],
        score: 0,
        highscore: 0,
        gameRunning: true,
        platformMovingSpeed: 2,
        jumpingSpeed: 16,
        jumpingHeight: 21,
        jumpingHeightBarrier: 280,
        doodlerImageScale: 1,
        platformStepSize: 1,
        standingStill: true,
        cancelled: true,
        movingLeft: false,
        horizontalMovingSpeed: 8,
        defaultHorizontalMovingSpeed: 8,
        doodlerCoords: [Math.random() * 360, 65],
        jumpingUp: false,
        stepsize: 5,
        rocketOn: false
    };
};

export const checkCollision = (doodlerCoords: Array<number>, objectCoords: Array<Array<number>>, fallingDown: boolean, rocketOn: boolean) => {
    let collided = false;
    let coords = [...objectCoords];
    let collisionType = '';
    coords.forEach(function (c: Array<number>) {
        if (c[3] === Visibility.VISIBLE
            && gameRunning
            && (doodlerCoords[1] <= (c[1] + 20))
            && (doodlerCoords[1] >= (c[1]))
            && (doodlerCoords[0] + 20 >= (c[0] - 10))
            && (doodlerCoords[0] <= (c[0] + 85))
            && (c[1] < 550)) {
            if (fallingDown) {
                switch(c[2]) {
                    case Type.NORMAL_PLATFORM:
                        jumpSound.play();
                        collided = true;
                        break;
                    case Type.BROKEN_PLATFORM:
                        crackSound.play();
                        c[2] = Type.BROKENDESTROYED_PLATFORM;
                        collisionType = 'BROKEN';
                        break;
                    case Type.BROKENDESTROYED_PLATFORM:
                        collisionType = 'BROKEN';
                        break;
                    case Type.TRAMPOLINE:
                        trampolineSound.play();
                        collisionType = 'TRAMPOLINE';
                        collided = true;
                        break;
                    case Type.ROCKET:
                        rocketSound.play();
                        collisionType = 'ROCKET';
                        collided = true;
                        break;
                    case Type.DISAPPEARING_PLATFORM:
                        wooshSound.play();
                        c[3] = Visibility.INVISIBLE;
                        collided = true;
                        break;
                    case Type.COIN:
                        coinSound.play();
                        c[3] = Visibility.INVISIBLE;
                        collisionType = 'COIN';
                        break;
                    case Type.BOMB:
                        bombSound.play();
                        c[3] = Visibility.INVISIBLE;
                        collisionType = 'BOMB';
                        gameRunning = false;
                        break;
                    default:
                        jumpSound.play();
                        collided = true;
                }
            } else {
                if (c[2] === Type.COIN) {
                    coinSound.play();
                    c[3] = Visibility.INVISIBLE;
                    collisionType = 'COIN';
                } else if (c[2] === Type.BOMB && !rocketOn) {
                    bombSound.play();
                    c[3] = Visibility.INVISIBLE;
                    collisionType = 'BOMB';
                    gameRunning = false;
                }
            }
        }
    });
    return [collided, coords, collisionType];
};


export const doPlatformMove = (doodlerCoords: Array<number>, objectCoords: Array<Array<number>>, platformStepSize: number) => {
    let coords = [...objectCoords];
    if (doodlerCoords[1] > 250) {
        coords.forEach(p => {
            let index = coords.indexOf(p);
            if (doodlerCoords[1] > 350) p[1] -= platformStepSize / 6;
            else p[1] -= platformStepSize / 8;
            if (p[1] < 0) {
                p[3] = Visibility.VISIBLE;
                if (p[2] === Type.BOTTOM_PLATFORM) {
                    coords.splice(index, 1);
                } else {
                    p[0] = Math.random() * 360; //new gameobject left distance
                    p[1] = 680; //new gameobject height
                    p[2] = getNewGameObjectType(p[2]);
                    p[3] = Visibility.VISIBLE;
                }
            }
        });
        return coords;
    }
    return coords;
};


const getNewGameObjectType = (oldType: Type) => {
    if (oldType === Type.COIN) return Type.COIN; //coins stay coins
    let type;
    if (Math.random() * 300 > gameDifficulty) {
        if (Math.random() * 300 > 170 && !lastPlatformWasBroke) {
            type = Type.BROKEN_PLATFORM;
            lastPlatformWasBroke = true;
        } else {
            if (Math.random() * 300 > 180) type = Type.LEFTRIGHTMOVING_PLATFORM;
            else {
                if (Math.random() * 300 > 50) {
                    type = Type.DISAPPEARING_PLATFORM;
                    lastPlatformWasBroke = false;
                } else {
                    if (Math.random() * 300 > 30) {
                        if (Math.random() * 300 > 70) {
                            type = Type.TRAMPOLINE;
                            lastPlatformWasBroke = false;
                        } else {
                            type = Type.ROCKET;
                            lastPlatformWasBroke = false;
                        }
                    } else {
                        type = Type.BOMB;
                        lastPlatformWasBroke = false;
                    }
                }
            }
        }
    } else {
        type = Type.NORMAL_PLATFORM;
        lastPlatformWasBroke = false;
    }
    gameDifficulty -= gameDifficultyLevel;
    return type;
};

export const doJumperMove = (doodlerCoords: Array<number>, stepsize: number, direction: string, horizontalMovingSpeed: number) => {
    let coords = [...doodlerCoords];
    switch (direction) {
        case 'LEFT':
            coords[0] -= horizontalMovingSpeed;
            if (coords[0] < 0) coords[0] = 450;
            return coords;
        case 'RIGHT':
            coords[0] += horizontalMovingSpeed;
            if (coords[0] > 450) coords[0] = 5;
            return coords;
        case 'UP':
            coords[1] += stepsize;
            return coords;
        case 'DOWN':
            if (stepsize < 16) coords[1] -= stepsize;
            else coords[1] -= 16; //16 is the max falling speed. This prevents the doodler from falling down too fast
            return coords;
    }
};

export const doHorizontalPlatformMove = (objectCoords: Array<Array<number>>) => {
    let coords = [...objectCoords];
    coords.forEach(p => {
        if (p[2] === Type.LEFTRIGHTMOVING_PLATFORM) {
            if (p[0] < 10) p[4] = MovingDirection.RIGHT;
            if (p[0] > 350) p[4] = MovingDirection.LEFT;
            if (p[4] === MovingDirection.LEFT) {
                p[0] -= 1;
            } else {
                p[0] += 1;
            }
        }
    });
    return coords;
};
