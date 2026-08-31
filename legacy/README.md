# PERP-DEX DAY — Trader Recruitment Page

트레이더 4인 모집 랜딩 페이지. 빌드 툴 없는 **단일 정적 HTML 파일**입니다.

```
perp-dex-day-recruit/
└── index.html    # HTML + CSS + JS 전부 인라인. 외부 의존성은 Google Fonts 뿐
```

## 실행

빌드/설치 없음. 브라우저로 `index.html`을 열면 끝입니다.

```bash
open index.html
# 또는 로컬 서버로
python3 -m http.server 8080
```

배포는 정적 호스팅(Vercel / Netlify / S3 / Nginx) 어디든 파일 하나 올리면 됩니다.

---

## 1. 배포 전 반드시 채워야 하는 값

`index.html` 하단 `<script>` 최상단의 `CONFIG` 블록 **4줄**이 전부입니다.

```js
const CONFIG = {
  // 아레나 당일 (KST, ISO 8601) — 카운트다운 기준
  // ⚠️ 12:00은 임시 시작 시각. 실제 시작 시간으로 교체 필요
  eventDate: "2026-09-28T12:00:00+09:00",

  // 지원 폼 POST 엔드포인트. 비워두면 메일 초안(mailto)으로 폴백
  formEndpoint: "",

  // formEndpoint가 비었을 때 쓰는 수신 메일 주소
  fallbackEmail: "hello@perpdexday.xyz",

  // 남은 좌석 수 — hero 메타와 좌석 그리드에 노출
  seatsOpen: 4
};
```

## 2. 지원 폼 연동 (남은 작업 1순위)

현재 `formEndpoint`가 비어 있어 **제출 시 mailto 초안이 열리는 폴백 상태**입니다.
실제 수집을 하려면 엔드포인트만 꽂으면 됩니다. 전송 로직은 이미 구현되어 있습니다.

- 요청: `POST {formEndpoint}`, `Content-Type: application/json`
- 바디: 폼 필드 `name` 속성을 그대로 쓴 flat JSON

```json
{
  "name": "홍길동",
  "handle": "@gildong",
  "email": "gildong@example.com",
  "social": "@gildong_tg",
  "city": "Seoul, Korea",
  "years": "3–5 years",
  "venue": "Hyperliquid",
  "volume": "$1M – $10M",
  "proof": "https://...",
  "risk": "…",
  "why": "…",
  "available": "Yes — Sep 28 full day, plus the briefing",
  "agree": "on"
}
```

- 성공 판정: `res.ok` (2xx). 실패 시 폼 하단에 에러 메시지 노출.
- Formspree / Getform 같은 SaaS를 쓰면 URL만 넣으면 바로 동작합니다.
- 자체 API를 쓸 경우 **CORS 허용**과 스팸 방지(hCaptcha/Turnstile 등) 검토 필요.
- 개인정보 수집 항목이 있으므로 개인정보처리방침 링크 연결 필요
  (동의 체크박스 문구 안의 "event terms and privacy policy" — 현재 링크 미연결).

## 3. 디자인 시스템

기존 PERP-DEX DAY 페이지(Home / Vote)와 동일한 규칙입니다.

| 토큰 | 값 | 용도 |
|---|---|---|
| `--green` | `#CAFF5D` | 키 컬러 (CTA, 라벨, 강조) |
| `--bg` | `#000000` | 배경 |
| `--panel` | `#0C0E0B` | 카드/패널 |
| `--line` / `--line-soft` | `rgba(255,255,255,.12)` / `.07` | 헤어라인 보더 |
| `--ink` / `--ink-2` / `--ink-3` | `#F2F4EF` / 62% / 38% | 본문 계조 |

- 서체: **Space Grotesk**(제목·본문) + **Space Mono**(마이크로 라벨, 숫자, 버튼)
- 마이크로 라벨은 전부 `10px / uppercase / letter-spacing .18em`
- 모든 CSS 변수는 `:root`에 선언되어 있어 토큰만 바꾸면 전체 톤 교체 가능

## 4. 페이지 구조

| 섹션 | id | 비고 |
|---|---|---|
| Hero | `#top` | `<canvas id="matrix">` 매트릭스 레인. `prefers-reduced-motion`이면 자동 비활성 |
| 마퀴 | — | 문구 배열은 JS `items` 상수 |
| 좌석 그리드 + 카운트다운 | — | 좌석 상태는 현재 정적 마크업 (전부 OPEN) |
| Prize | `#prize` | **winner-takes-all. 2·3·4등 상금 없음** |
| The Arena | `#arena` | 대회 포맷 6카드 |
| Who we're looking for | `#who` | 필수/불필요 조건 |
| Selection process | `#process` | 5단계 |
| Apply | `#apply` | 지원 폼 |
| FAQ | `#faq` | `<details>` 네이티브 아코디언 |

## 5. 구현 노트

- 스크롤 리빌: `IntersectionObserver` + `.rv` → `.rv.in`
- 카운트다운: `setInterval` 1초, `CONFIG.eventDate` 기준. 마감 후 `00`으로 고정
- 매트릭스 레인: `requestAnimationFrame`에 ~18fps 스로틀, DPR 2 캡 (모바일 배터리 고려)
- `prefers-reduced-motion: reduce` 대응 완료 (캔버스·마퀴·리빌 정지)
- 반응형 확인 완료: 375 / 768 / 1440px 가로 오버플로 0

## 6. 남은 TODO

- [ ] `eventDate` 실제 시작 시각 확정
- [ ] `formEndpoint` 연동 + 수신함/알림 세팅
- [ ] 개인정보처리방침 · 이벤트 약관 페이지 링크 연결
- [ ] `hello@perpdexday.xyz` → 실제 운영 메일로 교체
- [ ] OG 이미지(`og:image`) 추가 — 현재 미설정
- [ ] 기존 PERP-DEX DAY 사이트에 라우트로 편입 (`/traders` 등) + 헤더 내비 연결
- [ ] 좌석 마감 시 좌석 그리드 상태 변경 방식 결정 (수동 편집 / API 연동)
- [ ] 한국어 버전 필요 여부 결정 (현재 영문 단독)
