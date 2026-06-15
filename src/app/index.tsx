import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView
} from 'react-native'

import React, { useState } from 'react'
import { File, Directory, Paths } from 'expo-file-system'


const demoFile = new File(
  Paths.document,
  "demo.txt"
)


const copiedFile = new File(
  Paths.document,
  "copied.txt"
)


const movedFile = new File(
  Paths.document,
  "moved.txt"
)


const notesDirectory = new Directory(
  Paths.document,
  "notes"
)



const index = () => {

  const [output,setOutput] = useState("")
  const [downloadUri,setDownloadUri] = useState("")


  // CREATE / WRITE FILE

  const writeFile = async()=>{

    await demoFile.write("Hello World")

    setOutput("File created")
  }



  // READ FILE

  const readFile = async()=>{

    const data = await demoFile.text()

    setOutput(data)

  }



  // APPEND FILE

  const appendFile = async()=>{


    const oldData = await demoFile.text()


    await demoFile.write(
      oldData + "\nB Hello World"
    )


    setOutput(
      oldData + "\nB Hello World"
    )

  }




  // DELETE FILE

  const deleteFile = async()=>{

    await demoFile.delete()

    setOutput("File deleted")

  }




  // COPY FILE

  const copyFile = async()=>{


    await demoFile.copy(copiedFile)


    setOutput("File copied")

  }




  // MOVE FILE

  const moveFileHandler = async()=>{


    await copiedFile.move(movedFile)


    setOutput("File moved")

  }





  // FILE INFO

  const getFileInfo = ()=>{


    setOutput(

      JSON.stringify(
        {
          name:demoFile.name,
          uri:demoFile.uri,
          size:demoFile.size,
          exists:demoFile.exists
        },
        null,
        2
      )

    )

  }





  // DELETE ALL

  const deleteAllFile = ()=>{


     demoFile.delete()
     copiedFile.delete()
     movedFile.delete()


    setOutput("All files deleted")

  }




  // CREATE FOLDER


  const createFolder = async()=>{


    await notesDirectory.create()


    setOutput("Folder created")

  }





  // READ DIRECTORY


  const readDir = async()=>{


    const files = await notesDirectory.list()


    setOutput(

      JSON.stringify(
        files.map(
          item=>item.uri
        ),
        null,
        2
      )

    )


  }





  // DOWNLOAD FILE


  const downloadFile = async()=>{


    const folder = new Directory(
      Paths.cache,
      "images"
    )


    await folder.create()



    const downloadedFile =
      await File.downloadFileAsync(
        "https://picsum.photos/300",
        folder
      )



    setDownloadUri(downloadedFile.uri)


    setOutput(

      JSON.stringify(
        {
          uri:downloadedFile.uri,
          size:downloadedFile.size,
          exists:downloadedFile.exists
        },
        null,
        2
      )

    )

  }




return (

<ScrollView>

<View style={styles.container}>


<Text style={styles.title}>
Expo File System Demo
</Text>



<Button
title="Write File"
onPress={writeFile}
/>


<Button
title="Read File"
onPress={readFile}
/>


<Button
title="Append File"
onPress={appendFile}
/>


<Button
title="Delete File"
onPress={deleteFile}
/>


<Button
title="Copy File"
onPress={copyFile}
/>


<Button
title="Move File"
onPress={moveFileHandler}
/>


<Button
title="File Info"
onPress={getFileInfo}
/>


<Button
title="Delete All Files"
onPress={deleteAllFile}
/>


<Button
title="Create Folder"
onPress={createFolder}
/>


<Button
title="Read Folder"
onPress={readDir}
/>


<Button
title="Download Image"
onPress={downloadFile}
/>



<Text style={styles.output}>
{output}
</Text>


<Text>
Download URI:
{downloadUri}
</Text>



</View>


</ScrollView>

)

}


export default index



const styles = StyleSheet.create({

container:{
padding:20,
gap:15
},

title:{
fontSize:22,
fontWeight:"bold",
marginBottom:20
},

output:{
marginTop:20,
fontSize:16
}

})