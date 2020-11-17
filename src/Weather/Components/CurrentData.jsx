import React from 'react';
import styled from "styled-components";

const CurrentDataWrapper = styled.div`
    width:100%;
    height:auto;
    display:flex;
    align-items:center;
    justify-content:center;
`
const CurrentDataContainer = styled.div`
    width:60%;
    height:auto;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-flow: column;
    color:white;
    text-align:center;
`
const CityName = styled.h3`
    width:100%;
    margin:0px;
    padding:0px;
`
const CurrentWeatherImage = styled.img`
    margin:0px;
    padding:0px;
`
const CurrentWeatherTemp = styled.p`
    margin:0px;
    padding:0px;
`



const CurrentData = (props) => {
    const {cityName,dataResponse}=props;
    let currentData=null;
    if(dataResponse){
        let imgSrc =dataResponse.current.weather[0].icon;
        let temDescription =dataResponse.current.weather[0].description;
        let temp =Math.round(dataResponse.current.temp);
        currentData= <CurrentDataContainer>
                <CityName>{cityName}</CityName>
                <CurrentWeatherImage src={`http://openweathermap.org/img/wn/${imgSrc}@2x.png`} />
                <CurrentWeatherTemp>
                    {temp} c  |  {temDescription}
                </CurrentWeatherTemp>
            </CurrentDataContainer>
    }


    return (
        <CurrentDataWrapper>
            {currentData}
        </CurrentDataWrapper>
    );
};

export default CurrentData;