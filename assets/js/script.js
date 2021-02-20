var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='
var searchEl = document.querySelector('#citySearched');
var apiKey = 'd2859c08329856077f40292bd485d4e7'

var apiFiveDayUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='
var apiCurrrent = 'http://api.openweathermap.org/data/2.5/weather?q='
var citiesArr = [];


// load sidebar searches 
$(document).ready(function(){
console.log('hello')
var citiesEl = document.querySelector('#cities');

var citiesArr = JSON.parse(localStorage.getItem('cities'));
console.log(citiesArr)
citiesArr.forEach(function(list){
    var searchedEl = document.createElement('div');
    searchedEl.textContent = list.city;
    console.log(list)
    console.log(citiesArr)

    citiesEl.appendChild(searchedEl);
    console.log(citiesEl)
    console.log(searchedEl)
})
})
/// Takes Search Value for Weather API and puts it into Local Storage
function saveCities(cityInputVal){
    

    var cities = {
        city: cityInputVal
    }

    citiesArr.push(cities.city);

    localStorage.setItem('cities', JSON.stringify(citiesArr));
    console.log(citiesArr);

}


///// Takes Search Value to start Weather API
function searchCity(event){
    event.preventDefault();

    var cityInputVal = document.querySelector('#cityInput').value;

    if (!cityInputVal) {
    
        return;
    }else {
        console.log(cityInputVal)
    }
    //searchCurrentWeather(cityInputVal); 
    searchWeather(cityInputVal);
    saveCities(cityInputVal)

}

searchEl.addEventListener('submit', searchCity); 

// Current Weather Fetch
function searchCurrentWeather(coord) {
    console.log(coord);

    var lat = coord.lat
    var lon = coord.lon
    console.log(lat, lon + '--------------')
    newUrl = apiUrl + lat +'&lon=' + lon +'&units=imperial&exclude=minutely,hourly,daily,alerts&appid=' + apiKey
    console.log(newUrl)
    
    
fetch(newUrl)
    .then(function(response){
        if (!response.ok){
            console.log("not working");
        }
        console.log(newUrl);
        console.log(response.json);
        return response.json();
    }).then(function(data){
        console.log(data);
        
        console.log(data.current);
        
        var todayEl = document.querySelector('#todaybox');
        var currentTempEl = document.createElement('div');
        var currentHumEl = document.createElement('div');
        var currentWindSpeedEl = document.createElement('div');
        var iconEl = document.createElement('img');
        var icon = data.current.weather[0].icon

        currentTempEl.textContent = 'Temperature: ' + Math.round(data.current.temp);
        currentHumEl.textContent = 'Humidity: ' + data.current.humidity +'%';
        currentWindSpeedEl.textContent = 'Wind Speed: ' + data.current.wind_speed + ' MPH';
        iconEl.setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`)


        todayEl.appendChild(iconEl);
        todayEl.appendChild(currentTempEl);
        todayEl.appendChild(currentHumEl);
        todayEl.appendChild(currentWindSpeedEl);

        

        
    });
}

//////////////////// FIVE DAY WEATHER FETCH \\\\\\\\\\\\\\

function searchWeather(query) {
    var todayEl = document.querySelector('#todaybox');
    var cityEl = document.createElement('h2')
    

    //apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?'+ query +'&cnt=5&appid=' + apiKey
    apiFiveDayUrl = apiFiveDayUrl + query + ',3166&units=imperial&cnt=40&appid=' + apiKey;
    
fetch(apiFiveDayUrl)
    .then(function(response){
        if (!response.ok){
            console.log("not working");
        }
        console.log(apiFiveDayUrl);
        console.log(response.json);
        return response.json();
    }).then(function(data){
        //Creates array to push objects from for loop into 
        
        var arr =[];
        var coord = data.city.coord;
        
        cityEl.textContent = data.city.name;
        todayEl.appendChild(cityEl);
        console.log(data)
        console.log(coord);
        
        searchCurrentWeather(coord);

        for(var i = 0; i < data.list.length; i++){
            if(data.list[i].dt_txt.includes("18:00:00")){
                
                console.log(data.list[i]);

                arr.push(data.list[i]);
                console.log(arr);
            }
        }
            console.log(arr)
            
            // Calling the 5 day functions
            attachDaily(arr)
            dailyTemp(arr)
            iconDaily(arr)
            humidDaily(arr)
    }); 
} 

// Function to Display 5 Day Date
function attachDaily(arr){
    

console.log(arr[0]);

var Date1 = new Date(arr[0].dt * 1000).toLocaleDateString("en-US")
var Date2 = new Date(arr[1].dt * 1000).toLocaleDateString("en-US")
var Date3 = new Date(arr[2].dt * 1000).toLocaleDateString("en-US")
var Date4 = new Date(arr[3].dt * 1000).toLocaleDateString("en-US")
var Date5 = new Date(arr[4].dt * 1000).toLocaleDateString("en-US")

var headerDate1 = document.createElement('h4')
var headerDate2 = document.createElement('h4')
var headerDate3 = document.createElement('h4')
var headerDate4 = document.createElement('h4')
var headerDate5 = document.createElement('h4')

var oneDayEl = document.getElementById('oneday')
var twoDayEl = document.getElementById('twoday')
var threeDayEl = document.getElementById('threeday')
var fourDayEl = document.getElementById('fourthday')
var fiveDayEl = document.getElementById('fifthday')

headerDate1.textContent = Date1;
headerDate2.textContent = Date2;
headerDate3.textContent = Date3;
headerDate4.textContent = Date4;
headerDate5.textContent = Date5;

oneDayEl.appendChild(headerDate1);
twoDayEl.appendChild(headerDate2);
threeDayEl.appendChild(headerDate3);
fourDayEl.appendChild(headerDate4);
fiveDayEl.appendChild(headerDate5);

console.log(Date1);
console.log(Date2);
console.log(Date3);
console.log(Date4);
console.log(Date5);
}
// Function to Display Daily Temperature

function dailyTemp(arr){
console.log(arr);

var oneTemp = arr[0].main.temp
var twoTemp = arr[1].main.temp
var threeTemp = arr[2].main.temp
var fourTemp = arr[3].main.temp
var fiveTemp = arr[4].main.temp


var day1Temp = document.createElement('p');
var day2Temp = document.createElement('p');
var day3Temp = document.createElement('p');
var day4Temp = document.createElement('p');
var day5Temp = document.createElement('p');

day1Temp.textContent = 'Temp: '+ oneTemp + ' °F';
day2Temp.textContent = 'Temp: '+ twoTemp + ' °F';
day3Temp.textContent = 'Temp: '+ threeTemp + ' °F';
day4Temp.textContent = 'Temp: '+ fourTemp + ' °F';
day5Temp.textContent = 'Temp: '+ fiveTemp + ' °F';

var oneDayEl = document.getElementById('oneday')
var twoDayEl = document.getElementById('twoday')
var threeDayEl = document.getElementById('threeday')
var fourDayEl = document.getElementById('fourthday')
var fiveDayEl = document.getElementById('fifthday')

oneDayEl.appendChild(day1Temp);
twoDayEl.appendChild(day2Temp);
threeDayEl.appendChild(day3Temp);
fourDayEl.appendChild(day4Temp);
fiveDayEl.appendChild(day5Temp);

}
// Function to Display Daily Humidity

function humidDaily(arr){

    var humid1 = arr[0].main.humidity
    var humid2 = arr[1].main.humidity
    var humid3 = arr[2].main.humidity
    var humid4 = arr[3].main.humidity
    var humid5 = arr[4].main.humidity
    
    var humidDay1 = document.createElement('p');
    var humidDay2 = document.createElement('p');
    var humidDay3 = document.createElement('p');
    var humidDay4 = document.createElement('p');
    var humidDay5 = document.createElement('p');

    humidDay1.textContent = 'Humidity: '+ humid1 + '%'
    humidDay2.textContent = 'Humidity: '+ humid2 + '%'
    humidDay3.textContent = 'Humidity: '+ humid3 + '%'
    humidDay4.textContent = 'Humidity: '+ humid4 + '%'
    humidDay5.textContent = 'Humidity: '+ humid5 + '%'

    var oneDayEl = document.getElementById('oneday')
    var twoDayEl = document.getElementById('twoday')
    var threeDayEl = document.getElementById('threeday')
    var fourDayEl = document.getElementById('fourthday')
    var fiveDayEl = document.getElementById('fifthday')

    oneDayEl.appendChild(humidDay1)
    twoDayEl.appendChild(humidDay2)
    threeDayEl.appendChild(humidDay3);
    fourDayEl.appendChild(humidDay4);
    fiveDayEl.appendChild(humidDay5);
}
///Function to dsiplay 5 day icons

function iconDaily(arr){

    var icon1 = arr[0].weather[0].icon
    var icon2 = arr[1].weather[0].icon
    var icon3 = arr[2].weather[0].icon
    var icon4 = arr[3].weather[0].icon
    var icon5 = arr[4].weather[0].icon 

    var iconEl1 = document.createElement('img');
    var iconEl2 = document.createElement('img');
    var iconEl3 = document.createElement('img');
    var iconEl4 = document.createElement('img');
    var iconEl5 = document.createElement('img');

    iconEl1.setAttribute('src', `http://openweathermap.org/img/wn/${icon1}.png`)
    iconEl2.setAttribute('src', `http://openweathermap.org/img/wn/${icon2}.png`)
    iconEl3.setAttribute('src', `http://openweathermap.org/img/wn/${icon3}.png`)
    iconEl4.setAttribute('src', `http://openweathermap.org/img/wn/${icon4}.png`)
    iconEl5.setAttribute('src', `http://openweathermap.org/img/wn/${icon5}.png`)

    var oneDayEl = document.getElementById('oneday')
    var twoDayEl = document.getElementById('twoday')
    var threeDayEl = document.getElementById('threeday')
    var fourDayEl = document.getElementById('fourthday')
    var fiveDayEl = document.getElementById('fifthday')
    
    oneDayEl.appendChild(iconEl1)
    twoDayEl.appendChild(iconEl2)
    threeDayEl.appendChild(iconEl3 );
    fourDayEl.appendChild(iconEl4);
    fiveDayEl.appendChild(iconEl5);

}


