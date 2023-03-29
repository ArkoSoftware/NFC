import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {collection, getDocs} from 'firebase/firestore';
import {auth, db} from '../../firebase';
const OpenGroup = ({navigation, route}) => {
  const data = route.params.data;
  const [imageList, setImageList] = useState([]);
  const [refreshing,setRefreshing]=useState(false)
  const getImageGallery = async () => {
    const col1 = collection(db, 'groupImage', data[2], 'record');
    const snap = await getDocs(col1);
    const arr = [];
    snap.forEach(docs => {
      arr.push([docs.id, docs.data()]);
    });
    setImageList(arr);
  };
  useEffect(() => {
    getImageGallery();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <View className="flex flex-row px-3 py-5">
        <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
      </View>
      <View>
        <Text className="text-center mb-8 font-bold text-2xl text-white">
          {data[1].groupName}
        </Text>
      </View>
      <View className=" p-3 border-b-2 border-b-white">
        <Icon
          name="apps-outline"
          color="#fff"
          size={20}
          style={{marginLeft: 'auto', marginRight: 'auto'}}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getImageGallery} />
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
      <TouchableOpacity
        onPress={() =>{
            console.log(data);
          navigation.navigate('UploadGroup', {
            groupData: data[2],
            groupName: data[1].groupName,
          })
        }
        }
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
    </SafeAreaView>
  );
};

export default OpenGroup;
