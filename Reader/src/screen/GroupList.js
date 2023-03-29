import {View, Text, SafeAreaView, TouchableOpacity,ScrollView} from 'react-native';
import React, {useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {auth, db} from '../../firebase';
import {
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
function generateRandomColor() {
    // Generate random hex code value between 0 and 16777215
    const hexValue = Math.floor(Math.random() * 16777215).toString(16);
    
    // Pad the hex value with zeros if necessary
    const paddedHexValue = hexValue.padStart(6, "0");
    
    // Return the hex code with a hash symbol in front
    return "#" + paddedHexValue;
  }

const GroupList = ({navigation,route}) => {
  const [groupList, setGroupList] = useState([]);
  const [userName,setUsername]=useState('')

  const getGroupList = async () => {
    const col1 = collection(db, 'group', route.params.user, 'record');
    const col2 = doc(db, 'user', route.params.user);
    const snap = await getDocs(col1);
    const snap2 = await getDoc(col2);
    const arr = [];
    snap.forEach(docs => {
      arr.push([route.params.user, docs.data(),docs.id]);
    });
    setGroupList(arr);
    setUsername(snap2.data().userName)
  };
  useEffect(() => {
    getGroupList();
  }, []);
 
  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <View className="flex flex-row mt-4 px-3 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl my-auto mx-auto font-bold">
          Group List
        </Text>
      </View>
      <ScrollView
          className="px-3 pb-5 pt-3 flex-1">
          <Text className="text-white text-xl font-bold ml-5 mb-6">
        {userName} Groups
          </Text>
          <View className="flex flex-row flex-wrap px-4 rounded-full">
            {groupList.map(docs => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EnterGroupPin', {
                    data:docs,
                    col:route.params.user
                  })
                }
                className="w-full bg-white flex flex-row p-3 my-2 rounded-xl px-7">
                <View style={{backgroundColor:generateRandomColor()}} className='w-8 h-8 rounded-full'></View>
                <Text className='flex-1 text-base my-auto text-black ml-4'>{docs[1].groupName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      
    </SafeAreaView>
  );
};

export default GroupList;
