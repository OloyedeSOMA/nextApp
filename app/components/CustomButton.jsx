import React from 'react'

const CustomButton = (props) => {
  return (
    <button type={props.type} onClick={props.onClick} className={props.className}>{props.children}</button>
  )
}

export default CustomButton