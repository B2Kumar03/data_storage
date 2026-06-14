import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store'
import { Button } from '@react-navigation/elements'

const index = () => {
  const [output, setOutput] = React.useState('')
  const saveToken = async () => {
    await SecureStore.setItemAsync('token', '123abc')
  }
  const getToken = async () => {
    const token = await SecureStore.getItemAsync('token')
    setOutput(token!)
    console.log(token)
  }
  const removeToken = async () => {
    await SecureStore.deleteItemAsync('token')
    setOutput('')
  }
  const checkAvailability = async () => {
    const result = await SecureStore.isAvailableAsync()
    setOutput(result ? 'Available' : 'Not Available')
  }
  const setObject = async () => {
    await SecureStore.setItemAsync('user', JSON.stringify({ name: 'John Doe', age: 30 }))
  }
  const getObject = async () => {
    const user = await SecureStore.getItemAsync('user')
    setOutput(user!)
  }
  return (
    <View style={{ flex: 1, alignItems: 'center',gap:10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold',marginTop:20 }}>Secure Storage</Text>
      <Button onPress={saveToken}>Save Token</Button>
      <Button onPress={getToken}>Get Token</Button>
      <Button onPress={removeToken}>Remove Token</Button>
      <Button onPress={checkAvailability}>Check Availability</Button>
      <Button onPress={setObject}>Set Object</Button>
      <Button onPress={getObject}>Get Object</Button>
      <Text> Output :{output}</Text>

    </View>
  )
}

export default index

const styles = StyleSheet.create({})