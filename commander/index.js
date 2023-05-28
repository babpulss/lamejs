import { exec } from "child_process";
import inquirer from "inquirer";

let input = "R_20230727-150432",
  output = "output";
const encoding256 = `lame -b 256 -m s ${input}.wav ${output}.mp3`;
const encoding8 = `lame -b 8 -m m ${input}.wav ${output}.mp3`;

inquirer.prompt([
  '인코딩할 파일을 선택하세요'
]).then((ans) => {
  console.log(ans);
}).catch(err => {
  console.error(err);
})

const encoding = () => {
  exec(encoding8, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};
