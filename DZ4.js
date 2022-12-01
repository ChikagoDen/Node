#!/usr/local/bin/node

import * as path from "path";
import readline from "readline";
import inquirer from "inquirer";
import fsp from "fs/promises"
import colors from "colors";

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


const root =process.cwd();
const findFile = (dirName)=>{
    return fsp
        .readdir(dirName)
        .then((choices)=>{
            return inquirer
                .prompt([
                    {
                    name:"fileName",
                    type:"list",
                    message:"ИНКУВЕР",
                    choices,

                    },
                    {
                        name:"findString",
                        type:"input",
                        message:"Что ищем?",
                    }
                ])
        })
        .then(async ({fileName, findString})=>{
            const fullPatch=path.join(dirName,fileName);
            const stat = await fsp.stat( fullPatch);
            if(!stat.isFile()){
                return findFile(fullPatch)
            }
            return  Promise.all([
                fsp.readFile(path.join(dirName,fileName),'utf-8'),
                Promise.resolve(findString)

            ])


        })
        .then((result)=>{
            if(result){
                const [text,findString]=result;
                const pattern = new RegExp(findString, "g");
                let count=0;
                const out = text.replace(pattern, ()=>{
                    count++;
                    return colors.red(findString);
                });
                console.log(out, "\n", colors.green(`Найдено ${count} совпадений.`));
                rl.close();
            }
        })
}

rl.question(
    `Вы находитесь здесь ${root} \n
     Введите путь к директории: `,
    (dirPatch)=>{
        const dirName = path.join(root,dirPatch);
        findFile(dirName);

    }
)

rl.on('close', ()=>process.exit(0));
