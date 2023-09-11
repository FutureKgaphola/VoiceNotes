import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Recordings from './components/Recordings';

export default function App() {
  var [audio, SetRecordings] = useState([
    {
      name: "Samuel Mankho",
      dob: "Wed Jun 15 2024",
      msg: `that can be used as a pre-built solution! layground to view and fork react-native-shared-preferences`,
      id: "1",
    },
    {
      name: "Kenny Okoje",
      dob: "Tue Jun 15 2024",
      msg: `Use this onlplayground to view and fork react-native-shared-preferences example apps and templates on CodeSandbox. Click any example below to run it instantly or find templates that can be used as a pre-built solution!`,
      id: "2",
    },
    {
      name: "Karel Jones",
      dob: "Wed Jun 15 2024",
      msg: `Use this online react-native-shared-preferences playground to view and fork react-native-shared-preferences example apps and templates on CodeSandbox. Click any example below to run it instantly or find templates that can be used as a pre-built solution!`,
      id: "3",
    },
    {
      name: "john",
      dob: "Mon Jun 15 2024",
      msg: `Use this onlinelayground to view and fork react-native-shared-preferences example apps and templates on CodeSandbox. Click any example below to run it instantly or find templates that can be used as a pre-built solution!`,
      id: "4",
    },
    {
      name: "Dave",
      dob: "Thu Jun 15 2024",
      msg: `ences playground to view and forreferences example apps and templates on CodeSandbox. Click any example below to run it instantly or find templates that can be used as a pre-built solution!`,
      id: "5",
    },
    {
      name: "Simon",
      dob: "Fri Jun 15 2024",
      msg: `nces playground to view and fork react-native-shared-preferences example apps and templates on CodeSandbox. Click any example below to run it instantly or find templates that can be used as a pre-built solution!`,
      id: "6",
    },
    {
      name: "Daniel",
      dob: "Wed Jun 15 2024",
      msg: `Use this ew-shared-preferences example apps and templates on CodeSandbox. Click any example below to run it instantly or find templates that can be used as a pre-built solution!`,
      id: "7",
    },
    {
      name: "Roony Simons",
      dob: "Thu Jun 15 2024",
      msg: `und to s example apps and templates on CodeSandbox. Click any example below to run it instantly or find templates that can be used as a pre-built solution!`,
      id: "8",
    },
  ]);
  return (
    <View style={styles.container}>
      
      <Recordings audio={audio}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    marginTop:25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
