const handleRegionSelect = region => {
    // 선택한 지역의 이름 (예: '강남구')
    const selectedRegionName = region.properties.adm_nm;
  
    // RegionData에서 선택한 지역의 데이터를 검색
    const selectedRegionData = RegionData.features.find(
      feature => feature.properties.adm_nm === selectedRegionName
    );
  
    if (selectedRegionData) {
      // 선택한 지역의 경계 데이터 추출
      const regionCoordinates = selectedRegionData.geometry.coordinates[0];
  
      // 추출한 경계 데이터를 저장하거나 활용
      setSelectedRegion(selectedRegionData);
  
      // 지도에 표시할 경계 좌표 데이터 출력
      console.log('Region Coordinates:', regionCoordinates);
    } else {
      console.log('선택한 지역의 데이터를 찾을 수 없습니다.');
    }
  };
  