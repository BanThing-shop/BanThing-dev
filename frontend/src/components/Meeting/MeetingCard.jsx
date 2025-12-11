import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MeetingCard.module.scss';
import { FaMapMarkerAlt, FaUsers, FaCalendarAlt } from 'react-icons/fa';


/**
 * 모임 카드 컴포넌트
 * 모임의 썸네일, 제목, 장소, 날짜, 참가자 수 등의 정보를 카드 형태로 표시합니다.
 *
 * @param {Object} meeting - 모임 정보 객체
 * @returns {Element} - 렌더링된 모임 카드 컴포넌트
 * @author 고동현
 * @since 2025.09.17
 */
const MeetingCard = ({ meeting }) => {
    // ] dev 브랜치의 상세 페이지 이동 기능을 위한 navigate 함수입니다.
    const navigate = useNavigate();

    // 날짜 문자열을 'YYYY-MM-DD HH:mm' 형식으로 변환하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    //  dev 브랜치의 카드 클릭 핸들러 함수입니다.
    const handleCardClick = () => {
        navigate(`/meetings/${meeting.meetingId || meeting.meeting_id || meeting.id}`);
    };

    // 모임 상태에 따른 스타일 클래스를 반환하는 함수
    const getStatusClass = (status) => {
        if (!status) return '';
        return styles[status.toLowerCase()] || '';
    };

    const statusToKorean = {
        RECRUITING: '모집중',
        FULL: '모집완료',
        ONGOING: '진행중',
        COMPLETED: '모임종료',
        CANCELLED: '모임취소',
    };

    //  feature 브랜치의 이미지 전체 URL을 만들어주는 함수입니다.
    // 썸네일 이미지의 전체 URL을 생성하는 함수
    // 이미지가 없을 경우 기본 이미지를, 상대 경로일 경우 백엔드 URL을 추가하여 반환
    const getFullImageUrl = (thumbnailUrl) => {
        const placeholder = 'https://via.placeholder.com/150';
        if (!thumbnailUrl) {
            return placeholder;
        }
        if (thumbnailUrl.startsWith('http://')) {
            // http를 https로 강제 변경하여 Mixed Content 방지
            return thumbnailUrl.replace('http://', 'https://');
        }
        if (thumbnailUrl.startsWith('https://')) {
            return thumbnailUrl;
        }
        const backendUrl = import.meta.env.VITE_API_URL.replace('/api', '');
        return `${backendUrl}${thumbnailUrl}`;
    };

    return (
        // [수정] dev 브랜치의 onClick, style 속성을 추가하여 카드 전체를 클릭할 수 있게 합니다.
        <div
            className={styles.card}
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
        >
            <span className={`${styles.badge} ${getStatusClass(meeting.status)}`}>
                {statusToKorean[meeting.status] || meeting.status}
            </span>

            <div className={styles.thumbnail}>
                {/* [수정] feature 브랜치의 getFullImageUrl 함수를 사용하여 최종 이미지 URL을 가져옵니다. */}
                <img src={getFullImageUrl(meeting.thumbnailImageUrl)} alt={meeting.title} />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{meeting.title}</h3>
                <div className={styles.info}>
                    <span><FaMapMarkerAlt /> {meeting.martName}</span>
                    <span><FaCalendarAlt /> {formatDate(meeting.meetingDate)}</span>
                </div>
                <div className={styles.footer}>
                    <span className={styles.participants}>
                        <FaUsers /> {meeting.currentParticipants} / {meeting.maxParticipants}명
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MeetingCard;