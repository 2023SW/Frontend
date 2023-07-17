import React from 'react'; // 리액트 라이브러리 추가
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Button, Alert, TouchableOpacity } from 'react-native'; // Image, Button, Alert, ScrollView 추가
//import { Device } from 'expo-device'; // expo-device 에러 해결

export default function App() {
  const aboutImage = "https://velog.io/@4775614/React-Native-VSCode%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4-%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0"
  

  return (
    <View style={styles.container}>
            <Text style={styles.title1}>눈치</Text>
            <Text style={styles.title2}>게임</Text>
            <View style={styles.rectangle} />
            <View style={styles.textContainer}>
                <Image style={styles.aboutImage} source={{uri:aboutImage}} resizeMode={"cover"}/>
                <Text style={styles.desc01}>로그인</Text>
                <Text style={styles.desc02}>아이디</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>구글 계정</Text>
                </TouchableOpacity>
            </View>
        </View>
  );
}



const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor:"#EEB33F",
      alignItems:"center"
  },
  title1: {
      fontSize:79,
      fontWeight:"700",
      color:"#fff",
      paddingLeft:30,
      paddingTop:100,
      paddingRight:30
  },
  title2: {
    fontSize:79,
    fontWeight:"700",
    color:"#fff",
    paddingLeft:30,
    paddingTop:5,
    paddingRight:30
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
  rectangle: {
      width:176,
      height:165,
      color: "#000",
      borderWidth: 4
  },
  aboutImage: {
      width:150,
      height:150,
      borderRadius:30
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
  button: {
      backgroundColor:"orange",
      padding:20,
      borderRadius:15
  },
  buttonText: {
      color:"#fff",
      fontSize:15,
      fontWeight:"700"
  }
}) 