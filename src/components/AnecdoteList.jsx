import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

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

  const vote = (id) => {
    dispatch(voteAction(id))
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList
