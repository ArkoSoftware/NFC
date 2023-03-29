import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {KeycodeInput} from 'react-native-keycode';
import Icon from 'react-native-vector-icons/Ionicons';
import {auth, db} from '../../firebase';
import {createUserWithEmailAndPassword, sendEmailVerification, signOut, updateProfile} from 'firebase/auth';
import {addDoc, collection, doc, setDoc} from 'firebase/firestore';
const AddPin = ({navigation, route}) => {
  const userDetail=route.params
  const [pin, setPin] = useState();
  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mt-4 mx-3">
        <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
      </TouchableOpacity>
      <View className="mt-20 mx-auto">
        <Icon name="lock-closed-outline" color={'#fff'} size={100} />
      </View>
      <View className=" mx-auto ">
        <Text className="text-white text-center text-4xl font-bold my-10">
          Enter New Pin
        </Text>
        <View className=" mx-auto bg-white p-6 rounded">
          <KeycodeInput
            alphaNumeric={false}
            onChange={value => {
              setPin(value);
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (pin != '' && pin.length == 4) {
            createUserWithEmailAndPassword(auth, userDetail.email, pin + 'xxxx').then(
              async user => {
                sendEmailVerification(auth.currentUser);
                const col1 = doc(db, 'user',auth.currentUser.uid);
                const snap = setDoc(col1, {email: userDetail.email, pin: pin,userName:userDetail.username});
                updateProfile(auth.currentUser, {displayName: userDetail.username});
                navigation.navigate('EmailVerified')
              },
            );
          }
        }}
        className="bg-white rounded-xl p-5 text-base mx-8 mt-16 mb-9">
        <Text className="text-slate-800 text-center">Create Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddPin;
