import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";


const ShowMap = ({ route }) => {
    // route에서 필요한 정보를 가져옵니다.
    const { title } = route.params;
    const { state } = route.params;
  
    // 여기에 해당 장소의 지도를 표시하는 로직을 추가합니다.
    // 예: 구글 지도 API를 사용하여 해당 장소의 지도를 표시합니다.
  
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{ paddingLeft: 25, fontSize: 30, fontWeight: "700", color: "#E9A011", marginBottom: 30, }}>{title}의 혼잡도</Text>
                <Text style={{ paddingLeft: 25, fontSize: 30, fontWeight: "500", marginBottom: 30,}}>{title}                     {state} </Text>
                {/* 지도를 표시하는 컴포넌트를 추가합니다. */}
            </View>
        </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
      },
  })

  export default ShowMap;