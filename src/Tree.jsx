import React, { useEffect, useState } from 'react'
import './tree.css'

class Node {
    constructor(val) {
        this.val = val || null;
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
            <div style={{ display: 'flex', width: '100%', marginTop: '0.5rem' }}>
                {root.left && <Show root={root.left} />}
            </div>
            <div style={{ display: 'flex', width: '100%', marginTop: '0.5rem' }}>
                {root.right && <Show root={root.right} />}
            </div>
        </div >
    );
};
const Tree = () => {
    const r = new Node(10);
    r.height = 1;
    r.left = new Node(20);
    r.left.height = 2;
    r.left.index = 1;
    r.right = new Node(30)
    r.right.height = 2;
    r.right.index = 2
    r.left.left = new Node(40);
    r.left.left.height = 3;
    r.left.left.index = 3;
    r.left.right = new Node(50);
    r.left.right.height = 3;
    r.left.right.index = 4;
    r.right.left = new Node(60)
    r.right.left.height = 3;
    r.right.left.index = 5;
    r.right.right = new Node(70)
    r.right.right.height = 3;
    r.right.right.index = 6;

    const [data, setData] = useState(r)
    const [stack, setStack] = useState([{ id: data.val, message: `currently at root node ${data.val}` }])
    const build = (root, height, index) => {
        const node_val = prompt("Enter Node value");
        if (node_val === null) {
            return;
        }
        root = new Node(node_val)
        root.height = height + 1;
        root.index = index;
        height = height + 1;
        const node_left = prompt(`Do you want to add left child for ${node_val}`);
        if (node_left > 0) {
            root.left = build(root.left, height, index * 2 + 1);
            console.log(root.left);
        }
        const node_right = prompt(`Do you want to add right child for ${node_val}`);
        if (node_right > 0) {
            root.right = build(root.right, height, index * 2 + 2);
        }
        return root;
    }

    const Stackbuild = () => {
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

    const timeout = async (root) => {
        return new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
            root.highlight = false
            setData((pre) => {
                pre = { ...pre }
                return pre
            })
        })
    }
    //!---------------postorderfunction----------------------------------------------------------------------------------------------------------------------------

    const postOrderTraversal = async (root) => {
        if (!root) {
            return;
        }
        if (root.left) {
            root.isvisited = true;
            setData((pre) => ({ ...pre }));
            setStack((prevStack) => [...prevStack, { id: root.val, message: `going to LEFT of ${root.val}` }]);
            await timeout(root.left);
            await postOrderTraversal(root.left);
        }

        if (root.right) {
            if (!root.isvisited) {
                root.isvisited = true;
                setData((pre) => ({ ...pre }));
            }
            setStack((stage) => stage.map((stage) => {
                if (stage.id === root.val) {
                    return { ...stage, message: `going to RIGHT of ${root.val}` }
                } else {
                    return stage
                }
            }));
            await timeout(root.right)
            await postOrderTraversal(root.right);
        }

        root.highlight = true;
        root.isvisited = true;
        setData((pre) => ({ ...pre }));

        if (!root.left && !root.right) {
            setStack((prevStack) => [...prevStack, { id: root.val, message: `REACHED THE TARGET NODE ${root.val} RETURNING TO PARENT NODE` }]);
        } else {
            setStack((stage) => stage.map((stage) => {
                if (stage.id === root.val) {
                    return { ...stage, message: `REACHED THE TARGET NODE ${root.val} RETURNING TO PARENT NODE` }
                } else {
                    return stage
                }
            }))
        }
        await timeout(root);
        root.isvisited = false;
        setData((pre) => ({ ...pre }));
        setStack((prevStack) => prevStack.filter((total) => total.id !== root.val));
    };
    //!----------------------------------------------------------------------------------------------------------------------------------------------
    let nodeval = new Node();
    const handleBuildTree = () => {
        let root;
        nodeval = build(root, 0, 0);
        setData(nodeval)
    };
    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Binary Tree Visualizer</h2>
            <button onClick={handleBuildTree} style={{ marginLeft: '1rem', borderRadius: '0.25rem' }}>Build Tree</button>
            {data.val ? <button onClick={() => postOrderTraversal(data)} style={{ marginLeft: '1rem', borderRadius: '0.25rem' }}>POST ORDER TRAVERSAL</button> : null}
            <div
                style={{
                    border: '2px solid white',
                    height: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    overflow: 'hidden', // To prevent horizontal overflow
                }}
            >
                <div className="container">
                    <div className="tree-container">
                        {data && <Show root={data} />}
                    </div>
                    {stack && <Stackbuild />}
                </div>
            </div>
        </div>
    );
}

export default Tree