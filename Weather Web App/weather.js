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
const hourSubContainer = document.querySelector(".hour-subcontainer")


btnBack=document.createElement("button")
    btnBack.className="btnBack button"
    btnBack.innerHTML="Back"
    hourSubContainer.appendChild(btnBack) 
    hourlyForecast.appendChild(btnBack)

    btnNext=document.createElement("button")
    btnNext.className="btnNext button"
    btnNext.innerHTML="Next"
    hourSubContainer.appendChild(btnNext)
    hourlyForecast.appendChild(btnNext)

    btnBack=document.querySelector(".btnBack")
    btnNext=document.querySelector(".btnNext")

    var curDate= new Date()
    var index= curDate.getHours()
    console.log(index)



async function getAPI(city) {
   
  url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=5`
  console.log(url)
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

function createObj(hour,temperature,imgSrc,percent){
      subsubcontainer= document.createElement("div");
      subsubcontainer.className="sub-sub-container"
      hourP=document.createElement("p")
      hourP.innerHTML=hour
      temperatureP=document.createElement("p")
      temperatureP.innerHTML=temperature
      imgTag= document.createElement("img")
      imgTag.src=imgSrc
      percentP=document.createElement("p")
      percentP.innerHTML=percent
      space= document.createElement("div")
      space.className='space'
      subsubcontainer.appendChild(hourP)
      subsubcontainer.appendChild(temperatureP)
      subsubcontainer.appendChild(imgTag)
      subsubcontainer.appendChild(percentP)
      subsubcontainer.appendChild(space)
      
      return subsubcontainer

}

function render(newHourList){
  hourSubContainer.innerHTML = "";
  for(hour of newHourList){
    createObj(hour.time.slice(-5),hour.temp_c+" C",(Object.values(hour.condition))[1],hour.chance_of_rain+"%")
    hourSubContainer.appendChild(subsubcontainer)
    hourlyForecast.appendChild(hourSubContainer)
}
  
}


getAPI('ha noi').then(result =>{
    console.log(result)
   
    cityName.innerHTML=result.location.name;
    weatherState.innerHTML=(Object.values(result.current.condition))[0];
    weatherIcon=document.createElement('img')
    weatherIcon.src=(Object.values(result.current.condition))[1]
    currentContainer.appendChild(weatherIcon)
    currentTemp.innerHTML=result.current.temp_c + " " + "C";
    humidity.innerHTML=result.current.humidity+ "%"
    wind.innerHTML=result.current.wind_mph+ "km/h"
    uv.innerHTML=result.current.uv

    hourArr = result.forecast.forecastday[0].hour
    console.log(hourArr)

    btnBack.addEventListener("click", () => {
      index -=1;
      if(index <0){
        index = 20;
      }
      console.log(index);
      newHourList = hourArr.slice(index, index+4)
      render(newHourList)
})

    btnNext.addEventListener("click", () => {
      index +=1;
      if(index >20 ){
        index = 0;
        
      }
      console.log(index);
      newHourList = hourArr.slice(index, index+4)
      render(newHourList)
})
render(hourArr.slice(index, index+4))

dayArr= result.forecast.forecastday;
    // console.log(dayArr)
    dailySubContainer=document.querySelector(".daily-subcontainer")
    for(dayly of dayArr){

      createObj(dayly.date,dayly.day.avgtemp_c+" C",dayly.day.condition.icon,dayly.day.daily_chance_of_rain+"%")
      dailySubContainer.appendChild(subsubcontainer)
      dailyForecast.appendChild(dailySubContainer)
    }
})




searchInput.addEventListener("change", async ()=> {
  let userInput= document.getElementById('search-input').value;
  console.log(userInput)
  getAPI(userInput).then(res=>{
    console.log(res)
    cityName.innerHTML=res.location.name;
    weatherState.innerHTML=(Object.values(res.current.condition))[0];
    weatherIcon.src=(Object.values(res.current.condition))[1]
    currentTemp.innerHTML=res.current.temp_c + " " + "C";
    humidity.innerHTML=res.current.humidity+ "%"
    wind.innerHTML=res.current.wind_mph+ "km/h"
    uv.innerHTML=res.current.uv

    hourArr = res.forecast.forecastday[0].hour
    
    console.log(hourArr)
    
    hourSubContainer.innerHTML=""
    render(hourArr.slice(index, index+4))

    dayArr= res.forecast.forecastday;
    console.log(dayArr)
    dailySubContainer=document.querySelector(".daily-subcontainer")
    dailySubContainer.innerHTML=""
    for(dayly of dayArr){

      createObj(dayly.date,dayly.day.avgtemp_c+" C",dayly.day.condition.icon,dayly.day.daily_chance_of_rain+"%")
      dailySubContainer.appendChild(subsubcontainer)
      dailyForecast.appendChild(dailySubContainer)
   }
  })
})





