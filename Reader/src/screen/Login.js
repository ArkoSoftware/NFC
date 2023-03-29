import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import InputField from '../components/InputField';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth, db} from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  async function login() {
    signInWithEmailAndPassword(auth, email, pin + 'xxxx')
      .then(async user => {
        if (user) {
          await AsyncStorage.setItem('code', pin);
          console.log(pin)
          console.log('Correct');
        } else {
          console.log('Incorrect');
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  return (
    <SafeAreaView className="flex-1 bg-slate-800 p-5">
      <View className="mt-14 mx-auto">
        <Icon name="scan-circle-outline" color={'#fff'} size={140} />
      </View>
      <View className="mt-14">
        <Text className="text-white text-center text-5xl font-bold mb-10">
          Login
        </Text>
        <View className="flex flex-col space-y-5">
          <View>
            <InputField label={'Email'} setState={setEmail} />
          </View>
          <View>
            <InputField label="4 digit pin" max={4} setState={setPin} />
          </View>
          <View className="">
            <TouchableOpacity
              onPress={() => login()}
              className="bg-white rounded-xl p-4 mt-10">
              <Text className="text-slate-800 text-center">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Signup')}
          className="rounded-xl p-4 ">
          <Text className="text-gray-100 text-center">Create An Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
