import React from 'react'

function btn(props) {
  return (
    <>
    <button className={`bg-${props.bg}-800 my-2 hover:bg-blue-600 py-1 px-2 text-${props.color} rounded-md font-semibold`}>{props.value}</button>
    </>
  )
}

export default btn