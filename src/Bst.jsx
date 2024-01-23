import React, { useEffect, useState } from 'react'
import './tree.css'
class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 0;
        this.highlight = false;
        this.index = 0;
        this.isvisited = false;
    }
}
const Show = ({ root }) => {
    const dynamiclass = `${root.index % 2 === 0 ? 'right' : 'left'} ${root.highlight ? 'highlight' : null} ${root.isvisited ? 'visited' : null}`
    return (
        <div className='node parent' style={{
            width: '100%'
        }}>
            <span className={dynamiclass} >
                {root.val}
            </span >
            <div style={{ display: 'flex', width: '100%', height: '55px', marginTop: '0.5rem' }}>
                {root.left ? <Show root={root.left} /> : <div style={{ width: '100%', }} />}
            </div>
            <div style={{ display: 'flex', width: '100%', height: '55px', marginTop: '0.5rem' }}>
                {root.right ? <Show root={root.right} /> : <div style={{ width: '100%' }} />}
            </div>
        </div >
    );
};
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
const Bst = () => {
    const [root, setRoot] = useState(null)
    const [value, setvalue] = useState(0)
    const [target, setTarget] = useState(0)
    const [stack, setStack] = useState([])
    const draw = (val) => {
        if (root === null) {
            const newNode = new Node(parseInt(val));
            setRoot(newNode)
        } else {
            let node = root;
            console.log(node);
            while (node) {
                if (node.val > val) {
                    if (node.left) {
                        node = node.left;
                    } else {
                        const newnode = new Node(parseInt(val));
                        newnode.index = node.index * 2 + 1;
                        node.left = newnode
                        break;
                    }
                } else if (node.val < val) {
                    if (node.right) {
                        node = node.right
                    } else {
                        const newnode = new Node(parseInt(val));
                        newnode.index = node.index * 2 + 2;
                        node.right = newnode
                        break;
                    }
                }
            }
            setRoot((pre) => ({ ...pre }))
        }
    }
    const delay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const search = async (target) => {
        if (!root) {
            return;
        }
        let node = root
        while (node) {
            if (node.val === target) {
                node.highlight = true;
                node.isvisited = true
                setStack((prevStack) => [...prevStack, { id: root.val, message: `target found in LOG(N) time` }]);
                await delay(400)
                break;
            }
            else if (node.val > target) {
                node.isvisited = true;
                setRoot((pre) => ({ ...pre }));
                setStack((prevStack) => [...prevStack, { id: root.val, message: `${node.val} > ${target}, going left` }]);
                node = node.left
                await delay(400)
            } else {
                node.isvisited = true;
                setRoot((pre) => ({ ...pre }));
                setStack((prevStack) => [...prevStack, { id: root.val, message: `${node.val} < ${target}, going right` }]);
                node = node.right
                await delay(400)
            }
        }
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Binary Search Tree Visualizer</h2>
            <div className="inp" style={{ marginLeft: '1rem' }}>
                <input type='number' value={value} onChange={(e) => setvalue(e.target.value)} style={{ width: '4rem', height: '1rem', marginRight: '1rem' }} />
                <button onClick={() => draw(value)} style={{ marginRight: '4rem' }}>Add Node</button>
                <input type='number' value={target} onChange={(e) => setTarget(e.target.value)} style={{ width: '4rem', height: '1rem', marginRight: '1rem' }} />
                <button onClick={() => search(parseInt(target))}>Search</button>
            </div>
            <div
                style={{
                    border: '2px solid white',
                    height: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    overflow: 'hidden', // To prevent horizontal overflow
                }}
            >
                <div className="container" style={{ gridTemplateColumns: '3fr 1fr' }}>
                    <div className="tree-container">
                        {root && <Show root={root} />}
                    </div>
                    {stack && <Stackbuild stack={stack} />}
                </div>
            </div>
        </div>
    )
}

export default Bst