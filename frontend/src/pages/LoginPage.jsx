import React, {useEffect, useRef, useState} from 'react';
import styles from './LoginPage.module.scss';
import { IoIosWarning } from "react-icons/io";
import {useAuthStore} from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

  // 로딩중인지 확인할 변수
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // useRef로 인터벌 ID를 저장합니다.
  const intervalRef = useRef(null);
  // 카카오 로그인 백엔드 엔드포인트
  const KAKAO_AUTH_URL = `${import.meta.env.VITE_API_URL.replace('/api', '')}/oauth2/authorization/kakao`;
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // 로그인이 활성화 되어있으면 홈으로 이동
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleKakaoLogin = () => {

    // 팝업 창이 열리기 전에 로딩 상태를 true로 설정
    setIsLoading(true);
    setError('');

    // 팝업창 열기
    const popup = window.open(KAKAO_AUTH_URL, 'KakaoLoginPopup', 'width=460,height=600,left=100,top=100');

    // 팝업이 열리지 않았을 경우 (팝업 차단 등)
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      setIsLoading(false);
      setError('팝업 차단을 해제하고 다시 시도해 주세요.');
      return;
    }

    // 기존 인터벌이 있다면 정리합니다.
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // 팝업 창이 강제로 닫혔는지 확인하는 로직
    intervalRef.current = setInterval(() => {
      // 팝업이 닫혔을 때
      if (popup.closed) {
        setIsLoading(false);
        setError('로그인 창이 닫혔습니다. 다시 시도해 주세요.');
        clearInterval(intervalRef.current); // 현재 인터벌도 정리합니다.
      }
    }, 500);

  };


  return (
    <div className={`${styles.container} ${styles.loginContainer}`}>
      <main className={styles.loginMain}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1 className={styles.loginTitle}>반띵에 로그인하세요</h1>
            <p className={styles.loginSubtitle}>
              간편하게 카카오 계정으로 시작해보세요
            </p>
          </div>

          <div className={styles.loginContent}>
            {error && (
              <div className={styles.errorMessage}>
                <IoIosWarning className={styles.errorIcon}/>
                {error}
              </div>
            )}

            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>로그인 진행 중입니다...</p>
              </div>
            ) : (
              <div className={styles.loginButtonContainer}>
                <button
                  onClick={handleKakaoLogin}
                  className={styles.kakaoButton}
                  disabled={isLoading}
                >
                  <img
                    src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png"
                    alt="카카오 로그인"
                    className={styles.kakaoButtonImage}
                  />
                </button>

                <p className={styles.loginNote}>
                  로그인 후 <span className={styles.link}>이용약관</span>과 <span className={styles.link}>개인정보처리방침</span>에 동의하셔야<br />
                  회원가입이 완료됩니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;