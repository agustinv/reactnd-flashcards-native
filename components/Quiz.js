import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { shuffleArray } from '../utils/helper'

function ShowAnswerBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={[styles.btn, styles.extraPaddingTop]}
      onPress={onPress}>
        <Text style={styles.btnText}>Show Answer</Text>
    </TouchableOpacity>
  )
}

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    }
  }
  state = {
    correct: 0,
    showAnswer: false,
    index: 0,
  }
  showAnswer = () => {
    this.setState(() => ({ showAnswer: true }))
  }
  render() {
    const { cards } = this.props
    const { index, showAnswer } = this.state

    if (cards.length === 0) {
      return <Text style={styles.heading}> Sorry you cannot take a quiz yet because there are no cards in deck </Text>
    }

    const { question, answer } = cards[index]
    return (
      <View style={styles.container} behavior='padding'>
        <Text style={[styles.heading, styles.extraPaddingTop]}>Question:</Text>
        <Text style={styles.heading}>{question}</Text>
        { !showAnswer &&
          <ShowAnswerBtn onPress={this.showAnswer} />
        }
        { showAnswer &&
          <Text style={[styles.heading, styles.extraPaddingTop]}>Answer: {answer}</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: white
  },
  heading: {
    fontWeight: "600",
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center',
  },
  extraPaddingTop: {
    marginTop: 40,
  },
  btn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

function mapStateToProps ({ decks }, { navigation }) {
  const { deck } = navigation.state.params
  const cards = shuffleArray(deck.cards)
  return {
    cards: cards,
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz)

