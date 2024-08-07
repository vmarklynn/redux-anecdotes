import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    const newState = [...state.anecdotes]
    newState.sort((a, b) => b.votes - a.votes)

    if (state.filter.length > 0) {
      return newState.filter(item => item.content.toLowerCase().includes(state.filter.toLowerCase()))
    }

    return newState
  })

  const dispatch = useDispatch()

  let timeOutId

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    const notification = `You voted for ${content}`
    dispatch(createNotification(notification))
    if (timeOutId)
      clearTimeout(timeOutId)
    timeOutId = setTimeout(() => {
      dispatch(removeNotification())
      timeOutId = null
    }, 5000)
  }

  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList
