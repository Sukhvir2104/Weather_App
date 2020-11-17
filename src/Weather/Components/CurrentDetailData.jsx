import React from 'react';
import styled from "styled-components";

const CurrentDetailDataWrapper = styled.div`
    width:100%;
    height:auto;
   // background-color:#FFF6DF;
    display: grid;
    grid-template-columns: auto auto;
    color:white;
    margin-bottom:1rem;
`
const CurrentDetailDataConatiner = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-flow: column;
    border-bottom:${props=> props.id > props.ArrayLenght ? "none" :  "1px solid white"};
`
const DetailText = styled.p`
    font-weight:bold;
    margin:0px;
    padding:.5rem;
    text-align:left;
`
const DetailData = styled.p`
    margin:0px;
    padding:.5rem;
`

function CurrentDetailData(props) {
    const {dataResponse}=props;
    const detailText =[
        "Sunrise",
        "Sunset",
        "Feels Like",
        "Humidity",
        "Wind Speed",
        "Visibility",
        "Pressure",
        "UV Index"
    ];
    const getHour =(time)=>{
      //  let date = new Date(time * 1000);
        let d = new Date(time * 1000);
        

        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
     
         let  nd = new Date(utc + (3600000*((dataResponse.timezone_offset/60)/60)));
         d.setTime(nd.getTime())

         if(d.getHours()<10){
             if(d.getMinutes()<10){
                return "0"+d.getHours() +" : 0"+d.getMinutes();
             }
            
             return "0"+d.getHours() +" : "+d.getMinutes();
         } else if(d.getMinutes<10){
            return d.getHours() +" : 0"+d.getMinutes();
         }else{
            return d.getHours() +" : "+d.getMinutes();
         }
       //  return d.getHours() +" : "+d.getMinutes(); 
    }
    const getDirecction =(degree)=>{
          let compasDirection;
        if(degree >= 348.75 || degree <= 11.25){
            compasDirection="N";
        }else if(degree <= 33.75){
            compasDirection="NNE";
        }else if(degree <= 56.25){
            compasDirection="NE";
        }else if(degree <= 78.75){
            compasDirection="ENE";

        }else if(degree <= 101.25){
            compasDirection="E";
        }else if(degree <= 123.55){
            compasDirection="ESE";
        }else if(degree <= 146.25){
            compasDirection="SE";
        }else if(degree <= 168.75){
            compasDirection="SSE";
        }else if(degree <= 191.25){
            compasDirection="S";
        }else if(degree <= 213.75){
            compasDirection="SSW";
        }else if(degree <= 236.25){
            compasDirection="SW";
        }else if(degree <= 258.75){
            compasDirection="WSW";
        }else if(degree <= 281.25){
            compasDirection="W";
        }else if(degree <=  303.75){
            compasDirection="WNW";
        }else if(degree <=  326.25){
            compasDirection="NW";
        }else if(degree <=  348.75){
            compasDirection="NNW";
        }else{
            compasDirection=null;
        }
        return compasDirection;
    }
   
    let detailedDataValues =<p>waiting..........</p>
    if(dataResponse.current && dataResponse){
        let currentData = dataResponse.current;
        const detailData=[
            currentData.sunrise,
            currentData.sunset,
            currentData.feels_like.toFixed(1)+" c",
            currentData.humidity+"%",
            Math.round(((currentData.wind_speed)*3.6))+" km/hr  "+getDirecction(currentData.wind_deg) ,
            Math.round(((currentData.visibility)/1000))+" km",
            currentData.pressure+" hPa",
            Math.round(currentData.uvi)
        ]

        detailedDataValues= detailData.map((data,index)=><CurrentDetailDataConatiner key={index} id={index} ArrayLenght={detailData.length-3}>
            <DetailText>
                {detailText[index]}
            </DetailText>
            <DetailData>
                {index < "2" ? getHour(data): data}
            </DetailData>
        </CurrentDetailDataConatiner>)
    }
    return (
        <CurrentDetailDataWrapper>
            {detailedDataValues}
        </CurrentDetailDataWrapper>
    );
}

export default CurrentDetailData;