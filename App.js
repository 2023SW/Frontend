import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, Alert, TouchableOpacity } from 'react-native'; // Image, Button, Alert, ScrollView 추가
//import { Device } from 'expo-device'; // expo-device 에러 해결
import img from "./assets/cat.png"
//import Icon from 'react-native-vector-icons/FontAwesome';
//import * as GoogleSignIn from 'expo-google-sign-in';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();
// web:745655240240-9if2m6beejitoj7bue5smqte2hdbhghs.apps.googleusercontent.com
// IOS: 745655240240-b8lhqnq4r4nf49ja96a6mmtsknlu6fhr.apps.googleusercontent.com
// android: 745655240240-msgrihanskoamjbes1vnf85i1rf3h9l1.apps.googleusercontent.com
export default function App() {
    const [accessToken, setAccesToken] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '745655240240-9if2m6beejitoj7bue5smqte2hdbhghs.apps.googleusercontent.com',
        iosClientId: '745655240240-b8lhqnq4r4nf49ja96a6mmtsknlu6fhr.apps.googleusercontent.com',
        androidClientId: '745655240240-msgrihanskoamjbes1vnf85i1rf3h9l1.apps.googleusercontent.com'
      });
    
    React.useEffect(() => {
        if (response?.type === 'success') {
          setAccessToken(response.authentication.accessToken);
          accessToken && fetchUserInfo();
        }
    }, [response, accessToken])
    
    async function fetchUserInfo(){
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: 'Bearer ${accessToken}' }
        });
        const userInfo = await response.json();
        setUser(useInfo);
        
    }
    
    const ShowUserInfo = () => {
        if (user) {
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {/* <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Welome</Text> */}
                <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}} />
                {/* <Text style={{fontSize: 35, fontWeight: 'bold'}}>(user.name)</Text> */}
            </View>
        }
    }

    return (
        <View style={styles.container}>
                {/* <Text style={styles.title1}>눈치</Text>
                <Text style={styles.title2}>게임</Text> */}
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
                
                {user && <ShowUserInfo />}
                {user === null &&
                        <>
                        {/* <Text style={{fontSize: 35, fontWeight: 'bold'}}>Welome</Text>
                        <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20, color: 'gray'}}>Please login</Text> */}
                    <TouchableOpacity
                        disabled={!request}
                        onPress={() => {
                            promptAsync();
                        }}
                    >
                        <Image source={require("./btn.jpg")} style={{width: 260, height: 40, marginBottom: 175, borderRadius: 1}} />
                    </TouchableOpacity>
                    </>
                }  
                
                <Image  
                style={{width: 382, height: 249}}
                source={img}
                />
            </View>
  );
}



const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor:"#EEB33F",
      alignItems:"center"
  },
  shadowContainer: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3, // 그림자의 투명도를 조정
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
  button: {
      backgroundColor:"orange",
      padding:20,
      borderRadius:15
  },
  buttonText: {
      color:"#fff",
      fontSize:15,
      fontWeight:"700"
  },
  img: {
    //width: "382%",
    //height: "249%",

    alignItems:"center",
    justifyContent:"center",

  }
})  