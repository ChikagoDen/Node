import EventEmitter from "events";


const dateTime=String(process.argv.splice(2));
let setDate = dateTime.split('-',4);

// const [hour,day,month,year]=arr;
// Проверка даты (високосный не проверял)
function  dateCorrect(arr){
    const [hour,day,month,year]=arr;
    let now = new Date();
    if(now.getFullYear()>+year){
        console.log("Таймер истек!!!");
        return 0;
    }
    else if(now.getFullYear() == +year){
        if(now.getMonth()+1>+month){
            console.log("Таймер истек!!!");
            return 0;
        }
        else if (now.getMonth()+1 == +month){
            if(now.getDate()>+day ){
                console.log("Таймер истек!!!");
                return 0;
            }
            else if(now.getDate()==+day && now.getHours()>hour){
                console.log("Таймер истек!!!");
                return 0;
            }
        }
    }
    else {
        console.log(+day);
        if(isNaN(+year)){
            console.log('Недопустимое значение года!!!');
            return 0;
        }
        else if(+hour==0 || +hour>24 || isNaN(+hour)){
            console.log('Недопустимое значение времени!!!');
            return 0;
        }
        else if(+month==0 || +month>12 || isNaN(+month)){
            console.log('Недопустимое значение месяца!!!');
            return 0;
        }
        else if(+day==0 || +day>31 || isNaN(+day)){
            console.log('Недопустимое значение дня!!!');
            return 0;
        }
        else if(day>28&&(+month)==2) {
            console.log('Недопустимое значение дня!!!');
            return 0;
        }
        else if(day>30&&(+month)==4||
            +day>30&&(+month)==6||
            +day>30&&(+month)==9||
            +day>30&&(+month)==11)
        {
            console.log('Недопустимое значение дня!!!');
            return 0;
        }

        return arr;
    }
}
class Handler {
    static send(payload) {
        console.log('jopa');
    }

    static receive(payload) {
        console.log('Receive request');
    }

    static sign(payload) {
        console.log('Sign request');
    }

    static

    send2() {
        console.log('sobitie');
        // setTimeout(() => { clearInterval(timerId);
        //         console.log('stope');
        //         }, 0);
    }

    static

    send3() {
        console.log('sobitie2');
        // setTimeout(() => { clearInterval(timerId);
        //     console.log('stope');
        // }, 0);
    }
}
function timer(arr){
    const [hour,day,month,year]=arr;
    let sec=60;
    let min=60;
    let hours=hour-1;
    let days=+day;
    let months=+month;
    let years=+year;
    let timerId = setInterval(() => {
        console.log(`Год = ${years} Месяц = ${months} День = ${days} Час = ${hours}  Минута = ${min} Секунда = ${sec--}`);
        let now = new Date();

        if(years==now.getFullYear()&&months==now.getMonth()+1&&days==now.getDate()&&hours==now.getHours()&&min==now.getMinutes()&&sec==0){
           type='stop';
       }
        if(sec==0){
            min--;
            sec=60;
        }
        if(min==0){
            hours--;
            min=60;
        }
        if(hours==0){
            days--;
            hours=24;
        }
        if(days==0){
            months--;
            switch(months) {
                case 4:
                case 6:
                case 9:
                case 11:
                    days=30;
                    break;
                case 2:
                    days=28
                    break;
                default:
                    days=31;
                    break;
            }
            if(months==0){
                years--;
                months=12;
            }
        }


        let type;
        if(sec==55){
            type='stop'
        }
        if(sec==50){
             type='stop2'
        }
        emitterObject.emit(type);

    }, 0);
}

class MyEmitter extends EventEmitter {};
const emitterObject = new MyEmitter();
emitterObject.on('stop',Handler.send2)
emitterObject.on('stop2',Handler.send3)

let tmp=dateCorrect(setDate);
// timer(tmp);

console.log(setDate);






