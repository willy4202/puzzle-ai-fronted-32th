import React from 'react';
import styled from 'styled-components/native';
import {InitialDocListProp} from '~/src/types/type';

function DoctorCard({docData}: {docData: InitialDocListProp}) {
  return (
    <Card>
      <DoctorImg source={{uri: docData.profile_image}}></DoctorImg>
      <DoctorInfoWrapper>
        <DoctorName>{docData.name} 선생님</DoctorName>
        <CategoryInfo>
          <Category>{docData.subject} 전문의</Category>
          <Hospital>{docData.hospital}</Hospital>
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

const DoctorImg = styled.Image`
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
