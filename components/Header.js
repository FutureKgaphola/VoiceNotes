import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons,FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const Header = (props) => {
  const { isHome, setHome, SetAppListen, isAppListen,navigation } = props;
  const [currpage, Setpage] = useState("List");
  const toogle = () => {
    isHome ? setHome(false) : setHome(true);

    if (isHome) {
      Setpage("Back");
    } else {
      if (isAppListen) {
        SetAppListen(false);
      }
      Setpage("List");
    }
  };
  return (
    <View style={styles.Headercontainer}>
      <Text
        style={{
          color: "black",
          fontSize: 30,
          fontWeight: "bold",
          alignSelf: "center",
          marginLeft: 5,
        }}
      >
        Voice Recorder
      </Text>
      <View style={styles.rightcorner}>
      <TouchableOpacity style={{alignSelf:"center",marginRight:10}}
      onPress={()=>navigation.navigate('Profile')}>
      <FontAwesome name="user-circle-o" size={34} style={{alignSelf:"center"}} color="black" />
      </TouchableOpacity>
        <Text onPress={()=>toogle()} style={{ alignSelf: "center", fontWeight: "600" }}>
          {currpage}
        </Text>
        
        <TouchableOpacity
          onPress={() => toogle()}
          style={{ alignSelf: "center" }}
        >
          <Ionicons name="menu" size={34} color="black" />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Headercontainer: {
    flex: 0.5,
    alignSelf: "stretch",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  rightcorner: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 5,
  },
});
export default Header;
