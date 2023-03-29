import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {collection, doc, getDoc, getDocs} from 'firebase/firestore';
import {auth, db} from '../../firebase';
function generateRandomColor() {
  // Generate random hex code value between 0 and 16777215
  const hexValue = Math.floor(Math.random() * 16777215).toString(16);

  // Pad the hex value with zeros if necessary
  const paddedHexValue = hexValue.padStart(6, '0');

  // Return the hex code with a hash symbol in front
  return '#' + paddedHexValue;
}
const Gallery = ({navigation}) => {
  const [toggle, setToggle] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [joinedList,setJoinedList]=useState([])
  const getImageGallery = async () => {
    const col1 = collection(db, 'image', auth.currentUser.uid, 'record');
    const snap = await getDocs(col1);
    const arr = [];
    snap.forEach(docs => {
      arr.push([docs.id, docs.data()]);
    });
    setImageList(arr);
  };
  const getGroupList = async () => {
    const col1 = collection(db, 'group', auth.currentUser.uid, 'record');
    const snap = await getDocs(col1);
    const arr = [];
    snap.forEach(docs => {
      arr.push([docs.id, docs.data(), auth.currentUser.uid]);
    });
    setGroupList(arr);
  };
  const getJoinedGroupList = async () => {
    const col1 = doc(db, 'user', auth.currentUser.uid);
    const snap = await getDoc(col1);
    const groupList = snap.data().groups;
    const arr=[]
    for (let i = 0; i < groupList.length; i++) {
      const col1 = doc(db, 'group', groupList[i].userCode, 'record',groupList[i].groupCode);
      const snap = await getDoc(col1);
      arr.push([snap.id,snap.data(),groupList[i].userCode])
    }
    setJoinedList(arr)
  };
  useEffect(() => {
    getImageGallery();
    getGroupList();
    getJoinedGroupList();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <View className="flex flex-row px-3 py-5">
        <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
        <Text className="text-white text-xl my-auto ml-5 mx-auto">
          My Profile
        </Text>
        <View className=" my-auto mr-4">
          <Icon name="lock-closed" color="#cfcfcf" size={24} />
        </View>
      </View>
      <View>
        <Text className="ml-8 text-2xl text-white">
          {auth.currentUser.displayName}
        </Text>
      </View>
      <View className="flex flex-row my-6">
        <TouchableOpacity
          onPress={() => setToggle(true)}
          className={
            toggle
              ? 'flex-1 p-3 border-b-2 border-b-white'
              : 'flex-1 p-3 border-b-2 border-b-slate-700'
          }>
          <Icon
            name="apps-outline"
            color="#fff"
            size={24}
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setToggle(false)}
          className={
            !toggle
              ? 'flex-1 p-3 border-b-2 border-b-white'
              : 'flex-1 p-3 border-b-2 border-b-slate-700'
          }>
          <Icon
            name="people-outline"
            color="#fff"
            size={24}
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          />
        </TouchableOpacity>
      </View>
      {toggle ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getImageGallery}
            />
          }
          className="px-3 py-5">
          <View className="flex flex-row flex-wrap">
            {imageList.map(docs => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OpenImage', {
                    image: docs[1].image,
                    id: docs[0],
                  })
                }
                className="w-1/2 h-44 p-2 mb-8">
                <Image
                  source={{uri: docs[1].image}}
                  className="w-full h-44 mx-auto rounded-xl"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getGroupList} />
          }
          className="px-3 pb-5 pt-3 flex-1">
          <Text className="text-white text-xl font-bold ml-5 mb-6">
            My Groups
          </Text>
          <View className="flex flex-row flex-wrap px-4 rounded-full">
            {groupList.map(docs => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OpenGroup', {
                    data: docs,
                  })
                }
                className="w-full bg-white flex flex-row p-3 my-2 rounded-xl px-7">
                <View
                  style={{backgroundColor: generateRandomColor()}}
                  className="w-8 h-8 rounded-full"></View>
                <Text className="flex-1 text-base my-auto text-black ml-4">
                  {docs[1].groupName}
                </Text>
                <Text className="flex-1 text-right text-base my-auto text-black">
                  Code: {docs[1].pin}
                </Text>
              </TouchableOpacity>
            ))}
             {joinedList.map(docs => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OpenGroup', {
                    data: docs,
                  })
                }
                className="w-full bg-white flex flex-row p-3 my-2 rounded-xl px-7">
                <View
                  style={{backgroundColor: generateRandomColor()}}
                  className="w-8 h-8 rounded-full"></View>
                <Text className="flex-1 text-base my-auto text-black ml-4">
                  {docs[1].groupName}
                </Text>
                
              </TouchableOpacity>
            ))}
           
          </View>
        </ScrollView>
      )}
      {toggle ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Upload')}
          className="w-14 h-14 rounded-full bg-green-700 absolute bottom-16 right-8">
          <Icon
            name="add"
            color="#fff"
            size={20}
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddGroup')}
          className="w-28 rounded-full bg-white absolute bottom-16 right-8 flex flex-row px-4 py-3">
          <Icon
            name="add"
            color="#000"
            size={24}
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
          <Text className="text-black font-bold my-auto pl-2">Groups</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Gallery;
