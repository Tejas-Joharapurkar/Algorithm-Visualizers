import React, { useState } from 'react'
import grid from './data'
const Bfs = () => {
    const [queue, setqueue] = useState([[0, 0]])
    const [bgrid, setbgrid] = useState(grid)
    const delay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const change = (x, y) => {
        setbgrid((pre) => {
            const newMesh = [...pre]
            newMesh[x][y] = { ...newMesh[x][y], isvisited: false, visited: true }
            return newMesh
        })
    }
    const mark_current = (x, y) => {
        setbgrid((pre) => {
            const newMesh = [...pre]
            newMesh[x][y] = { ...newMesh[x][y], isvisited: false, visited: true, iscurrent: true }
            return newMesh
        })
    }
    const bfs = async (row, col) => {
        while (queue.length > 0) {
            var cell = queue.shift()
            var x = cell[0]
            var y = cell[1]
            mark_current(x, y)
            await delay(600)
            if (x === row - 1 && y === col - 1) {
                break
            }
            if (x + 1 < row && (!bgrid[x + 1][y].visited) && grid[x + 1][y].value !== 'x') {
                queue.push([x + 1, y])
                change(x + 1, y)
                await delay(400);
            }
            if (x - 1 >= 0 && !bgrid[x - 1][y].visited && grid[x - 1][y].value !== 'x') {
                queue.push([x - 1, y])
                change(x - 1, y)
                await delay(400);
            }
            if (y + 1 < col && !bgrid[x][y + 1].visited && grid[x][y + 1].value !== 'x') {
                queue.push([x, y + 1])
                change(x, y + 1)
                await delay(400);
            }
            if (y - 1 >= 0 && !bgrid[x][y - 1].visited && grid[x][y - 1].value !== 'x') {
                queue.push([x, y - 1])
                change(x, y - 1)
                await delay(400);
            }
            setbgrid((pre) => {
                const newMesh = [...pre]
                newMesh[x][y] = { ...newMesh[x][y], isvisited: true, visited: true, iscurrent: false }
                return newMesh
            })
            await delay(600)
            // console.log(bgrid[x][y]);
        }
    }
    return (
        <div style={{ display: 'grid', placeContent: 'center', width: '100%' }}>
            <h1>Bredth First Search Visualization</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 40px)', gridTemplateRows: 'repeat(7, 40px)', width: '60%', boxSizing: 'border-box', placeContent: 'center', margin: 'auto', rowGap: '5px', columnGap: '5px', marginBottom: '1rem' }}>
                {
                    bgrid.map((row, rowIndex) => (
                        row.map((cell) => (
                            <div key={cell.id} style={{ outline: '2px solid red', padding: '10px', textAlign: 'center', background: cell.iscurrent ? 'cyan' : cell.isvisited ? 'green' : cell.visited ? 'yellow' : 'white', boxSizing: 'border-box', width: '100%', height: '100%', display: 'grid', placeContent: 'center', textAlignLast: 'center', color: 'black', transition: cell.visited ? 'background 1s ease-in-out, transform 1s ease-in-out' : null, transform: cell.iscurrent ? 'scale(1.2)' : 'scale(1)', borderRadius: cell.iscurrent ? '8px' : '4px' }}>
                                {cell.value}
                            </div>
                        ))
                    ))
                }
            </div>
            <button onClick={() => bfs(7, 7)}>Launch DFS</button>
            <div className="color-code" style={{ display: 'grid' }}>
                <p>Yellow :- cells are inside Queue</p>
                <p>Cyan :- Current cell/front element of Queue</p>
                <p>Green :- cells are visited</p>
            </div>
        </div>
    );
}



export default Bfs