import { combineReducers } from 'redux'
import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck.key]: action.deck,
      }
    case REMOVE_DECK :
      id = Object.keys(state).find((id) => state[id] && state[id].key === action.deck.key)
      return {
        ...state,
        [id]: null,
      }
    default :
      return state
  }
}

export default combineReducers({
  decks,
})

