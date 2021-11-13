const cityName=document.querySelector(".city-name");
const weatherState=document.querySelector(".weather-state");
// const weatherIcon=document.getElementsByClassName(".weather-icon")
const currentTemp=document.querySelector(".current-temp")
const humidity=document.querySelector(".humidity")
const wind=document.querySelector(".wind")
const uv=document.querySelector(".uv")
const dailyForecast=document.querySelector(".daily-forecast")
const hourlyForecast=document.querySelector(".hourly-forecast")
const currentContainer=document.querySelector(".current-container")
const searchInput=document.querySelector('#search-input')
const container= document.querySelector(".container")




async function getAPI(url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=Hanoi&days=5') {
   
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": "eaea6017f3msh7a918588b36e934p15386bjsnffe896452576"
      },
    });
    return response.json(); 
    
}




getAPI().then(result =>{
    console.log(result)
    const j=result.forecast.forecastday;

    cityName.innerHTML=result.location.name;
    weatherState.innerHTML=(Object.values(result.current.condition))[0];
    weatherIcon=document.createElement('img')
    weatherIcon.src=(Object.values(result.current.condition))[1]
    currentContainer.appendChild(weatherIcon)
    currentTemp.innerHTML=result.current.temp_c + " " + "C";

    humidity.innerHTML=result.current.humidity+ "%"
    wind.innerHTML=result.current.wind_mph+ "km/h"
    uv.innerHTML=result.current.uv

    h3Daily=document.createElement('h3')
    h3Daily.innerHTML='Daily Forecast'
    dailyForecast.appendChild(h3Daily)

    for(let i of j){
     
      divDaily=document.createElement('div')
      divDaily.className="div-daily"
      day=document.createElement('p')
      temperature=document.createElement('p')
      icon=document.createElement('img')
      icon.src=(Object.values(i.day.condition))[1]
      percent=document.createElement('p')
      day.innerHTML=i.date;
      temperature.innerHTML=i.day.avgtemp_c + " C"
      percent.innerHTML=i.day.daily_chance_of_rain+"%";
      divDaily.appendChild(day)
      divDaily.appendChild(temperature)
      divDaily.appendChild(icon)
      divDaily.appendChild(percent)
      dailyForecast.appendChild(divDaily)
}
    let k=j[0].hour;
    // console.log(k)
    h3Hourly=document.createElement('h3')
    h3Hourly.innerHTML="Hourly Forecast"
    hourlyForecast.appendChild(h3Hourly);

    for( let x=0;x<k.length;x++){
      // console.log(k[x].time)
      divHourly=document.createElement("div")
      divHourly.className="div-hourly"
      hour=document.createElement('p')
      temHourly=document.createElement('p')
      iconHourly=document.createElement('img')
      iconHourly.src=(Object.values(k[x].condition))[1]
      percentHourly=document.createElement('p')
      hour.innerHTML=k[x].time.slice(-5)
      temHourly.innerHTML=k[x].temp_c+" C"
      percentHourly.innerHTML=k[x].chance_of_rain+"%"
      divHourly.appendChild(hour)
      divHourly.appendChild(temHourly)
      divHourly.appendChild(iconHourly)
      divHourly.appendChild(percentHourly)
      hourlyForecast.appendChild(divHourly)
    }
  })
// .catch(
//   console.log("error")
// )

searchInput.addEventListener("change", async ()=> {

  // let del=await fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=Hanoi&days=5',{
  //   method: "DELETE"

  //     }).then(del =>{
  //       console.log(del.status);
  //     })
    



  let userInput= document.getElementById('search-input').value;
  console.log(userInput)
  
  
  let res= await fetch("https://weatherapi-com.p.rapidapi.com/forecast.json?q=**"+ userInput +"**&days=3",{
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": "eaea6017f3msh7a918588b36e934p15386bjsnffe896452576"
      },

  })
  await res.json().then(res =>{
    console.log(res)
    const j=res.forecast.forecastday;
    // console.log(j)
    cityName.innerHTML=res.location.name;
    weatherState.innerHTML=(Object.values(res.current.condition))[0];
    // weatherIcon=document.createElement('img')
    weatherIcon.src=(Object.values(res.current.condition))[1]
    // currentContainer.appendChild(weatherIcon)
    currentTemp.innerHTML=res.current.temp_c + " " + "C";

    humidity.innerHTML=res.current.humidity+ "%"
    wind.innerHTML=res.current.wind_mph+ "km/h"
    uv.innerHTML=res.current.uv

    // h3Daily=document.createElement('h3')
    // h3Daily.innerHTML='Daily Forecast'
    // dailyForecast.appendChild(h3Daily)

    for(let i of j){
     
      // divDaily=document.createElement('div')
      // divDaily.className="div-daily"
      // day=document.createElement('p')
      // temperature=document.createElement('p')
      // icon=document.createElement('img')
      icon.src=(Object.values(i.day.condition))[1]
      // percent=document.createElement('p')
      day.innerHTML=i.date;
      temperature.innerHTML=i.day.avgtemp_c + " C"
      percent.innerHTML=i.day.daily_chance_of_rain+"%";
      // divDaily.appendChild(day)
      // divDaily.appendChild(temperature)
      // divDaily.appendChild(icon)
      // divDaily.appendChild(percent)
      // dailyForecast.appendChild(divDaily)
}
    let k=j[0].hour;
    // console.log(k)
    // h3Hourly=document.createElement('h3')
    h3Hourly.innerHTML="Hourly Forecast"
    // hourlyForecast.appendChild(h3Hourly);

    for( let x=0;x<k.length;x++){
      // console.log(k[x].time)
      // divHourly=document.createElement("div")
      // divHourly.className="div-hourly"
      // hour=document.createElement('p')
      // temHourly=document.createElement('p')
      // iconHourly=document.createElement('img')
      iconHourly.src=(Object.values(k[x].condition))[1]
      // percentHourly=document.createElement('p')
      hour.innerHTML=k[x].time.slice(-5)
      temHourly.innerHTML=k[x].temp_c+" C"
      percentHourly.innerHTML=k[x].chance_of_rain+"%"
      // divHourly.appendChild(hour)
      // divHourly.appendChild(temHourly)
      // divHourly.appendChild(iconHourly)
      // divHourly.appendChild(percentHourly)
      // hourlyForecast.appendChild(divHourly)
    }
  })
      // container.classList.add('hidden')
      // container.classList.remove('hidden')
})


  


