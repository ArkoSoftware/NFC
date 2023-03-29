import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Icon from 'react-native-vector-icons/Ionicons';
import {collection, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../../firebase';

const OpenImage = ({navigation, route}) => {
  const [image, setImage] = useState(route.params.image);
  const [imageId, setImageId] = useState(route.params.id);
  const downloadImageFromGoogle = async imageUrl => {
    const fileDir = RNFetchBlob.fs.dirs.DocumentDir;
    const fileName = 'image.png';
    const filePath = `${fileDir}/${fileName}`;

    try {
      await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
        path: filePath,
      }).fetch('GET', imageUrl);

      await saveImageToGallery(filePath);
    } catch (error) {
      console.log('Error downloading and saving image:', error);
    }
  };
  const saveImageToGallery = async imageUrl => {
    try {
      await CameraRoll.save(imageUrl, 'photo');
      console.log('Image saved to gallery!');
    } catch (error) {
      console.log('Error saving image to gallery:', error);
    }
  };
  const deleteDocument = async id => {
    navigation.navigate('Gallery');
    const doc1 = doc(db, 'image', auth.currentUser.uid, 'record', id);
    const snap = await deleteDoc(doc1);
  };
  return (
    <View className="flex-1 bg-slate-800">
      <View className="flex flex-row mt-4 px-3 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteDocument(imageId)}
          className="text-gray-50 text-sm mb-auto p-2 bg-red-700 rounded ml-auto">
          <Icon name="trash-outline" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
      <View className="p-10 rounded-2xl pb-20">
        <Image source={{uri: image}} className="w-full h-full rounded-2xl" />
        
      </View>
    </View>
  );
};

export default OpenImage;
