import React, { useState, useEffect } from 'react';
import './Timer.css';
import chime from './chime.mp3'

let onInitialSeconds = 1220;

function Timer() {
    return (
        <div className="outerCircle">
            <div className="timerBarCircle">
                <div className="innerCircle">
                    <InnerTimer />
                </div>
            </div>
        </div>
    );
}

function InnerTimer(){

    const [secondsRemaining, setSecondsRemaining] = useState(onInitialSeconds);
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerPaused, setTimerPaused] = useState(false);
    const [timerFinished, setTimerFinished] = useState(false);
    const [chimePlayed, setChimePlayed] = useState(false);
    const [looping, setLooping] = useState(false);

    let secondsWithoutOffTime = secondsRemaining - 20;
    let minutes = Math.floor(secondsWithoutOffTime / 60);
    let seconds = secondsWithoutOffTime - (minutes * 60);

    useEffect(() => {
        let timer;

        if (timerStarted && secondsRemaining > 0 && !timerPaused) {
            timer = setTimeout(() => {
                setSecondsRemaining(secondsRemaining - 1);
            }, 1000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [timerStarted, secondsRemaining, timerPaused]);

    function toggleTimer(label) {
        switch(label) {
            case "START":
                startTimer();
                break;
            case "RESET":
                resetTimer();
                setIfTimerFinished(false);
                break;
            case "PAUSE":
                pauseTimer();
                break;
            case "RESUME":
                resumeTimer();
                break;
            default:
                break;
        }
    }
    
    function startTimer() {
        setTimerStarted(true);
        setTimerPaused(false);
    }
    
    function resetTimer() {
        setSecondsRemaining(onInitialSeconds);
        setTimerStarted(false);
        toggleChimePlayed(false);
    } 
    function pauseTimer() {
        setTimerPaused(true);
    }
    function setIfTimerFinished(isTimerFinished){
        setTimerFinished(isTimerFinished);
    }
    function resumeTimer() {
        setTimerPaused(false);
        if(secondsRemaining > 0){
            setSecondsRemaining(secondsRemaining - 1);
        } else{
            setSecondsRemaining(secondsRemaining);
        }
    }
    function toggleChimePlayed(hasChimePlayed){
        setChimePlayed(hasChimePlayed);
    }
    function toggleLoop(loopBool){
        setLooping(loopBool);
    }

    function playSound(){
        let chimeSound = new Audio(chime);
        chimeSound.volume = .2;
        chimeSound.play();
    }

    useEffect(() => {
        if (secondsRemaining === 0 && looping) {
            resetTimer();
            startTimer();
        }
        if(secondsRemaining === 20 && !chimePlayed){
            playSound();
            toggleChimePlayed(true);
        }
        if(secondsRemaining === 0 && timerFinished === false && looping === false){
            setIfTimerFinished(true);
        }
    }, [secondsRemaining, looping]);

    if(timerStarted){
        if(secondsRemaining <= 20){
            return (
                <div className="innerColumnContainer">
                    <TimeAsset time="00:00" label="ON"/>
                    <TimeAsset time={`00:${secondsRemaining.toString().padStart(2, '0')}`} label="OFF"/>
                    <ButtonContainer timerStarted={timerStarted} toggleTimer={toggleTimer} timerPaused={timerPaused} timerFinished={timerFinished} looping={looping}/>
                    {!looping ? <TimerButton label="LOOP OFF" onClick={() => toggleLoop(!looping)} /> : <TimerButton label="LOOP ON" onClick={() => toggleLoop(!looping)} />}
                </div>
            );
        } else{
            return (
                <div className="innerColumnContainer">
                    <TimeAsset time={`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`} label="ON"/>
                    <TimeAsset time="00:20" label="OFF"/>
                    <ButtonContainer timerStarted={timerStarted} toggleTimer={toggleTimer} timerPaused={timerPaused} looping={looping}/>
                    {!looping ? <TimerButton label="LOOP OFF" onClick={() => toggleLoop(!looping)} /> : <TimerButton label="LOOP ON" onClick={() => toggleLoop(!looping)} />}
                </div>
            );
        }

    }
    else{
        return (
            <div className="innerColumnContainer">
                <TimeAsset time="20" label="ON"/>
                <TimeAsset time="20" label="OFF"/>
                <ButtonContainer timerStarted={timerStarted} toggleTimer={toggleTimer} timerPaused={timerPaused} looping={looping}/>
                {!looping ? <TimerButton label="LOOP OFF" onClick={() => toggleLoop(!looping)} /> : <TimerButton label="LOOP ON" onClick={() => toggleLoop(!looping)} />}
            </div>
        );
    }
}


function TimeAsset(props){

    function getLabelType(){
        if(props.label === "ON"){
            return "timeContainer on";
        } else {
            return "timeContainer off";
        }
    }
    return (
        <div class= { getLabelType() }>
            <div>{ props.time }</div>
            <div>{ props.label }</div>
        </div>
        
    );
}

function ButtonContainer({ timerStarted, toggleTimer, timerPaused, timerFinished, looping }) {
    const isTimerFinishedAndNotLooping = timerFinished && !looping;

    if (!timerStarted) {
        return (
            <div className="buttonHolder">
                <TimerButton label="START" onClick={() => toggleTimer("START")} />
            </div>
        );
    } else if (isTimerFinishedAndNotLooping) {
        return (
            <div className="buttonHolder">
                <TimerButton label="RESET" onClick={() => toggleTimer("RESET")} />
            </div>
        );
    } else if (timerPaused) {
        return (
            <div className="buttonHolder">
                <TimerButton label="RESUME" onClick={() => toggleTimer("RESUME")} />
                <TimerButton label="RESET" onClick={() => toggleTimer("RESET")} />
            </div>
        );
    } else {
        return (
            <div className="buttonHolder">
                <TimerButton label="PAUSE" onClick={() => toggleTimer("PAUSE")} />
                <TimerButton label="RESET" onClick={() => toggleTimer("RESET")} />
            </div>
        );
    }
}



function TimerButton(props) {
    let buttonClass = "";
    switch (props.label) {
        case "START":
            buttonClass = "start";
            break;
        case "PAUSE":
            buttonClass = "pause";
            break;
        case "RESET":
            buttonClass = "reset";
            break;
        case "RESUME":
            buttonClass = "resume";
            break;
        case "LOOP OFF":
            buttonClass = "loopOff";
            break;
        case "LOOP ON":
            buttonClass = "loopOn";
            break;
        default:
            break;
    }
    return (
        <div className={"timerBtn " + buttonClass} onClick={props.onClick}>{props.label}</div>
    );
}

export default Timer;
