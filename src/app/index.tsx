import { Button, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('db.db')

const SQlite = () => {
  const [output , setOutput] = React.useState<string>('')

  const createTable = () => {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT
      );
    `)
    setOutput("Table created")

    console.log("Table created")
  }


  const insertUser = () => {
//before insertion check the table availability

    db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT
      );
    `)

    const result = db.runSync(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [
        "bittu",
        "bittu@gmail.com",
        "1234"
      ]
    )

    setOutput("Inserted ID: " + result.lastInsertRowId)

    console.log("Inserted ID:", result.lastInsertRowId)
  }



  const selectUser = () => {

    const users = db.getAllSync(
      'SELECT * FROM users'
    )
    console.log(users)

    setOutput(JSON.stringify(users))

  }

//clear table
  const clearTable = () => {
    db.runSync('DELETE FROM users')
    setOutput("Table cleared")
  }

  const update=() => {
    db.runSync('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
    [
      "bittuKumsri",
      "bittu@gmail.com",
      "1234",
      1
    ]
    )
    setOutput("Table updated")
  }

  //drop table
  const dropTable = () => {
    db.runSync('DROP TABLE users')
    setOutput("Table dropped")
  }

  return (
    <SafeAreaView 
      style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        gap:20
      }}
    >

      <Text style={{fontSize:30,fontWeight:'bold'}}>
        SQLite Database
      </Text>


      <Button 
        title="Create Table" 
        onPress={createTable}
      />


      <Button 
        title="Insert User" 
        onPress={insertUser}
      />


      <Button 
        title="Select User" 
        onPress={selectUser}
      />


      <Button 
        title="Clear Table" 
        onPress={clearTable}
      />


      <Button 
        title="Update User" 
        onPress={update}
      />


      <Button 
        title="Drop Table" 
        onPress={dropTable}
      />


      <Text>
        Output:
        {output}
      </Text>

    </SafeAreaView>
  )
}


export default SQlite