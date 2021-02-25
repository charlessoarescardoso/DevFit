import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import DefaultButton from '../Components/DefaultButton';

const BalloonTriangle = styled.View`
    width:0;
    height:0;
    borderLeftColor:transparent;
    borderLeftWidth:15;
    borderBottomWidth:15;
    borderBottomColor:#e6e6e6;
    borderRightWidth:15;
    borderRightColor:transparent;
`;
const BallonArea = styled.View`
    width:90%;
    padding:20px;
    background-color:#e6e6e6;
    border-radius:10px;
    min-height:100px;
`;

const BallonBigText = styled.Text`
    font-size:15px;
    align-self:center;
`;

const ButtonText = styled.Text`
    color:#fff;
    font-weight:bold;
`;
const BallonText = styled.Text`
    font-size:13px;
    align-self:center;
    margin-top:10px;
`;

const Strong = styled.Text`
    font-weight:bold;
`;

export default (props) => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);


    let thisDate = new Date(today.getFullYear(), props.selectedMonth, props.selectedDay);

    let thisYear = thisDate.getFullYear();
    let thisMonth = thisDate.getMonth() + 1;
    let thisDay = thisDate.getDate();

    thisMonth = (thisMonth < 10)?'0'+thisMonth:thisMonth;
    thisDay = (thisDay < 10)?'0'+thisDay:thisDay;
    let thisFormated = `${thisYear}-${thisMonth}-${thisDay}`;

    let dayOff = false;
    let isToday = false;
    let isFuture = false;
    let isDone = false;

    if(!props.workoutDays.includes(thisDate.getDay())) {
        dayOff = true;
    } else if (thisDate.getTime() > today.getTime()) {
        isFuture = true;
    } else {
        if(props.dailyProgress.includes(thisFormated)) {
            isDone = true;
        } else {
            isDone = false;
        }
    }

    if(thisDate.getTime() == today.getTime()) {
        isToday = true;
    }

    const setDone = () => {
        props.addProgress (thisFormated);
    }

    const setUnDone = () => {
        props.delProgress (thisFormated);
    }
            
    return(
        <>
            <BalloonTriangle></BalloonTriangle>
            <BallonArea>
                {dayOff && 
                    <BallonBigText>Dia de descanso!</BallonBigText>
                }
                {isFuture &&
                    <BallonBigText>Data no futuro</BallonBigText>
                }
                {!dayOff && !isFuture && isDone &&
                    <>
                        <BallonBigText><Strong>Parabéns,</Strong> você treinou!</BallonBigText>
                        <DefaultButton onPress={setUnDone} underlayColor="#4ac34e" bgcolor="#4ac34e" style={{marginTop:20}}>
                            <ButtonText>DESMARCAR</ButtonText>

                        </DefaultButton>
                    </>
                }
                {!dayOff && !isFuture && isDone &&! isToday &&
                    <>
                    <BallonBigText><Strong>Fraco!</Strong> Você falhou neste dia.</BallonBigText>
                    <DefaultButton onPress={setDone} underlayColor="#4ac34e" bgcolor="#4ac34e" style={{marginTop:20}}>
                        <ButtonText>MARCAR COMO FEITO</ButtonText>
                    </DefaultButton>
                    </>
                }
                {!dayOff && !isFuture && !isDone && isToday && 
                    <>
                    <BallonBigText><Strong>HOJE TEM TREINO</Strong></BallonBigText>
                    <BallonText>você .. para treinar</BallonText>
                    <DefaultButton onPress={props.goToWorkout} underlayColor="#4ac34e" bgcolor="#4ac34e" style={{marginTop:20}}>
                        <ButtonText>INICIAR TREINO</ButtonText>
                    </DefaultButton>
                    </>

                }
            </BallonArea>
        </>
    );
}
