import React from 'react';
import './Timer.css';

let timerStarted = false;
let onSecondsRemaining = 1200;
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
    return (
        <div class="innerColumnContainer">
            <TimeAsset time="20" label="ON"/>
            <TimeAsset time="20" label="OFF"/>
            <ButtonContainer />
        </div>
    );
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
            <div> { props.label }</div>
        </div>
        
    );
}

function ButtonContainer(){

    if(timerStarted === false){
        return(
            <div class="buttonHolder">
                <TimerButton label="START"/>
            </div>
        );
    } else{
        return(
            <div class="buttonHolder">
                <TimerButton label="PAUSE"/>
                <TimerButton label="RESET"/>
            </div>
        );
    }
}

function TimerButton(props){
    function timerStart(){
        timerStarted = !timerStarted;
        console.log(timerStarted);
    }

    if(props.label === "START"){
        return(
            <div class="timerBtn start" onClick={timerStart}>{props.label}</div>
        );
    }
    else if(props.label === "PAUSE"){
        return(
            <div class="timerBtn pause">{props.label}</div>
        );
    }
    else if(props.label === "RESET"){
        return(
            <div class="timerBtn reset">{props.label}</div>
        );
    }   
}

export default Timer;
