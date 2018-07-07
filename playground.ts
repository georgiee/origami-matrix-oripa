import path from "path";
import fs from 'fs-extra';
import * as  readline from 'readline';

const rl = readline.createInterface({
  input: fs.createReadStream('src/assets/triangle/triangle.ormat')
});

const TYPE_COMMENT = '#';
const TYPE_VERTEX = 'v';
const TYPE_FACE = 'f';

let matrix = [];

rl.on('line', (line: string) => {
  const firstChar = line.charAt(0);
  if(firstChar === TYPE_VERTEX) {
    const vertex = parseVertex(line);
    console.log({vertex});
  } else if(firstChar === TYPE_FACE) {
    const face = parseFace(line);
    console.log({face});
  } else if(firstChar === '#') {
  }else {
    const elements = line.split(" ").map(v => parseInt(v, 10));
    // discard last element, it's only space.
    elements.pop();
    matrix.push(elements);
    console.log(matrix)
  }

});




function parseVertex(data: string) {
  const parts = data.split(" ");
  parts.shift();
  return parts.map(v => parseInt(v, 10));
}

function parseFace(data: string) {
  const parts = data.split(" ");
  parts.shift();
  return  parts.map(v => parseInt(v, 10));
}