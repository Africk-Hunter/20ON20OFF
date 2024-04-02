import React from 'react';
import './Timer.css';

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
        if(props.label == "ON"){
            return "timeContainer on";
        } else {
            return "timeContainer off";
        }
    }

    return (
        <div class= { getLabelType() }>
            <div class="time">{ props.time }</div>
            <div class="label"> { props.label }</div>
        </div>
        
    );
}

function ButtonContainer(){

}

export default Timer;
