import React, { useState } from 'react';
import grid from './data.js';

const Dfs = () => {
    const [mesh, setmesh] = useState(grid)

    const timeout = async (x, y) => {
        return new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
            setmesh(prevMesh => {
                const newMesh = [...prevMesh];
                newMesh[x][y] = { ...newMesh[x][y], isvisited: false, istarget: false };
                return newMesh;
            });
        });
    };
    const delay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const dfs = async (x, y, row, col) => {
        if (x === row - 1 && y === col - 1) {
            setmesh((prevMesh) => {
                const newMesh = [...prevMesh];
                newMesh[x][y] = { ...newMesh[x][y], isvisited: false, istarget: true };
                return newMesh;
            });
            await delay(1500);
            await timeout(x, y);  // Adjust the delay time as needed
            return;
        }
        setmesh((prevMesh) => {
            const newMesh = [...prevMesh];
            newMesh[x][y] = { ...newMesh[x][y], isvisited: true, istarget: false, visited: true };
            return newMesh;
        });
        // want to add a timeout wich does nothing but creates a delay
        await delay(1500);
        if (x + 1 < row && grid[x + 1][y].value !== 'x' && !mesh[x + 1][y].visited) {
            await dfs(x + 1, y, row, col)
        }
        if (y + 1 < col && grid[x][y + 1].value !== 'x' && !mesh[x][y + 1].visited) {
            await dfs(x, y + 1, row, col)
        }
        if (x - 1 >= 0 && grid[x - 1][y].value !== 'x' && !mesh[x - 1][y].visited) {
            await dfs(x - 1, y, row, col)
        }
        if (y - 1 >= 0 && grid[x][y - 1].value !== 'x' && !mesh[x][y - 1].visited) {
            await dfs(x, y - 1, row, col)
        }
        await timeout(x, y);
    }
    return (
        <div style={{ display: 'grid', placeContent: 'center', width: '100%' }}>
            <h1>Depth First Search Visualization</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 40px)', gridTemplateRows: 'repeat(7, 40px)', width: '60%', boxSizing: 'border-box', placeContent: 'center', margin: 'auto', rowGap: '5px', columnGap: '5px', marginBottom: '1rem' }}>
                {
                    mesh.map((row, rowIndex) => (
                        row.map((cell) => (
                            <div key={cell.id} style={{ borderRadius: '0.25rem', outline: '2px solid red', padding: '10px', textAlign: 'center', background: cell.isvisited ? 'green' : cell.visited ? 'yellow' : 'white', boxSizing: 'border-box', width: '100%', height: '100%', display: 'grid', placeContent: 'center', textAlignLast: 'center', color: 'black', transition: cell.visited ? 'background 1s ease-in-out, transform 1s ease-in-out' : null, }}>
                                {cell.value}
                            </div>
                        ))
                    ))
                }
            </div>
            <button onClick={() => dfs(0, 0, 7, 7)}>Launch DFS</button>
        </div>
    );
}

export default Dfs;
