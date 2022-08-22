import React from 'react';
import './game-objects-css.css';
import {Visibility, Type} from '../../game-helpers/Enums';


let darkTheme = false;

export const setTheme = (isDark: boolean) => {
    darkTheme = isDark;
};

export default (props: any) => {
    let classname = '';
    return(
        <div>
            {props.objectCoords.map((coordinate: any, i: any) => {
                classname = '';
                const style = {
                    left: `${coordinate[0]}px`,
                    bottom: `${coordinate[1]}px`,
                    display: 'block'
                };
                if(coordinate[3]===Visibility.INVISIBLE) style.display = 'none';
                else style.display = 'block';

                switch (coordinate[2]) {
                    case Type.BROKEN_PLATFORM:
                        classname='doodle-platform-broken';
                        break;
                    case Type.LEFTRIGHTMOVING_PLATFORM:
                        classname='moving-platform';
                        break;
                    case Type.DISAPPEARING_PLATFORM:
                        classname='disappearing-platform';
                        break;
                    case Type.BROKENDESTROYED_PLATFORM:
                        classname='doodle-platform-broken-destroyed';
                        break;
                    case Type.BOMB:
                        classname='bomb';
                        break;
                    case Type.COIN:
                        classname='coin';
                        break;
                    case Type.TRAMPOLINE:
                        classname= darkTheme ? 'trampoline-dark' : 'trampoline';
                        break;
                    case Type.ROCKET:
                        classname= darkTheme ? 'rocket-dark' : 'rocket';
                        break;
                    default:
                        classname= darkTheme ? 'doodle-platform-dark' : 'doodle-platform';
                        break;
                }

                return (
                    <div data-testid="renderedGameObject" className={classname} key={i} style={style}/>
                );
            })}
        </div>
    );
};
