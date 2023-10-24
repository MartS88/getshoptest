import React, {useEffect, useState} from 'react';
import s from './Timer.module.scss'
import {useNavigate} from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";




const  Timer = () => {
    const [timeLeft, setTimeLeft] = useState(10);
    const [userAction, setUserAction] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
                if (!userAction && timeLeft === 1) {
                    navigate('/')
                }

            } else {

                clearInterval(interval);
            }
        }, 1000);


        return () => clearInterval(interval);
    }, [timeLeft, navigate]);


    const closeHandler = () => {
        setUserAction(true)
    }

    return (
        <div className={s.timer}>
            <AiOutlineClose onClick={() => closeHandler()}/>

            <div className={s.span_block}>
                <p className={s.title2}>
                    Пожалуйста, совершите какое-либо действие в течение
                    <br/>
                    <span className={s.title}>{timeLeft}</span>
                    <br/>
                    секунд.
                </p>
            </div>
        </div>
    );
}
    export default Timer;
