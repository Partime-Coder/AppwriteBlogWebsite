import React from 'react'

function Container({children, className}) {
  return <div className={`w-[95%] mx-auto my-0 ${className}`}>{children}</div>
  
}

export default Container