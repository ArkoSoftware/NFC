import {View, Text} from 'react-native';
import React from 'react';

const ConfirmEmail = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-800 p-5">
      <TouchableOpacity onPress={() => navigation.goBack()} className="">
        <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
      </TouchableOpacity>
      <View className="mt-20 mx-auto">
        <Icon name="person-outline" color={'#fff'} size={100} />
      </View>
      <View className="mt-10">
        <Text className="text-white text-center text-4xl font-bold mb-10">
          Enter Username
        </Text>
        <View className="flex flex-col space-y-5">
          <View>
            <InputField label={'User Name'} setState={setUsername} />
          </View>

          <View className="">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                if (username != '') {
                  navigation.navigate('AddPin', {
                    email: email.email,
                    username: username,
                  });
                }
              }}
              className="bg-white rounded-xl p-5 mt-10 text-base">
              <Text className="text-slate-800 text-center">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmEmail;
