import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchForm from "./Components/SearchForm";
import CurrentData from "./Components/CurrentData";
import HourlyComponent from "./Components/HourData";
import WeeklyData from "./Components/WeekData";
import CurrentDetailedData from "./Components/CurrentDetailData";
import axios from "axios";

const WeatherAppWrapper = styled.div`
    width:100vw;
    height:100vh;
   // background-color:#000 ;
   background-image:url("https://shiftyjelly.files.wordpress.com/2013/11/w.jpg?w=750&h=425");
   object-fit:contain;
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
    display:flex;
    align-items:center;
    justify-content:center;

`
const WeatherAppContainer = styled.div`
      width:60%;
      height:90%;
      background-color:rgb(0,0,0,0.6);
      overflow:auto;
      ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
    @media(max-width:800px){
        width:80%;
    }
    @media(max-width:500px){
        width:100%;
        height:100%;
    }
`
function Weather(props) {
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [city, setCity] = useState();
    const [dataResponse,setDataResponse]= useState();
    const Api_Key = process.env.WeatherApi;
    const Api = process.env.GoogleApi;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async function (position) {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        })
        
    }, [])

    useEffect(()=>{
        if(lat && lon){
            fetchWeather();
        }
    },[lat && lon])

   


    const fetchWeather = async () => {
        if (lat && lon) {
             axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${process.env.REACT_APP_WeatherApi}`)
            .then(response=>{
                setDataResponse(response.data);
            })
            .catch(error=>console.log(error))

            if (!city) {
                await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.REACT_APP_GoogleApi}`
                )
                    .then((response) => {
                        let parts = response.data.results[0].address_components;
                        parts.map(data => {
                             if (data.types[0] === "locality") {
                                setCity(data.long_name);
                            }
                        });

                    })
                    .catch((err) => console.log(err))


            }


       }
    }
    const SubmitHandler =async(address)=>{
        if(address!==""){
            await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GoogleApi}`)
            .then((response)=>{
                let location = response.data.results[0].geometry.location;
                let address = response.data.results[0].formatted_address;
                    setLat(location.lat) ;
                    setLon(location.lng);
                    setCity(address);
       
            })
            .catch((err)=>console.log(err))
        }
        else{
            console.log("address is empty")
        }
       
    }
    return (
        <WeatherAppWrapper>
            <WeatherAppContainer>
                <SearchForm 
                SubmitHandler={SubmitHandler}/>
               { dataResponse && 
                <CurrentData
                     cityName={city}
                    dataResponse={dataResponse}
                />}
                {dataResponse &&
             <HourlyComponent 
                // hourlyData={hourlyData} 
                // timeData={timeData}
                dataResponse={dataResponse}
                />}
                {dataResponse &&
                <WeeklyData
                    // weeklyData={weekData}
                    dataResponse={dataResponse}
                />}
               {dataResponse   &&
                <CurrentDetailedData 
                // currentData={currentData}
                // timeData={timeData}
                dataResponse={dataResponse}
                /> }
            </WeatherAppContainer>
        </WeatherAppWrapper>
    );
}

export default Weather;