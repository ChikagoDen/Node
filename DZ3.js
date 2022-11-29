import * as fs from "fs";
import {Transform} from "stream";

const ip1='89.123.1.41';
const regularExpressionIp1 = new RegExp(ip1);
const ip2='34.48.240.111';
const regularExpressionIp2 = new RegExp(ip2);
// Считываем
const readStream = fs.createReadStream('./log/assec.log','utf8');
// Преобразуем и запихиваем в файлы
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        let array = chunk.toString().split("\n");
        for(let i in array) {
            if(regularExpressionIp1.test(array[i])){
                this.push(array[i]+'\n');
                // по дз не понятно создавать файл если его нет или уже в созданый запихивать???
                fs.writeFile(`./log/${ip1}_requests.log`, array[i]+'\n', { flag: 'a' }, (err) => console.log(err));
            }
            if(regularExpressionIp2.test(array[i])){
                this.push(array[i]+'\n');
                fs.writeFile(`./log/${ip2}_requests.log`, array[i]+'\n', { flag: 'a' }, (err) => console.log(err));
            }
        }
     callback();
    }
})
// Запускаем
readStream
    .pipe(transformStream)


