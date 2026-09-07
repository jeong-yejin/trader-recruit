# PERP-DEX DAY — 트레이더 모집 페이지

무기한 선물 트레이딩 대회에 나갈 트레이더를 모집하는 랜딩 페이지입니다.
이벤트 2개 × 언어 2개 = 페이지 4개를 **하나의 컴포넌트 트리**로 렌더합니다.

Next.js 16 App Router · React 19 · TypeScript. 상태 관리 라이브러리 없음.
CSS 프레임워크 없음 — 레이아웃은 `public/resources/css/` 의 기반 스타일시트가 담당합니다.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 정적 생성
npm test           # node --test
npx tsc --noEmit   # 타입 체크
```

> `npx next lint` 는 Next 16 에서 동작하지 않습니다. 타입 체크는 `tsc` 로 하세요.

---

## 라우트

| URL | 결과 |
|---|---|
| `/` | `/en` 으로 리다이렉트 (`next.config.ts`) |
| `/en` · `/ko` | 첫 번째 이벤트로 리다이렉트 → `/{lang}/perp-dex-day` |
| `/en/perp-dex-day` · `/ko/perp-dex-day` | 정적 생성 |
| `/en/token-2049` · `/ko/token-2049` | 정적 생성 |
| 그 외 전부 | 404 (`app/global-not-found.tsx`) |

`dynamicParams = false` 라 목록에 없는 언어·이벤트는 렌더되지 않고 404 로 떨어집니다.

---

## 폴더별 역할

### `app/` — 라우팅과 문서 껍데기

| 파일 | 역할 |
|---|---|
| `[lang]/layout.tsx` | **루트 레이아웃.** `<html lang>` 설정, 스타일시트 6장을 순서대로 링크, `TemplateScripts` 마운트. **스타일 순서를 바꾸면 페이지가 깨집니다** |
| `[lang]/page.tsx` | `/en` · `/ko` → 기본 이벤트로 리다이렉트 |
| `[lang]/[event]/page.tsx` | 실제 4개 페이지. `generateStaticParams` 로 조합 생성, `generateMetadata` 로 OG 태그 |
| `global-not-found.tsx` | 404. 로케일을 알 수 없어 영문 고정. 레이아웃을 거치지 않아 CSS 가 파일 안에 들어 있습니다 |

루트 레이아웃이 동적 세그먼트(`[lang]`) 안에 있어서 일반 `not-found.tsx` 를 쓸 수 없습니다.
`next.config.ts` 의 `experimental.globalNotFound` 가 필요합니다.

### `features/` — 도메인 로직

| 경로 | 역할 |
|---|---|
| `recruitment/RecruitPage.tsx` | 섹션 순서를 정하는 유일한 곳. 4개 페이지가 전부 이걸 렌더합니다 |
| `application/ApplyForm.tsx` | 지원 폼. 검증·제출·중복 체크·완료 화면 전환 |
| `application/ApplySection.tsx` | 폼을 감싸는 섹션 (제목, 안내 문구, 문의 링크) |
| `application/components/FormField.tsx` | 라벨 + 에러 메시지 래퍼 |
| `application/components/SelectField.tsx` | 커스텀 셀렉트. 네이티브 `<select>` 를 뒤에 두고 값을 동기화 |
| `application/components/ApplySuccess.tsx` | 완료 화면. `body` 로 포털, 뒤 페이지는 `inert` |
| `application/form-submit.ts` | `fill()` — 카피의 `{slot}` 치환 |
| `application/form-submit.test.ts` | 위 헬퍼 테스트 |

### `components/` — 화면 조각 (상태 없음)

| 폴더 | 역할 |
|---|---|
| `layout/` | `Header` (내비 + 이벤트 탭 + 언어 토글), `Footer`, `StickyCta` (떠 있는 지원 바), `TemplateScripts` |
| `sections/` | 페이지를 위에서 아래로 구성하는 섹션 12개. `Hero`, `Marquee`, `About`, `SeatBand`, `Prize`, `Arena`, `Partners`, `Who`, `Process`, `Faq`, `FinalCta`, `Countdown`. `ArenaCarousel` 은 `Arena` 안에서만 쓰입니다 |
| `visuals/` | 히어로 배경 4종. `MatrixRain` (perp-dex-day, canvas), `StageBackdrop` (token-2049, video), `CodeRain`, `RetroGrid` |

`TemplateScripts` 는 `public/resources/js/` 의 스크립트 4개를 **순차** 로드합니다.
`next/script` 의 `afterInteractive` 는 순서를 보장하지 않아 `style.js` 가 jQuery 보다 먼저 실행되면 전체 바인딩이 죽습니다.

`visuals/` 는 전부 `prefers-reduced-motion: reduce` 를 확인하고 애니메이션을 멈춥니다.

### `lib/` — 데이터와 설정

| 파일 | 역할 |
|---|---|
| `config.ts` | 배포 전 확인할 값 4개 |
| `i18n/types.ts` | `Dictionary` 타입. 사전 4개가 전부 이 타입을 만족해야 합니다. 카피 항목을 추가하려면 여기부터 |
| `i18n/routes.ts` | `LOCALES`, `EVENTS`, 타입 가드. `EVENTS[0]` 이 기본 이벤트 |
| `i18n/dictionaries.ts` | 이벤트 × 로케일 → 사전 조회 |
| `i18n/index.ts` | 위 세 개의 공개 진입점. 다른 폴더는 `@/lib/i18n` 만 임포트합니다 |
| `i18n/perp-dex-day/{ko,en}.ts` | perp-dex-day 카피 전문 |
| `i18n/token-2049/{ko,en}.ts` | token-2049 카피 전문 |
| `events/assets.ts` | 이벤트별 이미지 경로 매핑 |

**카피를 고치려면 `lib/i18n/` 만 건드리면 됩니다.** 컴포넌트에 하드코딩된 문자열은 없습니다.

### `public/resources/` — 기반 에셋 (⚠️ 수정 금지)

| 파일 | 편집 |
|---|---|
| `css/setting.css` | ❌ 수정 금지 |
| `css/plugin.css` | ❌ 수정 금지 |
| `css/base.css` | ❌ 수정 금지. 디자인 토큰(`--ff-ko1`, `--ht-lg` 등)이 여기 선언됨 |
| `css/style.css` | ❌ 수정 금지 |
| `css/project.css` | ✅ **여기만 편집.** 마지막에 로드되어 위 4장을 덮습니다 |
| `js/*.js` | ❌ 수정 금지. jQuery 기반 4개, DOM 클래스명에 바인딩됨 |

위 4장은 직접 고치지 마세요. 덮어쓸 게 있으면 `project.css` 에 쓰세요.
컴포넌트의 `contest-N1` 같은 클래스명과 `id="IvMte69CW4"` 같은 id 는 **`js/*.js` 가 찾는 선택자** 입니다. 바꾸면 동작이 멈춥니다.

### 나머지

| 경로 | 역할 |
|---|---|
| `legacy/` | Next 로 옮기기 전의 단일 HTML 버전. 참고용, 빌드에 안 들어감 |
| `art-src/` | 이미지 원본 5장. `scripts/dither.mjs` 의 입력 |
| `scripts/dither.mjs` | 3D 렌더 이미지를 하프톤 도트로 변환. Playwright 필요(의존성 아님), 결과물은 커밋되어 있어 재실행할 일 거의 없음 |

---

## 유저 플로우

```
/  →  /en  →  /en/perp-dex-day          (next.config.ts 리다이렉트 → app/[lang]/page.tsx)
                     │
                     ├─ 언어 토글 → /ko/perp-dex-day   (같은 이벤트, 로케일만 교체)
                     ├─ 이벤트 탭 → /en/token-2049     (같은 로케일, 이벤트만 교체)
                     └─ 지원 CTA (Hero · StickyCta · FinalCta) → #apply 앵커
                              │
                              ▼
                        지원 폼 14개 컨트롤
                              │
                        제출 ─┬─ 검증 실패 → 필드별 메시지 + 배너, 첫 실패 필드로 스크롤
                              │              (입력하면 그 필드 메시지 즉시 해제)
                              ├─ 중복 이메일 → email 필드 메시지, 이메일로 스크롤
                              └─ 통과 → 완료 화면 (ApplySuccess)
                                          │  body 스크롤 잠금 + #page inert
                                          └─ "돌아가기" → 현재 경로 새로고침
```

**필수/선택 구분** (`ApplyForm.tsx`)

| 필수 (요건 7개 · 컨트롤 8개) | 선택 (6개) |
|---|---|
| `name`, `email`, `venue`, `volume`, `available`, `agree`, **`telegram` 또는 `x` 중 하나** | `handle`, `city`, `years`, `proof`, `risk`, `why` |

`telegram`/`x` 쌍은 HTML `required` 로 표현할 수 없어 `onSubmit` 에서 따로 검사합니다.
둘 중 하나만 채우면 두 메시지가 같이 사라집니다.

---

## 설정

전부 `lib/config.ts` 에 있습니다. 배포 전에 확인하세요.

| 값 | 현재 | 설명 |
|---|---|---|
| `formEndpoint` | `""` | 폼이 POST 할 주소. 비어 있으면 전송하지 않습니다 |
| `eventDate` | 이벤트별 ISO 8601 | 카운트다운 기준. 12:00 은 임시 시각 |
| `contactTelegram` | `reboundx_cs` | 문의 핸들. 전송 실패 안내에도 쓰입니다 |
| `seatsOpen` | `3` | 남은 좌석 수. 좌석 그리드가 나머지를 `taken` 으로 표시 |

`formEndpoint` 를 채우면 `POST {endpoint}` 로 `Content-Type: application/json`,
폼 `name` 속성을 그대로 쓴 flat JSON 을 보냅니다. 전송 로직은 이미 구현되어 있습니다.
