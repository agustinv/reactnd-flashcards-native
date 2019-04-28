import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { deleteDeck } from '../utils/api'
import { removeDeck } from '../actions'
import TextButton from './TextButton'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {

    const { name } = navigation.state.params

    return {
      title: name
    }
  }
  deleteDeck = () => {
    const { remove, goBack, deleteDeck } = this.props

    remove()
    goBack()
    deleteDeck()
  }
  render() {
    const { deck } = this.props

    if ( deck === undefined) {
      return <Text></Text>
    }

    return (
      <View style={styles.container}>
        <Text style={styles.heading}> {deck.name ? deck.name : "No Name"} </Text>
        <Text style={styles.subheading}> {Object.keys(deck.cards).length} cards</Text>
        <TextButton style={{margin: 20}} onPress={this.deleteDeck}>
          Delete Deck
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  heading: {
    marginTop:15,
    fontWeight: "600",
    marginBottom: 15,
    fontSize: 22,
    textAlign: 'center',
  },
  subheading: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

function mapStateToProps (state, { navigation }) {
  const { key } = navigation.state.params
  const { decks } = state
  deckId = Object.keys(state.decks).filter((id) => decks[id] && decks[id].key === key)

  return {
    deck: decks[deckId],
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { key } = navigation.state.params

  return {
    remove: () => dispatch(removeDeck({
      key: key,
    })),
    goBack: () => navigation.goBack(),
    deleteDeck: () => deleteDeck(key),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetail)
