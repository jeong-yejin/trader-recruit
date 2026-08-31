# PERP-DEX DAY — Trader Recruitment Page

트레이더 4인 모집 랜딩 페이지. 영문/국문 단일 코드베이스, **Next.js(App Router) + TypeScript**.

기존 `index.html` / `index.ko.html` 두 정적 파일을 합쳐 변환했습니다.
원본은 `legacy/`에 그대로 보관되어 있습니다.

```
perp-dex-day-recruit/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx   # 루트 레이아웃 + 로케일별 메타데이터
│   │   └── page.tsx     # 섹션 조립
│   └── globals.css      # 원본 <style> 통합 (기본=EN, KO는 html[lang="ko"] 오버라이드)
├── components/          # 섹션 컴포넌트 16개 (클라이언트 4 / 서버 12)
├── lib/
│   ├── config.ts        # 배포 전 채워야 하는 값
│   ├── fonts.ts         # next/font 설정
│   └── i18n/            # index.ts(타입) + en.ts + ko.ts
└── legacy/              # 변환 전 원본 HTML 2개 + 구 README
```

## 실행

```bash
npm install
npm run dev        # http://localhost:3000 → /en 으로 리다이렉트
npm run build      # /en, /ko 정적 프리렌더(SSG)
npm start
npm run typecheck  # tsc --noEmit
```

Node 20+ 필요. 빌드 결과는 정적 프리렌더라 Vercel / Netlify / Cloudflare 어디든 그대로 올라갑니다.

---

## 1. 배포 전 반드시 채워야 하는 값

`lib/config.ts` **4줄**이 전부입니다. 원본 `CONFIG` 블록과 동일합니다.

```ts
export const CONFIG: Config = {
  // 아레나 당일 (KST, ISO 8601) — 카운트다운 기준
  // ⚠️ 12:00은 임시 시작 시각. 실제 시작 시간으로 교체 필요
  eventDate: "2026-09-28T12:00:00+09:00",

  // 지원 폼 POST 엔드포인트. 비워두면 메일 초안(mailto)으로 폴백
  formEndpoint: "",

  // formEndpoint가 비었을 때 쓰는 수신 메일 주소
  fallbackEmail: "hello@perpdexday.xyz",

  // 남은 좌석 수 — hero 메타와 좌석 그리드에 노출
  seatsOpen: 4,
};
```

## 2. 다국어 구조

라우팅은 `/en`, `/ko` 두 개뿐입니다. `/`는 `/en`으로 307 리다이렉트, 그 외 로케일은 404
(`dynamicParams = false`).

문구는 전부 `lib/i18n/`에 있습니다. **컴포넌트에 하드코딩된 문자열은 없습니다.**

- `index.ts` — `Dictionary` 타입 + `getDictionary()`
- `en.ts` / `ko.ts` — 두 구현체

새 문구를 추가하려면 `Dictionary`에 필드를 먼저 넣습니다. 한쪽 언어를 빠뜨리면
`npm run typecheck`가 **컴파일 에러로 잡아냅니다.** 번역 누락이 런타임까지 못 갑니다.

언어를 하나 더 붙이려면 `LOCALES` 배열에 코드를 넣고 사전 파일을 하나 만들면 됩니다.

### 사전 값은 전부 순수 데이터

`{name}`, `{email}` 같은 플레이스홀더를 쓰고 `ApplyForm`의 `fill()`이 치환합니다.
함수는 서버 → 클라이언트 컴포넌트 경계를 넘지 못하기 때문입니다(빌드 에러).

```ts
error: "Submission failed. Email us at {email}",
mailSubject: "[PERP-DEX DAY] Trader application — {name}",
```

### CSS 오버라이드

`app/globals.css`의 기본값은 영문 기준입니다. 국문 차이는 파일 하단에
`html[lang="ko"]` 접두 규칙 **21개**로만 모여 있습니다. 한글 줄바꿈·자간·폰트 크기 보정입니다.
공통 스타일을 고칠 땐 상단만, 국문 조판을 고칠 땐 하단만 건드리면 됩니다.

## 3. 폰트

- **Space Grotesk** / **Space Mono** — `next/font/google`로 셀프 호스팅. CSS 변수
  `--font-space-grotesk`, `--font-space-mono`로 주입됩니다.
- **IBM Plex Sans KR** — `/ko`에서만 `<link>`로 로드합니다. Google이 한글 커버리지를
  이름 없는 `unicode-range` 청크 90여 개로 쪼개 놓아서 `next/font`의 `subsets`
  (`latin | latin-ext`)로는 지정할 수 없습니다. `lib/fonts.ts` 주석에 근거가 있습니다.

셀프 호스팅 덕에 **원본에 있던 폰트 스왑 레이아웃 밀림이 사라졌습니다.** 원본은 Space Mono가
네트워크에서 도착하기 전 폴백 메트릭으로 `<select>` 높이를 잡고 다시 계산하지 않아,
폼이 4px 낮게 그려진 채 남아 있었습니다(강제 리플로우하면 새 버전과 정확히 같은 높이가 됩니다).

## 4. 지원 폼 연동 (남은 작업 1순위)

현재 `formEndpoint`가 비어 있어 **제출 시 mailto 초안이 열리는 폴백 상태**입니다.
실제 수집을 하려면 엔드포인트만 꽂으면 됩니다. 전송 로직은 `components/ApplyForm.tsx`에
이미 구현되어 있습니다.

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
  Next 라우트 핸들러(`app/api/apply/route.ts`)를 추가하면 CORS는 없어집니다.
- 개인정보 수집 항목이 있으므로 개인정보처리방침 링크 연결 필요
  (동의 체크박스 문구 안의 "event terms and privacy policy" — 현재 링크 미연결).

## 5. 디자인 시스템

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

## 6. 페이지 구조

| 섹션 | id | 컴포넌트 | 비고 |
|---|---|---|---|
| Hero | `#top` | `Hero` + `MatrixRain` | 매트릭스 레인. `prefers-reduced-motion`이면 자동 비활성 |
| 마퀴 | — | `Marquee` | 서버 렌더. JS 없이도 보입니다 |
| 좌석 그리드 + 카운트다운 | — | `SeatBand` + `Countdown` | 좌석 상태는 현재 정적 마크업 (전부 OPEN) |
| Prize | `#prize` | `Prize` | **winner-takes-all. 2·3·4등 상금 없음** |
| The Arena | `#arena` | `Arena` | 대회 포맷 6카드 |
| Who we're looking for | `#who` | `Who` | 필수/불필요 조건 |
| Selection process | `#process` | `Process` | 5단계 |
| Apply | `#apply` | `Apply` + `ApplyForm` | 지원 폼 |
| FAQ | `#faq` | `Faq` | `<details>` 네이티브 아코디언 |

클라이언트 컴포넌트는 4개뿐입니다: `MatrixRain`, `Countdown`, `ScrollReveal`, `ApplyForm`.
나머지 12개는 서버 컴포넌트라 JS 번들에 들어가지 않습니다.

## 7. 구현 노트

- 스크롤 리빌: `IntersectionObserver` + `.rv` → `.rv.in`, `(i % 4) * 70ms` 스태거
- 카운트다운: `setInterval` 1초, `CONFIG.eventDate` 기준. 마감 후 `00`으로 고정.
  SSR/CSR 불일치를 피하려고 첫 렌더는 `--`로 시작합니다
- 매트릭스 레인: `requestAnimationFrame`에 ~18fps 스로틀, DPR 2 캡 (모바일 배터리 고려).
  언마운트 시 rAF·리사이즈 리스너 정리 (원본은 누수)
- `prefers-reduced-motion: reduce` 대응 완료 (캔버스·마퀴·리빌 정지)
- 반응형 확인 완료: 375 / 1440px, EN·KO 4개 페이지 전부 가로 오버플로 0

### 원본 대비 의도적 변경

1. 섹션들을 `<main>`으로 감쌈
2. 동의 문구를 `<label htmlFor="agree">`로 감쌈 — 문구 클릭으로 체크 토글 가능
3. `.form-status`에 `role="status"` — 에러 메시지가 스크린리더에 읽힘
4. 매트릭스 캔버스에 `aria-hidden="true"`
5. 마퀴를 JS 주입 → 서버 렌더로 변경
6. 영문 원본의 카피 버그는 그대로 유지: "Four rounds, fast"인데 단계는 5개
   (국문은 "다섯 단계"로 맞음). 고치려면 `lib/i18n/en.ts`의 `process.kicker`

## 8. 남은 TODO

- [ ] `eventDate` 실제 시작 시각 확정
- [ ] `formEndpoint` 연동 + 수신함/알림 세팅
- [ ] 개인정보처리방침 · 이벤트 약관 페이지 링크 연결
- [ ] `hello@perpdexday.xyz` → 실제 운영 메일로 교체
- [ ] OG 이미지(`og:image`) 추가 — 현재 미설정
- [ ] `metadataBase`에 운영 도메인 설정 — 현재 canonical/alternates가 상대 경로
- [ ] 기존 PERP-DEX DAY 사이트에 라우트로 편입 (`/traders` 등) + 헤더 내비 연결
- [ ] 좌석 마감 시 좌석 그리드 상태 변경 방식 결정 (수동 편집 / API 연동)
- [ ] 루트의 `index.html` / `index.ko.html` 정리 — `legacy/`에 사본이 있어 지워도 됩니다
# trader-recruit
