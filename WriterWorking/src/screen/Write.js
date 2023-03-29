import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputField from '../components/InputField';
import Icon from 'react-native-vector-icons/Ionicons';
import {addDoc, doc, getDoc, serverTimestamp, setDoc} from 'firebase/firestore';
import {db} from '../../firebase';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import Lottie from 'lottie-react-native';

function generateUid() {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uid = '';
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    uid += chars[randomIndex];
  }
  return uid;
}

NfcManager.start();

const Write = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [writing, setWriting] = useState(false);
  async function writeNdef() {
    setSearching(true);
    let result = false;

    try {
      // STEP 1
      await NfcManager.requestTechnology(NfcTech.Ndef);
      setWriting(true);
      const uid = generateUid();
      const bytes = Ndef.encodeMessage([Ndef.textRecord(email)]);

      if (bytes) {
        await NfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
        result = true;
        if (result) {
          const doc1 = doc(db, 'tag', email);
          await setDoc(doc1, {
            productId: email,
            activated: false,
            time: serverTimestamp(),
          });
          navigation.navigate('Gallery');
          setWriting(false);
          setSearching(false);
        }
      }
    } catch (ex) {
      console.warn(ex);
      NfcManager.cancelTechnologyRequest();
    } finally {
      // STEP 4
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-800 p-5">
      {searching ? (
        <>
          <Lottie source={require('../assets/scan.json')} autoPlay loop />
          <View className="mx-auto my-auto">
            {writing ? (
              <Text className=" font-bold text-2xl text-black text-center">
                Writing
              </Text>
            ) : (
              <Text className=" font-bold text-2xl text-black text-center">
                Searching
              </Text>
            )}
          </View>
        </>
      ) : (
        <>
          <View className="mt-20 mx-auto">
            <Icon name="cube-outline" color={'#fff'} size={100} />
          </View>
          <View className="mt-10">
            <Text className="text-white text-center text-5xl font-bold mb-10">
              Write To NFC
            </Text>
            <View className="flex flex-col space-y-5">
              <View>
                <InputField label={'Product Id'} setState={setEmail} />
              </View>

              <View className="">
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (email != "") {
                      writeNdef();
                    }
                  }}
                  className="bg-white rounded-xl p-4 mt-10">
                  <Text className="text-slate-800 text-center">
                    Write To NFC
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Write;
