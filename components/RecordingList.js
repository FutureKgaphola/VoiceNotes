import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons,FontAwesome } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import { useState } from "react";

const RecordingList = ({audio}) => {
  const[isStopallow,ShowStop]=useState(false);
  const playbackObject = new Audio.Sound();
   const presPlay=(media)=>{
    if(isStopallow===false){
      playbackObject.loadAsync({ uri:media}).then(()=>{
        playbackObject.playAsync().then(()=>{
          ShowStop(true);
        }).catch((pl)=>{
          console.log(pl);
          playbackObject.stopAsync();
        })
      }).catch((err)=>{
        console.log(err);
        playbackObject.stopAsync();
      });
    }else{
      ShowStop(false);
      playbackObject.stopAsync();
    }
        
   }
   const Ondelete=(id)=> audio.filter(audio.id!==id)
  return (
    <View style={styles.Listcontainer}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={audio}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{display:"flex",flexDirection:'row',gap:5}}>
              <Image
                style={{ width: 60, height: 60 }}
                source={require("../assets/microphone.png")}
              />
              <Text style={{alignSelf:"center"}}>{item.name}</Text>
            </View>
            {isStopallow ? <TouchableOpacity onPress={()=>presPlay(item.uri)} style={styles.btn}>
            <FontAwesome name="stop" size={24} color="black" />
            </TouchableOpacity> : <TouchableOpacity onPress={()=>presPlay(item.uri)} style={styles.btn}>
            <FontAwesome name="play-circle" size={24} color="black" />
            </TouchableOpacity>}
            
            <TouchableOpacity onPress={()=>Ondelete(item.id)} style={styles.btn}>
              <Ionicons name="ios-trash-bin" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Listcontainer: {
    flex: 4,
    alignSelf:"stretch",
  },
  btn: {
    justifyContent:"center"
  },
  card: {
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    margin: 5,
    padding: 5,
    backgroundColor: "#FAF9F6",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
});

export default RecordingList;
