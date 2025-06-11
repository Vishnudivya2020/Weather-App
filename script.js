let apiKey = 'b12c0ecb40fe5dda7ded0365824c593b';


let input =document.getElementById('InputVal');
let  btn =document.getElementById('search');


function citySearch(){
    let city =document.getElementById('InputVal').value;
    // console.log(input);
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
     console.log(data);         // Logs the entire weather object

let cityName=data.name;
let temperature=(data.main.temp - 273.15);
let humidity = data.main.humidity;
let wind=data.wind.speed;
let weatherType = data.weather[0].main;
let lon=data.coord.lon;
let lat=data.coord.lat;

//set basic
 document.getElementById('city').innerHTML = `${cityName}`;
 document.getElementById('temp').innerHTML = `${temperature.toFixed(2)} °C`;
 document.getElementById('humValue').innerHTML = `${humidity}%`;
 document.getElementById('windValue').innerHTML = `${wind} m/s`;
 document.getElementById('cur-weather').innerHTML = `${weatherType}`;

//for web-image
let image = document.getElementById('web-img');

//  background image changes;
  const images= [
    "https://atsource.co.nz/wp-content/uploads/2022/05/iStock_000003416699Medium.jpg",
    "https://cdn.wallpapersafari.com/28/67/xJGc9C.jpg",
    "https://static.vecteezy.com/system/resources/previews/029/771/613/large_2x/epicgraphy-shot-of-rainy-season-background-enjoying-nature-rainfall-and-happy-life-concept-generative-ai-free-photo.jpeg",
     "./Icons/pexels-earano-14751451.jpg"
  ];

  
if(weatherType === "Clear"){
  document.querySelector('body').style.backgroundImage =`url(${images[0]})`;
  image.src = "./Icons/sunny-cloudy.webp";
  image.alt = "Clear";
}else if(weatherType ==="Clouds"){
   document.querySelector('body').style.backgroundImage =`url(${images[1]})`;
  image.src = "./Icons/cloudy.png";
  image.alt = "Cloudy";
} else if (weatherType === "Rain") {
   document.querySelector('body').style.backgroundImage =`url(${images[2]})`;
    image.src = "./Icons/rain.png";
    image.alt = "Rain";
} else {
    document.querySelector('body').style.backgroundImage=`url(${images[3]})`;
    image.src = "./Icons/sunny-cloudy.webp";
    image.alt = "Default Weather";
}

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
  .then(res => res.json())
  .then(forecastData => {
    const forecastBox = document.getElementById('container-2');
    forecastBox.innerHTML = ''; // Clear old content

    const forecastList = forecastData.list;
    const dailyForecastMap = {};

    forecastList.forEach(entry => {
      const date = entry.dt_txt.split(' ')[0];
      const time = entry.dt_txt.split(' ')[1];

      if (time === '12:00:00') {
        dailyForecastMap[date] = entry;
      }
    });

    const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD
    const forecastDays = Object.keys(dailyForecastMap)
      .filter(date => date !== today)  
      .slice(0, 4);                     

    forecastDays.forEach(date => {
      const dayData = dailyForecastMap[date];
      const temp = dayData.main.temp;
      const condition = dayData.weather[0].main;

      forecastBox.innerHTML += `
        <div class="day-forecast">
          <h4>${new Date(date).toDateString()}</h4>
          
          <p>${temp.toFixed(1)}°C</p>
          <p>${condition}</p>
        </div>
      `;
    });

  

  // let currentIndex = 0;

  // function changeBackground(){
  //   currentIndex = (currentIndex + 1)% images.length;
  //   document.querySelector('body').style.backgroundImage = `url('${images[currentIndex]}')`;
  // }



  })
  .catch(err => {
    console.error('Forecast fetch error:', err);
  });



})
  .catch((err) => {
    console.error('Fetch error:', err);
  });



}


