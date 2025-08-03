import React from 'react'

type Props = {}

function LongRightArrowIcon(props: any) {
    const {color,...otherProps} = props
  return (
    <svg {...otherProps} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.0319 1.01709L7.75732 5.22758L9.16082 6.65243L11.0195 4.82162L10.9642 22.9768L12.9642 22.9828L13.0194 4.86971L14.8175 6.69522L16.2423 5.29172L12.0319 1.01709Z" fill="#1E1850"></path> </g></svg>
  )
}

export default LongRightArrowIcon