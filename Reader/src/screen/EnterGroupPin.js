import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {auth, db} from '../../firebase';
import {
    arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import Lottie from 'lottie-react-native';
import InputField from '../components/InputField';
function generateRandomColor() {
  // Generate random hex code value between 0 and 16777215
  const hexValue = Math.floor(Math.random() * 16777215).toString(16);

  // Pad the hex value with zeros if necessary
  const paddedHexValue = hexValue.padStart(6, '0');

  // Return the hex code with a hash symbol in front
  return '#' + paddedHexValue;
}



const EnterGroupPin = ({navigation, route}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const data = route.params['data'];
  console.log(data)
  const checkPin = () => {
    if (pin == data[1].pin) {
      JoinGroup()
    } else {
      setError(true);
    }
  };
  const JoinGroup=async()=>{
    const doc1=doc(db,'user',auth.currentUser.uid)
    const snap=await setDoc(doc1,{groups:arrayUnion({userCode:data[0],groupCode:data[2]})},{merge:true})
    navigation.navigate('OpenGroup', {
        data:data
      })
}
  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <View className="flex flex-row mt-4 px-3 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl my-auto mx-auto font-bold">
          Join Group
        </Text>
      </View>
      <View className="flex flex-col p-4 mt-20">
        <Text
          className="font-light m-1 mx-3 tracking-tighter text-gray-200"
          style={{fontSize: 12}}>
          Enter the group pin
        </Text>
        <TextInput
          maxLength={4}
          onChangeText={txt => setPin(txt)}
          placeholder={'4-Digit Pin'}
          placeholderTextColor={'#9f9f9f'}
          style={{fontSize: 14}}
          className="p-3 border border-gray-300 rounded-lg mx-1 px-4 text-gray-100"
        />
        {error ? (
          <Text
            className="font-light m-1 mx-3 tracking-tighter text-red-300"
            style={{fontSize: 12}}>
            Wrong Password
          </Text>
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity
        onPress={() => checkPin()}
        className="mx-auto bg-white rounded-full p-4 w-1/3 mt-10">
        <Text className="text-center font-bold text-slate-800">Join</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EnterGroupPin;
