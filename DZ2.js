import EventEmitter from "events";

// Проверка даты (високосный не проверял)
function  dateCorrect(arr){
    const [hour,day,month,year] = arr;
    let now = new Date();
    if(now.getFullYear() > +year){
        console.log("Таймер истек!!!");
        return 0;
    }
    else if( (now.getFullYear() == +year) && ( (now.getMonth()+1) > +month) ){
            console.log("Таймер истек!!!");
            return 0;
    }
    else if( (now.getFullYear() == +year) && (now.getMonth()+1 == +month) && (now.getDate() > +day) ){
                console.log("Таймер истек!!!");
                return 0;
    }
    else if( (now.getFullYear() == +year) && (now.getMonth()+1 == +month) && (now.getDate() == +day) && (now.getHours() > hour)){
                console.log("Таймер истек!!!");
                return 0;
    }
    else {
        if( isNaN(+year) ){
            console.log('Недопустимое значение года!!!');
            return 0;
        }
        else if( +hour == 0 || +hour > 24 || isNaN(+hour) ){
            console.log('Недопустимое значение времени!!!');
            return 0;
        }
        else if( +month==0 || +month>12 || isNaN(+month) ){
            console.log('Недопустимое значение месяца!!!');
            return 0;
        }
        else if( +day==0 || +day>31 || isNaN(+day) ){
            console.log('Недопустимое значение дня!!!');
            return 0;
        }
        else if( (+day > 28) && (+month == 2) ) {
            console.log('Недопустимое значение дня!!!');
            return 0;
        }
        else if( (+day > 30) && (+month == 4) ||
                 (+day > 30) && (+month == 6) ||
                 (+day > 30) && (+month == 9) ||
                 (+day > 30) && (+month == 11) ) {

            console.log('Недопустимое значение дня!!!');
            return 0;
        }
        return arr;
    }
}
// Таймер
function timer(arr){
    const [hour,day,month,year]=arr;
    let sec = 60;
    let min = 60;
    let hours = hour-1;
    let days = +day;
    let months = +month;
    let years = +year;
    let type = '';
    let timerId = setInterval(() => {
        console.log(`Год = ${ years} Месяц = ${months} День = ${days} Час = ${hours}  Минута = ${min} Секунда = ${sec--}`);
        let now = new Date();
        if( years == now.getFullYear() &&
            months == now.getMonth()+1 &&
            days == now.getDate() &&
            hours == now.getHours()-1) {

            type='stop';
        }
        if( months == 0 &&
            days == 0 &&
            hours == 0 &&
            min == 0 &&
            sec == 1 ){

            years--;
            months=12;
            type='timerYears';
        }
        if( days == 0 &&
            hours == 0 &&
            min == 0 &&
            sec == 1) {

            months--;
            switch (months) {
                case 4:
                case 6:
                case 9:
                case 11:
                    days = 30;
                    break;
                case 2:
                    days = 28
                    break;
                default:
                    days = 31;
                    break;
            }
            type='timerMonths';
        }

        if(hours == 0 && min == 0 && sec == 1){
            days--;
            hours=24;
            type='timerHours';
        }
        if( min == 0 && sec == 1){
            hours--;
            min=60;
            type='timerMin';
        }
        if( sec == 0){
            min--;
            sec=60;
            type='timerSec';
        }
        emitterObject.emit(type,timerId);
        type='';
    }, 1000);
}
// Регистрация события
class Events {
    static stop(timerId) {
        setTimeout(() => {
            clearInterval(timerId);
            console.log('время закончилось!!!!');
            }, 0);
    }
    static timerSec() {
        console.log('Начинаем новый отсчет секунд!!!');
    }
    static timerMin() {
        console.log('Начинаем новый отсчет минут!!!');
    }
    static timerHours() {
        console.log('Начинаем новый отсчет часов!!!');
    }
    static timerMonths() {
        console.log('Начинаем новый отсчет дней!!!');
    }
    static timerYears() {
        console.log('Начинаем новый отсчет лет!!!');
    }
}
// Обработчики события
class MyEmitter extends EventEmitter {};
const emitterObject = new MyEmitter();
emitterObject.on('stop',Events.stop);
emitterObject.on('timerSec',Events.timerSec)
emitterObject.on('timerMin',Events.timerMin)
emitterObject.on('timerHours',Events.timerHours)
emitterObject.on('timerMonths',Events.timerMonths)
emitterObject.on('timerYears',Events.timerYears)

const dateTime=String(process.argv.splice(2));
let setDate = dateTime.split('-',4);

 timer(dateCorrect(setDate));







