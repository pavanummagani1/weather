async function getData(location='Illinois') {
    const url = `https://open-weather13.p.rapidapi.com/city/${location}/EN`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4d9609bb6amsh362bd055ee3ef52p1793d3jsn6d7f9a32e652',
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        printData(data)

    } catch (error) {
        console.log(error);
    }
}



function printData(data) {
    // Clears previous data
    document.body.innerHTML = "";
    // PARENT CONATINER
    let parentDiv = document.createElement('div');
    parentDiv.className = 'parentContainer'
    document.body.appendChild(parentDiv);

    // SEARCHBARCONTAINER
    let searchBarContainer = document.createElement('div');
    searchBarContainer.className = 'searchBar'
    let inputElement = document.createElement('input')
    inputElement.type = 'text'
    inputElement.placeholder = 'ENTER A LOCATION';
    inputElement.addEventListener('change', () => {
        const newLocation = inputElement.value;
        // console.log(newLocation)
        if (newLocation) {
            getData(newLocation); // Fetch new data for the entered location
        }
    });
    searchBarContainer.appendChild(inputElement);
    parentDiv.appendChild(searchBarContainer);

    //CountryContainer
    let countryContainer = document.createElement('div');
    countryContainer.className = 'countryContainer'
    let countryName = document.createElement('p');
    countryName.className = 'location'
    countryName.textContent = `${data.sys.country}`
    let locationName = document.createElement('p');
    locationName.className = 'location'
    locationName.textContent = `${data.name}`;
    countryContainer.append(countryName, locationName);
    parentDiv.appendChild(countryContainer)


    //weatherContainer
    let weatherContainer = document.createElement('div');
    weatherContainer.className = 'weatherContainer'
    //SUNIMAGE
    let sumImageContainer = document.createElement('div');
    sumImageContainer.className = 'sunImageContainer'
    let sunImage = document.createElement('img')
    sunImage.className = 'sunImage'
    sunImage.src = './assets/weather/sun.gif'
    sumImageContainer.appendChild(sunImage);

    // TEMPERATURE
    let temperatureContainer = document.createElement('div');
    temperatureContainer.className = 'temperatureContainer'
    let temperature = document.createElement('p')
    temperature.className = 'temperature'
    temperature.textContent = `${data.main.temp}F`;
    temperatureContainer.appendChild(temperature);

    weatherContainer.append(sumImageContainer, temperatureContainer);
    parentDiv.appendChild(weatherContainer)


    //Sunrise and Sunset
    let sunriseSunsetContainer = document.createElement('div')
    sunriseSunsetContainer.className = 'sunriseSunSetContainer';
    let sunriseElement = document.createElement('p');
    sunriseElement.textContent = `Sunrise At: ${data.sys.sunrise}`

    let sunsetElement = document.createElement('p');
    sunsetElement.textContent = `Sunset At : ${data.sys.sunset}`

    sunriseSunsetContainer.append(sunriseElement, sunsetElement);
    parentDiv.appendChild(sunriseSunsetContainer)


    //Extradata
    let weatherDataContainer = document.createElement('div');
    weatherDataContainer.className = 'weatherDataContainer'

    //humidityContainer
    let humidityContainer = document.createElement('div')
    humidityContainer.className = 'humidityContainer'
    //humidityimage
    let humdityImageContainer = document.createElement('div');
    humdityImageContainer.className = 'humidityImageContainer'
    let humidityImage = document.createElement('img');
    humidityImage.className = 'humidityImage'
    humidityImage.src = './assets/weather/humidity.gif'
    humdityImageContainer.appendChild(humidityImage)

    //humidityData
    let humidityData = document.createElement('div')
    humidityData.className = 'humidityData'
    let humidity = document.createElement('p')
    humidity.textContent = `HUMIDITY : ${data.main.humidity}`;
    humidityData.appendChild(humidity)

    humidityContainer.append(humdityImageContainer, humidityData);

    //windContainer
    let windContainer = document.createElement('div')
    windContainer.className = 'windContainer'
    //windimage
    let windImageContainer = document.createElement('div');
    windImageContainer.className = 'windImageContainer'
    let windImage = document.createElement('img');
    windImage.src = './assets/weather/wind.gif'
    windImageContainer.appendChild(windImage)

    //windData
    let windData = document.createElement('div')
    windData.className = 'windData'
    let wind = document.createElement('p')
    wind.textContent = `WIND : ${data.wind.speed}`
    windData.appendChild(wind)

    windContainer.append(windImageContainer, windData);

    weatherDataContainer.append(humidityContainer, windContainer)
    parentDiv.appendChild(weatherDataContainer)
}
getData()