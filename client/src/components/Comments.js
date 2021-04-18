import React, { useEffect, useState } from 'react'
import Navigate from './Navigate'
import '../App.css'
import { UpdateComment } from '../services/CommentServices'

const Comments = (props) => {
  console.log(props)
  const [like, setLike] = useState(0)
  const [selected, setSelected] = useState(false)
  const [selected1, setSelected1] = useState(false)
  const [selected2, setSelected2] = useState(false)
  const [selected3, setSelected3] = useState(false)
  const [selected4, setSelected4] = useState(false)
  const selectRating = () => {
    setSelected(!selected)
  }
  const selectRating1 = () => {
    setSelected1(!selected1)
  }
  const selectRating2 = () => {
    setSelected2(!selected2)
  }
  const selectRating3 = () => {
    setSelected3(!selected3)
  }
  const selectRating4 = () => {
    setSelected4(!selected4)
  }
  useEffect(() => {
    props.getAllComments(props.props.match.params.id)
  }, [like])
  const likeComment = async (id) => {
    try {
      const res = await UpdateComment(id)
      setLike({ ...props.comments, like: props.comments.likes + 1 })
      return res.data
    } catch (error) {
      throw error
    }
  }
  return (
    <div>
      <Navigate authenticated={props.authenticated} logOut={props.logOut} />
      <form onSubmit={() => props.submitComment(props.props.match.params.id)}>
        <p>Write a review</p>
        <input
          name="comment"
          value={props.comment}
          onChange={props.handleChange}
        />
        <br></br>
        <input type="submit" />
      </form>
      {props.comments.map((comment, index) => (
        <div key={index}>
          <p>userId:{comment.userId}</p>
          <img
            alt="icon"
            className={`rating ${selected ? 'selected' : ''}`}
            src="https://iconsplace.com/wp-content/uploads/_icons/ffa500/256/png/rating-star-icon-11-256.png"
            width="20px"
            onClick={() => selectRating(comment.id)}
          />
          <img
            alt="icon"
            className={`rating1 ${selected1 ? 'selected1' : ''}`}
            src="https://iconsplace.com/wp-content/uploads/_icons/ffa500/256/png/rating-star-icon-11-256.png"
            width="20px"
            onClick={() => selectRating1(comment.id)}
          />
          <img
            alt="icon"
            className={`rating2 ${selected2 ? 'selected2' : ''}`}
            src="https://iconsplace.com/wp-content/uploads/_icons/ffa500/256/png/rating-star-icon-11-256.png"
            width="20px"
            onClick={() => selectRating2()}
          />
          <img
            alt="icon"
            className={`rating3 ${selected3 ? 'selected3' : ''}`}
            src="https://iconsplace.com/wp-content/uploads/_icons/ffa500/256/png/rating-star-icon-11-256.png"
            width="20px"
            onClick={() => selectRating3()}
          />
          <img
            alt="icon"
            className={`rating4 ${selected4 ? 'selected4' : ''}`}
            src="https://iconsplace.com/wp-content/uploads/_icons/ffa500/256/png/rating-star-icon-11-256.png"
            width="20px"
            onClick={() => selectRating4()}
          />
          <p>comments:{comment.comment}</p>
          <p>Likes: {comment.likes}</p>{' '}
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
