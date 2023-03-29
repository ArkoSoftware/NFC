import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {auth, db, storage} from '../../firebase';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid } from 'react-native';

const UploadGroup = ({navigation,route}) => {
  console.log(route.params)
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: true,
      includeExif: true,
      includeBase64: true,
      maxFiles: 5,
    });
    const arr = [];
    for (let i = 0; i < result.length; i++) {
      arr.push(result[i].path);
    }
    setImage(arr);
  };
  const uploadFile = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < image.length; i++) {
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uid += characters[randomIndex];
      }

      const imageRef = ref(storage, 'image/' + uid);
      fetch(image[i])
        .then(response => response.blob())
        .then(blob => {
          const uploadTask = uploadBytesResumable(imageRef, blob);

          uploadTask.on('state_changed', snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          });

          uploadTask.then(() => {
            getDownloadURL(imageRef).then(async downloadURL => {
              const col1 = collection(
                db,
                'groupImage',
                route.params.groupData,
                'record',
              );
              const snap = await addDoc(col1, {
                image: downloadURL,
                time: serverTimestamp(),
                user:auth.currentUser.uid
              });
              navigation.goBack()
            });
          });
        });
    }
  };

  return (
    <View className="flex-1 bg-slate-800">
      <View className="flex flex-row mt-4 px-3 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl my-auto mx-auto">Gallery</Text>
      </View>
      <Text className="text-white text-4xl mb-8 mx-auto mt-28">
        {route.params.groupName}
      </Text>
      <View className="mt-20 mx-auto">
        <View>
          {image == null ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => pickImage()}
              className=" bg-white rounded-full w-20 h-20 mx-auto">
              <Icon
                name="cloud-upload-outline"
                color="#2f2f2f"
                size={28}
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              />
            </TouchableOpacity>
          ) : (
            <View
              className="flex flex-row mx-auto"
              style={{
                position: 'relative',
                left: 30,
              }}>
              {image.map((d1, index) => (
                <Image
                  source={{uri: d1}}
                  className="w-20 h-20 rounded-full border-2 border-black"
                  style={{
                    position: 'relative',
                    zIndex: -index,
                    left: -index * 30,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 2,
                    backgroundColor: '#fff',
                    padding: 16,
                    borderRadius: 8,
                  }}
                />
              ))}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => pickImage()}
                className=" bg-white rounded-full w-20 h-20"
                style={{
                  position: 'relative',
                  zIndex: -image.length,
                  left: -image.length * 30,
                }}>
                <Icon
                  name="cloud-upload-outline"
                  color="#2f2f2f"
                  size={28}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => uploadFile()}
        className="p-4 m-4 mb-10 w-1/3 bg-white rounded-full flex flex-row mx-auto mt-20">
        <View className="mx-auto flex flex-row">
          <Icon
            name="cloud-upload-outline"
            color="#2f2f2f"
            size={20}
            style={{
              marginLeft: 'auto',
              marginRight: 10,
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
          <Text className="text-slate-800 text-center font-bold my-auto">
            Upload
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UploadGroup;
