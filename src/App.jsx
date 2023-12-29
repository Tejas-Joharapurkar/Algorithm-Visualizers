import React, { useState } from 'react'
import Tree from './Tree.jsx'
import Dfs from './Dfs'
const App = () => {
  return (
    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr' }}>
      <Tree />
      <Dfs />
    </div>
  )
}

export default App