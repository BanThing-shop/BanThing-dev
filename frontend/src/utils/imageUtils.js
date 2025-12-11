/**
 * 이미지 URL을 HTTPS로 변환하여 Mixed Content 경고를 방지합니다.
 * 
 * @param {string} url - 원본 이미지 URL
 * @returns {string} HTTPS로 변환된 URL
 */
export const getSecureImageUrl = (url) => {
  if (!url) return url;
  // http:// 를 https:// 로 강제 치환하여 Mixed Content 방지
  return url.replace('http://', 'https://');
};
