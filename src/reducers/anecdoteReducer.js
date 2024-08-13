import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    voteAnecdote(state, action) {
      const newAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== newAnecdote.id ? anecdote : newAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const handleVote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updated = await anecdoteService.updateAnecdote(anecdote.id, newAnecdote)
    dispatch(voteAnecdote(updated))
  }
}

export const getAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const submitAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
