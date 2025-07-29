// orderId 생성 유틸리티

// 고유한 orderId 생성 (타임스탬프 + 랜덤 문자열)
export const generateOrderId = () => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `order_${timestamp}_${randomStr}`;
};

// 사용자별 orderId 생성
export const generateUserOrderId = (userId) => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `order_${userId}_${timestamp}_${randomStr}`;
};

// 결제용 orderId 생성 (금액 포함)
export const generatePaymentOrderId = (amount, userId = null) => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  const userPrefix = userId ? `${userId}_` : '';
  return `payment_${userPrefix}${amount}_${timestamp}_${randomStr}`;
};

// orderId 유효성 검사
export const isValidOrderId = (orderId) => {
  if (!orderId || typeof orderId !== 'string') return false;
  
  // order_ 또는 payment_로 시작하는지 확인
  const validPrefix = orderId.startsWith('order_') || orderId.startsWith('payment_');
  
  // 타임스탬프와 랜덤 문자열이 포함되어 있는지 확인
  const hasTimestamp = /\d{13,}/.test(orderId);
  const hasRandomStr = /[A-Z0-9]{4,}/.test(orderId);
  
  return validPrefix && hasTimestamp && hasRandomStr;
};

// orderId에서 정보 추출
export const parseOrderId = (orderId) => {
  if (!isValidOrderId(orderId)) return null;
  
  const parts = orderId.split('_');
  const type = parts[0]; // order 또는 payment
  const timestamp = parts[parts.length - 2];
  const randomStr = parts[parts.length - 1];
  
  return {
    type,
    timestamp: parseInt(timestamp),
    randomStr,
    createdAt: new Date(parseInt(timestamp))
  };
}; 