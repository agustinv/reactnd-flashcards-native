import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'udacityProjectFlashcards:decdks'

export function fetchAll () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatResults)
}

export function submitDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function removeDeck (key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

function setDummyData () {
  let dummyData = {}
  for (let i = 0; i < 10; i++) {
    const strTime = Date.now() + i
    dummyData[strTime] =
     {
        name: strTime,
        cards: {},
      }
  }

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

function deleteAllData() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({}))
  return {}
}
function formatResults(results) {
  return results === null
  ? {}
    : JSON.parse(results)
}
