import { useSelector, useDispatch } from 'react-redux'
import { handleVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

  const vote = (anecdote) => {
    dispatch(handleVote(anecdote))
    const notification = `You voted for ${anecdote.content}`
    dispatch(setNotification(notification, 2, timeOutId))
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList
