import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {auth, db} from '../../firebase';
import Lottie from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';


const Gallery = ({navigation}) => {
  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getImageGallery = async () => {
    setLoading(true)
    const col1 = collection(db, 'tag');
    const q1 = query(col1, where('activated', '==', true));
    const snap = await getDocs(q1);
    const arr = [];
    snap.forEach(docs => {
      arr.push(docs.data());
    });
    const q2 = query(col1, where('activated', '==', false));
    const snap2 = await getDocs(q2);
    snap2.forEach(docs => {
      arr.push(docs.data());
    });
    setImageList(arr);
    setLoading(false)
  };
  const deleteDocument = async productId => {
    const li=imageList
    for(var i=0;i<imageList.length;i++){
      console.log(imageList[i].productId,productId)
      if(imageList[i].productId==productId){
        li.splice(i,1)
      }
    }
    setImageList([...li])
    const doc1 = doc(db, 'tag', productId);
    const snap = await deleteDoc(doc1);
   
  };
  useEffect(() => {
    getImageGallery();
  }, [isFocused]);
  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <View className="flex flex-row px-3 py-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl my-auto ml-5">Tag List</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          className="ml-auto my-auto mr-4"
          onPress={() => navigation.navigate('Writer')}>
          <Icon name="add-circle" color="#cfcfcf" size={24} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Lottie source={require('../assets/animation.json')} autoPlay loop />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getImageGallery}
            />
          }
          className="py-5 px-5">
          <View className="flex flex-col ">
            {imageList.map(docs => (
              <View className="flex flex-row w-full p-4 mb-4 px-5 bg-gray-300 rounded flex-1">
                <View className="flex flex-col flex-1">
                  <View className="flex flex-row">
                    <Text className="text-slate-800 text-base font-medium">
                      Product Id:
                    </Text>
                    <Text className="text-slate-800 text-sm my-auto ml-4">
                      {docs.productId}
                    </Text>
                  </View>
                  <View className="flex flex-row mt-3">
                    {docs.activated ? (
                      <Text className="text-gray-50 text-sm my-auto p-2 bg-green-700 rounded">
                        Active
                      </Text>
                    ) : (
                      <Text className="text-gray-50 text-sm my-auto p-2 bg-gray-700 rounded">
                        InActive
                      </Text>
                    )}
                  </View>
                </View>
                <View className="flex flex-row mt-3">
                  <TouchableOpacity
                    onPress={() => deleteDocument(docs.productId)}
                    className="text-gray-50 text-sm mb-auto p-2 bg-red-700 rounded">
                    <Icon name="trash-outline" color="#fff" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Gallery;
