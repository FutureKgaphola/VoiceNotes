import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { useState,useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecordButton = (props) => {
    const {SetAppListen,audio,setAudio}=props;
    const[islisteng,setlistening]=useState(false);
    
    const startRecord=()=>{
        if(islisteng){
            setlistening(false);
            SetAppListen(false);
            stopRecording();
        }else{
            setlistening(true);
            SetAppListen(true);
            handleRecordButtonPress();
        }
    }

    const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioPermission, setAudioPermission] = useState(null);

  useEffect(() => {

    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync().then((permission) => {
        console.log('Permission Granted: ' + permission.granted);
        setAudioPermission(permission.granted)
      }).catch(error => {
        console.log(error);
      });
    }

    // Call function to get permission
    getPermission()
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
      }

      const newRecording = new Audio.Recording();
      console.log('Starting Recording')
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');

    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }

  async function stopRecording() {
    try {

      if (recordingStatus === 'recording') {
        console.log('Stopping Recording')
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();

        // Create a file name for the recording
        const fileName = `Vrecordings-${Date.now()}.caf`;

        // Move the recording to the new directory with the new file name
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'Vrecordings/', { intermediates: true });
        await FileSystem.moveAsync({
          from: recordingUri,
          to: FileSystem.documentDirectory + 'Vrecordings/' + `${fileName}`
        });

        var mfile=FileSystem.documentDirectory + 'Vrecordings/' + `${fileName}`;
        setAudio([...audio,{ uri: mfile ,
        name:fileName,
        id:fileName }]);
        // resert our states to record again
        setRecording(null);
        setRecordingStatus('stopped');
      }

    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log('Saved audio file to', savedUri);
      }
    } else {
      await startRecording();
    }
  }

    return ( 
        <View style={styles.Rcontainer}>
            <TouchableOpacity onPress={()=>startRecord()}>
            <Foundation style={{alignSelf:'center'}} name="record" size={70} color="red" />
            <Text>{islisteng? 'listening...':'start recording'}</Text>
            </TouchableOpacity>
        </View>
     );
}
 
const styles = StyleSheet.create({
    Rcontainer:{
      flex: 1,
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }
  })
export default RecordButton;