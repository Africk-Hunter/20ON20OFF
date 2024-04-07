import React, { useState, useEffect } from 'react';
import './Timer.css';

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
                ifTimerFinished(false);
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
    }
    
    function pauseTimer() {
        setTimerPaused(true);
    }
    function ifTimerFinished(isTimerFinished){
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
    
    let secondsWithoutOffTime = secondsRemaining - 20;
    const minutes = Math.floor(secondsWithoutOffTime / 60);
    let seconds = secondsWithoutOffTime - (minutes * 60);

    if(timerStarted){
        if(secondsRemaining === 0 && timerFinished === false){
            ifTimerFinished(true);
        }
        if(secondsRemaining <= 20){
            seconds = secondsRemaining;
            return (
                <div class="innerColumnContainer">
                    <TimeAsset time="00:00" label="ON"/>
                    <TimeAsset time={`00:${seconds.toString().padStart(2, '0')}`} label="OFF"/>
                    <ButtonContainer timerStarted={timerStarted} toggleTimer={toggleTimer} timerPaused={timerPaused} timerFinished={timerFinished}/>
                </div>
            );
        } else{
            return (
                <div class="innerColumnContainer">
                    <TimeAsset time={`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`} label="ON"/>
                    <TimeAsset time="00:20" label="OFF"/>
                    <ButtonContainer timerStarted={timerStarted} toggleTimer={toggleTimer} timerPaused={timerPaused}/>
                </div>
            );
        }

    }
    else{
        return (
            <div class="innerColumnContainer">
                <TimeAsset time="20" label="ON"/>
                <TimeAsset time="20" label="OFF"/>
                <ButtonContainer timerStarted={timerStarted} toggleTimer={toggleTimer} timerPaused={timerPaused}/>
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

function ButtonContainer({ timerStarted, toggleTimer, timerPaused, timerFinished }) {
    if (timerStarted === false) {
        return (
            <div className="buttonHolder">
                <TimerButton label="START" onClick={() => toggleTimer("START")} />
            </div>
        );
    } else {
        if(timerFinished){
            return (
                <div className="buttonHolder">
                    <TimerButton label="RESET" onClick={() => toggleTimer("RESET")} />
                </div>
            );
        }
        if(timerPaused){
            return (
                <div className="buttonHolder">
                    <TimerButton label="RESUME" onClick={() => toggleTimer("RESUME")} />
                    <TimerButton label="RESET" onClick={() => toggleTimer("RESET")} />
                </div>
            );
        } else{
            return (
                <div className="buttonHolder">
                    <TimerButton label="PAUSE" onClick={() => toggleTimer("PAUSE")} />
                    <TimerButton label="RESET" onClick={() => toggleTimer("RESET")} />
                </div>
            );
        }
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
        default:
            break;
    }
    return (
        <div className={"timerBtn " + buttonClass} onClick={props.onClick}>{props.label}</div>
    );
}

export default Timer;
