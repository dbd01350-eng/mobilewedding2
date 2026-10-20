# 🌿 Mobile Wedding Invitation Ver.2 (Natural Forest Green Theme)

> **서버리스 클라우드 아키텍처와 인메모리 이미지 압축을 적용한 내추럴 모던 모바일 웹 애플리케이션**

[![Demo Page](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://dbd01350-eng.github.io/mobilewedding2/demo.html)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20GAS%20%7C%20Vanilla%20JS-blue?style=for-the-badge)](#기술-스택-및-아키텍처)

---

## 📌 프로젝트 개요 (Overview)
- **프로젝트명**: Natural Modern Mobile Wedding Web Application
- **개발 형태**: Zero-Dependency 순수 웹 표준 + 서버리스 백엔드 파이프라인
- **기획 및 디자인 의도**: 포레스트 그린 테마 기반의 모던한 비주얼 스토리텔링과 하객 편의 중심의 서버리스 인터랙션을 제공하는 반응형 웹
- **핵심 목표**: 복잡한 인프라 비용 없이 **Google Apps Script(GAS) + Google Sheets + Google Drive**를 유기적으로 연동하여 완벽한 인터랙티브 서비스 구축

---

## 🛠 기술 스택 및 아키텍처 (Tech Stack & Architecture)
- **Frontend**: HTML5, CSS3 Custom Properties, Vanilla JavaScript (ES6+)
- **Serverless Backend**: Google Apps Script (GAS) Webhook
- **Database & Storage**: Google Sheets (RSVP 데이터베이스), Google Drive (하객 미디어 스토리지)
- **Optimization**: HTML5 Canvas API (클라이언트 인메모리 이미지 리사이징 & 압축)
- **Maps & Fintech API**: Naver Maps Open API v3, 카카오페이 송금 딥링크, Clipboard API
- **CI/CD & Deploy**: GitHub Actions, GitHub Pages
- **Code Quality**: Custom AST Token Linter (`check-hardcode.mjs`)

---

## ✨ 핵심 엔지니어링 역량 (Key Engineering Highlights)

### 1. HTML5 Canvas 기반 클라이언트 인메모리 압축 (Client-side Image Optimization)
- 모바일에서 촬영된 고용량 사진(10MB~20MB)을 업로드할 때 네트워크 병목을 해소하기 위해 브라우저 인메모리 Canvas 압축 파이프라인 구현.
- 브라우저 단에서 1600px 리사이징 & JPEG 85% 압축을 거쳐 **전송 용량을 90% 이상 절감**, 모바일 환경에서도 지연 없는 초고속 업로드 실현.

### 2. 서버리스 하객 RSVP 및 1-Click 미디어 업로드 시스템
- **실시간 RSVP 수집**: 하객 성함, 참석 여부, 동행 인원, 식사 여부를 GAS Webhook을 통해 실시간 Google Sheets DB에 동기화.
- **1-Click 하객 사진 업로드**: 별도 회원가입이나 앱 설치 없이 하객이 당일 촬영한 사진/영상을 클릭 한 번으로 지정된 구글 드라이브 폴더에 즉시 백업. 업로드 진행률 게이지(Progress Bar) 피드백 제공.

### 3. 유려한 모바일 인터랙션 & 디자인 시스템
- **무한 루프 3D 뎁스 갤러리**: 터치 스와이프를 지원하는 모바일 최적화 캐러셀 및 풀스크린 라이트박스 모달.
- **실시간 D-Day 카운트다운 타이머**: 일, 시, 분, 초 단위로 실시간 갱신되는 반응형 타이머.
- **원클릭 송금 & 복사**: 신랑/신부 아코디언 카드, 계좌번호 1-터치 클립보드 복사(토스트 피드백), 카카오페이 딥링크 연동.
- **안심 데모 모드(`data-demo="true"`)**: 포트폴리오 공개 시 실제 DB 오염을 방지하는 안전한 샌드박스 환경 구축.

---

## 📂 디렉터리 구조 (Directory Structure)
```text
ver2/
├── assets/                  # 웹 최적화 이미지(WebP), SVG 아이콘, 오디오
├── css/
│   └── style.css            # 내추럴 포레스트 그린 디자인 시스템 스타일시트
├── hooks/
│   └── check-hardcode.mjs   # 디자인 하네스 토큰 준수 검증 린터
├── js/
│   └── main.js              # GAS 연동, Canvas 압축, 지도/갤러리 인터랙션
├── demo.html                # 포트폴리오/공개용 비식별화 안심 데모 페이지
├── index.html               # 프로덕션 배포 원본 파일
├── PRD.md                   # 제품 요구사항 정의서
└── README.md
```
