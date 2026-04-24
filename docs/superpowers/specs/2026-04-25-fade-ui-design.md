# FADE UI 디자인 스펙

_작성일: 2026-04-25 | Phase 1 구현 대상_

---

## 1. 프로젝트 컨텍스트

FADE는 가족의 사망 이후 상속 행정을 처음 겪는 사용자를 위한 AI 기반 웹 서비스다. 감정적으로 민감한 상황의 사용자를 배려하여 과도한 대비나 자극적인 색상을 피하고, 차분하고 신뢰감 있는 UI를 지향한다.

---

## 2. 디자인 시스템

### 2.1 컬러 팔레트

| 역할 | 토큰명 | HEX | 용도 |
|---|---|---|---|
| Primary | `--color-primary` | `#8B8378` | CTA 버튼, 스텝 인디케이터, 활성 상태 |
| Primary Light | `--color-primary-light` | `#A8A196` | 보조 강조, 아이콘 |
| Surface | `--color-surface` | `#F2EFE9` | 배지 배경, 사이드바 배경 |
| Background | `--color-bg` | `#F9F8F6` | 페이지 전체 배경 |
| Card | `--color-card` | `#FFFFFF` | 카드 배경 |
| Text Primary | `--color-text` | `#2D2D2D` | 제목, 본문 |
| Text Secondary | `--color-text-muted` | `#4A4A4A` | 보조 텍스트 |
| Text Hint | `--color-hint` | `#8B8378` | 플레이스홀더, 레이블 |
| Border | `--color-border` | `#E0E0E0` | 카드·인풋 테두리 |
| Urgent | `--color-urgent` | `#FAED7D` | 법정 기한 임박 카드 배경, 강조 |
| Urgent Border | `--color-urgent-border` | `#F0D800` | 긴급 카드 테두리 |

**원칙**: 노란색(`#FAED7D`)은 오직 법정 기한 임박 경고(D-30 이내)에만 사용. 장식 목적으로 사용 금지.

### 2.2 타이포그래피

- **폰트**: Pretendard (한글), Inter (영문/숫자) — Google Fonts + `next/font` 적용
- **기본 본문**: `16px`, 행간 `1.7`
- **제목(h1)**: `700` weight, `28–36px`
- **제목(h2)**: `700` weight, `22–26px`
- **서브 텍스트**: `14px`, `color: #4A4A4A`, 행간 `1.6`
- **법정 기한 숫자**: `700` weight + `#2D2D2D`, 배경 카드로 시각 분리

### 2.3 컴포넌트 스타일

#### 버튼
- **Primary**: `bg-[#8B8378] text-white font-bold rounded-lg px-5 py-2.5`
- **Secondary**: `border border-[#D0CCC6] text-[#4A4A4A] rounded-lg px-5 py-2.5 bg-transparent`
- **Danger**: Primary와 동일하되 긴급 카드 내부에서만 사용

#### 카드
- `bg-white border border-[#E8E8E8] rounded-xl shadow-sm p-4`
- 긴급 카드: `border-[#F0D800] bg-[#FAED7D]/20`

#### 인풋
- `bg-[#F9F9F9] border border-[#E0E0E0] rounded-lg px-3 py-2 text-sm`
- Focus: `border-[#8B8378] outline-none ring-1 ring-[#8B8378]/30`

#### 배지
- `bg-[#F2EFE9] text-[#8B8378] border border-[#D0CCC6] text-xs font-bold px-3 py-0.5 rounded-full`

#### 진행률 바
- Track: `bg-[#E8E8E8] h-1.5 rounded-full`
- Fill: `bg-[#8B8378] h-1.5 rounded-full transition-all`

---

## 3. 페이지 구조 및 레이아웃

### 3.1 구현 범위 (Phase 1)

```
app/
├── (marketing)/
│   └── page.tsx                    # 랜딩 페이지
├── (onboarding)/
│   └── onboarding/
│       ├── step-1-date/page.tsx
│       ├── step-2-family/page.tsx
│       └── step-3-assets/page.tsx
└── (app)/
    ├── dashboard/page.tsx
    ├── calculator/page.tsx          # 뼈대만
    ├── simulator/page.tsx           # 뼈대만
    ├── chat/page.tsx                # 뼈대만
    └── me/page.tsx                  # 뼈대만
```

### 3.2 공통 레이아웃

- **GNB (상단 네비게이션)**: 로고(좌) + 메뉴(우). 랜딩은 투명 배경, 앱 페이지는 흰 배경
- **최대 너비**: `max-w-5xl mx-auto px-4` (콘텐츠 영역)
- **모바일 우선**: 모든 레이아웃 모바일 기준 설계, 태블릿·데스크탑 확장

---

## 4. 랜딩 페이지 (`/`)

### 레이아웃: A2 — 중앙 정렬, 카키 단색

**히어로 섹션**
- 배경: `linear-gradient(160deg, #F9F8F6 0%, #EDE9E4 100%)`
- 배지: `#F2EFE9` 배경 + `#8B8378` 텍스트, "상속 행정 가이드"
- 제목: `처음 겪는 상속,\n혼자 걱정하지 마세요`
- 서브텍스트: 17개 기관 업무·법정 기한 안내
- CTA 버튼: Primary(`무료로 시작하기`) + Secondary(`서비스 알아보기`)
- Trust 수치: `17+기관`, `6개월기한`, `무료계산기`

**문제 인식 섹션**
- PLAN.md §3의 4가지 문제를 카드 4개로 표현
- 카드 배경: `#fff`, 아이콘 + 제목 + 1줄 설명

**서비스 기능 소개 섹션**
- F1~F4(무료) 기능을 그리드로 나열
- 유료 기능(F5~F6)은 `🔒 유료` 배지 표시

**하단 CTA 섹션**
- `지금 바로 시작하세요` + Primary CTA 버튼

---

## 5. 온보딩 위저드

### 레이아웃: W1 — 상단 숫자 스텝 인디케이터

**스텝 인디케이터 (공통)**
- 완료 스텝: `bg-[#8B8378] text-white` 원 + 체크 아이콘
- 현재 스텝: `border-2 border-[#8B8378] text-[#8B8378]` 원
- 미완료 스텝: `border-2 border-[#E0E0E0] text-[#AAAAAA]` 원
- 스텝 간 연결선: 완료 `bg-[#8B8378]`, 미완료 `bg-[#E0E0E0]`

**Step 1 — 사망일 입력 (`/onboarding/step-1-date`)**
- 날짜 입력 (date picker)
- 입력 즉시 D+90, D+180 기한 미리보기 카드 표시 (긴급 스타일)

**Step 2 — 가족관계 (`/onboarding/step-2-family`)**
- 배우자 유무: 토글 버튼 그룹
- 자녀 수: 숫자 증감 인풋
- 기타 상속인: 체크박스 (부모, 형제자매)

**Step 3 — 재산 입력 (`/onboarding/step-3-assets`)**
- 부동산 / 금융자산 / 기타 탭 구조
- 항목별 금액 입력 + 추가 버튼
- 합산 금액 실시간 표시

**네비게이션**: 이전/다음 버튼. 모든 단계에서 `진행률 N/3` 표시.

---

## 6. 대시보드 (`/dashboard`)

### 레이아웃: D2 — 진행률 바 + 카드 목록

**상단 요약 카드**
- 사망자명 + 사망일
- 전체 진행률 바 (`완료 N / 전체 M`)
- 다음 긴급 기한 하이라이트 (긴급 카드 스타일)

**체크리스트 카드 목록**
- 완료: 체크 아이콘 + strikethrough + opacity 감소
- 긴급(D-30 이내): `bg-[#FAED7D]/20 border-[#F0D800]` 카드 + `⚠️ D-N` 배지
- 일반: 흰 카드 + 카키 배지
- 기관별 그룹 헤더 (주민센터, 금융기관 등)로 묶기

**더미 데이터**: 사망일 `2024-01-10` 기준 실제 체크리스트 항목 8개 이상 사용

---

## 7. 뼈대 페이지

`/calculator`, `/simulator`, `/chat`, `/me`: 각각 "준비 중" 안내 + 아이콘 + 대시보드 링크. 공통 레이아웃(GNB) 포함.

---

## 8. 기술 결정사항

- **상태관리**: 온보딩 위저드 상태는 `React Context` + `useReducer` (Zustand는 Phase 2)
- **폼**: React Hook Form + Zod (온보딩 입력 유효성 검사)
- **더미 데이터**: `lib/dummy/` 디렉토리에 TypeScript 상수로 정의
- **폰트**: `next/font/google`으로 Pretendard · Inter 로드
- **Tailwind 커스텀 테마**: `tailwind.config.ts`에 위 색상 토큰 전부 등록

---

## 9. 구현 제외 범위 (Phase 1)

- 백엔드 API, DB 연동 없음
- 인증(로그인) 없음
- OCR, AI, 결제 없음
- 실제 상속세 계산 로직 없음 (계산기 페이지는 뼈대만)
