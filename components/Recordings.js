import {Text, ScrollView} from 'react-native';
const Recordings = ({audio}) => {
    return ( 
        <ScrollView>
        {
          audio.map((item)=>(
            <Text key={item.id}>{item.msg}</Text>
          ))
        }
      </ScrollView>
     );
}
 
export default Recordings;