import React from 'react'

function Button({
    children,
    type = 'button',
    classname='',
    bg_color='bg-blue-600',
    textColor='text-white',
    ...props
}) {
  return (
    <button
        type={type}
        className={` px-4 py-2 rounded  ${bg_color} ${textColor} ${classname}`}
        {...props}
    >
        {children}
    </button>
  )
}

export default Button