import promptSync from 'prompt-sync';
import fs from 'fs'
const prompt = promptSync();

const grid = [];

for (let i = 0; i < 4; i++) {
    let subgrid = [];
    for (let j = 0; j < 4; j++) {
        let value = prompt("Enter the value: ");
        subgrid.push({ value, id: new Date().getTime(), isvisited: false, istarget: false, iscurrent: false, visited: false });
    }
    grid.push(subgrid);
}
const jsonString = JSON.stringify(grid);
fs.writeFileSync('graph_vis\src\data.txt', jsonString);


