class Node {
    constructor(data) {
        this.data = data;
        this.highlight = false;
        this.left = null;
        this.right = null;
    }
}
// const postOrderTraversal = async (root) => {
//     // const id = new Date().getTime()
//     //! function call to left of node
//     if (root.left) {
//         const temp = {
//             id: root.val,
//             message: `Currently at node ${root.val} going to LEFT of ${root.val}`
//         }
//         const newstack = [...stack, temp]
//         setStack(newstack)
//         console.log(stack);
//         await postOrderTraversal(root.left)
//     }
//     //! function call to right of node
//     if (root.right) {
//         const newstack = stack.map((total) => {
//             if (total.id === root.val) {
//                 return { ...total, message: `Currently at node ${root.val} going to RIGHT of ${root.val}` }
//             } else {
//                 return total
//             }
//         })
//         setStack(newstack)
//         console.log(stack);
//         await postOrderTraversal(root.right)
//     }
//     //! start highliging the node
//     root.highlight = true;
//     setData((pre) => {
//         pre = { ...pre };
//         return pre;
//     })

//     if (root.left === null && root.right === null) {
//         const newstack = [...stack, { id: root.val, message: `currently at leaf node ${root.val} and returning to parent node` }]
//         setStack(newstack)
//         console.log(stack);
//     }
//     const newstack = stack.filter((total) => total.id !== root.val)
//     setStack(newstack)
//     console.log(stack);
//     await timeout(root);
// }
const build = () => {

}

{/* <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', width: '2rem', height: '2rem', border: '2px solid red', borderRadius: '50%', alignContent: 'center', background: `${root.highlight ? 'rgba(255,0,0,0.5)' : 'none'}`
        }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{root.val}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: `${30 / root.height}rem`, alignContent: 'center', alignItems: 'center', outline: '2px solid orange', marginTop: '1rem' }}>
                <div style={{ display: 'flex', width: 'fit-content', justifyContent: 'space-evenly', gap: '2rem' }}>
                    {root.left && <Show root={root.left} />}
                </div>
                <div style={{ display: 'flex', width: 'fit-content', justifyContent: 'space-evenly', gap: '2rem' }}>
                    {root.right && <Show root={root.right} />}
                </div>
            </div>
        </div> */}