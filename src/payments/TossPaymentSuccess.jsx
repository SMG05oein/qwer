import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../State/LoginState';

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();

  const paymentKey = params.get("paymentKey");
  const orderId = params.get("orderId");
  const amount = params.get("amount");

  const { login } = useContext(LoginContext);
  const accessToken = login?.token || localStorage.getItem("accessToken");

  useEffect(() => {
    const processPayment = async () => {
      if (!paymentKey || !orderId || !amount) {
        console.error("필수 파라미터가 없습니다:", { paymentKey, orderId, amount });
        alert("결제 정보가 올바르지 않습니다.");
        navigate('/');
        return;
      }

      try {
        console.log("결제 승인 시작...");
        console.log("paymentKey:", paymentKey);
        console.log("orderId:", orderId);
        console.log("amount:", amount);
        console.log("accessToken:", accessToken);

        // ✅ 테스트 코드 스타일: 백엔드로 결제 승인 요청
        const requestData = {
          paymentKey,
          orderId,
          amount: Number(amount)
        };
        
        console.log("요청 데이터:", requestData);
        console.log("요청 URL:", "/.netlify/functions/proxyGet?pullAddress=/api/users/me/payments/toss/success");
        
        // ✅ 테스트 코드 스타일: GET 요청으로 변경
        const response = await axios.get(
          `/.netlify/functions/proxyGet?pullAddress=/api/users/me/payments/toss/success`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              paymentKey,
              orderId,
              amount: Number(amount)
            }
          }
        );

        console.log("결제 승인 성공:", response.data);
        alert("포인트 충전이 완료되었습니다!");
        navigate('/'); // 홈으로 이동

      } catch (error) {
        console.error("결제 승인 실패:", error);
        console.error("에러 상태:", error.response?.status);
        console.error("에러 데이터:", error.response?.data);
        console.error("에러 메시지:", error.message);
        
        if (error.response?.status === 401) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate('/profile');
        } else if (error.response?.status === 403) {
          alert("권한이 없습니다. 다시 로그인해주세요.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate('/profile');
        } else if (error.response?.status === 500) {
          alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          navigate('/payment-fail');
        } else {
          alert(`결제 승인 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
          navigate('/payment-fail');
        }
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [paymentKey, orderId, amount, accessToken, navigate]);

  if (isProcessing) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h3>결제 승인 처리 중...</h3>
        <p>잠시만 기다려주세요.</p>
      </div>
    );
  }

  return null;
};

export default PaymentSuccess;
