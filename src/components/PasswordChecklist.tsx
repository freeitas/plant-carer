import React from "react";
import { StyleSheet, View, Text } from "react-native";

const PasswordChecklist = (props: { data: any }) => {
  const { data } = props;
  const label = data[0];
  const meetsReq = data[1];

  const setClass = () => {
    const classArr = ["must-line"];
    if (meetsReq) classArr.push("cross-out");
    return classArr.join(" ");
  };

  return (
    <View>
      <Text>{label}</Text>
    </View>
  );
};

export default PasswordChecklist;


const styles = StyleSheet.create({
  circle: {
    color: "#ff0000",
  },
});
