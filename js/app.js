(function($, document, window) {

    $(document).ready(function() {

        // Cloning main navigation for mobile menu
        $(".mobile-navigation").append($(".main-navigation .menu").clone());

        // Mobile menu toggle 
        $(".menu-toggle").click(function() {
            $(".mobile-navigation").slideToggle();
        });
    });

    $(window).load(function() {

    });

})(jQuery, document, window);

//WEATHER APP COMMUNICATION GOES FROM HERE
const cityForm=document.querySelector('form');
const defaultCity="Mumbai";
const daysName=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const monthsName=["jan","feb","mar","apr","may","jun","jul","aug","sept","oct","nov","dec"];

const updateUI=(data,cityName)=>{
    const days=document.getElementsByClassName('day');
    const date=document.getElementsByClassName('date');
    const location=document.getElementsByClassName('location');
    const humidity=document.getElementById('humidity');
    const windSpeed=document.getElementById('wind-speed');
    const windDegree=document.getElementById('wind-degree');
    const temps=document.getElementsByClassName('temp');
    const icons=document.getElementsByClassName('weather-icon');
    console.log(data);
    location[0].innerHTML=cityName;
    humidity.innerHTML=data.list[0].main.humidity+"%";
    
    
    windSpeed.innerHTML=Math.round(data.list[0].wind.speed*3.6)+"km/hr";
    windDegree.innerHTML=data.list[0].wind.deg+"<sup>o</sup>";
    
    
    const todaysDate=new Date(data.list[0].dt_txt);
    const todaysMonth=monthsName[todaysDate.getMonth()];
    const todaysDay=todaysDate.getDay();
    date[0].innerHTML=todaysDate.getDate()+" "+todaysMonth;
    
    
    var i=0;
    var j=0;
    for(let element of days)
    {
        const dayName=daysName[(todaysDay+i)%7];
        element.innerHTML=dayName;
        
        let temp=Math.round(data.list[j].main.temp);
        temps[i].innerHTML=temp+"<sup>o</sup>";
        icons[i].src="images/icons/"+data.list[j].weather[0].icon+".svg";
        i++;
        j+=8;
        
    }
    
    
}


cityForm.addEventListener('submit',e=>{
    e.preventDefault();
    let cityName=cityForm.city.value.trim();
    if(cityName=="")
    {
        cityName=defaultCity;
    }
    getForecast(cityName)
    .then(data=>updateUI(data,cityName))
    .catch(err=>console.error(err))
});
