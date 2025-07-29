// src/components/qrpay/QrPayPage.jsx
import React, { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../../State/LoginState';

const QrPayPage = () => {
  const { login } = useContext(LoginContext);
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const storeId = searchParams.get('storeId'); // 예: 11223

  const handleSubmit = async () => {
    const payload = {
      storeQrId: `PAYSTORE_${storeId}`,
      amount: parseInt(amount),
    };

    console.log('🔍 요청 보낼 데이터:', payload);
    console.log('🔐 토큰:', login?.token);
    console.log("🟡 로그인 상태:", login);
    console.log("🟡 토큰:", login.token || localStorage.getItem("accessToken"));

    try {
      setLoading(true);

      const response = await axios.post(
        `/.netlify/functions/proxyPost?pullAddress=/api/users/me/payments`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${login?.token || localStorage.getItem("accessToken")}`,
          },
        }
      );

      setResult(`✅ 결제 성공: ${response.data.message}`);
    } catch (err) {
      console.error('❌ 결제 실패:', err.response?.data || err.message);
      setResult(`❌ 결제 실패: 서버 내부 오류가 발생했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>QR 결제</h2>

      <p>가맹점 ID: <strong>{storeId}</strong></p>

      <input
        type="number"
        placeholder="결제할 금액 입력"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: '20px',
          padding: '10px',
          width: '100%',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        {loading ? '처리 중...' : '결제하기'}
      </button>

      {result && (
        <div style={{ marginTop: '20px', color: result.includes('✅') ? 'green' : 'red' }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default QrPayPage;
