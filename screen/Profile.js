import React, { useContext, useEffect, useState } from "react";
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
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Button } from "react-native-paper";
import fav from "../assets/microphone.png";
import { ProfileContext } from "../Manager/ProfileManager";

const Profile = ({ navigation }) => {
    const {
        key
    } = useContext(ProfileContext);
    
    const [Name, setName] = useState('');
    const [Phone,setPhone]=useState('');
    const [membershipDate,setMemberDate]=useState('');
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        var document = doc(db, "R_Users", key)
        onSnapshot(document, (snapshot) => {
            setName(snapshot.data().Name);
            setMemberDate(snapshot.data().memberDate);
            setPhone(snapshot.data().Phone)
        })
    }, []);

    const updateCurrentUser = () => {

        if (Name!=='' && Phone!=='' && Phone.length==10) {
            let update = { 
                Name: Name,
                Phone:Phone
             }
            setisLoading(true);
            setDoc(doc(db, 'R_Users', key.trim()), update, { merge: true }).then(() => {
                setisLoading(false);
                Alert.alert('Notification', 'Successfully Updated');
            }).catch((err) => {
                setisLoading(false);
                console.log(String(err));
                Alert.alert('Notification', String(err));
            });
        }else{
            Alert.alert('Notification', 'Please fill the required fields. make sure phone number consist of 10 digits.');
        }   
    }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 35 }}>
            Update your account
          </Text>
          <Image source={fav} style={styles.icon} />
        </View>
        <Text>You joined us on this date : {membershipDate}</Text>

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
        

        <TouchableOpacity onPress={() => updateCurrentUser()}>
          <Button
            disabled={isLoading ? true : false}
            style={styles.customButton}
            loading={isLoading}
            mode="contained"
          >
            Update
          </Button>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default Profile;

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
    marginTop: "10%",
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
