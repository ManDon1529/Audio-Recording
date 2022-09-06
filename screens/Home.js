import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Modal ,ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-web'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
//import { Button } from 'react-native-web';
import React from 'react';
import { Audio } from 'expo-av';
import image from '../assets/background1.jpg'

const Home=()=>{

  
const navigation=useNavigation()
  const handleSignOut=()=>{
    auth.signOut()
    .then(()=>{
      navigation.replace("Login")
    })
    .catch(error=>alert(error.message))
  }



  const [recording, setRecording]= React.useState();
  const [recordings, setRecordings]= React.useState([]);
  const [msg,setMsg]= React.useState("Recording app");
  const [remove,setRemove]=React.useState();
 const [showPop, setShowPop]=React.useState(false);
  const [reCord, setReCord]= React.useState()

  async function startRecording(){
    try{
      const permission = await Audio.requestPermissionsAsync();
      // console.log(permission)

      if(permission.status === "granted"){
        await Audio.setAudioModeAsync({
          allowRecordingIOS: true,
          playsInSilentModeIOS:true
        });

        const {recording}= await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording)
      }else(
        setMsg("Please grant permssion to app to start recording")
      )
    }catch(error){
      alert("failed to start recording  "+ error)
    }
  }
  async function stopRecording(){
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const {sound, status} = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound:sound,
      duration:getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });
    // console.log(updatedRecordings.duration)
    setRecordings(updatedRecordings)

  }

  function getDurationFormatted(millis){
    console.log(millis)
    const minutes = millis/1000/60;
    const minutesDisplay =Math.floor(minutes);
    const seconds = Math.round(minutes - minutesDisplay)*60;
    const soundDisplay = seconds <10 ? `0${seconds}`:seconds;
    console.log(minutesDisplay + "  " + soundDisplay);
    return `${minutesDisplay}: ${soundDisplay}`
  }


  const removeAudio=(Recordid)=>{
    // console.log(recordings)
    // console.log(Recordid)
    // const a = recordings[Recordid];
    // console.log( recordings[Recordid])
  
    setRecordings(recordings.filter(item=> item.file !== Recordid))
    //  console.log(recordings)
  }


const Profile=()=>{
  navigation.navigate("Profile")
}


//to show my recordings
function getRecordings(){

  // function removePeople(e) {
  //   this.setRecordings({recordings: this.state.recordings.filter(function(recording) { 
  //       return recording !== e.target.value 
  //   })});
  // }
  // console.log(recordings)

//editing the recording
function updateRecording(recordfile){
  console.log(recordfile)  
  // console.log(showPop)
  
  async function beginRecord(){
    try{
      const permission = await Audio.requestPermissionsAsync();
      // console.log(permission)
  
      if(permission.status === "granted"){
        await Audio.setAudioModeAsync({
          allowRecordingIOS: true,
          playsInSilentModeIOS:true
        });
  
        const {recording}= await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording)
      }else(
        setMsg("Please grant permssion to app to start recording")
      )
    }catch(error){
      alert("failed to start recording  "+ error)
    }
  }
  
  async function stop(){
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
  
   
    const {sound, status} = await recording.createNewLoadedSoundAsync();
 
    const newRecording = recordings.map(recordfile=>{
      return {
        sound:sound,
        duration:getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      }
    })
    setRecordings(newRecording)
    console.log(newRecording)
  
  }
  return(
    
    <View>
      <Button
title={recording ? 'Stop Recording':'Start Recording'}
 onPress={recording? stop: beginRecord}
/>

    </View>
  )
 }

 
  return recordings.map((recordingLine, index)=>{
    return (
      <View key={index} style={styles.row}>
         <Text>
      <Text style={styles.fill} > Recording {index++} - {/*{recordingLine.duration}*/}</Text>
   
      <Button style={styles.buttonPlay} onPress={()=> recordingLine.sound.replayAsync() } color="#0D949E" margin="20" title="Play"/>
      <Button style={styles.button}  onPress={()=> removeAudio(recordingLine.file)} color="#E62A2A" title="Delete"/>
      <Button style={styles.button}  onPress={()=> {setShowPop(true),updateRecording(recordingLine)}} color="#5CD339" title="Edit"/>
      </Text>
      <View>
 
 <Modal
transparent={true}
visible={showPop}
>

<View
style={{backgroundColor:'black', flex:1}}
>
<View
style={{backgroundColor:'white', margin:50, padding:40, borderRadius:10,flex:1}}
>
{updateRecording(recordingLine)}

<Button  onPress={()=> setShowPop(false)} title='done'/>
</View>

</View>
</Modal>

</View>
      </View>
    )
    
    
  })
}

  return (
   
    <View style={styles.container}>
       <ImageBackground source={image} style={styles.background} resizeMode="cover">
          <View style={styles.header}>
          <Text style={styles.email} > {auth.currentUser?.email}</Text> 

          <TouchableOpacity color="red"

onPress={Profile} >

    <Text style={styles.profile} color="red">Profile</Text>
</TouchableOpacity>

          </View>
          <View style={styles.main}>
      <Text>{msg}</Text>
      <Button
      style={styles.startRecording}
      title={recording ? 'Stop Recording':'Start Recording'}
      onPress={recording? stopRecording: startRecording}
      />
      {getRecordings()} 
      <StatusBar style="auto" />
    
  
      <TouchableOpacity
      onPress={handleSignOut}
        style={styles.button}
        >
        
       <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
      </View>

    
 
  );
}

const styles = StyleSheet.create({
  profile:{
      marginRight:50,
      marginTop:10,
      backgroundColor:"pink",
      paddingLeft:20,
      paddingRight:20,
      paddingBottom:10,
      paddingTop:10,
      fontWeight:600,
  },
  email:{
    marginRight:50,
    marginTop:10,

    paddingLeft:20,
    paddingRight:20,
    paddingBottom:10,
    paddingTop:10,
    fontWeight:600,
},
  main:{
    flex:1,

    alignItems:"center",
    marginTop:200
  },
  header:{

    color:"white",
  
justifyContent:"space-between",
flexDirection:"row",
    backgroundColor:"gray",
    height:60
  
  },
  background:{
height:"100%",
width:"100%"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
   
  },
  buttonPlay:{
    backgroundColor:"red",
    padding:20,
    margin:20,
  },
  rwo:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  startRecording:{
    padding:200,
    backgroundColor:"red"
  },
  fill:{
    flex:1,
    margin:16
  },
  button:{
    margin:16
  },
  
button:{
  backgroundColor:"#0782f9",
  width:'60%',
  padding:15,
  borderRadius:10,
  alignItems:"center",
  marginTop:40,
},

buttonText:{
color:'white',
fontWeight:'700',
fontSize:16,
},

});
export default Home








// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { TouchableOpacity } from 'react-native-web'
// import { auth } from '../firebase'
// import { useNavigation } from '@react-navigation/native'

// const Home = () => {
  
// const navigation=useNavigation()
//   const handleSignOut=()=>{
//     auth.signOut()
//     .then(()=>{
//       navigation.replace("Login")
//     })
//     .catch(error=>alert(error.message))
//   }
//   return (
//     <View style={styles.container}>
//       <Text>Email: {auth.currentUser?.email}</Text>
//       <TouchableOpacity
//       onPress={handleSignOut}
//         style={styles.button}
//       >
      
//       <Text style={styles.buttonText}>Sign out</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// export default Home

// const styles = StyleSheet.create({
// container:{
//   flex:1,
//   justifyContent:'center',
//   alignItems:'center'
// },
// button:{
//   backgroundColor:"#0782f9",
//   width:'60%',
//   padding:15,
//   borderRadius:10,
//   alignItems:"center",
//   marginTop:40,
// },

// buttonText:{
// color:'white',
// fontWeight:'700',
// fontSize:16,
// },


// })