import {View, Text, SafeAreaView, TouchableOpacity,Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeycodeInput} from 'react-native-keycode';
import Icon from 'react-native-vector-icons/Ionicons';
import {auth, db} from '../../firebase';
import {doc, getDoc} from 'firebase/firestore';
const EnterPin = ({navigation}) => {
  
  return (
    <View className="flex-1 bg-black">
     <Image source={require('../assets/admin.png')} className='h-44 w-44 rounded mx-auto my-auto'/>
     <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate('Gallery')} className='bg-white rounded-xl mx-8 p-4 mb-12'>
      <Text className='font-light text-xl text-black text-center'>Continue</Text>
     </TouchableOpacity>
    </View>
  );
};

export default EnterPin;
