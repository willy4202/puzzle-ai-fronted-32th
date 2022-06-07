import React from 'react';
import styled from 'styled-components/native';

function DoctorCard() {
  return (
    <Card>
      <DoctorImg></DoctorImg>
      <DoctorInfoWrapper>
        <DoctorName>홍정의 선생님</DoctorName>
        <CategoryInfo>
          <Category>피부과 전문의</Category>
          <Hospital>퍼즐AI병원</Hospital>
        </CategoryInfo>
      </DoctorInfoWrapper>
    </Card>
  );
}

export default DoctorCard;

const Card = styled.View`
  flex-direction: row;
  height: 75px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.REZListBorder};
`;

const DoctorImg = styled.View`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 25px;
  background-color: aliceblue;
`;

const DoctorInfoWrapper = styled.View``;

const DoctorName = styled.Text`
  margin-bottom: 5px;
  color: ${({theme}) => theme.CardDoc};
  font-size: ${({theme}) => theme.fontMedium};
  line-height: 22.2px;
`;

const CategoryInfo = styled.View`
  flex-direction: row;
`;

const Category = styled.Text`
  margin-right: 8px;
  color: ${({theme}) => theme.CardDoc};
  font-size: ${({theme}) => theme.fontSmall};
  line-height: 19.24px;
`;

const Hospital = styled(Category)`
  margin-right: 0px;
  color: ${({theme}) => theme.CardHospital};
`;
