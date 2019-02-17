const WINTER = 'winter';
const SPRING = 'spring';
const SUMMER = 'summer';
const AUTUMN = 'autumn';
const MONTHERROR = 'error';
const UNSPLASHAPIKEY = 'b3194c657c1dff33160c1e876115b4398c9e50890bdd03864285b9dd75dbffc9';
const UNSPLASHAPI = 'https://api.unsplash.com/';
const UNSPLASHRANDOM = 'photos/random'
const UNSPLASHQUERY = '?query=';
const UNSPLASHORIENTATION = '&orientation=landscape';


//create getDate function that returns a value between on and 12
function month() {
    var d = new Date();
    var calendarMonth = d.getMonth();
    console.log(calendarMonth);
    return calendarMonth;
};

//create a function which converts this to a string which is returned to a variable
function monthString (monthNumber){

    if(monthNumber === 11 || monthNumber === 0 || monthNumber === 1){
        return WINTER;
    } else if (monthNumber === 2 || monthNumber === 3 || monthNumber === 4) {
        return SPRING;
    } else if (monthNumber === 5 || monthNumber === 6 || monthNumber === 7) {
        return SUMMER;
    } else if (monthNumber === 8 || monthNumber === 9 || monthNumber === 10){
        return AUTUMN;
    }else {
        return MONTHERROR;
    }
};

//String is used to create URL to query unsplash API to return a random image based on the season 
//we are currently in


function createUnsplashAPI(month) {
    
    let completeApi = `${UNSPLASHAPI}`+`${UNSPLASHRANDOM}`+`${UNSPLASHQUERY}`+`${month}`+ `${UNSPLASHORIENTATION}`;  
    console.log(completeApi);
    return completeApi;
};

function getUnsplashImage (completeApi){

        var options = {
            method: "GET",
            headers: {
                Authorization: 'Client-ID b3194c657c1dff33160c1e876115b4398c9e50890bdd03864285b9dd75dbffc9'
            }
        };
        fetch(
            completeApi, options
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var json = JSON.parse(data);
                document.getElementById("unsplash-photo").src = `${json.urls.small}`;
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