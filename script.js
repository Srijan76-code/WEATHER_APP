function formatDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const dayOfWeek = days[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';


    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${day} ${month}, ${dayOfWeek}, ${formattedHours}:${formattedMinutes}${ampm}`;
}

// Example usage
let now = new Date();
let formattedDate = formatDate(now);



async function api_response(city) {
    const apiKey = "9e8dc69a1ed9f0724c0cac3268e6f021";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);


    const data = await response.json();
    if (response.status == 404) {

        document.querySelector(".error").style.display = "block";
    }
    else {

        document.querySelector("#d2").innerHTML = formattedDate;
        document.querySelector("#d3").innerHTML = "";



        document.querySelector("#tempt").innerHTML = `${Math.round(data.main.temp)}`;
        document.querySelector(".city").innerHTML = city;

        document.querySelector("#visibility").innerHTML = `${data.visibility} km`;
        document.querySelector("#ws").innerHTML = `${data.wind.speed} m/s`;
        document.querySelector("#humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector("#pressure").innerHTML = `${data.main.pressure} mb`;
    }






}

const input = document.querySelector("#input");

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const city = input.value;
        api_response(city);
        input.value = '';
    }
});

