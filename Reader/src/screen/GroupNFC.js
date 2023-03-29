import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {auth, db} from '../../firebase';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
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

NfcManager.start();

const Scanner = ({navigation}) => {
  const [searching, setSearching] = useState(false);
  const [tag, setTag] = useState(null);
  
  const authenticate = async text => {
    if (auth.currentUser) {
      if (auth.currentUser.emailVerified) {
        const doc1 = doc(db, 'tag', text);
        const snap = await getDoc(doc1);
        navigation.navigate('GroupList',{user:snap.data().user});
      }
    } else {
      navigation.navigate('Signup');
    }
  };
  async function readNdef() {
    try {
      setSearching(true);
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      let text = tag?.ndefMessage[0].payload.reduce(
        (acc, byte) => acc + String.fromCharCode(byte),
        '',
      );
      text = text.substring(3);
      setTag(text);
      authenticate(text);
      setSearching(false);
    } catch (ex) {
      console.log(ex);
      NfcManager.cancelTechnologyRequest();

      setSearching(false);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <View className="flex flex-row mt-4 px-3 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" color="#cfcfcf" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl my-auto mx-auto font-bold">
          Join Group
        </Text>
      </View>

      <View className="my-auto mx-auto h-full w-full">
        {searching ? (
          <>
            <Lottie source={require('../assets/scan.json')} autoPlay loop />
            <Text className=" font-bold text-2xl text-black text-center my-auto mx-auto">
              Searching
            </Text>
          </>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => readNdef()}
            className="mx-auto my-auto">
            <Icon name="scan-circle-outline" color={'#fff'} size={140} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Scanner;
