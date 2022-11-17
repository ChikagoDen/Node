// const colors=require('colors');
import colors from 'colors';
const [userName,userName2]=process.argv.splice(2);

console.log(`Hello ${colors.green(userName) } i ${colors.red(userName2)}`);

