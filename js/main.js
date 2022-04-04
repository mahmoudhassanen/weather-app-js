//Today's Card Variables:
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar"),
    apiResponse,
    resonseData,
    currentCity = 'cairo';


       //Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description");
Days = [
"sunday",
"monday",
"tuesday",
"wednesday",
"thursdays",
"friday",
"saturday",
]
monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];

async function GetWeaterData(){
     apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
     resonseData = await apiResponse.json()
    console.log(resonseData);
    displayTodayWeather();
    getNextDay()
}
GetWeaterData();

function displayTodayWeather() {
    let date = new Date();
    today.innerHTML = Days[date.getDay()]
    todayDate.innerHTML= `${date.getDate()} ${monthName[date.getMonth()]}`
    cityLocation.innerHTML = resonseData.location.name;    
    todayDegree.innerHTML = resonseData.current.temp_c;
    todayIcon.setAttribute('src',`https:${resonseData.current.condition.icon}`);  
    description.innerHTML = resonseData.current.condition.text;  
    humidty.innerHTML = resonseData.current.humidity;
    wind.innerHTML = resonseData.current.wind_kph;
    compass.innerHTML = resonseData.current.wind_dir;
}
function getNextDay() {
    for( let i=0; i<nextDay.length;i++){
        nextDay[i].innerHTML= Days[new Date(resonseData.forecast.forecastday[i+1].date).getDay()];
       nextDayIcon[i].setAttribute('src',`https:${resonseData.forecast.forecastday[i+1].day.condition.icon}`)
       maxDegree[i].innerHTML = resonseData.forecast.forecastday[i+1].day.maxtemp_c;
       minDegree[i].innerHTML =resonseData.forecast.forecastday[i+1].day.mintemp_c;
       nextDayDescription[i].innerHTML =resonseData.forecast.forecastday[i+1].day.condition.text;
      }
    
}
searchBar.onkeyup = () => {
    currentCity = searchBar.value;
    GetWeaterData();
  

}