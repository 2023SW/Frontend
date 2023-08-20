import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const HybridRecommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    // 백엔드 API 호출하여 사용자의 즐겨찾기 정보 받아오기
    const fetchUserFavorites = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/user/favorites/user123');
        const data = await response.json();
        setUserFavorites(data.favorites);
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };

    fetchUserFavorites();
  }, []);

  useEffect(() => {
    // 백엔드 API 호출하여 콘텐츠 기반 추천 장소 정보 받아오기
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/recommendations/content-based/user123');
        const data = await response.json();
        const contentBasedRecommendations = data.recommendations;

        // 장소들의 카테고리 유사도 계산
        const calculateCategorySimilarity = (placeA, placeB) => {
          const categoriesA = placeA.categories;
          const categoriesB = placeB.categories;
          const intersection = categoriesA.filter(category => categoriesB.includes(category));
          const similarity = intersection.length / Math.sqrt(categoriesA.length * categoriesB.length);
          return similarity;
        };

        // 카테고리 유사도를 기반으로 정렬
        contentBasedRecommendations.sort((placeA, placeB) => {
          const similarityA = calculateCategorySimilarity(placeA, placeB);
          const similarityB = calculateCategorySimilarity(placeB, placeA);
          return similarityB - similarityA; // 내림차순으로 정렬
        });

        // 상위 5개의 콘텐츠 기반 추천 장소
        const top5ContentBasedRecommendations = contentBasedRecommendations.slice(0, 5);

        // 즐겨찾기된 장소가 5개 이상인 경우 협업 필터링 활용하여 추천
        if (userFavorites.length >= 5) {
          const collaborativeResponse = await fetch('https://your-backend-api.com/recommendations/collaborative/user123');
          const collaborativeData = await collaborativeResponse.json();
          const collaborativeRecommendations = collaborativeData.recommendations;

          // 협업 필터링 결과와 콘텐츠 기반 결과를 조합하여 최종 추천 목록 생성
          const combinedRecommendations = [...top5ContentBasedRecommendations, ...collaborativeRecommendations];
          setRecommendations(combinedRecommendations);
        } else {
          // 즐겨찾기가 5개 미만이면 콘텐츠 기반 추천만 활용
          setRecommendations(top5ContentBasedRecommendations);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [userFavorites]);

  return (
    <View>
      <Text>Recommended Places:</Text>
      {recommendations.map(place => (
        <View key={place.id}>
          <Text>{place.name}</Text>
          <Text>Category: {place.category}</Text>
        </View>
      ))}
    </View>
  );
};

export default HybridRecommendation;
