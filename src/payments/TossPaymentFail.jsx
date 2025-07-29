// src/payments/PaymentFail.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFail = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
      borderRadius: '8px',
      margin: '50px auto',
      maxWidth: '500px'
    }}>
      <h2>❌ 결제 실패</h2>
      <p>결제를 처리하는 중 오류가 발생했습니다.</p>
      <p>다시 시도하시거나, 관리자에게 문의해 주세요.</p>
      <button onClick={() => navigate('/')} style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#721c24',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default PaymentFail;
