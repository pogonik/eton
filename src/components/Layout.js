import React from 'react'

const Layout = ({children}) => (
   <main className="main" role="main">
      <div className="container">
         {children}
      </div>
   </main>
)

export default Layout
