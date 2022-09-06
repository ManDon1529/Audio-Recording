import { StyleSheet, Text, View , Button} from 'react-native'
import React,{useState,useEffect} from 'react'
import { collection ,getDocs} from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import { db,auth } from '../firebase'


const Profile = () => {
  
const[users,setUsers]=useState([])
const userCollections= collection(db,"users")
const navigation=useNavigation()

const [user,setUser]=useState({})
useEffect(()=>{

        //gettting all the users
    const getUsers= async ()=>{
            const data=await getDocs(userCollections);
            console.log(data)
          setUsers(data.docs.map((doc)=>({...doc.data()})))
          for(var i=0;user.length<0;i++){
            
          }
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
  return (
    <View style={styles.container}>
      <Text>EditProfile</Text>
      <Button
      title="Click Here"
      onPress={()=> alert("Button clicked")}
      
      />
      {users.map((user)=>{
        return(
          <Text>{user.email}</Text>
        )
      })}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({

container:{
    flex:1,
    alignItems:"center",
    justifyContent: "center"
}

})