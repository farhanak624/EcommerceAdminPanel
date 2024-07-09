import React from 'react'

const CustomBar = (props) => {
    const { x, y, width, height } = props;
  return (
    <g>
    <rect x={x} y={y} width={width} height={height} fill="#8884d8" rx={10} ry={10} />
  </g>
  )
}

export default CustomBar

  