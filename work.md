# 작업 지침 (Work Instructions) - Ver 2

## 1. 최우선 원칙 (Top Priority Rules)
- **사용자 수정 내용 엄격 보존 (Strict Preservation of User Modifications)**:
  - 사용자가 직접 작성하거나 수정한 코드, 텍스트, 설정값, 디자인, API 키, 스타일 등은 에이전트가 절대로 임의로 덮어쓰거나 변경하거나 되돌리지 않습니다.
  - 사용자의 수정 의도를 항상 최우선으로 존중하며, 수정이 필요한 경우 반드시 사용자의 사전 승인을 받거나 명시적인 지시가 있을 때만 변경합니다.
- **선 설명 및 사전 확인 후 실행 (Explain & Confirm Before Executing)**:
  - 문제나 에러가 발생하거나 코드/디자인 수정이 필요한 상황에서 코드를 곧바로 임의로 수정하거나 실행하지 않습니다.
  - 반드시 **1) 왜 그런 현상이 발생하는지(원인 분석)**와 **2) 어떻게 해결할 것인지(해결 방안 및 옵션)**를 먼저 사용자에게 명확히 설명하고 질문/확인을 구한 뒤, 사용자의 승인이나 선택을 받은 후에 수정을 진행합니다.
- **Git 명령어 임의 실행 금지 (Strict Prohibition of Arbitrary Git Operations)**:
  - 에이전트는 사용자의 명시적인 지시나 사전 승인 없이 `git push`, `git pull`, `git commit`, `git reset`, `git merge`, `git checkout` 등 Git 원격/로컬 형상을 변경하는 명령어를 절대로 임의로 실행하지 않습니다.
  - 모든 Git 커밋 및 푸시/풀 작업은 반드시 사용자의 명시적인 요청이 있을 때만 수행합니다.
- **데모 버전(demo.html) 업데이트 규칙 (Demo Version Update Rule)**:
  - `demo.html` (공개 데모 버전)은 사용자가 명시적으로 **"개인정보 안 들어간 버전으로 업데이트해줘"**라고 요청할 때만 업데이트합니다.
  - 사용자의 명시적인 요청이 없는 일반 작업 시에는 `demo.html`을 임의로 수정하거나 생성하거나 동기화하지 않습니다.
  - `demo.html`은 실제 구글 드라이브/시트로의 데이터 전송을 차단하는 안심 데모 모드(`data-demo="true"`)를 필수로 유지합니다.
- **워크스페이스 작업 지침 준수**:
  - 작업을 시작할 때 항상 이 `work.md` 파일의 지침을 먼저 확인하고 철저히 준수합니다.

---

## 2. 프로젝트 현황 및 설정 (Project Status & Configs)
- **프로젝트**: 웨딩 모바일 청첩장 Version 2 (Natural Forest Green Theme)
- **테마 디자인**:
  - 메인 액센트: 내추럴 포레스트 그린 (`#4a8b2e`)
  - 배경: 퓨어 화이트 (`#ffffff`) 및 소프트 그린 (`#a7c8a3`, `#f5f8f4`)
  - 타이포그래피: `Gowun Batang`, `Crimson Pro`, `Inter`, `Caveat` (영문 필기체)
- **지도 연동**:
  - 네이버 지도 Open API v3 (`oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=sfb9d8eiq2` - GitHub Secrets `NAVER_MAP_KEY`로 자동 주입)
  - 웨딩홀: 더 파티움 여의도 (위도 `37.5284`, 경도 `126.9205`)
- **구글 연동 엔드포인트**:
  - RSVP & 1-Click 구글 드라이브 사진 업로드: `https://script.google.com/macros/s/AKfycbyRpBZMmXNy1Scj5YMFaS2DztLaOVrj5fyL358FblVtIc89pgftdQMJI4RP1xrVQ-n_/exec`
  - 구글 드라이브 폴더 ID: `1jG1ujZpW-I50bLb9ANM70MhKCZy_TcKi`
