import React, { useState } from 'react'
import matrix from './matrix'

const Stackbuild = ({ stack }) => {
    return (
        <div className='stack-container'>
            <h1>stack call here</h1>
            {
                stack.map((total) => {
                    return (
                        <div key={total.id} className='single-stack'>
                            {total.message}
                        </div>
                    )
                })
            }
        </div>
    )
}


const Dp = () => {
    const [grid, setGrid] = useState(matrix)
    const delay = async (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const memo = new Array(4).fill(null).map(() => new Array(4).fill(-1))
    const [dp, setDp] = useState(memo)
    const [stack, setStack] = useState([])

    //!------------------------------------------------------HELPER FUNCTION--------------------------------------------------------------------------------
    const change = async (x, y) => {
        setGrid((prevMesh) => {
            const newMesh = [...prevMesh];
            newMesh[x][y] = { ...newMesh[x][y], isvisited: true };
            return newMesh;
        });
        await delay(600)
    }
    const resetchange = async (x, y) => {
        setGrid((prevMesh) => {
            const newMesh = [...prevMesh];
            newMesh[x][y] = { ...newMesh[x][y], isvisited: false, istarget: false, };
            return newMesh;
        });
        await delay(600)
    }
    const changedp = async (x, y, ans) => {
        setDp((pre) => {
            const ndp = [...pre];
            ndp[x][y] = ans
            return ndp
        })
    }
    //!------------------------------------------------------HELPER FUNCTION--------------------------------------------------------------------------------

    //!------------------------------------------------------CODE FOR NORMAL DFS ---------------------------------------------------------------------------
    const dfs = async (row, col, x, y) => {
        if (x === row - 1 && y === col - 1) {
            setGrid((prevMesh) => {
                const newMesh = [...prevMesh];
                newMesh[x][y] = { ...newMesh[x][y], isvisited: true, istarget: true, };
                return newMesh;
            });
            await delay(300)
            setGrid((prevMesh) => {
                const newMesh = [...prevMesh];
                newMesh[x][y] = { ...newMesh[x][y], isvisited: false, istarget: false, };
                return newMesh;
            });
            await delay(300)
            return parseInt(grid[x][y].value);
        }
        let a = 1000000;
        let b = 1000000;
        setGrid((prevMesh) => {
            const newMesh = [...prevMesh];
            newMesh[x][y] = { ...newMesh[x][y], isvisited: true, istarget: false, };
            return newMesh;
        });
        await delay(300)
        if (x + 1 < row) {
            a = await dfs(row, col, x + 1, y) + parseInt(grid[x][y].value);
            await delay(300)
        }
        if (y + 1 < col) {
            b = await dfs(row, col, x, y + 1) + parseInt(grid[x][y].value);
            await delay(300)
        }
        setGrid((prevMesh) => {
            const newMesh = [...prevMesh];
            newMesh[x][y] = { ...newMesh[x][y], isvisited: false, istarget: false, };
            return newMesh;
        });
        await delay(300)
        return Math.min(a, b)
    }
    //!------------------------------------------------------CODE FOR NORMAL DFS ---------------------------------------------------------------------------


    //!------------------------------------------------------CODE FOR DP + DFS ------------------------------------------------------------------------------

    const dfsplusedp = async (row, col, x, y) => {
        if (x === row - 1 && y === col - 1) {
            await change(x, y)
            await resetchange(x, y)
            await changedp(x, y, parseInt(grid[x][y].value))
            return parseInt(grid[x][y].value);
        }
        if (dp[x][y] !== -1) {
            console.log("already present in");
            return dp[x][y];
        }
        let a = 1000000;
        let b = 1000000;
        const id = new Date().getTime()
        await change(x, y)
        if (x + 1 < row) {
            setStack((pre) => [...pre, { id, message: `going to y + 1(down) to find min time path` }])
            await delay(600)
            a = await dfsplusedp(row, col, x + 1, y) + parseInt(grid[x][y].value);
            setStack((pre) => pre.map((total) => {
                if (total.id === id) {
                    return { ...total, message: `it takes ${a} time to reach desti from y + 1(down)` }
                } else {
                    return total;
                }
            }))
            await delay(600)
        }
        if (y + 1 < col) {
            const findob = stack.find(obj => obj.id === id)
            if (findob) {
                setStack((pre) => pre.map((total) => {
                    if (total.id === id) {
                        return { ...total, message: `going to x + 1(right) to find min time path` }
                    } else {
                        return total;
                    }
                }))
                await delay(600)
            } else {
                setStack((pre) => [...pre, { id, message: `going to x + 1(right) to find min time path` }])
                await delay(600)
            }
            b = await dfsplusedp(row, col, x, y + 1) + parseInt(grid[x][y].value);
            setStack((pre) => pre.map((total) => {
                if (total.id === id) {
                    return { ...total, message: `it takes ${b} time to reach desti from y + 1(right)` }
                } else {
                    return total;
                }
            }))
            await delay(600)
        }
        await resetchange(x, y)
        await changedp(x, y, Math.min(a, b))
        setStack((pre) => pre.map((total) => {
            if (total.id === id) {
                return { ...total, message: `it takes ${a} time from (y + 1) and ${b} from x + 1, we return minimum of two` }
            } else {
                return total;
            }
        }))
        await delay(600)
        setStack((pre) => pre.filter((item) => item.id !== id))
        await delay(600)
        return Math.min(a, b)
    }

    const call = (row, col, x, y) => {
        dfsplusedp(row, col, x, y)
        // setDp(new Array(4).fill(null).map(() => new Array(4).fill(-1)))
    }
    //!------------------------------------------------------CODE FOR DP + DFS -------------------------------------------------------------------------------------

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', outline: '2px solid yellow', placeContent: 'center', height: '80vh' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem', outline: '2px solid white', placeContent: 'center' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 40px)', gridTemplateRows: 'repeat(4, 40px)', width: '80%', boxSizing: 'border-box', placeContent: 'center', margin: 'auto', rowGap: '5px', columnGap: '5px', marginBottom: '1rem' }}>
                        {
                            grid.map((row, rowIndex) => (
                                row.map((cell) => (
                                    <div key={cell.id} style={{ outline: '2px solid red', padding: '10px', textAlign: 'center', background: cell.iscurrent ? 'cyan' : cell.isvisited ? 'green' : cell.visited ? 'yellow' : 'white', boxSizing: 'border-box', width: '100%', height: '100%', display: 'grid', placeContent: 'center', textAlignLast: 'center', color: 'black', transition: cell.visited ? 'background 1s ease-in-out, transform 1s ease-in-out' : null, transform: cell.iscurrent ? 'scale(1.2)' : 'scale(1)', borderRadius: cell.iscurrent ? '8px' : '4px' }}>
                                        {cell.value}
                                    </div>
                                ))
                            ))
                        }
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 40px)', gridTemplateRows: 'repeat(4, 40px)', width: '80%', boxSizing: 'border-box', placeContent: 'center', margin: 'auto', rowGap: '5px', columnGap: '5px', marginBottom: '1rem' }}>
                        {
                            dp.map((row, rowIndex) => (
                                row.map((cell, cellindex) => (
                                    <div key={(rowIndex + cellindex) * (rowIndex + 1)} style={{ outline: '2px solid red', padding: '10px', textAlign: 'center', background: cell > 0 ? 'grey' : 'white', boxSizing: 'border-box', width: '100%', height: '100%', display: 'grid', placeContent: 'center', textAlignLast: 'center', color: 'black', transition: cell.isvisited ? 'background 1s ease-in-out, transform 1s ease-in-out' : null, transform: cell.iscurrent ? 'scale(1.2)' : 'scale(1)', borderRadius: cell.iscurrent ? '8px' : '4px' }}>
                                        {cell}
                                    </div>
                                ))
                            ))
                        }
                    </div>
                </div>
                <div style={{ outline: '2px solid green', height: '80vh' }}>
                    <Stackbuild stack={stack} />
                </div>
            </div>
            <button onClick={() => call(4, 4, 0, 0)} style={{ margin: '1rem' }}>solve with Dp</button>
            <button onClick={() => dfs(4, 4, 0, 0)}>solve normal</button>
        </>
    )
}
export default Dp
