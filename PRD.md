# 제품 요구사항 정의서 (PRD) — Natural Modern Mobile Wedding Web Application

## 1. 프로젝트 개요 (Overview)
- **프로젝트명**: Natural Modern Mobile Wedding Web Application (`ver2`)
- **기획 및 디자인 목적**: 내추럴 포레스트 그린 테마 기반의 모바일 반응형 청첩장 웹 애플리케이션으로, 감성적인 비주얼 스토리텔링과 하객 편의 중심의 서버리스 인터랙션을 제공
- **타깃 사용자**: 모바일 디바이스로 청첩장을 열람하는 모든 하객 및 초대 대상자
- **지원 디바이스**: 모바일 뷰포트 최적화 (360px ~ 450px 반응형 및 데스크톱 중앙 집중 뷰)

---

## 2. 기술 스택 및 아키텍처 (Tech Stack & Architecture)
- **프론트엔드**: HTML5, CSS3 Custom Properties (Design Tokenization), Vanilla JavaScript (ES6+)
- **디자인 시스템**: Natural Forest Green Design System (`--theme-accent: #4a8b2e`, 세이지 그린, 고운바탕, Crimson Pro)
- **서버리스 백엔드 연동**:
  - **Google Apps Script (GAS) Webhook**: 무료 실시간 데이터 처리
  - **Google Sheets Database**: RSVP 하객 참석/식사 통계 실시간 저장
  - **Google Drive Storage**: 하객 사진/영상 업로드 전용 클라우드 저장소
- **클라이언트 성능 최적화**:
  - **HTML5 Canvas API In-Memory Image Compression**: 모바일 촬영 사진 업로드 전 1600px 리사이징 & JPEG 85% 인메모리 압축 (전송 용량 90% 이상 절감 및 전송 속도 극대화)
- **외부 API 및 딥링크 통합**:
  - **Naver Maps Open API v3**: 식장 위치 시각화 및 마커 인터랙션
  - **네비게이션 딥링크**: 네이버 지도, 카카오맵, 티맵 1-터치 길찾기
  - **핀테크 연동**: 카카오페이 송금 딥링크 및 클립보드 복사 API
  - **Web Share API**: 모바일 네이티브 공유 및 링크 복사 Fallback

---

## 3. 핵심 화면 및 기능 명세 (Feature Specifications)

### ① BGM 컨트롤러 (Floating Audio)
- 상단 우측 고정 플로팅 버튼으로 배경음악 재생/일시정지 제어
- 브라우저 자동재생 정책(Autoplay Policy)에 대응한 첫 터치 인터랙션 재생 지원

### ② 메인 히어로 섹션 (`main`)
- 세로 뷰포트 풀스크린 비율 (`max-h-[900px]`)
- 대형 브러시 캘리그라피 `"Our wedding"` (`97.3px`, `-12deg`) 오버레이
- 신랑 & 신부 영문/한글 타이포그래피 및 예식 일시/장소 텍스트 정렬

### ③ 초대글 섹션 (`lettering`)
- `INVITATION` 서브타이틀과 고운바탕 서체 기반의 감성적인 모바일 줄바꿈 초대 메시지

### ④ 비주얼 날짜 블록 (`visualBlock`)
- 세이지 그린(`#a7c8a3`) 배경과 대형 `APR 04` 디스플레이 타이포그래피

### ⑤ 혼주 & 신랑·신부 안내 (`couple`)
- 라운드 카드 내부 양가 부모님 및 신랑/신부 관계 표기 (신랑 블루, 신부 핑크 포인트)

### ⑥ 프로필 카드 (`profile`)
- 신랑/신부 정사각 프로필 사진 카드 및 1-터치 전화 연결 버튼

### ⑦ 예식 일정 & 캘린더 & 실시간 D-Day (`date`)
- 4월 커스텀 캘린더 (예식 당일 원형 하이라이트)
- 실시간 초 단위 D-Day 카운트다운 타이머 (`DAYS`, `HOUR`, `MIN`, `SEC`)

### ⑧ 웨딩 앨범 갤러리 (`gallery`)
- 3x2 정사각 썸네일 그리드 (호버 줌 인터랙션)
- 썸네일 클릭 시 모달 라이트박스 뷰어 (ESC 키 및 배경 터치 닫기 지원)

### ⑨ 오시는 길 & 네이버 지도 (`venue`)
- 식장 상세 주소 및 대표 전화 연결
- 네이버 지도 Open API v3 캔버스 연동
- 네이버 지도, 카카오맵, 티맵 1-터치 길찾기 버튼
- 대중교통(지하철, 버스) 및 자가용 무료 주차 2시간 상세 안내

### ⑩ 마음 전하실 곳 (`account`)
- 신랑측 / 신부측 아코디언 접기/펼치기 UI
- 계좌번호 1-터치 클립보드 복사 및 토스트 피드백
- 카카오페이 direct 송금 링크 연결

### ⑪ 참석 의사 전달 (`rsvp`)
- 하객 성함, 구분(신랑측/신부측), 참석 여부, 동행 인원, 식사 여부, 축하 메시지 입력 폼
- Google Sheets 실시간 전송 및 브라우저 로컬 스토리지 백업

### ⑫ 1-Click 하객 사진 업로드 (`snap`)
- 예식 당일 하객이 촬영한 사진/영상을 1-클릭으로 구글 드라이브 폴더에 즉시 전송
- 클라이언트 Canvas 압축 및 진행률 게이지(Progress Bar) 피드백

### ⑬ 엔딩 섹션 (`ending`)
- 4:5 비율 엔딩 사진 및 어두운 그라데이션 오버레이 감사 인사

---

## 4. 품질 및 디자인 하네스 준수 기준 (Acceptance Criteria)
- [x] Zero-Dependency Vanilla Web: 별도의 무거운 프레임워크 없이 순수 웹 표준으로 빌드
- [x] 디자인 토큰 100% 준수: `:root` 변수 기반 스타일링 (`check-hardcode.mjs` 0 에러 통과)
- [x] 반응형 및 크로스 브라우징: iOS Safari, Android Chrome, 데스크톱 브라우저 최적화
- [x] 안전 데모 모드 지원: `data-demo="true"` 시 실제 구글 드라이브/시트 오염 방지
