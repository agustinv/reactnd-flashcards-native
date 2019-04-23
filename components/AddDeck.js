import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { submitDeck } from '../utils/api'
import { string_parameterize, timeToString } from '../utils/helper'
import { addDeck } from '../actions'
import TextButton from './TextButton'
import { purple, white } from '../utils/colors'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  state = {
    name: '',
    cards: {},
  }
  submit = () => {
    const deck = this.state
    const key = string_parameterize(deck.name) + timeToString()

    this.props.dispatch(addDeck({
      [key]: deck
    }))

    this.setState(() => ({ name: '', cards: {} }))

    this.toHome()

    submitDeck({ key, deck })
  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }
  handleTextChange = (name) => {
    this.setState(() => ({ name: name, cards: {} }))
  }
  render() {
    const { name } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text> Deck </Text>
        <TextInput
          value={name}
          style={styles.input}
          onChangeText={this.handleTextChange}
          />
        <SubmitBtn onPress={this.submit} disabled={name === ''}/>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnText: {
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

export default connect()(AddDeck)

