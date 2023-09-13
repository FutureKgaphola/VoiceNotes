import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RecordButton from "./components/RecordButton";
import Header from "./components/Header";
import MakeRecord from "./components/MakeRecord";
import RecordingList from "./components/RecordingList";

export default function App() {
  const [isHome, setHome] = useState(true);
  const [isAppListen, SetAppListen] = useState(false);
  const [audio, setAudio] = useState([]);
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          isHome={isHome}
          setHome={setHome}
          SetAppListen={SetAppListen}
          isAppListen={isAppListen}
        />
        {isHome ? (
          <MakeRecord isAppListen={isAppListen} />
        ) : (
          <RecordingList audio={audio} setAudio={setAudio}/>
        )}

        {isHome && <RecordButton SetAppListen={SetAppListen} audio={audio} setAudio={setAudio}/>}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
