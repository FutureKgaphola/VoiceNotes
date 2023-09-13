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

const RecordingList = (props) => {
  const {audio,setAudio}=props;
  const [itemIdchange,setItemIdchange]=useState(-1);
  const playbackObject = new Audio.Sound();
   const presPlay=(media,id)=>{
    var curId=id;
      playbackObject.loadAsync({ uri:media}).then(()=>{
        playbackObject.playAsync().then(()=>{
          OnPlay(curId);
        }).catch((pl)=>{
          console.log(pl);
          playbackObject.stopAsync();
        })
      }).catch((err)=>{
        console.log(err);
        playbackObject.stopAsync();
      });
      playbackObject._onPlaybackStatusUpdate=playbackStatus=>{
        if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
          setItemIdchange(-1);
          audio.forEach(element => {
            if(element.isplaying===true){
              
              element.isplaying=false;
              element.Icon='play-circle';
              setAudio(audio);
              setItemIdchange(element.id);
            }else{
              setItemIdchange(element.id);
            }
      
          });
          
          
        }
      }
    
        
   }
   
   const Ondelete=(id)=> setAudio((audio)=>audio.filter((aFile)=>aFile.id!==id))
   const OnPlay=(id)=>{
    setItemIdchange(-1);
    audio.forEach(element => {
      if(element.id===id){
        element.isplaying=true;
        element.Icon='stop';
        setItemIdchange(id);
        setAudio(audio);
      }

    });

   }
  return (
    <View style={styles.Listcontainer}>
      <FlatList
        extraData={itemIdchange}
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
            <TouchableOpacity onPress={()=>presPlay(item.uri,item.id)} style={styles.btn}>
              <FontAwesome name={item.Icon} size={24} color="black" />
            </TouchableOpacity>
            
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
