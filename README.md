# PERP-DEX DAY — 트레이더 모집 페이지

무기한 선물 트레이딩 대회에 나갈 트레이더를 모집하는 랜딩 페이지입니다.
이벤트 2개 × 언어 2개 = 페이지 4개를 **하나의 컴포넌트 트리**로 렌더합니다.

Next.js 16 App Router · React 19 · TypeScript. 상태 관리 라이브러리 없음.
CSS 프레임워크 없음 — 레이아웃은 구매한 TemplateHouse 템플릿이 담당합니다.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 정적 생성
npm test           # node --test, 테스트 4개
npm run typecheck  # tsc --noEmit
```

> `npx next lint` 는 Next 16 에서 동작하지 않습니다. `typecheck` 와 `build` 로 대신하세요.

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
| `[lang]/layout.tsx` | **루트 레이아웃.** `<html lang>` 설정, 스타일시트 6장을 순서대로 링크, `TemplateScripts` 마운트. 스타일 순서를 바꾸면 페이지가 깨집니다 |
| `[lang]/page.tsx` | `/en`, `/ko` 를 첫 이벤트로 리다이렉트 |
| `[lang]/[event]/page.tsx` | 실제 페이지. `generateStaticParams` 로 4개 조합을 굽고, `generateMetadata` 로 OG 태그를 이벤트별로 씁니다 |
| `global-not-found.tsx` | 404 화면. 루트 레이아웃이 동적 세그먼트(`[lang]`) 안에 있어 `not-found.tsx` 를 쓸 수 없습니다. 문서 전체를 직접 반환하며 영문 고정. `next.config.ts` 의 `experimental.globalNotFound` 필요 |

### `features/` — 도메인 로직

지원서 제출이라는 **하나의 기능**만 들어 있습니다. 상태를 가진 코드는 여기 뿐입니다.

| 파일 | 역할 |
|---|---|
| `application/ApplyForm.tsx` | 폼 전체. 검증, 중복 이메일 차단, 전송, 성공 화면 전환. 이 저장소에서 가장 복잡한 파일 |
| `application/ApplySection.tsx` | 폼을 감싸는 섹션 레이아웃 |
| `application/components/FormField.tsx` | 라벨 + 필수 표시 + 오류 메시지 한 줄 |
| `application/components/SelectField.tsx` | 네이티브 `<select>` 를 값의 원본으로 두고 그 위에 combobox 를 그립니다. 키보드 조작 직접 구현 |
| `application/components/ApplySuccess.tsx` | 제출 완료 화면. `<body>` 로 포털되고 뒤 페이지를 `inert` 처리 |
| `application/form-submit.ts` | `{placeholder}` 치환 헬퍼 |
| `application/form-submit.test.ts` | 위 헬퍼 테스트 |

### `components/` — 화면 조각 (상태 없음)

| 폴더 | 역할 |
|---|---|
| `layout/` | `Header` (내비 + 이벤트 탭 + 언어 토글), `Footer`, `StickyCta` (떠 있는 지원 바), `TemplateScripts` |
| `sections/` | 페이지를 위에서 아래로 구성하는 섹션 12개. `Hero`, `Marquee`, `About`, `SeatBand`, `Prize`, `Arena`, `Partners`, `Who`, `Process`, `Faq`, `FinalCta`, `Countdown`. `ArenaCarousel` 은 `Arena` 안에서만 쓰입니다 |
| `visuals/` | 히어로 배경 4종. `MatrixRain` (perp-dex-day, canvas), `StageBackdrop` (token-2049, video), `CodeRain`, `RetroGrid` |

`TemplateScripts` 는 템플릿 스크립트 4개를 **순차** 로드합니다. `next/script` 의 `afterInteractive` 는 순서를 보장하지 않아 `style.js` 가 jQuery 보다 먼저 실행되면 전체 바인딩이 죽습니다.

`visuals/` 는 전부 `prefers-reduced-motion: reduce` 를 확인하고 애니메이션을 멈춥니다.

### `lib/` — 데이터와 설정

| 파일 | 역할 |
|---|---|
| `config.ts` | **배포 전 채워야 하는 값 5개.** 아래 "배포 전 체크리스트" 참고 |
| `i18n/types.ts` | `Dictionary` 타입. 사전 4개가 전부 이 타입을 만족해야 합니다. 카피 항목을 추가하려면 여기부터 |
| `i18n/routes.ts` | `LOCALES`, `EVENTS`, 타입 가드. `EVENTS[0]` 이 기본 이벤트 |
| `i18n/dictionaries.ts` | 이벤트 × 로케일 → 사전 조회 |
| `i18n/index.ts` | 위 세 개의 공개 진입점. 다른 폴더는 `@/lib/i18n` 만 임포트합니다 |
| `i18n/perp-dex-day/{ko,en}.ts` | perp-dex-day 카피 전문 |
| `i18n/token-2049/{ko,en}.ts` | token-2049 카피 전문 |
| `events/assets.ts` | 이벤트별 이미지 경로 매핑 (상품 아트, 프로세스 아트) |

**카피를 고치려면 `lib/i18n/` 만 건드리면 됩니다.** 컴포넌트에 하드코딩된 문자열은 없습니다.

### `public/resources/` — 구매한 템플릿 (⚠️ 수정 금지)

| 파일 | 편집 |
|---|---|
| `css/setting.css` | ❌ 벤더 |
| `css/plugin.css` | ❌ 벤더 |
| `css/templatehouse.css` | ❌ 벤더. 디자인 토큰(`--ff-ko1`, `--ht-lg` 등)이 여기 선언됨 |
| `css/style.css` | ❌ 벤더 |
| `css/project.css` | ✅ **여기만 편집.** 마지막에 로드되어 위 4장을 덮습니다 |
| `js/*.js` | ❌ 벤더 4개. jQuery 기반, DOM 클래스명에 바인딩됨 |

벤더 시트를 고치면 템플릿 업데이트 때 날아갑니다. 덮어쓸 게 있으면 `project.css` 에 쓰세요.
컴포넌트의 `contest-N1` 같은 클래스명과 `id="IvMte69CW4"` 같은 id 는 **벤더 JS 가 찾는 선택자** 입니다. 바꾸면 동작이 멈춥니다.

이미지: `images/` 13개(상품·프로세스 아트), `exchange-logo/` 5개(파트너 로고), `icons/` 5개, `logo/` 1개.

### 나머지

| 경로 | 역할 |
|---|---|
| `legacy/` | Next 로 옮기기 전의 단일 HTML 버전. 참고용, 빌드에 안 들어감 |
| `art-src/` | 이미지 원본 5장. `scripts/dither.mjs` 의 입력 |
| `scripts/dither.mjs` | 템플릿 3D 렌더를 하프톤 도트로 변환. Playwright 필요(의존성 아님), 결과물은 커밋되어 있어 재실행할 일 거의 없음 |
| `docs/superpowers/` | 아키텍처 리팩터링 계획·설계 문서. `.gitignore` 대상 |
| `AGENTS.md` · `CLAUDE.md` | AI 에이전트용 지침. `.gitignore` 대상이라 clone 하면 없습니다 |

---

## 배포 전 체크리스트

전부 `lib/config.ts` 에 있습니다.

| 값 | 현재 | 필요한 작업 |
|---|---|---|
| `formEndpoint` | `""` | **최우선.** 비어 있으면 지원서가 어디로도 안 갑니다. 화면은 "지원 완료" 라고 말하는데 실제로는 버려집니다 |
| `eventDate` | 12:00 임시 | 실제 시작 시각 확정 |
| `contactTelegram` | `reboundx_cs` | 확인. 전송 실패 안내도 이 핸들을 씁니다 |
| `seatsOpen` | `3` | 좌석 차면 수동 조정 |

`formEndpoint` 를 채우면 폼은 `POST {endpoint}` 로 `Content-Type: application/json`, 폼 `name` 속성을 그대로 쓴 flat JSON 을 보냅니다. 전송 로직은 이미 구현되어 있습니다.

### 알려진 빈 구멍

- **중복 지원 차단이 브라우저 로컬입니다.** 백엔드가 없어 이메일 목록이 `localStorage` 에 있습니다. 다른 브라우저·시크릿 창·데이터 삭제로 전부 우회됩니다. `formEndpoint` 를 붙일 때 서버로 옮기세요
- **이미 지원한 사람이 빈 폼을 다시 채웁니다.** 마운트 시점에는 확인하지 않고 제출할 때만 막습니다
- **카운트다운에 종료 상태가 없습니다.** 이벤트 날짜가 지나면 `00:00:00:00` 을 계속 표시합니다
- **좌석 4개가 다 차도 폼이 열려 있습니다.** `seatsOpen: 0` 은 좌석 표시만 바꾸고 폼은 그대로 살아 있습니다
- **동의 체크박스의 약관·개인정보처리방침 링크가 연결되지 않았습니다**
