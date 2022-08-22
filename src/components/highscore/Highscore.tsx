import React, {useEffect, useState} from 'react';
import './highscore-css.css';

export const Highscore = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [highscore, setHighscore] = useState(null);

    useEffect(() => {
            fetch('http://192.168.1.160:8080/doju/v1/highscore')
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setHighscore(result[0].value);
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
        return <div className="highscore">Backend seems to be turned off</div>;
    } else if (!isLoaded) {
        return <div className="highscore">Loading...</div>;
    } else {
        return (
            <div className="highscore">Highscore is: {highscore}</div>
        );
    }
};

export const saveHighscore = (highscore: number) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: highscore })
    };
    fetch('http://192.168.1.160:8080/doju/v1/highscore', requestOptions).catch((error) =>{
        console.error('Error occured: ', error);
    });
};



