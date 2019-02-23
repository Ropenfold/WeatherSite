const WINTER = "winter";
const SPRING = "spring";
const SUMMER = "summer";
const AUTUMN = "autumn";
const MONTH_ERROR = "error";
const UNSPLASH_API_KEY =
  "b3194c657c1dff33160c1e876115b4398c9e50890bdd03864285b9dd75dbffc9";
const UNSPLASH_API = "https://api.unsplash.com/";
const UNSPLASH_RANDOM = "photos/random";
const UNSPLASH_QUERY = "?query=";
const UNSPLASH_ORIENTATION = "&orientation=landscape";
const OPENWEATHER_API_KEY = "47ea0a048f7531bb1f3640df7c7e87ff";

//create getDate function that returns a value between on and 12
function month() {
  var d = new Date();
  var calendarMonth = d.getMonth();
  console.log(calendarMonth);
  return calendarMonth;
}

//create a function which converts this to a string which is returned to a variable
function monthString(monthNumber) {
  if (monthNumber === 11 || monthNumber === 0 || monthNumber === 1) {
    return WINTER;
  } else if (monthNumber === 2 || monthNumber === 3 || monthNumber === 4) {
    return SPRING;
  } else if (monthNumber === 5 || monthNumber === 6 || monthNumber === 7) {
    return SUMMER;
  } else if (monthNumber === 8 || monthNumber === 9 || monthNumber === 10) {
    return AUTUMN;
  } else {
    return MONTH_ERROR;
  }
}

//String is used to create URL to query unsplash API to return a random image based on the season
//we are currently in

function createUnsplashAPI(month) {
  let completeApi =
    `${UNSPLASH_API}` +
    `${UNSPLASH_RANDOM}` +
    `${UNSPLASH_QUERY}` +
    `${month}` +
    `${UNSPLASH_ORIENTATION}`;
  console.log(completeApi);
  return completeApi;
}

function getUnsplashImage(completeApi) {
  var options = {
    method: "GET",
    headers: {
      Authorization:
        "Client-ID b3194c657c1dff33160c1e876115b4398c9e50890bdd03864285b9dd75dbffc9"
    }
  };
  fetch(completeApi, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      let backgroundImage = document.getElementById("unsplash-image");
      backgroundImage.style.backgroundImage = "url(" + data.urls.regular + ")";
      backgroundImage.style.backgroundRepeat = "no-repeat";
      backgroundImage.style.backgroundPosition = "center";
      backgroundImage.style.backgroundSize = "cover";
    });
}

let monthTime = month();
console.log(monthTime);

let seasonParemeter = monthString(monthTime);

let completeAPI = createUnsplashAPI(seasonParemeter);

getUnsplashImage(completeAPI);

//create location and search function. Link this to openWeather API. Loock through all possible forecasts

//consider how to demonstrate weather - forecast description and temperature.

//use images from the web or create my own.

//consider how to put this on the page (another page or some element hiding)
(function () {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  console.log("date", `${day}  ${month} ${year}`);
  document.getElementById("date").innerHTML = `${day}  ${month} ${year}`;
})();

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  console.log(pos);
  var crd = pos.coords;

  console.log("Your current position is : ");
  console.log(`Latitude: ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  let latitude = crd.latitude;
  let longitude = crd.longitude;
  myMap(latitude, longitude);
  getWeatherForecast(latitude, longitude);
}

function error(err) {
  console.warn(`Error(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

function myMap(lat, long) {
  var mapProp = {
    center: new google.maps.LatLng(lat, long),
    zoom: 12
  };
  var map = new google.maps.Map(
    document.getElementById("googleMap"),
    mapProp
  );
}

function getWeatherForecast (lat, long) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OPENWEATHER_API_KEY}&units=metric`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      document.getElementById("weather-temp").innerHTML = data.main.temp.toFixed(0);
    });

}