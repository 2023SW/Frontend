import axios from 'axios';
import convert from 'xml-js'; // XML을 JSON으로 변환하는 라이브러리 사용

const API_URL = 'http://openapi.seoul.go.kr:8088/sample/xml/citydata/1/5/서울';

axios.get(API_URL)
  .then(response => {
    const xmlData = response.data;
    const jsonData = JSON.parse(convert.xml2json(xmlData, { compact: true, spaces: 4 }));
    
    // jsonData에서 인구밀집도 정보 추출
    const densityData = jsonData.root.row.map(item => ({
      latitude: parseFloat(item._attributes.lat),
      longitude: parseFloat(item._attributes.lng),
      density: parseFloat(item._attributes.populationDensity),
    }));

    // 히트맵 생성 및 표시
    setHeatmapData(densityData);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
