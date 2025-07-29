// TossPaymentCharge.jsx
import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../State/LoginState';

const TossPaymentCharge = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (!paymentKey || !orderId || !amount) {
      alert("결제 정보가 부족합니다.");
      navigate('/payment-fail');
      return;
    }

    const accessToken =
      login?.token || localStorage.getItem('accessToken');

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }

    // ✅ Toss 결제 승인 처리 (테스트 코드 스타일)
    const approvePayment = async () => {
      try {
        console.log('결제 승인 시작...');
        console.log('paymentKey:', paymentKey);
        console.log('orderId:', orderId);
        console.log('amount:', amount);

        const res = await axios.post(
          `/.netlify/functions/proxyPost?pullAddress=/api/users/me/payments/toss/success`,
          {
            paymentKey,
            orderId,
            amount,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('결제 승인 성공:', res.data);
        alert('포인트 충전이 완료되었습니다!');
        navigate('/'); // 홈으로 이동
      } catch (err) {
        console.error('결제 승인 실패:', err.response?.data || err);
        alert('결제 승인 중 오류가 발생했습니다.');
        navigate('/payment-fail');
      }
    };

    approvePayment();
  }, [searchParams, login, navigate]);

  return <div>결제 승인 중입니다...</div>;
};

export default TossPaymentCharge;
