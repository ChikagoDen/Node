import colors from "colors";

function isPrime(n) {
    if (n === 2) { return true;}
    let i = 2;
    const limit = Math.sqrt(n);
    while (i <= limit) {
        if (n % i === 0) { return   false;}
        i +=1;
    }
    return true;
}
function checkingConversionValue( value1,value2 ) {
    value1=parseInt(value1);value2=parseInt(value2)
    if(!(parseInt(value1)) || !(parseInt(value2)))
    { return 'Ошибка Не число!!!';}
    if(value1>value2)
    { return 'Ошибка Диапазон задан не верно!!!';}
    if(value1 <2 || value2<2){
        return 'Ошибка Число должно быть больше 1!!!';}
    else {
        let tmp=[];
        for (let i=value1;i<=value2;i++){
            if(isPrime(i)){tmp.push(i)}
        }
        return tmp;
    }
}
function viewPrime(arr){
    let index=0;
    for (let i=0;i<arr.length;i++){
        if(index==0) { index+=1; console.log( colors.green(arr[i]));}
        else if(index==1) { index+=1; console.log(  colors.red(arr[i]));}
        else if(index==2) { index=0;  console.log( colors.yellow(arr[i]))}
    }
    if(arr.length===0)console.log(  colors.red('В данном диапазоне простых чисел нет!!!'));
}
const [value1,value2]=process.argv.splice(2);
if(Array.isArray(checkingConversionValue( value1,value2 ))){viewPrime(checkingConversionValue( value1,value2 ));}
else (console.log(checkingConversionValue( value1,value2 )));