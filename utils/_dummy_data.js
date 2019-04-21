// Utilities for setting initial dummy data.
import { DECKS_STORAGE_KEY } from './api'
import { timeToString } from './helper'

function setDummyData () {
  let dummyData = {}
  for (let i = 0; i < 10; i++) {
    const strTime = timeToString()
    dummyData[strTime] =
     {
        name: strTime,
        cards: {},
      }
  }

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

export function formatResults(results) {
  return results
}
