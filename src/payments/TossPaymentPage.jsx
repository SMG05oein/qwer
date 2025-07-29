// src/payments/TossPaymentPage.jsx
import React, { useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../State/LoginState';

const TossPaymentPage = () => {
  const { login } = useContext(LoginContext);

  const handlePayment = async () => {
    try {
      // ✅ 1단계: 결제 준비 API 호출
      const prepareRes = await axios.post(
        '/.netlify/functions/proxyPost?pullAddress=/api/users/me/payments/toss/prepare',
        { amount: 10000 },
        {
          headers: {
            Authorization: `Bearer ${login?.token || localStorage.getItem('accessToken')}`,
          },
        }
      );

      const { orderId, orderName, amount, customerName } = prepareRes.data;

      // ✅ 2단계: Toss 위젯 결제 요청
      const tossPayments = window.TossPayments(process.env.REACT_APP_TOSS_CLIENT_KEY);

      tossPayments.requestPayment('카드', {
        amount,
        orderId,
        orderName,
        customerName,
        successUrl: `${window.location.origin}/charge?paymentKey=__PAYMENT_KEY__&orderId=${orderId}&amount=${amount}`,
        failUrl: `${window.location.origin}/payment-fail`,
      });
    } catch (error) {
      console.error('결제 준비 실패:', error.response?.data || error.message);
      alert('결제 준비에 실패했습니다.');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h3>포인트 결제</h3>
      <button onClick={handlePayment}>10,000원 충전하기</button>
    </div>
  );
};

export default TossPaymentPage;
