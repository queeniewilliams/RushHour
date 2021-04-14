import React from 'react'

const Comments = (props) => {
  console.log(props)
  return (
    <div>
      <form onSubmit={props.submitComment}>
        <input
          name="comment"
          value={props.comment}
          onChange={props.handleChange}
        />
      </form>
    </div>
  )
}

export default Comments
