import React, { useEffect, useState } from 'react';
import s from './App.module.scss'
import './index.css'
import { useNavigate } from "react-router-dom";
import MyVideoComponent from "./components/video/Video";
import { CSSTransition } from 'react-transition-group';

function App() {
    const navigate = useNavigate()
    const [registrationBlock, setRegistrationBlock] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setRegistrationBlock(true);
        }, 5000);
        return () => clearTimeout(timer);
    },);

    return (
        <div className={s.App}>
            <div className={s.app_block}>
                <div className={s.video_block}>

                    <MyVideoComponent


                    />
                </div>

                <div className={s.registration}>
                    {registrationBlock && (
                        <CSSTransition
                            in={true}
                            timeout={1000}
                            classNames="slide"
                            unmountOnExit
                        >
                            <div className={`${s.registration_block} ${s.element}`}>
                                <p className={s.title}>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО<br/> МАЛЫША! <br/>
                                    ПОДАРИТЕ ЕМУ СОБАКУ!</p>
                                <div className={s.logo}>
                                    <img src={require('../src/assets/index 1.png')} draggable={false}/>
                                </div>
                                <span className={s.title2}>
                                    Сканируйте QR-код<br/>
                                    или нажмите ОК
                                </span>
                                <button onClick={() => navigate('/screen')}>Ok</button>
                            </div>
                        </CSSTransition>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
