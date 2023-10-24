import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Button } from 'react-native-paper';
import fav from "../assets/microphone.png";

function RegistrationPage({ navigation }) {
  const [isLoading, setisLoading] = useState(false);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [Phone,setPhone]=useState('');
  const handleSubmit = async () => {
    if (Password !== '' && Username !== '' && Name!=='' && Phone!=='' && Phone.length==10) {

      try {
        const auth = getAuth();
        let data = {
          Username: Username,
          memberDate:(new Date().toLocaleDateString()).toString(),
          Phone:Phone.trim(),
          Name:Name.trim()
        }
        setisLoading(true);
        const result = await createUserWithEmailAndPassword(auth, Username.trim().toLocaleLowerCase(), Password);
        setDoc(doc(db, "R_Users", result.user.uid.trim()), data).then(() => {
          setisLoading(false);
          Alert.alert('Notification', 'Successfull registration',
          [
            {text: 'OK', onPress: () =>navigation.navigate("LoginScreen")},
          ]);
        }).catch((err) => {
          console.log(error);
          setisLoading(false);
          Alert.alert('Notification', err.message);
        })
      } catch (error) {
        console.log(error);
        setisLoading(false);
        Alert.alert('Notification', error.message);
      }
    }else{
      Alert.alert('Notification', 'Please fill the required fields. make sure phone number consist of 10 digits.');
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={{flexDirection:"row"}}>
        <Text style={{fontWeight:"bold",fontSize:35}}>Create your account</Text>
      <Image source={fav} style={styles.icon} />
        </View>
      
      <Text style={styles.title3}>Your Name</Text>
      <TextInput
        style={styles.input1}
        placeholder="Name"
        value={Name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.title3}>Your Phone no.</Text>
            <TextInput
              style={styles.input1}
              placeholder="Phone"
              inputMode="tel"
              maxLength={10}
              value={Phone}
              onChangeText={(text) => setPhone(text)}
            />

      <Text style={styles.title3}>Username(Email)</Text>
      <TextInput
        style={styles.input1}
        placeholder="Email"
        value={Username}
        onChangeText={(text) => setUsername(text.trim())}
      />
      <Text style={styles.title3}>passsword</Text>
      <TextInput
        style={styles.input1}
        placeholder="Password"
        value={Password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />


      <TouchableOpacity onPress={() => handleSubmit()}>
        <Button disabled={isLoading ? true : false} style={styles.customButton}
          loading={isLoading}
          mode="contained" >
          Register
        </Button>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={{fontSize:17}}>Already have account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("LoginScreen")}>
        <Text style={{color:'red',marginLeft:5,fontWeight:"bold",fontSize:17}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}

export default RegistrationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  icon: {
    height: 50,
    width: 50,
  },
  
  input1: {
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  registerButton: {
    borderRadius: 10,
  },
  title2: {
    color: "black",
    fontSize: 15,
    marginTop: 10,
  },
  title3: {
    marginTop: 30,
    marginBottom: 10,
  },
  availableText: {
    color: "green",
    fontWeight: "bold",
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 20,
  },
  customButton: {
    marginTop: "15%",
    width: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
