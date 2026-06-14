import { Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [data, setData] = useState("");


  const myObject={
    name:"Bittu",
    age:22

  }

  // Store Data
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("user", "Bittu");
      console.log("Data Stored");
    } catch (e) {
      console.log(e);
    }
  };


  // Get Data
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");

      if (value !== null) {
        setData(value);
      } else {
        setData("No Data Found");
      }

    } catch (e) {
      console.log(e);
    }
  };


  // Remove Single Item
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setData("");
      console.log("Removed");
    } catch (e) {
      console.log(e);
    }
  };


  // Clear All Data
  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      setData("");
      console.log("All Data Cleared");
    } catch (e) {
      console.log(e);
    }
  };


  // Multi Set
  const multiSet = async () => {
    try {
      await AsyncStorage.multiSet([
        ["user", "Bittu"],
        ["user2", "Bittu2"]
      ]);

      console.log("Multiple Data Stored");

    } catch (e) {
      console.log(e);
    }
  };


  // Multi Get
  const multiGet = async () => {
    try {

      const keys = ["user", "user2"];

      const values = await AsyncStorage.multiGet(keys);

      console.log(values);

      setData(
        values
          .map(item => `${item[0]} : ${item[1]}`)
          .join("\n")
      );

    } catch (e) {
      console.log(e);
    }
  };

  const setObject=async()=>{
    try {
      await AsyncStorage.setItem("user",JSON.stringify(myObject));
      console.log("Data Stored");
    } catch (e) {
      console.log(e);
    }
  }

  //get object
  const getObject=async()=>{
    try {
      const value = await AsyncStorage.getItem("user");
      setData(JSON.stringify(value));
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <SafeAreaView style={styles.container}>

      <Button 
        title="Store Data" 
        onPress={storeData} 
      />

      <Button 
        title="Get Data" 
        onPress={getData} 
      />

      <Button 
        title="Remove Data" 
        onPress={removeData} 
      />

      <Button 
        title="Clear All" 
        onPress={clearData} 
      />

      <Button 
        title="Multi Set" 
        onPress={multiSet} 
      />

      <Button 
        title="Multi Get" 
        onPress={multiGet} 
      />

      <Button 
        title="Set Object" 
        onPress={setObject} 
      />

      <Button 
        title="Get Object" 
        onPress={getObject} 
      />


      <Text style={styles.text}>
        Output:
      </Text>

      <Text style={styles.text}>
        {data}
      </Text>


    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#fff",
    padding:20,
    gap:10
  },

  text:{
    fontSize:18,
    marginTop:10
  }

});