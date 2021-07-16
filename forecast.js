const key = "18b7aead9bfa5f8a4f6a5f900da2b118";

const getForecast = async (city) => {
    const base = "http://api.openweathermap.org/data/2.5/forecast";
    const query = `?q=${city}&units=metric&appid=${key}`;
    
    const response = await fetch(base+query);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        throw new Error("Status Code: "+response.status);
    }
}

//getForecast(city)
//    .then(data => console.log(data))
//    .catch(err => console.log(err));