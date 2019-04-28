import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'udacityProjectFlashcards:decdks'

export function fetchAll () {
  //deleteAllData() && setDummyData()
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatResults)
}

export function submitDeck (deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data.push(deck)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function removeDeck (key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results).reject((item) => item.key === key)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

function setDummyData () {
  let dummyData = []
  for (let i = 0; i < 10; i++) {
    const strTime = (Date.now() + i).toString()
    dummyData.push(
      {
        key: strTime,
        name: strTime,
        cards: [],
      });
  }

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

function deleteAllData() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify([]))
  return []
}
function formatResults(results) {
  // console.log(results)
  return results === null
  ? []
    : JSON.parse(results)
}
