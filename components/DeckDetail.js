import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { removeDeck } from '../utils/api'
import TextButton from './TextButton'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {

    const { deckId } = navigation.state.params
    console.log( deckId)
    return {
      title: `${deckId}`
    }
  }
  deleteDeck = () => {
    const { remove, goBack, deckId } = this.props

    remove()
    goBack()
    removeDeck(deckId)
  }
  render() {
    const { deck } = this.props

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
  const { deckId } = navigation.state.params
  return {
    deckId,
    deck: state[deckId],
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    remove: () => dispatch(addDeck({
      [deckId]: null
    })),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetail)