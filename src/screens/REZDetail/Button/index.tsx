import {View} from 'react-native';
import styled from 'styled-components/native';
import React, {useContext} from 'react';
import {getToken} from '~/src/AuthContext';
import {config} from '~/src/config';
import {DocInfoContext} from '~/src/ReservationContext';

interface ButtonProps {
  status: string;
  setDetailData: () => void;
  goBackCalender: () => void;
}

const Button = ({status, setDetailData, goBackCalender}: ButtonProps) => {
  const {docInfo} = useContext(DocInfoContext);

  const cancelReservation = async () => {
    fetch(`${config.detail}?res_id=${docInfo.reservation_id}&work=cancel`, {
      method: 'PATCH',
      headers: {
        Authorization: await getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(docInfo.reservation_id),
    })
      .then(response => response.json())
      .then(data => {
        console.log('성공:', data);
      })
      .catch(error => {
        console.error('실패:', error);
      });
    setDetailData(prev => ({...prev, status: '진료취소'}));
  };

  return (
    <BtnWrapper>
      {status !== '진료취소' && (
        <>
          <ConfirmBtn onPress={goBackCalender}>
            <View>
              <BtnText>
                {status === '진료대기'
                  ? '예약 변경하기'
                  : status === '진료완료'
                  ? '다시 예약하기'
                  : null}
              </BtnText>
            </View>
          </ConfirmBtn>
          <ModifyBtn onPress={() => cancelReservation()}>
            <BtnText>예약 취소</BtnText>
          </ModifyBtn>
        </>
      )}
    </BtnWrapper>
  );
};

export default Button;

const BtnWrapper = styled.View`
  flex: 1;
  margin: 0 18px 30px 18px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: white;
  font-size: ${({theme}) => theme.fontMedium};
`;

const ConfirmBtn = styled.TouchableOpacity`
  width: 60%;
  height: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({theme}) => theme.primary};
`;

const ModifyBtn = styled.TouchableOpacity`
  width: 37%;
  height: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({theme}) => theme.REZSubmitFont};
`;
