import React, {useEffect, useState} from 'react';
import './highscoreOverview-css.css';

const json2array = (json:any) => {
    let result: any = [];
    let keys = Object.keys(json);
    keys.forEach(function(key) {
        result.push(json[key].value);
    });
    return result;
};

export const HighscoreList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [highscoreList, setHighscoreList] = useState([0]);

    useEffect(() => {
        fetch('http://192.168.1.160:8080/doju/v1/highscore')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setHighscoreList(json2array(result));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            ).catch((error) => {
            console.error('Error occured: ', error);
        });

    }, []);
    if (error) {
        return <div className='highscore-list'>Backend seems to be turned off</div>;
    } else if (!isLoaded) {
        return <div className='highscore-list'>Loading...</div>;
    } else {
        return (
            <div className='highscore-list'>
                {highscoreList.map(function(n) {
                    return (<div className='highscore-list-element' key={n}>{n}</div>);
                })}
            </div>
        );
    }
};