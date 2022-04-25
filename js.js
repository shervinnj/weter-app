





let getLoc= async()=>{

    const url1='http://ip-api.com/json/?fields=country,region,regionName,city,zip,lat,lon,timezone';
    const response=await fetch(url1);
    const data=await response.json()
    return data;
    
}
const getWeather= async(lat,lon)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9b1af656e2626d562156797f7d2cba97`;
  const response=await fetch(url);
  const data=await response.json();
  return data;
}




function getDayOrNight(){
    let DayOrNight;
    let d= new Date();    //shabeh ya rooz

    if(d.getHours()>= 6 && d.getHours()<=19){
        DayOrNight='Day';
    }else{
        DayOrNight='Night';

    }

}

function getIcon(weMain){
    let icon;

    switch(weMain){
        case 'Thunderstorm':
            icon=`${weMain}.svg`
            break;
         case 'Drizzle':
             icon=`${weMain}.svg`
             break;

        case `Rain`:
             icon=`${weMain}.svg`
             break;
                    
         case `Snow`:
             icon=`${weMain}.svg`
             break;

         case `Clear`:
             const DayOrNight=getDayOrNight();
             icon= `${weMain}-${DayOrNight}.svg`;   // az function balah estefadeh mikonim ke beghim roozeg ya shab
             break;

        case `Clouds`:
            icon=`${weMain}.svg`;
            break;

        case `Atmosphere`:
            icon=`${weMain}.png`;
            break;         
    }
    return icon;


}

function getTemp(weTemp){
    const k=weTemp;
    const f=(k -273.15) *9/5 +32;
    const c= k-273.15;
    return Temp={kel:Math.floor(k),far:Math.floor(f),
    can:Math.floor(c)};
}

const loti=document.querySelector('.timezone');
const icon=document.querySelector('.icon');
const dese=document.querySelector('.degree-section');
const deg=document.querySelector('.degree-section h2');
const unit=document.querySelector('.degree-section span');
const tede=document.querySelector('.temperature-description');

getLoc()
.then(locData =>{
    
const timeZone=`${locData.city} ${locData.region}`

loti.innerHTML=timeZone;
return getWeather(locData.lat,locData.lon);// barayeh inke be function balah dastresi dashte bashim

}).then(weData =>{
    
    const weTemp= weData.main.temp;
    const weMain=weData.weather[0].main;
    const weDes=weData.weather[0].description;

   
    const iconName=getIcon(weMain);
    icon.innerHTML=`<img src='icons/${iconName}'></img>`;

    deg.innerHTML=Math.floor(weTemp);
    unit.innerHTML='K';

    dese.addEventListener('click',function(e){

        if(unit.innerHTML==='K'){

            deg.innerHTML=getTemp(weTemp).far;
            unit.innerHTML='F';

        }else if(unit.innerHTML=='F'){
            
            deg.innerHTML=getTemp(weTemp).can;
            unit.innerHTML='C';
        }
        else{
            deg.innerHTML=getTemp(weTemp).kel;
            unit.innerHTML='K';
        }
        
    })

        tede.innerHTML=weDes;


})







