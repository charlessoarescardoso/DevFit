import React, { useState } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import HomeMonthScroll from '../Components/HomeMonthScroll';
import HomeDaysScroll from '../Components/HomeDaysScroll';
import HomeDayStatus from '../Components/HomeDaysStatus';
import { PAUSE } from 'redux-persist';

const Container = styled.SafeAreaView`
    align-items:center;
       
`;

const Legend = styled.View`
    width:90%;
    align-items:flex-start;
    margin-top:30px;
`;

const LegendText = styled.Text`
    color:#555;
`;

const LegendItem = styled.View`
    flex-direction: row;
    align-items:center;
    margin-top:5px;
`;

const LegendBox = styled.View`
    width:15px;
    height:15px;
    background-color:#ccc;
    margin-right:5px;
`;

const Page = (props) => {
    let today = new Date();

    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedDay, setSelectedDay] = useState(today.getDate());
  
    
    return(
        <Container>
            <HomeMonthScroll
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />
            <HomeDaysScroll
                selectedMonth={selectedMonth}   // itens of components
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                // itens of information
                dailyProgress={props.dailyProgress}
                workoutDays={props.workoutDays}

            />
            <HomeDayStatus
                selectedMonth={selectedMonth}   // itens of components
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                // itens of information
                dailyProgress={props.dailyProgress}
                workoutDays={props.workoutDays}

                addProgress={props.addProgress}
                delProgress={props.delProgress}
                goToWorkout={()=>props.navigation.navigate('WorkoutStack')}
            />

            <LegendText>Mes: {selectedMonth}</LegendText>
            <LegendText>Dia: {selectedDay}</LegendText>

            <Legend>
                <LegendText>Legenda:</LegendText>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#b5eeff'}}></LegendBox>
                    <LegendText>Hoje</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#b5ffb8'}}></LegendBox>
                    <LegendText>Treino feito</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#ffb5b5'}}></LegendBox>
                    <LegendText>Treino perdido</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#f4f4f4', opacity:0.2}}></LegendBox>
                    <LegendText>Dia de descanso</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#e6e6e6'}}></LegendBox>
                    <LegendText>Dia futuro</LegendText>
                </LegendItem>
            </Legend>
        </Container>
    );
}

Page.navigationOptions = ({navigation}) => {

    const ConfigButtonArea = styled.TouchableHighlight`
        width:30px;
        height:30px;
        justify-content:center;
        align-items:center;
    `;
    const ConfigButtonImage = styled.Image`
        width:25px;
        height:25px;
    `;

    const ConfigButton = () => {
        const btnAction = () => {
            navigation.navigate('HomeConfig');
        }
        return(
            <ConfigButtonArea onPress={btnAction}>
                <ConfigButtonImage source={require('../assets/config.png')} />
            </ConfigButtonArea>
        );
    }
    
    return {
        title:'Seu progresso diário',
        headerRight:<ConfigButton />,
        headerRightContainerStyle:{
            marginRight:10
        }

        
    }
} 
 
const mapStateToProps = (state) => {
    return {
        dailyProgress:state.userReducer.dailyProgress,
        workoutDays:state.userReducer.workoutDays

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       addProgress:(date)=>dispatch({type:'ADD_PROGRESS', payload:{date}}),
       delProgress:(date)=>dispatch({type:'DEL_PROGRESS', payload:{date}}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);