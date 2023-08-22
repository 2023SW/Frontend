import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, Alert, TouchableOpacity } from 'react-native'; // Image, Button, Alert, ScrollView 추가
//import { Device } from 'expo-device'; // expo-device 에러 해결
import img from "./assets/cat.png"




const Login = () => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} style={styles.shadowContainer}>
        <View style={styles.rectangle}>
          <View style={styles.textLine}>
            <Text style={styles.whiteText}>눈</Text>
            <Text style={styles.blackText}>치</Text>
          </View>
          <View style={styles.textLine}>
            <Text style={styles.blackText}>게</Text>
            <Text style={styles.whiteText}>임</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Image style={{ width: 382, height: 249 ,position: 'absolute', bottom: 0 }} source={img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEB33F',
    alignItems: 'center',
  },
  shadowContainer: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2, // 그림자의 투명도를 조정
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  rectangle: {
    width:180,
    height:180,
    color: "#000",
    marginTop:150,
    marginBottom: 50,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10, // 사각형 윗변이랑 글씨랑 안 닿게
      
  },
  textLine: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  whiteText: {
    fontSize: 75,
    fontWeight: "700",
    color: "#fff",
  },
  blackText: {
    fontSize: 75,
    fontWeight: "700",
    color: "#000",
  },
  textContainer: {
      width:300,
      height:500,
      backgroundColor:"#fff",
      marginTop:50,
      borderRadius:30,
      justifyContent:"center",
      alignItems:"center"
  },
  desc01: {
      textAlign:"center",
      fontSize:20,
      fontWeight:"700",
      paddingLeft:22,
      paddingRight:22
  },
  desc02: {
      textAlign:"center",
      fontSize:15,
      fontWeight:"700",
      padding:22
  },
  
  img: {
    //width: "382%",
    //height: "249%",

    alignItems:"center",
    justifyContent:"center",

  }
})  
export default Login;