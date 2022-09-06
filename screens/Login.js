import { StyleSheet, Text, View ,KeyboardAvoidingView ,ImageBackground,Button} from 'react-native'
import React,{useState,useEffect} from 'react'
import { TextInput, TouchableOpacity } from 'react-native-web'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import image from '../assets/background1.jpg'
import { signInWithEmailAndPassword ,onAuthStateChanged} from 'firebase/auth'
const Login = () => {
const [email,setEmail]= useState("")
const [password,setPassword]= useState("")
const navigation=useNavigation()
useEffect(()=>{
  const unsubscribe=  auth.onAuthStateChanged(user=>{
        if(user){
            navigation.replace('Home')
        }
    })
    return unsubscribe
},[])

const handleSignUp= async()=>{
    try{
        const user= await createUserWithEmailAndPassword(
            auth,
            email,
            password,
            )
           
        console.log("the user",user)
        }
        catch(err){
            console.log(err.message)
        }
        
}

const haveAccount=()=>{
    navigation.replace("Register")
}
const handleLogin=()=>{
    
    signInWithEmailAndPassword(auth,email,password)
    .then(userCredentials=>{
        const user=userCredentials.user;
        console.log("Logged i n",user.email)
    })
    .catch(error=>alert(error.message))
}
  return (
    <ImageBackground style={styles.backgroundImg} source={image} resizeMode="cover">
    <KeyboardAvoidingView 
        style={styles.container}
        behavior='padding'
    >
  
  <Text style={styles.loginH1}>Login</Text>
     
        <View style={styles.inputContainer}>
                <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text=>setEmail(text)}
                style={styles.input}
        
             />

             <TextInput
                placeholder="Password"
               value={password}
               onChangeText={text=>setPassword(text)}
                style={styles.input}
                secureTextEntry
        
             />



        </View>
        <Button style={styles.signUpBtn}  title="Sign In" onPress={handleLogin}/>
        <View style={styles.TouchableContainer}>
<Text style={styles.dontHaveAcc}>Already Have an Account?</Text>
<TouchableOpacity color="red"

onPress={haveAccount}>

    <Text style={styles.signIn} color="red">Sign Up</Text>
</TouchableOpacity>

  </View>

        {/* <View style={styles.buttonContainer}>
             <TouchableOpacity
                 onPress={handleLogin}
                 style={styles.button}
             >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

         

                       
        </View> */}
  {/* <View style={styles.TouchableContainer}>
<Text style={styles.dontHaveAcc}>Don't Have an Account?</Text>
<TouchableOpacity color="red"

onPress={haveAccount}>

    <Text style={styles.signIn} color="red">Sign Up</Text>
</TouchableOpacity>

  </View> */}
    </KeyboardAvoidingView>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
    signUpBtn:{
            marginTop:-200,
    },
    loginH1:{
        color:"#fff",
        fontSize:40,
      
    },
    signIn:{
        color:"white"
     
    },
    TouchableContainer:{
        flexDirection:"row"
    },
    backgroundImg:{
        height:"100%"
    },  
container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    
},
inputContainer:{
width:"40%",
height:200,
marginBottom:-50,


borderRadius:10,
},
input:{
    backgroundColor:"white",
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
  
    marginTop:15,
},
buttonContainer:{

    justifyContent:"center",
    alignItems:"center",
    marginTop:-70,
},
button:{
    backgroundColor:"#0782f9",
    width:'100%',
    padding:15,
    borderRadius:10,
    alignItems:"center"
},
buttonOutline:{

    backgroundColor:"white",
    marginTop:5,
    borderColor:"#0782f9",
    borderWidth:2,
},
buttonText:{
 color:'white',
 fontWeight:'700',
 fontSize:16,
},
buttonOutlineText:{

    color:'#0782f9',
    fontWeight:'700',
    fontSize:16,
}

})

export default Login