import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { orange } from '../utils/colors'
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
  renderItem = ({ item }) => (
    <View key={item.key}>
      <Text> {item.name} </Text>
      <Text> {Object.keys(item.cards).length} cards</Text>
    </View>
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
      />
    )
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: orange,
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)
