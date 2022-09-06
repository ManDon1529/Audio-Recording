import { StyleSheet, Text, View ,KeyboardAvoidingView ,ImageBackground} from 'react-native'
import React,{useState,useEffect} from 'react'
import { Button, TextInput, TouchableOpacity } from 'react-native-web'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword ,onAuthStateChanged} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import image from '../assets/background1.jpg'
import { db } from '../firebase'
import{collection,getDocs,addDoc} from 'firebase/firestore'
import { async } from '@firebase/util'

const Register = () => {

const [email,setEmail]= useState("")
const [password,setPassword]= useState("")


const[users,setUsers]=useState([])
const userCollections= collection(db,"users")
const navigation=useNavigation()

const [user,setUser]=useState({})
useEffect(()=>{

        //gettting all the users
    const getUsers= async ()=>{
            const data=await getDocs(userCollections);
          //  console.log(data)
          setUsers(data.docs.map((doc)=>({...doc.data()})))
    }
    getUsers()

   //end 

//   const unsubscribe=  auth.onAuthStateChanged(user=>{
//         if(user){
//             navigation.replace('Home')
//         }
//     })
//     return unsubscribe

onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
})


},[])

const handleSignUp= async()=>{

    await addDoc(userCollections,{email:email,password:password})
try{
const user= await createUserWithEmailAndPassword(
    auth,
    email,
    password,
    ).then(()=>{
        navigation.navigate('Home')
    })
   
// console.log("the user",user)
}
catch(err){
    console.log(err.message)
}
// createUserWithEmailAndPassword(auth,email,password,name)
//     .then(userCredentials=>{
//         const user=userCredentials.user;
//         user.displayName=name;
//         console.log(user.displayName)
//     })
//     .catch(error=>alert(error.message))
}

const haveAccount=()=>{
    navigation.replace("Login")
}
// const handleLogin=()=>{
//     auth
//     .signInWithEmailAndPassword(email,password)
//     .then(userCredentials=>{
//         const user=userCredentials.user;
//         console.log("Logged i n",user.email)
//     })
//     .catch(error=>alert(error.message))
// }
  return (
    <ImageBackground style={styles.backgroundImg} source={image} resizeMode="cover">
    <KeyboardAvoidingView 
        style={styles.container}
        behavior='padding'
    >
  
  <Text style={styles.loginH1}>Register</Text>
     
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
        <Button  title="Sign up" onPress={handleSignUp}/>
        <View style={styles.TouchableContainer}>
<Text style={styles.dontHaveAcc}>Already Have an Account?</Text>
<TouchableOpacity color="red"

onPress={haveAccount}>

    <Text style={styles.signIn} color="red">Sign In</Text>
</TouchableOpacity>

      
  </View>
{/* 
        <View style={styles.buttonContainer}>
             <TouchableOpacity
                 onPress={handleSignUp}
                 style={styles.button}
             >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

         

                       
        </View> */}
      
    </KeyboardAvoidingView>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
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
    width:"20%",
    justifyContent:"center",
    alignItems:"center",
    marginTop:-7,
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

export default Register