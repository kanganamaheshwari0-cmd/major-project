import React from 'react'

function Button({children}) {
  return (
    <button className='px-4 py-2 rounded-lg bg-blue-600 text-white'>{children}</button>
  );
}

export default Button
