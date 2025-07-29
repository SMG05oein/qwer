import React, { useEffect, useContext, useState } from 'react';
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./HomePage.style.css"
import { FaCreditCard, FaPlus, FaWonSign } from "react-icons/fa";
import { LoginContext } from "../../State/LoginState";
import axios from 'axios';

// ✅ 프론트엔드에서 고유 주문 ID를 생성하는 함수 (테스트 코드 스타일)
const generateOrderId = () => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 10);
  return `charge_${timestamp}_${randomString}`;
};


const TOSS_CLIENT_KEY = process.env.REACT_APP_TOSS_CLIENT_KEY;

const HomePage = () => {
  const [seeMoney, setSeeMoney] = useState(true);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const { login } = useContext(LoginContext);
  const [visibleCount, setVisibleCount] = useState(3);
  const location = useLocation(); // ✅ useEffect 위쪽에 선언


  useEffect(() => {
    if (login?.isLogin && login?.token) {
      // 잔액 조회
      axios.get(`/.netlify/functions/proxyGet?pullAddress=/api/users/me/balance`, {
        headers: {
          Authorization: `Bearer ${login?.token || localStorage.getItem("accessToken")}`,
        }
      })
      .then(res => setBalance(res.data.balance))
      .catch(err => {
        console.error("잔액 불러오기 실패:", err);
        setBalance(null);
      });

      // 이용내역 조회
      axios.get(`/.netlify/functions/proxyGet?pullAddress=/api/users/me/transactions`, {
        headers: {
          Authorization: `Bearer ${login?.token || localStorage.getItem("accessToken")}`,
        }
      })
      .then(res => {
        const raw = res.data?.data || [];
        const formatted = raw.map(tx => ({
          ptId: tx.ptId,
          type: tx.type === "CHARGE" ? "충전" : tx.type === "PAYMENT" ? "지출" : "기타",
          amount: Math.abs(tx.amount),
          place: tx.paystoreId ? `가맹점 #${tx.paystoreId}` : "시스템",
          date: tx.createdAt.split('T')[0],
          originalType: tx.type
        }));
        setTransactions(formatted);
      })
      .catch(err => {
        console.error("이용내역 불러오기 실패:", err);
        setTransactions([]);
      });
    }
  }, [login]);

  const handleCancel = (ptId) => {
    if (!window.confirm("이 결제를 취소하시겠습니까?")) return;

    axios.post(`/.netlify/functions/proxyPost?pullAddress=/api/users/me/payments/${ptId}/cancel`,
      JSON.stringify({ ptId }), {
        headers: {
          Authorization: `Bearer ${login?.token || localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json"
        }
      })
    .then(res => {
      alert("✅ 결제 취소 완료!");
      // 취소된 항목 제거 (또는 새로고침)
      setTransactions(prev => prev.filter(tx => tx.ptId !== ptId));
    })
    .catch(err => {
      console.error("❌ 결제 취소 실패:", err);
      alert("⚠️ 취소 실패: 이미 취소되었거나 24시간이 지났을 수 있습니다.");
    });
  };

  const handlePayment = async () => {
    if (!window.TossPayments) {
      alert("TossPayments SDK가 로드되지 않았습니다.");
      return;
    }

    // 로그인 상태 확인
    if (!login?.isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const amount = 5000;
      // ✅ 테스트 코드 스타일: 클라이언트에서 orderId를 먼저 생성
      const orderId = generateOrderId();
      const accessToken = login?.token || localStorage.getItem("accessToken");

      console.log("결제 준비 시작...");
      console.log("생성된 orderId:", orderId);
      console.log("토큰:", accessToken);

      // ✅ 테스트 코드 스타일: 생성한 orderId와 amount를 서버로 전송
      const response = await axios.post(
        "/.netlify/functions/proxyPost?pullAddress=/api/users/me/payments/toss/prepare",
        {
          orderId: orderId,
          amount: Number(amount)
        },
        { 
          headers: { 
            "Authorization": `Bearer ${accessToken}`, 
            "Content-Type": "application/json" 
          } 
        }
      );

      console.log("결제 준비 응답:", response.data);
      const { amount: responseAmount, customerName } = response.data;

      // ✅ 테스트 코드 스타일: 토스페이먼츠 결제창 호출
      const tossPayments = window.TossPayments(TOSS_CLIENT_KEY);
      
      await tossPayments.requestPayment('카드', {
        amount: Number(responseAmount),
        orderId: orderId, // ✅ 클라이언트에서 생성한 orderId 사용
        orderName: "포인트 충전",
        customerName: customerName || "테스트 사용자",
        successUrl: `${window.location.origin}/payment-success`, // ✅ 프론트엔드 성공 페이지로 변경
        failUrl: `${window.location.origin}/payment-fail`,
      });

    } catch (error) {
      console.error("결제 준비 실패:", error);
      console.error("에러 상태:", error.response?.status);
      console.error("에러 데이터:", error.response?.data);
      
      if (error.response?.status === 401) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/profile";
      } else if (error.response?.status === 403) {
        alert("권한이 없습니다. 다시 로그인해주세요.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/profile";
      } else {
        alert(`결제 준비 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const showMore = () => setVisibleCount(prev => Math.min(prev + 3, transactions.length));
  const showAll = () => setVisibleCount(transactions.length);
  const resetView = () => setVisibleCount(3);

  return (
  <div className="HomePage">
    <Container>

      {/* 배너 영역 */}
      <Row>
        <div className="Banner">
          <Col xs={8}>
            <span>사용이 처음이신가요?</span>
          </Col>
          <Col xs={4}>
            <div onClick={() => alert("가이드 웹사이트로 이동")} className="GuideBox">
              가이드 <br />보러가기
            </div>
          </Col>
        </div>
      </Row>

      {/* 로그인 여부 분기 */}
      {!login?.isLogin ? (
        <Row className="NotFlex">
          <div className="HomeBox">
            <Row>
              <Col>
                <div className="fs-4 text-center">아직 로그인 전입니다</div>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <div>계정이 있으신가요? </div>
                <Link to="/profile">로그인</Link>
              </Col>
              <Col className="text-center">
                <div>계정이 없으신가요? </div>
                <Link to="/signUp">회원가입</Link>
              </Col>
            </Row>
          </div>
        </Row>
      ) : (
        <>
          {/* 카드 정보 박스 */}
          <Row className="NotFlex">
            <div className="HomeCardBanner">
              <Row className="align-items-center">
                <Col xs={5} className="text-center">
                  <Image height="140px" src="CheonanLoveCard.png" alt="천안사랑카드" />
                </Col>
                <Col xs={7}>
                  <div className="MyCheonanCard">나의 천안 사랑카드</div>
                  <div className="CardInfo">
                    <div className="Money">
                      {seeMoney
                        ? balance !== null
                          ? `${Number(balance).toLocaleString()}원`
                          : "불러오는 중..."
                        : "숨김"}
                    </div>
                    <div className="MoreBtn" onClick={() => setSeeMoney(!seeMoney)}>
                      <FaPlus /> 잔액 보기
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="g-0">
                <Col className="p-0">
                  <div className="rounded-box left-rounded">
                    <Link to="/card" className="text-center w-100">💳 카드관리</Link>
                  </div>
                </Col>
                <Col className="p-0">
                  <div className="rounded-box right-rounded">
                    <button onClick={handlePayment} className="bg-transparent border-0 w-100">💰 충전</button>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>

          {/* 이용내역 표 형식 */}
          <Row className="NotFlex">
            <div className="HomeBox">
                <Row>
                <Col><div className="fs-5">이용내역</div></Col>
                </Row>
                <Row>
                <Table className="ModernTable">
                    <thead>
                    <tr>
                        <th>구분</th>
                        <th>지불 금액</th>
                        <th>장소</th>
                        <th>사용날짜</th>
                        <th>취소</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.slice(0, visibleCount).map((item, idx) => (
                        <tr key={idx}>
                        <td>{item.type}</td>
                        <td>{Number(item.amount).toLocaleString()}원</td>
                        <td>{item.place}</td>
                        <td>{item.date}</td>
                        <td>
                            {item.type === "지출" && (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                className="CancelBtn"
                                onClick={() => handleCancel(item.ptId)}
                            >
                                취소
                            </Button>
                            )}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <div className="d-flex justify-content-center gap-3 mt-2">
                    {visibleCount < transactions.length && (
                    <>
                        <Button variant="outline-primary" onClick={showMore}>더보기</Button>
                        <Button variant="outline-success" onClick={showAll}>전체보기</Button>
                    </>
                    )}
                    {visibleCount > 3 && (
                    <Button variant="outline-danger" onClick={resetView}>닫기</Button>
                    )}
                </div>
                </Row>
            </div>
            </Row>

        </>
      )}
    </Container>
  </div>
);

};

export default HomePage;
