import React, { useState } from 'react'
import './tree.css'
class Node {
    constructor(val) {
        this.val = val || null;
        this.left = null;
        this.right = null;
        this.height = 0;
        this.highlight = false;
    }
}
const Show = ({ root }) => {
    return (
        <div style={{
            outline: '2px dotted yellow', width: '100%'
        }}>
            <span>
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



const Testtree = () => {
    const r = new Node(10);
    r.height = 1;
    r.left = new Node(20);
    r.left.height = 2;
    r.right = new Node(30)
    r.right.height = 2;
    r.left.left = new Node(40);
    r.left.left.height = 3;
    r.left.right = new Node(50);
    r.left.right.height = 3;
    r.right.left = new Node(60)
    r.right.left.height = 3;
    r.right.right = new Node(70)
    r.right.right.height = 3;

    const [data, setData] = useState(r)
    const build = (root, height) => {
        const node_val = prompt("Enter Node value");
        if (node_val === null) {
            return;
        }
        root = new Node(node_val)
        root.height = height + 1;
        setData((pre) => pre = { ...pre })
        height = height + 1;
        const node_left = prompt(`Do you want to add left child for ${node_val}`);
        if (node_left > 0) {
            root.left = build(root.left, height);
            console.log(root.left);
        }
        const node_right = prompt(`Do you want to add right child for ${node_val}`);
        if (node_right > 0) {
            root.right = build(root.right, height);
        }
        return root;
    }
    const handleBuildTree = () => {
        let root = build(null, 0);
        setData(root);
    }
    return (
        <article style={{ textAlign: 'center', width: '100%', marginLeft: '50%', border: '2px solid white' }}>
            <h2>Binary Tree Visualizer</h2>
            <button onClick={handleBuildTree}>Build Tree</button>
            {data.val && <Show root={data} />}
        </article>
    );
}

export default Testtree