import { combineReducers } from 'redux'
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions'

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
    case ADD_CARD :
      const did = Object.keys(state).find((id) => state[id] && state[id].key === action.deck.key)
      return {
        ...state,
        [did]: {
                ...state[did],
                cards: state[did].cards.concat(action.card),
        },
      }
    case REMOVE_DECK :
      const deckId = Object.keys(state).find((id) => state[id] && state[id].key === action.deck.key)
      return {
        ...state,
        [deckId]: null,
      }
    default :
      return state
  }
}

export default combineReducers({
  decks,
})

