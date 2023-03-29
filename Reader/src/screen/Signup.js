import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import InputField from '../components/InputField';
import Icon from 'react-native-vector-icons/Ionicons';
const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-slate-800 p-5 flex flex-col">
      <View className="mt-20 mx-auto">
        <Icon name="scan-circle-outline" color={'#fff'} size={140} />
      </View>
      <View className="mt-10 flex-1">
        <Text className="text-white text-center text-5xl font-bold mb-10">
          Create Account
        </Text>
        <View className="flex flex-col space-y-5">
          <View>
            <InputField label={'Email'} setState={setEmail} />
          </View>

          <View className="">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                if (email != '') {
                  navigation.navigate('GetUserName', {email: email});
                }
              }}
              className="bg-white rounded-xl p-5 mt-1 text-base">
              <Text className="text-slate-800 text-center">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Login')}
        className="rounded-xl p-4">
        <Text className="text-gray-100 text-center">
          Already Have An Account?
        </Text>
      </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

export default Signup;
