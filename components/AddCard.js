import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { submitDeck } from '../utils/api'
import { addDeck } from '../actions'
import { purple, white } from '../utils/colors'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Card"
    }
  }
  state = {
    question: '',
    answer: '',
  }
  submit = () => {
    const { deckKey, goBack, dispatch } = this.props
    //dispatch(addCard(deckKey, card)
    goBack()
    //submitCard(key, card)
  }
  handleQuestionChange = (question) => {
    this.setState(() => ({ question: question }))
  }
  handleAnswerChange = (answer) => {
    this.setState(() => ({ answer: answer }))
  }
  render() {
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <TextInput
          value={question}
          style={styles.input}
          placeholder="enter question"
          onChangeText={this.handleQuestionChange}
          />
        <TextInput
          value={answer}
          style={styles.input}
          placeholder="enter answer"
          onChangeText={this.handleAnswerChange}
          />
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
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
    marginTop:40,
    fontWeight: "600",
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: purple,
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

function mapStateToProps (state, { navigation }) {
  const { key } = navigation.state.params

  return {
    deckKey: key,
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
)(AddCard)

