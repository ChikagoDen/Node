import yargs from "yargs";
import * as fs from "fs";
import * as path from "path";
import {hideBin} from "yargs/helpers";
import readline from "readline";
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});



const __dirname ='/home/den/Рабочий стол/Проекты ларавель/Node'
// //
//
// const options= yargs(hideBin(process.argv))
//     .usage("Usage: -p <patch>")
//     .option("p", { alias: "path", describe: "Path to file", demandOption: true})
//     .argv;
// console.log(options);
// const fileName = options.path;
// fs.readFile(path.join(__dirname, fileName),'utf8', (err, data) => {
//     console.log(data);
// });
rl.question("Введите путь до файла:  ", (fileName)=>{

    fs.readFile(path.join(__dirname, fileName),'utf8', (err, data) => {
        console.log(data);
        rl.close();
    });


});
rl.on('close', ()=>process.exit(0));