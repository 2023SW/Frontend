// import React, {useEffect, useState} from 'react';
// import styled from 'styled-components/native';
// import RegisterCard from '~/components/RegisterCard';
// import AutoCompleteSearch from '~/components/AutoCompleteSearch';
// import SubwayLineTag from '~/components/SubwayLineTag';
// import IconComma from '~/components/IconComma';
// import {TAutocompleteDropdownItem} from 'react-native-autocomplete-dropdown';

// const Text = styled.Text``;
// const RenderItemContainer = styled.View`
//   flex-direction: row;
// `;
// const StyledSubwayLineTag = styled(SubwayLineTag)`
//   justify-content: center;
//   margin-left: 5px;
// `;
// const StyledIconComma = styled(IconComma)`
//   justify-content: center;
// `;

// const initialData = [
//   {
//     id: '1',
//     title: '강남',
//     subwayLine: '2',
//     nextStation: '역삼',
//     favoriteSelected: true,
//   },
//   {
//     id: '2',
//     title: '강남',
//     subwayLine: '2',
//     nextStation: '역삼',
//     favoriteSelected: false,
//   },
//   {
//     id: '3',
//     title: '강남',
//     subwayLine: '2',
//     nextStation: '역삼',
//     favoriteSelected: true,
//   },
//   {
//     id: '4',
//     title: '강남',
//     subwayLine: '2',
//     nextStation: '역삼',
//     favoriteSelected: false,
//   },
//   {
//     id: '5',
//     title: '강남',
//     subwayLine: '2',
//     nextStation: '역삼',
//     favoriteSelected: false,
//   },
//   {
//     id: '6',
//     title: '강남',
//     subwayLine: '2',
//     nextStation: '역삼',
//     favoriteSelected: false,
//   },
//   {
//     id: '7',
//     title: '강남',
//     subwayLine: '2',
//     nextStation: '역삼',
//     favoriteSelected: false,
//   },
//   {
//     id: '8',
//     title: '강남',
//     subwayLine: '2',
//     nextStation: '역삼',
//     favoriteSelected: false,
//   },
// ];

// interface Props {
//   onPress(): void;
//   isSelected: boolean;
// }
// const IconCommaButton = ({onPress, isSelected}: Props) => {
//   return (
//     <StyledIconComma size={'s'} onPress={onPress} strokeOnly={!isSelected} />
//   );
// };

// const Register = () => {
//   const [list, setList] = useState<any[]>(initialData);
//   useEffect(() => {}, [list]);

//   const onPress = (id: string) => {
//     const nextList = list.map(item =>
//       item.id === id
//         ? {...item, favoriteSelected: !item.favoriteSelected}
//         : item,
//     );
//     setList(nextList);
//   };

//   const renderItem = (item: TAutocompleteDropdownItem, text: string) => (
//     <RenderItemContainer>
//       <StyledSubwayLineTag subwayLine={list[Number(item.id) - 1].subwayLine} />
//       <Text style={{color: 'black', padding: 15}}>
//         {item.title} | {list[Number(item.id) - 1].nextStation}방면
//       </Text>
//       <IconCommaButton
//         onPress={() => onPress(item.id)}
//         isSelected={list[Number(item.id) - 1].favoriteSelected}
//       />
//     </RenderItemContainer>
//   );

//   const dataset = [
//     {id: '1', title: '강남역'},
//     {id: '2', title: '강일역'},
//     {id: '3', title: '강동역'},
//     {id: '4', title: '을지로입구역'},
//     {id: '5', title: '을지로3가역'},
//     {id: '6', title: '을지로4가역'},
//     {id: '7', title: '동대문역사문화공원역'},
//     {id: '8', title: '수원역'},
//   ];

//   return (
//     <AutoCompleteSearch
//         dataset={dataset}
//         renderItem={renderItem}
//         placeholder={'검색해주세요'}
//      />
//   );
// };

// export default Register;