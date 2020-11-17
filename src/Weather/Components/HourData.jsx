import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const HourDataWrapper = styled.div`
    width:100%;
    height:auto;
    background-image:linear-gradient(#F68007,#ffffff);
    color:#000;
    display:-webkit-inline-box;
    align-items:center;
    justify-content:center;
    overflow:scroll;
    margin:1.3rem 0;
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
`
const HourDataContainer = styled.div`
    width:20%;
    height:auto;
    color:#000;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-flow:column;
`
const Hours = styled.p`
    width:100%;
    height:auto;
    margin:0px;
    padding:0px;
    font-weight:bold;
`
const Icon = styled.img`
    margin:0px;
    padding:0px;
    height:48px;
`
const Temp = styled.p`
    margin:0px;
    padding:0px;
`

const HourData=(props)=> {

    const {dataResponse} =props;
    
    var [chunks,setChunks] = useState();;
    
    function splitArrayIntoChunksOfLen(arr, len) {
        var chunks1=[], i = 0, n = arr.length;
        while (i < 24) {
          chunks1.push(arr.slice(i, i += len));
        }
        
        return chunks1;
      }

 useEffect(()=>{
    
    if(dataResponse.hourly){
        setChunks(splitArrayIntoChunksOfLen(dataResponse.hourly,24));
       }
 },[dataResponse.hourly])


    const getHour =(time)=>{
    //  let date = new Date(time * 1000);
       
        
        let d = new Date(time * 1000);
        

       var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    
        let  nd = new Date(utc + (3600000*((dataResponse.timezone_offset/60)/60)));


        d.setTime(nd.getTime())
        //(nd.getMinutes() +date.getTimezoneOffset())
        // console.log("time: "+d.getHours())
      //  console.log("current time: "+d)
        return d.getHours();
    }

    let hourlyWeatherData =<p>waiting.......</p>
    if(dataResponse.hourly ){
        if(chunks && dataResponse){
            hourlyWeatherData= chunks[0].map((data,index)=>index < "24" && <HourDataContainer key={data.dt}>
            <Hours>{index ===0 ? "Now" : getHour(data.dt)}</Hours>
            <Icon src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
            <Temp>{Math.round(data.temp)}c</Temp>
            </HourDataContainer>
            )
        }
    }
   
   
    return (
        <HourDataWrapper>
            {hourlyWeatherData}
            
        </HourDataWrapper>
    );
}

export default HourData;