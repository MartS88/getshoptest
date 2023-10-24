import React, {useEffect, useRef, useState} from 'react';
import s from './Screen.module.scss'
import {useNavigate} from "react-router-dom";
import Timer from "./timer/Timer";
import {ColorRing} from 'react-loader-spinner';
import {usePhoneQuery} from "../../services/Api";



const Screen: React.FC = () => {

    const navigate = useNavigate()
    const [firstInput, setFirstInput] = useState<string>('');
    const [secondInput, setSecondInput] = useState<string>('');
    const firstInputRef = useRef<HTMLInputElement | null>(null);
    const secondInputRef = useRef<HTMLInputElement | null>(null);
    const [noEvents, setNoEvents] = useState<boolean>(false);
    const [wrongNumber, setWrongNumber] = useState<boolean>(false)
    const [number, setNumber] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false)
    const activeButton = secondInput.length !== 9


    useEffect(() => {
        const timerID = setInterval(() => {
            if (!noEvents) {
                setNoEvents(true);
            }
        }, 10000);

        const eventHandler = () => {
            setNoEvents(false);
        };

        window.addEventListener('click', eventHandler);
        window.addEventListener('keydown', eventHandler);

        return () => {
            clearInterval(timerID);
            window.removeEventListener('click', eventHandler);
            window.removeEventListener('keydown', eventHandler);
        };
    }, [noEvents]);


    const handleFirstInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 3) {
            setFirstInput(value);
        }

        if (value.length === 3 && secondInputRef.current) {
            secondInputRef.current.focus();
        }
    };

    const handleSecondInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');

        let formattedValue = value;

        if (value.length > 3) {
            formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
        }

        if (value.length > 5) {
            formattedValue = `${formattedValue.slice(0, 6)}-${formattedValue.slice(6)}`;
        }

        setSecondInput(formattedValue);
    };


    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            if (secondInput.length > 0) {
                setSecondInput(secondInput.slice(0, -1));
            } else if (firstInput.length > 0) {
                setFirstInput(firstInput.slice(0, -1));
                if (firstInputRef.current) {
                    firstInputRef.current.focus();
                }
            }
        }
    };
    const handleButtonDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (secondInput.length > 0) {
            setSecondInput(secondInput.slice(0, -1));
        } else if (firstInput.length > 0) {
            setFirstInput(firstInput.slice(0, -1));
            if (firstInputRef.current) {
                firstInputRef.current.focus();
            }
        }
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value: string = e.currentTarget.getAttribute('data-value') as string;

        if (firstInput.length < 3) {
            const updatedValue = firstInput + value;
            setFirstInput(updatedValue);

            if (updatedValue.length === 3 && secondInputRef.current) {
                secondInputRef.current.focus();
            }
        } else if (secondInputRef.current) {
            const currentSecondInput = secondInputRef.current.value.replace(/-/g, '');
            const updatedValue = currentSecondInput + value;

            if (secondInput.length > 8) {
                return;
            }

            let formattedValue = updatedValue;

            if (updatedValue.length > 3) {
                formattedValue = `${updatedValue.slice(0, 3)}-${updatedValue.slice(3)}`;
            }

            if (updatedValue.length > 5) {
                formattedValue = `${formattedValue.slice(0, 6)}-${formattedValue.slice(6)}`;
            }

            setSecondInput(formattedValue);
        }
    }

    const {data, isError, isLoading} = usePhoneQuery(`+7${number}`)
    // const { data, isError, isLoading } = usePhoneQuery('9312467973')
    const phoneData = data






    const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

        if (firstInput.length === 3 && secondInput.length === 9) {
            const finalNumber = firstInput + secondInput.replace(/\D/g, '');
            setNumber(finalNumber);
            console.log('phoneData', phoneData)
        }
    }





    return (
        <div
            onKeyDown={handleBackspace}
            className={s.screen}
        >
            <div className={s.block}>

                {phoneData?.isValidNumber ? (
                    <div className={s.screen_block}>
                        <div className={s.valid_block}>
                            <h2>
                                ЗАЯВКА ПРИНЯТА
                            </h2>
                            <p>
                                Держите телефон под рукой.
                                Скоро с Вами свяжется наш менеджер.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className={s.screen_block}>
                        <div className={s.screen_block_title}>
                            Введите ваш номер мобильного телефона
                        </div>

                        <div className={s.inputs_block}
                        >
                            <span
                                className={s.inputs_span}
                            >+7(</span>
                            <input
                                ref={firstInputRef}
                                type="text"
                                value={firstInput}
                                onChange={handleFirstInputChange}
                                maxLength={3}
                                className={`${s.number_input2} ${phoneData?.isValidNumber === false  ? s.error : ''}`}
                            />
                            <span className={s.inputs_span2}>)</span>
                            <input
                                ref={secondInputRef}
                                type="text"
                                value={secondInput}
                                onChange={handleSecondInputChange}
                                maxLength={9}
                                onKeyUp={handleBackspace}
                                className={`${s.number_input3} ${phoneData?.isValidNumber === false ? s.error : ''}`}
                            />
                        </div>
                        <span className={s.about}>и с Вами свяжется наш менеджер для дальнейшей консультации</span>
                        <div className={s.buttons_block}>
                            <div className={s.row}>
                                <button
                                    onClick={handleButtonClick}
                                    data-value="1"
                                    className={s.number}
                                >
                                    1
                                </button>
                                <button
                                    onClick={handleButtonClick}
                                    data-value="2"
                                    className={s.number}
                                >
                                    2
                                </button>
                                <button
                                    onClick={handleButtonClick}
                                    data-value="3"
                                    className={s.number}
                                >
                                    3
                                </button>
                            </div>
                            <div className={s.row}>
                                <button
                                    onClick={handleButtonClick}
                                    data-value="4"
                                    className={s.number}
                                >
                                    4
                                </button>
                                <button
                                    onClick={handleButtonClick}
                                    data-value="5"
                                    className={s.number}
                                >
                                    5
                                </button>
                                <button
                                    onClick={handleButtonClick}
                                    data-value="6"
                                    className={s.number}
                                >
                                    6
                                </button>
                            </div>
                            <div className={s.row}>
                                <button
                                    onClick={handleButtonClick}
                                    data-value="7"
                                    className={s.number}
                                >
                                    7
                                </button>
                                <button
                                    onClick={handleButtonClick}
                                    data-value="8"
                                    className={s.number}
                                >
                                    8
                                </button>
                                <button
                                    onClick={handleButtonClick}
                                    data-value="9"
                                    className={s.number}
                                >
                                    9
                                </button>
                            </div>
                            <div className={s.row}>
                                <button
                                    onClick={handleButtonDelete}
                                    className={s.delete}
                                >
                                    Стереть
                                </button>
                                <button
                                    onClick={handleButtonClick}
                                    data-value="0"
                                    className={s.zero}
                                >
                                    0
                                </button>
                            </div>
                        </div>
                        <div
                            onClick={() => console.log('inputLeng', secondInput.length)}
                            className={s.check_block}>

                            {phoneData?.isValidNumber === false && secondInput.length === 9 ?  (

                                <span className={s.error_title}>Неверно введён номер</span>
                            ) : (

                                <>
                                    <input type="checkbox" id="consentCheckbox" onChange={() => setChecked(!checked)}/>
                                    <span>Согласие на обработку персональных данных</span>
                                </>
                            )}

                        </div>
                        <button
                            disabled={activeButton}
                            className={s.submit}
                            onClick={submitHandler}
                        >
                            Подтвердить номер
                        </button>
                    </div>
                )}
            </div>
            <div className={s.background}>

                <div className={s.background_block}>


                    {noEvents && (

                        <div className={s.timer_block}>
                            <Timer/>
                        </div>

                    )}

                    <div className={s.close}>
                        <button onClick={() => navigate('/')}>X</button>
                        <div className={s.qr_code}>
                            <p>Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</p>
                            <img src={require('../../assets/index 1.png')}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Screen;

