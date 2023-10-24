import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Button } from 'react-native-paper';
import fav from "../assets/microphone.png";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { ProfileContext } from "../Manager/ProfileManager";

const LoginScreen = ({ navigation }) => {

  const {
    key, SetKey
} = useContext(ProfileContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleLogin = () => {
    if (username !== '' && password !== '') {
      setisLoading(true);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, username.trim().toLowerCase(), password).then((res) => {
        SetKey(res.user.uid);
        setPassword('');
        setUsername('');
        setisLoading(false);
        navigation.navigate("HomeRecorder");

      }).catch((err) => {
        setPassword('');
        setisLoading(false);
        Alert.alert('Notification', err.message);

      });
    }else{
      Alert.alert('Notification', 'Please fill the required fields.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View>
        <View style={styles.imgContainer}>
          <Image source={fav} style={styles.icon} />
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>Recording App</Text>
        </View>
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          value={username}
          cursorColor={'black'}
          onChangeText={(text) => setUsername(text.trim())}
        />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
          value={password}
          cursorColor={'black'}
          onChangeText={(text) => setPassword(text)}
        />
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Forgotpassword')}>
            <Text style={styles.forgT}>forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleLogin()}>
          <Button disabled={isLoading ? true : false} style={styles.customButton}
            loading={isLoading}
            mode="contained" >
            Login
          </Button>
        </TouchableOpacity>
      </View>

      <View style={styles.signT}>
        <Text>Don't have an account? </Text>
        <Text onPress={() => navigation.navigate('RegistrationPage')} style={{ color: "red", paddingLeft: 5 }}>Sign up</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  textInput: {
    width: 350,
    height: 40,
    borderRadius: 15,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    alignSelf: "center"
  },
  forgT: {
    marginLeft: 240,
  },
  icon: {
    marginBottom: 20,
    height: 80,
    width: 80,
    marginTop: 130,
  },
  imgContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 120,
  },
  buttonContainer: {
    backgroundColor: 'red',
    alignItems: "stretch",
    justifyContent: "center",
  },
  customButton: {
    marginTop: "15%",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  signT: {
    marginTop: 20,
    marginLeft: 10,
    flexDirection: "row",
  },
});

export default LoginScreen;
