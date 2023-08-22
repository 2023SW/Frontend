import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";
import GeojsonFile from './Region.json';
import { useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import StarPage from "./page/Star";

const ShowMap = ({ route }) => {
    // route에서 필요한 정보를 가져옵니다.
    const { title } = route.params;
    const { state } = route.params;
  
    // 여기에 해당 장소의 지도를 표시하는 로직을 추가합니다.
    // 예: 구글 지도 API를 사용하여 해당 장소의 지도를 표시합니다.
    const latitude = 37.573; // 원하는 위도 값으로 변경
    const longitude = 126.977; // 원하는 경도 값으로 변경


    const congestionColorMapping = congestion => {
        switch (congestion) {
            case '매우 혼잡':
                return 'red';
            case '보통':
                return 'yellow';
            case '한산':
                return 'green';
            default:
                return 'blue';
        }
    };

    useEffect(() => {
        // 백엔드 API로부터 혼잡도 데이터를 가져옴
        fetch('http://your-backend-url/congestion') // 백엔드의 URL로 변경해주세요
            .then(response => response.json())
            .then(data => {
                setCongestionData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}의 혼잡도</Text>
                {/* <Text style={styles.info}>{title}    {state}</Text> */}
            </View>
            <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE} // 구글 지도 사용 설정
                region={{
                latitude,
                longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
                }}
            >
                    {/* 각 지역의 다각형 경계 표시
                    {GeojsonFile.features.map((feature, index) => (
                        <Polygon
                            key={index}
                            coordinates={feature.geometry.coordinates[0][0].map(coords => ({ latitude: coords[1], longitude: coords[0] }))}
                            fillColor={congestionColorMapping(state)} // 혼잡도에 따른 색상 적용
                            strokeColor={congestionColorMapping(state)}
                        />
                    ))} */}
                </MapView>
            </View>
        </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      textContainer: {
        paddingHorizontal: 25,
        paddingTop: 20,
        backgroundColor: 'white',
      },
      title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#E9A011",
        marginBottom: 15,
      },
      info: {
        fontSize: 30,
        fontWeight: "500",
        marginBottom: 5,
      },
      mapContainer: {
        flex: 1,
      },
    map: {
        ...StyleSheet.absoluteFillObject, // Take up the entire screen
    },
  })

  export default ShowMap;