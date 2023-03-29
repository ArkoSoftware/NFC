import { View, Text, TextInput } from "react-native";
import React from "react";

const InputField = ({ label, setState, error = false, max = 30 }) => {
  return (
    <>
      {!error ? (
        <View className="flex flex-col">
          <Text
            className="font-light m-1 mx-3 tracking-tighter text-gray-200"
            style={{ fontSize: 12 }}
          >
            {label}
          </Text>
          <TextInput
            maxLength={max}
            onChangeText={(txt) => setState(txt)}
            placeholder={label}
            placeholderTextColor={"#9f9f9f"}
            style={{ fontSize: 14 }}
            className="p-3 border border-gray-300 rounded-lg mx-1 px-4 text-gray-100"
          />
        </View>
      ) : (
        <View className="flex flex-col ">
          <Text
            className="font-bold m-1 mx-3 tracking-tighter text-gray-50"
            style={{ fontSize: 12 }}
          >
            {label}
          </Text>
          <TextInput
            maxLength={max}
            onChangeText={(txt) => setState(txt)}
            placeholder={label}
            placeholderTextColor={"#9f9f9f"}
            style={{ fontSize: 14 }}
            className="p-2 border border-red-300 bg-red-50 rounded-lg mx-1 px-4 text-gray-100"
          />
        </View>
      )}
    </>
  );
};

export default InputField;
