import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";
import GeojsonFile from './Region.json';
import { useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polygon, Circle } from 'react-native-maps';
import StarPage from "./StarPage";

const ShowMap = ({ route }) => {
    // route에서 필요한 정보를 가져옵니다.
    const { title } = route.params;
    const { state } = route.params;
  
    // 여기에 해당 장소의 지도를 표시하는 로직을 추가합니다.
    // 예: 구글 지도 API를 사용하여 해당 장소의 지도를 표시합니다.
    const congestionData = [
        { latitude: 37.52966812, longitude: 126.9645126, congestion: 1.0 }, // 예시 데이터, 실제 데이터로 대체
        // ... 다른 좌표 데이터 추가
    ];

    const congestionColorMapping = congestion => {
        // 가중치에 따른 색상 매핑 로직
        // 예시로 가중치 0.0부터 1.0까지에 대한 색상 매핑
        const hue = (1 - congestion) * 120; // 0.0일 때 파란색, 1.0일 때 빨간색
        return `hsl(${hue}, 100%, 50%)`;
    };

    const maxRadius = 0.05;


    const centerLatitude = 37.52966812;
    const centerLongitude = 126.9645126;

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

    const generatePolygon = (centerLat, centerLng, radius) => {
        const polygonCoordinates = [];
        const numSides = 30; // Adjust number of sides
        const step = (2 * Math.PI) / numSides;
        const maxOpacity = 0.5; // Max fill opacity
    
        for (let i = 0; i < numSides; i++) {
          const angle = i * step;
          const lat = centerLat + radius * Math.cos(angle);
          const lng = centerLng + radius * Math.sin(angle);
          const opacity = 1 - (i / numSides) * maxOpacity; // Calculate opacity based on distance
          polygonCoordinates.push({ latitude: lat, longitude: lng });
        }
    
        return polygonCoordinates;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}의 혼잡도              {state}</Text>
                {/* <Text style={styles.info}>{title}    {state}</Text> */}
            </View>
            <View style={styles.mapContainer}>
            

                <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: centerLatitude,
                    longitude: centerLongitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                }}
            >
        
        <Marker
            coordinate={{
                latitude: centerLatitude, // 내가 미리 선언한 위도 값
                longitude: centerLongitude, // 내가 미리 선언한 경도 값
            }}
        />

        <Polygon
            coordinates={generatePolygon(centerLatitude, centerLongitude, 0.003)}
            fillColor="rgba(0, 50, 255, 0.6)" // Adjust fill color
        />
        <Polygon
            coordinates={generatePolygon(centerLatitude, centerLongitude, 0.0019)}
            fillColor="rgba(0, 0, 255, 0.6)" // Adjust fill color
        />
        

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