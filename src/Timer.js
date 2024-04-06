import React, { useState, useEffect } from 'react';
import './Timer.css';

let onInitialSeconds = 1220;
let offSecondsRemaining = 20;

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
        if (label === "START") {
            setTimerStarted(true);
            setTimerPaused(false);
        } else if (label === "RESET") {
            setSecondsRemaining(onInitialSeconds);
            setTimerStarted(false);
        } else if (label === "PAUSE"){
            setTimerPaused(true);
        } else if (label === "RESUME"){
            setTimerPaused(false);
            setSecondsRemaining(secondsRemaining - 1);
        }
    }
    let secondsWithoutOffTime = secondsRemaining - 20;
    const minutes = Math.floor(secondsWithoutOffTime / 60);
    let seconds = secondsWithoutOffTime - (minutes * 60);

    if(timerStarted){
        if(secondsRemaining <= 20){
            seconds = secondsRemaining;
            console.log("Seconds: " + seconds);
            return (
                <div class="innerColumnContainer">
                    <TimeAsset time="00:00" label="ON"/>
                    <TimeAsset time={`00:${seconds.toString().padStart(2, '0')}`} label="OFF"/>
                    <ButtonContainer timerStarted={timerStarted} toggleTimer={toggleTimer} timerPaused={timerPaused}/>
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

function ButtonContainer({ timerStarted, toggleTimer, timerPaused }) {
    if (timerStarted === false) {
        return (
            <div className="buttonHolder">
                <TimerButton label="START" onClick={() => toggleTimer("START")} />
            </div>
        );
    } else {
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


function TimerButton(props){

    if(props.label === "START"){
        return(
            <div className="timerBtn start" onClick={props.onClick}>{props.label}</div>
        );
    }
    else if(props.label === "PAUSE"){
        return(
            <div className="timerBtn pause" onClick={props.onClick}>{props.label}</div>
        );
    }
    else if(props.label === "RESET"){
        return(
            <div className="timerBtn reset" onClick={props.onClick}>{props.label}</div>
        );
    }   
    else if(props.label === "RESUME"){
        return(
            <div className="timerBtn resume" onClick={props.onClick}>{props.label}</div>
        );
    }   
}


export default Timer;
