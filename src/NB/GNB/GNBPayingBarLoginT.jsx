// src/component/GnbPayingBarLoginT.jsx

import React, { useEffect, useRef, useContext, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { PayingBarOpenContext } from '../../State/PayingBarOpenState';
import { Container, Row, Col } from 'react-bootstrap';

const GnbPayingBarLoginT = () => {
  const { isOpen } = useContext(PayingBarOpenContext);
  const qrRef = useRef(null);
  const scannerRef = useRef(null);
  const lastScannedTextRef = useRef("");
  const [scannedText, setScannedText] = useState("");

  useEffect(() => {
    if (isOpen && qrRef.current) {
      const html5QrCode = new Html5Qrcode("qr-reader");

      const config = {
        fps: 10,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const size = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.9);
          return { width: size, height: size };
        }
      };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          if (decodedText !== lastScannedTextRef.current) {
            lastScannedTextRef.current = decodedText;
            setScannedText(decodedText);
          }
        },
        (errorMessage) => {
          console.log("QR 인식 실패:", errorMessage);
        }
      );

      scannerRef.current = html5QrCode;
    }

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current
          .stop()
          .then(() => { scannerRef.current.clear(); })
          .catch((e) => { console.warn("스캐너 종료 실패:", e); });
      }
    };
  }, [isOpen]);

  return (
    <div style={{ display: isOpen ? 'flex' : 'none' }} className="GNBPBBox">
      <Container fluid>
        {/* 헤더 */}
        <Row className="mb-3">
          <Col>
            <h5
              className="d-flex justify-content-center align-content-center"
              style={{ color: 'white' }}
            >
              QR 결제 스캔
            </h5>
          </Col>
        </Row>

        {/* 카메라 뷰 */}
        <Row>
          <Col className="d-flex justify-content-center">
            <div ref={qrRef}>
              <div
                id="qr-reader"
                className="qr-reader"
                style={{
                  width: '90vw',
                  height: '90vw',
                  maxWidth: '400px',
                  maxHeight: '400px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              />
            </div>
          </Col>
        </Row>

        {/* 스캔 성공 → 이동하기 버튼 */}
        {scannedText && (
          <Row className="mt-3 position-relative">
            <Col className="text-center">
              <div style={{ color: 'white', marginBottom: '8px' }}>
                스캔 성공!
              </div>
              <button
                className="btn btn-primary"
                style={{
                  position: 'absolute',
                  bottom: '80px',          // 내비 높이(60px) + 여유(20px)
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
                onClick={() => window.location.href = scannedText}
              >
                이동하기
              </button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default GnbPayingBarLoginT;
