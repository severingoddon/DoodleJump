import React from 'react';
import './jumper-css.css';

let classnameJumper = 'doodle-jumper';
let classnameJumperStore = 'doodle-jumper';

export const setThemeJumper = (isDark: boolean) => {
    if(isDark) {
        classnameJumper = 'doodle-jumper-dark';
        classnameJumperStore = 'doodle-jumper-dark';
    }
    else {
        classnameJumper = 'doodle-jumper';
        classnameJumperStore = 'doodle-jumper';
    }
};

export const setRocket = (rocketOn: boolean) => {
    if(rocketOn) {
        if(classnameJumperStore === 'doodle-jumper') {
            classnameJumper = 'doodle-jumper-rocket';
        }
        else if(classnameJumperStore === 'doodle-jumper-dark') {
            classnameJumper = 'doodle-jumper-rocket-dark';
        }
    }else classnameJumper = classnameJumperStore;
};

export default (props: any) => {

    const style = {
        left: `${props.doodlerCoords[0]}px`,
        bottom: `${props.doodlerCoords[1]}px`,
        transform:`scaleX(${props.image})`
    };

    return(
        <div data-testid="jumper" className={classnameJumper} style={style}/>
    );
};