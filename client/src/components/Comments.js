import React from 'react'

const Comments = (props) => {
  console.log(props.props.match.params.id)
  return (
    <div>
      <form onSubmit={() => props.submitComment(props.props.match.params.id)}>
        <input
          name="comment"
          value={props.comment}
          onChange={props.handleChange}
        />
        <br></br>
        <input type="submit" />
      </form>
      {props.comments.map((comment) => (
        <div>
          <p>userId:{comment.userId}</p>
          <p>comments:{comment.comment}</p>
          <button onClick={() => props.deleteComment(comment.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Comments
