import React from 'react'

const Comments = (props) => {
  console.log(props)
  return (
    <div>
      <form
      //  onSubmit={() => props.submitComment(props.match.params)}
      >
        <input
          name="comment"
          value={props.comment}
          onChange={props.handleChange}
        />
        <br></br>
        <input type="submit" />
      </form>
    </div>
  )
}

export default Comments
