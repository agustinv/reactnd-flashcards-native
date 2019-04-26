import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { purple } from '../utils/colors'
import { fetchAll } from '../utils/api'
import { AppLoading } from 'expo'

class DeckList extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    const { dispatch } = this.props

    // Fetch all, dispatch, set state to ready
    fetchAll()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }
  renderItem = ({ item, key }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => this.props.navigation.navigate(
        'DeckDetail',
        { deckId: key }
      )}
    >
      <Text style={styles.heading}> {key ? key : "No key"} </Text>
      <Text style={styles.heading}> {item.name ? item.name : "No Name"} </Text>
      <Text style={styles.subheading}> {Object.keys(item.cards).length} cards</Text>
    </TouchableOpacity>
  )
  render() {
    const { decks } = this.props
    const { ready } = this.state
    const deck_array = Object.keys(decks).map((key) => decks[key])

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <FlatList
        data={deck_array}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index}
      />
    )
  }
}
const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: purple,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
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

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)
