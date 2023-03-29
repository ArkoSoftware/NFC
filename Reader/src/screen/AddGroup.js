import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';


const AddGroup = ({navigation}) => {
  const [image, setImage] = useState(null);

  return (
    <View className="flex-1 bg-slate-800">
      <View className="flex flex-row mt-4 px-3 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl my-auto mx-auto">Add Group</Text>
      </View>

      <View className="mt-20 mx-auto flex flex-row">
        <View className="p-3 flex-1">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('GroupNFC')}
            className=" bg-white rounded-xl w-full h-1/2">
            <View className="my-auto">
              <Text className="text-black text-xl font-bold mx-auto my-4">
                Join Group
              </Text>

              <Icon
                name="people"
                color="#2f2f2f"
                size={28}
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View className="p-3 flex-1">
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('CreateGroup')}
            className=" bg-white rounded-xl w-full h-1/2">
            <View className="my-auto">
              <Text className="text-black text-xl font-bold mx-auto my-4">
                Create Group
              </Text>

              <Icon
                name="person-add"
                color="#2f2f2f"
                size={28}
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddGroup;
