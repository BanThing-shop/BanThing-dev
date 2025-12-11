import React from 'react';
import styles from './MyInfoCard.module.scss';
import TrustBadge from  '../Meeting/TrustBadge.jsx'; // TrustBadge 컴포넌트 import


/**
 * 사용자의 정보를 표시하는 컴포넌트를 나타냅니다.
 *
 * @param {Object} props - 컴포넌트의 속성 객체.
 * @param {Object} props.user - 사용자 정보를 담고 있는 객체.
 * @param {string} [props.user.nickname='사용자'] - 사용자의 닉네임. 값이 없을 경우 기본값은 '사용자'입니다.
 * @param {string} [props.user.profileImageUrl='/images/defaultProfile.png'] - 사용자의 프로필 이미지 URL. 값이 없을 경우 기본값은 '/images/defaultProfile.png'입니다.
 * @param {string} [props.user.trustGrade] - 사용자의 신뢰 등급.
 * @param {number} [props.user.trustScore] - 사용자의 신뢰 점수.
 * @param {number} [props.user.noShowCount] - 사용자의 노쇼 횟수.
 * @returns {JSX.Element} 사용자 정보가 포함된 섹션 엘리먼트를 반환합니다.
 *
 * @author 강관주
 * @since 2025.09.18
 */
const MyInfoCard = ({ user }) => {
  
  const getSecureImageUrl = (url) => {
    if (!url || url === '/images/defaultProfile.png') return url;
    // http:// 를 https:// 로 강제 치환하여 Mixed Content 방지
    return url.replace('http://', 'https://');
  };

  const nickname = user?.nickname || '사용자';
  const profileImageUrl = getSecureImageUrl(user?.profileImageUrl) || '/images/defaultProfile.png';
  // const selfIntroduction = user?.selfIntroduction || '없음';
  // const trustGrade = user?.trustGrade;
  const trustScore = user?.trustScore;
  const noShowCount = user?.noShowCount;

  // 신뢰도 등급에 따른 스타일 클래스 결정
  /*const getTrustGradeClass = (grade) => {
    if (!grade) return styles.basic;
    const lowerGrade = grade.toLowerCase();
    if (lowerGrade.includes('경고') || lowerGrade.includes('warning')) return styles.warning;
    if (lowerGrade.includes('좋음') || lowerGrade.includes('good')) return styles.good;
    return styles.basic;
  };*/

  return (
    <section className={styles.myInfoCard}>
      <div className={styles.profileHeader}>
        <img
          src={profileImageUrl}
          alt="프로필 이미지"
          className={styles.profileImage}
        />
        <div className={styles.profileInfo}>
          <h3 className={styles.nickname}>{nickname}</h3>
        </div>
      </div>

      <ul className={styles.userStats}>
        <li className={styles.statItem}>
          <span className={styles.statLabel}>등급</span>
          {/*<span className={`${styles.trustGrade} ${getTrustGradeClass(trustGrade)}`}>
            {trustGrade || '기본'}
          </span>*/}
          <div className={styles.trustBadgeWrapper}>
            <TrustBadge trustScore={trustScore} />
          </div>
        </li>
        <li className={styles.statItem}>
          <span className={styles.statLabel}>신뢰 점수</span>
          <span className={`${styles.statValue} ${styles.trustScore}`}>
            {trustScore || 0}점
          </span>
        </li>
        <li className={styles.statItem}>
          <span className={styles.statLabel}>노쇼 횟수</span>
          <span className={`${styles.statValue} ${styles.noShowCount} ${noShowCount > 3 ? styles.high : ''}`}>
            {noShowCount || 0}회
          </span>
        </li>
      </ul>
    </section>
  );
};

export default MyInfoCard;