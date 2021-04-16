import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const Comments = (props) => {
  console.log(props.props.match.params.id)
  const [like, setLike] = useState(0)

  useEffect(() => {
    props.getAllComments(props.props.match.params.id)
  }, [like])
  const likeComment = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/comment/like/${id}`)
      setLike({ ...props.comments, like: props.comments.likes + 1 })
      return res.data
    } catch (error) {
      throw error
    }
  }
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
          <p>Likes: {comment.likes}</p>
          <button onClick={() => likeComment(comment.id)}>like</button>
          <button onClick={() => props.deleteComment(comment.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Comments
