import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const anecdote = action.payload
      const newAnecdote = asObject(anecdote)
      state.push(newAnecdote)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(anecdote => anecdote.id !== newAnecdote.id ? anecdote : newAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
