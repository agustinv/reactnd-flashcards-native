import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
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
  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={[styles.center, styles.heading]}> {item.name ? item.name : "No Name"} </Text>
      <Text style={[styles.center, styles.subheading]}> {Object.keys(item.cards).length} cards</Text>
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
        keyExtractor={(item, index) => index.toString()}
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
  },
  subheading: {
    marginBottom: 15,
  },
  center: {
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
