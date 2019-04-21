import React, { Component } from 'react'
import { View, Text, StyleSheet, Flatlist } from 'react-native'
import { connect } from 'react-redux'
// import { white } from '../utils/colors'
import { fetchAll } from '../utils/api'
import { AppLoading } from 'expo'

class DeckList extends Component {
  state = {
    ready: true,
    decks: {},
  }
  componentDidMount () {
    const { dispatch } = this.props

    // Fetch all, dispatch, set state to ready
    //fetchAll()
    //  .then(() => this.setState(() => ({ ready: true })))
  }
  renderItem = ({ item }) => {
    <View style={styles.item}>
      <View>
        <Text> {item.name} </Text>
        <Text> {item.cards.keys.length} </Text>
      </View>
    </View>

  }
  render() {
    const { decks } = this.props

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View>
        <Flatlist
          data={decks}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  item: {
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
