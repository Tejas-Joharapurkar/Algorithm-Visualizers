import React, { useState } from 'react'
import Tree from './Tree.jsx'
import Dfs from './Dfs'
import Bfs from './Bfs.jsx'
import Bst from './Bst.jsx'
import Dp from './Dp.jsx'

const Menu = ({ setShow, show }) => {
  return (
    <div className="menu-container" style={{ border: '2px solid red', width: '10%', height: '10rem', display: 'grid', gridTemplateRows: '1fr 1fr 1fr 1fr' }}>
      <button onClick={() => setShow(!show)}>close</button>
      {
        menuitem.map((item) => {
          return (
            <div key={item.id}>
              {item.name}
            </div>
          )
        })
      }
    </div>
  )
}

const App = () => {
  const menuitem = [{ name: "Tree", id: 1 }, { name: 'Bst', id: 2 }, { name: "Dfs", id: 3 }, { name: "Bfs", id: 4 }, { name: "DP", id: 5 }]
  const [id, setId] = useState(1)
  return (
    <div className='main-app-container'>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: '#4a4e69', borderRadius: '0.25rem', height: '2rem', marginBottom: '1rem' }}>
        {
          menuitem.map((item) => {
            return (
              <button key={item.id} style={{ background: item.id === id ? '#c9ada7' : 'null', border: 'null', borderRadius: '0.25rem' }} onClick={() => setId((pre) => item.id)}>{item.name}</button>
            )
          })
        }
      </div>
      {id === 1 ? <Tree /> : id === 2 ? <Bst /> : id === 3 ? <Dfs /> : id === 4 ? <Bfs /> : <Dp />}
    </div>
  )
}

export default App
