import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import '../App.css'

const Comments = (props) => {
  console.log(props.props.match.params.id)
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
          <img
            className={`rating ${selected ? 'selected' : ''}`}
            src="https://i.ibb.co/khg4RKH/star-256.png"
            width="30px"
            onClick={() => selectRating()}
          />
          <img
            className={`rating1 ${selected1 ? 'selected1' : ''}`}
            src="https://i.ibb.co/khg4RKH/star-256.png"
            width="30px"
            onClick={() => selectRating1()}
          />
          <img
            className={`rating2 ${selected2 ? 'selected2' : ''}`}
            src="https://i.ibb.co/khg4RKH/star-256.png"
            width="30px"
            onClick={() => selectRating2()}
          />
          <img
            className={`rating3 ${selected3 ? 'selected3' : ''}`}
            src="https://i.ibb.co/khg4RKH/star-256.png"
            width="30px"
            onClick={() => selectRating3()}
          />
          <img
            className={`rating4 ${selected4 ? 'selected4' : ''}`}
            src="https://i.ibb.co/khg4RKH/star-256.png"
            width="30px"
            onClick={() => selectRating4()}
          />
          <button onClick={() => props.deleteComment(comment.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Comments
