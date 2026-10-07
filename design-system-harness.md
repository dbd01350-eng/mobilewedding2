# Design System & Code Quality Harness (Ver 2) (`design-system-harness.md`)

> **[Harness Protocol Version: 2.0.0 - Natural Forest Green Theme]**  
> 본 문서는 `ver2` 프로젝트의 시각적 일관성, 디자인 토큰 준수, 코드 품질을 강제하기 위한 디자인 시스템 하네스 규칙입니다.

---

## 1. 목적 (Purpose)
1. **디자인 토큰 강제**: 모든 시각 스타일(색상, 폰트 패밀리, 기본 규격 등)은 선언된 디자인 토큰(CSS Custom Properties)을 반드시 참조해야 합니다.
2. **하드코딩 및 임의 변형 차단**: `:root` 토큰 선언부 외부에서 임의의 HEX/RGB 색상이나 규격 미달 스타일을 임의로 추가하는 것을 엄격히 금지합니다.
3. **4단계 작업 사이클 준수**: 모든 변경 작업은 `Clarify(명확화) → Reuse(재사용) → Implement(구현) → Evaluate(검증)` 프로세스를 따릅니다.

---

## 2. 4대 핵심 원칙 (Core Principles)

### ① Think Before Coding (선 질문 & 명확화)
- 요구사항, 화면 배치, 인터랙션 방식이 모호하거나 여러 옵션이 존재할 경우, 코딩을 멈추고 **원인과 해결 옵션을 사용자에게 먼저 설명하고 승인을 구합니다.**
- 사용자가 직접 수정한 코드, 문구, 설정값은 절대 임의로 덮어쓰거나 되돌리지 않습니다.

### ② Simplicity First (기존 토큰 및 패턴 재사용)
- 새 스타일이나 클래스를 임의로 남발하지 않고, `:root`에 정의된 CSS 변수와 기존의 공통 컴포넌트(`.section-subtitle`, `.btn-primary-pill`, `.card-edge-bleed` 등)를 재사용합니다.

### ③ Surgical Changes (최소 침습 수정)
- 요청받은 컴포넌트와 관련 스타일/스크립트 라인만 정교하게 수정합니다.
- 변경 범위와 무관한 기존 코드, 주석, 자산을 건드리지 않습니다.

### ④ Goal-Driven Execution (목표 검증 및 완료)
- 작업 후 [`hooks/check-hardcode.mjs`](file:///Z:/결혼준비/청첩장/ver2/hooks/check-hardcode.mjs) 린터 검사를 수행하여 0 에러 통과를 확인한 후 완료를 보고합니다.

---

## 3. 디자인 토큰 사양 및 코드 규칙

### 📍 토큰 정의 파일 위치
- **경로**: [`css/style.css`](file:///Z:/결혼준비/청첩장/ver2/css/style.css) `:root` 섹션

### 🎨 Ver 2 핵심 디자인 토큰 목록
| 구분 | 토큰명 | 기본값 / 설명 |
| :--- | :--- | :--- |
| **Accent / Theme** | `--theme-accent` | `#4a8b2e` (내추럴 포레스트 그린 메인) |
| | `--theme-accent-soft` | `#f0f6ee` (세이지 틴트 소프트 배경) |
| | `--theme-accent-light` | `#a7c8a3` (비주얼 날짜 블록 세이지 그린) |
| | `--theme-accent-dark` | `#376a22` (포레스트 딥 그린) |
| **Background** | `--theme-bg` | `#ffffff` (메인 카드 배경) |
| | `--theme-bg-muted` | `#fafafa` (외곽 뷰포트 배경) |
| | `--theme-bg-subtle` | `#f7f9f6` (카드/아코디언 서브 배경) |
| **Text** | `--theme-text` | `#585858` (본문 기본 텍스트) |
| | `--theme-text-dark` | `#1e1e23` (진한 헤드라인/이름) |
| | `--theme-text-muted` | `#111827` (섹션 타이틀) |
| | `--theme-text-light` | `#777c80` (보조 설명/안내) |
| **Gender Point** | `--theme-groom` / `bg` | `#95bbf8` / `#f2f7fd` (신랑 파스텔 블루) |
| | `--theme-bride` / `bg` | `#ffc2c2` / `#fdf5f5` (신부 파스텔 핑크) |
| **Typography** | `--font-serif` | `'Gowun Batang', 'Crimson Pro', serif` |
| | `--font-sans` | `'Noto Sans KR', sans-serif` |
| | `--font-cursive` | `'Alex Brush', cursive` (Our wedding 필기체) |
| | `--font-display` | `'Crimson Pro', serif` (서브타이틀/날짜) |
| **Layout** | `--max-width` | `450px` (모바일 기준 최대 폭) |
| | `--radius-full` | `9999px` (필 버튼 타원형 반경) |

### 🚫 금지 사항 & 예외 규정
- **금지**: CSS 파일 내에서 토큰 선언부(`:root`)를 제외한 일반 셀렉터에 raw HEX, RGB를 임의로 하드코딩하는 것.
- **예외 주석 처리**: 카카오페이 노란색 등 브랜드 고유 컬러나 딤드 오버레이 적용 시 반드시 줄 끝에 사유 주석을 추가합니다.
  ```css
  background-color: #fee500; /* token-exempt: Kakao brand yellow */
  ```

---

## 4. 승인된 서드파티 / CDN 화이트리스트
1. **Google Fonts CDN**: `https://fonts.googleapis.com`, `https://fonts.gstatic.com`
2. **Naver Maps Open API v3**: `https://oapi.map.naver.com`
3. **내비게이션 바로가기**:
   - 네이버 지도 (`map.naver.com`)
   - 카카오맵 (`map.kakao.com`)
   - 티맵 (`tmap.co.kr`)
4. **결제 및 백엔드**:
   - 카카오페이 (`qr.kakaopay.com`, `kakaopay.com`)
   - Google Apps Script & Drive (`script.google.com`, `drive.google.com`)
