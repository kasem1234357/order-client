import React from 'react'

type Props = {}

function SideBarIcon(props: any) {
    const {color,...otherProps}= props
  return (
    <svg {...otherProps} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V26C32 29.3137 29.3137 32 26 32H6C2.68629 32 0 29.3137 0 26V6Z" fill={color ||"#1E1850"}/>
<line x1="7.4668" y1="10.0793" x2="24.5335" y2="10.0793" stroke="white" stroke-width="1.17333"/>
<line x1="7.4668" y1="20.7473" x2="24.5335" y2="20.7473" stroke="white" stroke-width="1.17333"/>
<line x1="7.4668" y1="15.4133" x2="24.5335" y2="15.4133" stroke="white" stroke-width="1.17333"/>
</svg>

  )
}

export default SideBarIcon