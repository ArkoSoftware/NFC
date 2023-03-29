import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../components/InputField';
import {addDoc, collection, doc, serverTimestamp} from 'firebase/firestore';
import {auth, db} from '../../firebase';

const CreateGroup = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');

  const createGroup = async () => {
    const doc1 = collection(db, 'group', auth.currentUser.uid, 'record');
    const snap = await addDoc(doc1, {
      groupName: name,
      pin: pin,
      time: serverTimestamp(),
    });
    navigation.navigate('Gallery');
  };
  return (
    <View className="flex-1 bg-slate-800">
      <View className="flex flex-row mt-4 px-3 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl my-auto mx-auto font-bold">
          Create Group
        </Text>
      </View>

      <View className="mt-14">
        <View className="px-8">
          <View className="flex flex-col space-y-3">
            <View>
              <InputField label={'Group Name'} setState={setName} />
            </View>
            <View>
              <InputField label="4 digit pin" max={4} setState={setPin} />
              <Text className="text-white my-2 mx-2" style={{fontSize: 10}}>
                Group pin is used to join the group
              </Text>
            </View>
            <View className="">
              <TouchableOpacity
                onPress={() => createGroup()}
                className="bg-white rounded-xl p-4 mt-10">
                <Text className="text-slate-800 text-center">Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreateGroup;
