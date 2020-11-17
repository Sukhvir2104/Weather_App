import React from 'react';
import styled from "styled-components"

const WeeklyDataWrapper = styled.div`
    width:100%;
    height:auto;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-flow:column;
    margin:0px 0px 1rem 0px;
    background-image: linear-gradient(#F68007, #F8ED7B);

`
const WeeklyDataContainer = styled.div`
    width:100%;
    height:auto;
    display:flex;
    align-items:center;
    justify-content:space-around;
    border-bottom:1px solid rgb(0,0,0,0.6);
`
const Days = styled.p`
    width:35%;
    height:auto;
    margin:0px;
    padding:0px 0px 0px 3rem;
    font-weight:bold;
    text-align:left;
`
const IconContainer = styled.div`
    margin:0px;
    padding:0px;  
    width:35%;  
`
const Icon = styled.img`
    margin:0px;
    padding:0px;
    height:48px;
`
const Temp = styled.p`
    width:15%;  
    margin:0px;
    padding:0px;
`
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

function WeekData(props) {
    let weekData = <p>waiting......</p>

    let {dataResponse} =props;
    const SetDate = (i) => {
        var today = new Date();
        var dd = String(today.getDate() + i + 1).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        var date = new Date()
        var d = new Date(`${yyyy}-${mm}-${dd}`)
        return d.getDay()
    }

    if (dataResponse.daily) {
        weekData = dataResponse.daily.map((data, index) => <WeeklyDataContainer key={index}>

            <Days>{weekday[SetDate(index)]}</Days>
            <IconContainer>
                <Icon src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
            </IconContainer>
            <Temp>{Math.round(data.temp.max)}</Temp>
            <Temp>{Math.round(data.temp.min)}</Temp>
        </WeeklyDataContainer>)
    }
    return (
        <WeeklyDataWrapper>
            {weekData}
        </WeeklyDataWrapper>
    );
}

export default WeekData;