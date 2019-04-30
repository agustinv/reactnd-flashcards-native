import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
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

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params

    return {
      title: `Quiz for ${name}`
    }
  }
  state = {
   correct: 0,
  }
  submit = () => {

  }
  render() {
    const { question, answer } = this.state

    return (
      <View style={styles.container} behavior='padding'>
        <Text style={styles.heading}> Quiz here</Text>
        <SubmitBtn onPress={this.submit} />
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
    marginTop:40,
    fontWeight: "600",
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center',
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
)(Quiz)

