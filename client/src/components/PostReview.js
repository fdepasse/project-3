import React, { useState } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'

export default function PostReview(props) {
  const [text, setText] = useState('')
  const token = localStorage.getItem('token')
  const recipes = props.recipe

  async function handleReview() {
    await axios.post(`/api/recipes/${recipes._id}/review`, { text: text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    props.fetchRecipe()
    setText('')
  }

  async function handleDeleteReview(reviewId) {
    await axios.delete(`/api/recipes/${recipes._id}/review/${reviewId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return <div className="is-flex-direction-row">
    <h4 className="title">{'Reviews: '}</h4>
    <div className="subtitle box">{recipes.review && recipes.review.map(review => {
      console.log(recipes)
      return <article key={review._id} className="media">
        <div className="media-content">
          <div className="content">
            <p>{review.user.username}</p>
            <p>{review.text}</p>
          </div>
        </div>
        {console.log(review)}
      
        {isCreator(review.user._id) && <div className="media-right">
          <button
            className="delete"
            onClick={() => handleDeleteReview(review._id)}>
          </button>
        </div>}
      </article>
    })}</div>
    <div className="column box">



      <article className="media">
        <div className="media-content">
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Make a review.."
                onChange={(event) => setText(event.target.value)}
                value={text}
              >
                {text}
              </textarea>
            </div>
          </div>
          <div className="field">
            <p className="control">
              <button
                onClick={handleReview}
                className="button is-dark"
              >
                Submit
    </button>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
}
