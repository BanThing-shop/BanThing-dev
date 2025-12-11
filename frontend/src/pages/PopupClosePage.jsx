import React, { useEffect } from "react";
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import { TbXboxX } from "react-icons/tb";
import styles from './PopupClosePage.module.scss';

const PopupClosePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const errorMessage = searchParams.get('error');

  // 팝업 창의 상태(성공 또는 실패)를 확인하고 부모 창을 처리하는 로직
  useEffect(() => {
    if (!errorMessage) { // 에러가 없을때 = 로그인 성공
      if (window.opener) {
        // 부모 창을 메인 페이지로 이동시키고
        window.opener.location.href = window.location.origin + "/";
        // 현재 팝업 닫기
        window.close();
      } else {
        // 팝업이 아닐 경우 그냥 현재창에서 이동
        navigate('/');
      }
    } else { // 에러가 있을때 = 로그인 실패
      if (window.opener) {
        // 부모 창을 현재 팝업 창의 URL로 이동
        window.opener.location.href = window.location.href;
        window.close();
      } else {
        // 팝업이 아닐 경우 그대로 있음
      }
    }
  }, [errorMessage, navigate]);

  return (
    <div className={`${styles.container} ${styles.popupContainer}`}>
      <main className={styles.popupMain}>
        <div className={styles.popupCard}>
          {errorMessage ? (
            <>
              <div className={styles.errorHeader}>
                <TbXboxX className={styles.errorIcon}/>
                <h1 className={styles.errorTitle}>로그인 오류</h1>
                <p className={styles.errorSubtitle}>
                  로그인 과정에서 문제가 발생했습니다.
                </p>
              </div>

              <div className={styles.errorContent}>
                <div className={styles.errorMessage}>
                  <span className={styles.errorText}>
                    {errorMessage === 'access_denied'
                      ? '로그인이 취소되었습니다.'
                      : '인증 과정에서 오류가 발생했습니다.'}
                  </span>
                </div>

                <div className={styles.actionContainer}>
                  <Link
                    to='/login'
                    className={styles.retryButton}
                  >
                    로그인 페이지로
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.successHeader}>
                <div className={styles.loadingSpinner}></div>
                <h1 className={styles.successTitle}>로그인 중...</h1>
                <p className={styles.successSubtitle}>
                  로그인을 완료하는 중입니다.
                </p>
              </div>

              <div className={styles.successContent}>
                <p className={styles.processingMessage}>
                  잠시만 기다려주세요.<br />
                  곧 메인 페이지로 이동합니다.
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PopupClosePage;