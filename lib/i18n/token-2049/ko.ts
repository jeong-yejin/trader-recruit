/*
 * TODO — this file is a verbatim copy of perp-dex-day/, made so the TOKEN 2049
 * tab renders instead of 404ing. Every fact in it still describes the Seoul
 * event: the date, the venue, the seat count, the prize, the form questions
 * and the FAQ. Nothing below has been checked against TOKEN 2049 Singapore.
 *
 * Do not ship this tab to applicants until the copy is replaced.
 */
import type { Dictionary } from "../index";

export const ko: Dictionary = {
  a11y: { skip: "본문으로 건너뛰기", menu: "메뉴 열기", events: "행사 선택" },
  meta: {
    title: "PERP-DEX DAY / 트레이더 모집",
    description:
      "2026년 9월 28일 서울에서 열리는 무기한 선물 트레이딩 대회에 설 트레이더 네 명을 찾고 있어요.</br> 1위는 TOKEN 2049 싱가포르 대회에 나가고, 항공과 숙소는 저희가 준비해요.",
    ogTitle: "PERP-DEX DAY / 트레이더 모집",
    ogDescription:
      "자리는 네 개, 1위는 항공과 숙소를 받고 TOKEN 2049 싱가포르 대회에 나가요.",
  },

  nav: {
    prize: "1위 혜택",
    arena: "대회 방식",
    who: "모집 대상",
    process: "선발 과정",
    faq: "자주 묻는 질문",
    apply: "지원하기",
  },

  hero: {
    titleTop: "Four seats.",
    titleLit: "One arena.",
    sub: [
      [
        {
          t: "네 명의 트레이더가 실제 계좌로 거래하고, 순위는 실시간으로 공개돼요.",
          mark: true,
        },
      ],
      [{ t: "1위에게는 싱가포르 대회 참가를 위한 항공과 숙소를 지원해요" }],
    ],
    ctaPrimary: "지원서 작성하기",
  },

  marquee: [
    "무대 위에서 펼치는 실시간 트레이딩",
    "거래 자금 전액 지원",
    "단 한 명의 우승자",
    "우승자는 싱가포르로",
    "항공과 숙소 지원",
    "실제 계좌로 거래하는 실제 자금",
  ],

  seat: {
    status: "모집 중",
    note: "아직 비어 있어요.",
    takenStatus: "마감",
    takenNote: "이미 확정된 자리예요.",
    remaining: "네 자리 중 {n}자리가 남았어요",
  },

  countdown: {
    label: "대회까지 남은 시간",
    units: { d: "일", h: "시간", m: "분", s: "초" },
  },

  prize: {
    title: ["대회에서 1위를 하면", "싱가포르로 가요."],
    intro: "싱가포르에는 한 명만 가요.",
    kicker: "1위가 받는 것",
    heading: [
      { t: "싱가포르 트레이딩 대회 출전권", mark: true },
      { t: ", 가는 비용까지 함께 드려요." },
    ],
    items: [
      {
        k: "01",
        lead: "출전권",
        body: "싱가포르에서 열리는 트레이딩 대회에 바로 나갈 수 있어요.",
      },
      {
        k: "02",
        lead: "항공권",
        body: "서울과 싱가포르를 오가는 왕복 항공권을 저희가 예약하고 결제해요.",
      },
      {
        k: "03",
        lead: "숙소",
        body: "대회 기간 숙소 비용을 저희가 내요.",
      },
    ],
    sideNote:
      "상금은 1위에게만 주어지며, 참가자 전원의 손실금은 저희가 부담해요.",
  },

  arena: {
    prev: "이전 카드",
    next: "다음 카드",
    title: ["대회는", "이렇게 열려요."],
    intro:
      "관객이 거래 화면을 그대로 보면서 응원하는, e-스포츠 같은 트레이딩 대회예요.",
    cards: [
      {
        idx: "01 / 방식",
        title: "네 명이 같은 시간에 거래해요",
        body: "네 명 모두 포지션 없이, 같은 시간에 같은 종목으로 거래해요.",
      },
      {
        idx: "02 / 자금",
        title: "자금은 저희가 준비해요",
        body: "네 자리 모두 저희가 준비한 같은 금액으로 시작하고, 잃은 금액도 저희가 부담해요.",
      },
      {
        idx: "03 / 순위",
        title: "손익 순위표가 실시간으로 올라가요",
        body: "순위는 손익으로만 정하고, 큰 화면에 실시간으로 보여요.",
      },
      {
        idx: "04 / 중계",
        title: "화면이 그대로 중계돼요",
        body: "포지션과 진입·청산 가격이 큰 화면에 뜨고, 그 위에 e-스포츠처럼 해설이 붙어요.",
      },
      {
        idx: "05 / 관객",
        title: "관객이 응원할 트레이더를 골라요",
        body: "시작 전에 투표하지만, 결과가 순위를 바꾸지는 않아요.",
      },
      {
        idx: "06 / 장소",
        title: "코리아 블록체인 위크",
        body: "KBW 2026 공식 일정으로, 2026년 9월 28일 서울에서 열려요.",
      },
    ],
  },

  who: {
    title: ["이런 트레이더를", "찾고 있어요."],
    intro:
      "얼마나 큰 돈을 굴리는지보다, 사람들이 지켜보는 자리에서도 평소대로 거래하는지를 봐요.",
    haveLabel: "이런 분이면 좋아요",
    have: [
      "지금 무기한 선물을 거래하고 있어요.",
      "거래소 손익 화면, 읽기 전용 API 키, 공개 프로필 중 하나로 매매 기록을 보여줄 수 있어요.",
      "본인의 리스크 관리 방식을 짧게 설명할 수 있어요.",
      "카메라와 순위표 앞에서도 평소처럼 거래할 수 있어요.",
      "9월 28일과 전날 설명회까지, 서울에서 이틀을 낼 수 있어요.",
      "싱가포르에 바로 갈 수 있는 여권이 있어요.",
    ],
    not: [
      "계정이 아니라 트레이더를 뽑기 때문에 팔로워 수는 안 봐요.",
      "대회 자금은 저희가 준비해서 본인 돈은 필요 없어요.",
      "평소 쓰던 거래소 그대로 하시면 돼요.",
      "기관 경력 없는 개인 트레이더도 환영해요.",
    ],
  },

  process: {
    title: ["이렇게 뽑아요."],
    intro: "다섯 단계로 나눠서 빠르게 봐요.",
    steps: [
      {
        n: "01",
        title: "지원서 작성",
        body: "연락처, 주로 쓰는 거래소, 매매 기록 링크만 적으면 5분이면 끝나요.",
        when: "지금 · 상시 접수",
      },
      {
        n: "02",
        title: "매매 기록 확인",
        body: "보내 주신 자료로 손익과 리스크 관리 방식을 봐요.",
        when: "5일 안에",
      },
      {
        n: "03",
        title: "30분 화상 인터뷰",
        body: "매매 원칙, 가장 크게 잃었던 순간, 관객 앞에서 어떻게 할지를 편한 언어로 물어봐요.",
        when: "개별 안내",
      },
      {
        n: "04",
        title: "자리 확정",
        body: "계약서와 참가 안내를 보내드리고, 대회 페이지에 이름이 올라가요.",
        when: "행사 주간 전",
      },
      {
        n: "05",
        title: "대회 당일",
        body: "현장 등록과 장비 점검을 마치면 시작돼요.",
        when: "9월 28일 · 서울",
      },
    ],
  },

  apply: {
    kicker: "지원서",
    title: ["지원서를", "작성해 주세요."],
    kv: [
      { k: "걸리는 시간", v: "약 5분이에요." },
      { k: "평가 기준", v: "매매 기록 링크와 리스크 관리 방식이에요." },
      {
        k: "보안",
        v: "출금 권한이 있는 키나 시드 문구, 비밀번호 대신 읽기 전용 키나 화면 캡처를 보내 주세요.",
      },
    ],
    contactLabel: "문의",
    selectPlaceholder: "선택해 주세요",
    fields: {
      name: { label: "이름", placeholder: "실명" },
      handle: { label: "닉네임", placeholder: "순위표에 올라갈 이름" },
      email: { label: "이메일", placeholder: "you@domain.com" },
      social: { label: "Telegram 또는 X", placeholder: "@아이디" },
      city: { label: "사는 곳", placeholder: "도시, 국가" },
      years: {
        label: "무기한 선물 거래 경력",
        options: ["1년 미만", "1~2년", "3~5년", "5년 이상"],
      },
      venue: {
        label: "주로 쓰는 거래소",
        options: [
          "Variational",
          "Lighter",
          "Aster",
          "Extended",
          "Hyperliquid",
          "Backpack",
          "기타",
        ],
      },
      volume: {
        label: "한 달 평균 거래대금",
        options: [
          "10만 달러 미만",
          "10만 ~ 100만 달러",
          "100만 ~ 1,000만 달러",
          "1,000만 달러 이상",
        ],
      },
      proof: {
        label: "매매 기록 링크",
        placeholder: "거래소 손익 화면, 순위표 프로필, 공개 기록 등",
      },
      risk: {
        label: "리스크 관리 방식",
        placeholder:
          "한 번에 얼마를 넣는지, 최대 레버리지, 손절 기준, 거래를 쉬는 날을 적어 주세요",
      },
      why: {
        label: "지원 이유",
        placeholder: "선택 항목이니 짧게 써도 돼요",
      },
      available: {
        label: "9월 28일 서울에 올 수 있나요?",
        options: [
          "네, 종일 참여할 수 있어요.",
          "네, 일정 조율이 필요해요",
          "아직 확실하지 않아요",
        ],
      },
    },
    agree:
      "제출한 매매 기록이 본인의 것이고 서울 현장에 직접 올 수 있다는 점, 이벤트 약관과 개인정보처리방침, 손실 위험에 모두 동의해요.",
    submit: "지원서 보내기",
    status: {
      missing: "별표(*) 표시된 칸을 채워 주세요",
      required: "꼭 입력해 주세요",
      mailto: "메일 앱에서 보내기를 누르면 지원서가 접수돼요",
      sending: "보내는 중이에요…",
      ok: "지원서가 접수됐고 모든 분께 답장드릴게요",
      error: "메일이 전송되지 않았으니 {email} 로 직접 보내 주세요",
    },
    mailSubject: "PERP-DEX DAY 트레이더 지원서: {name}",
  },

  faq: {
    title: ["자주 묻는 질문."],
    intro: "여기 없는 내용은 메일로 물어보시면 직접 답장드려요.",
    items: [
      {
        q: "한국에 살지 않아도 지원할 수 있나요?",
        a: "지원할 수 있어요. 2026년 9월 28일 서울 현장에 직접 오셔야 하니, 지원서에 사는 곳을 적어 주시면 이동 방법을 함께 이야기해요.",
      },
      {
        q: "매매 기록은 어떻게 보내나요?",
        a: "거래소 손익 화면, 공개 프로필, 읽기 전용 API 키 중 하나면 돼요. 출금 권한이 있는 키나 시드 문구, 비밀번호는 저희가 절대 물어보지 않으니 보내지 마세요.",
      },
      {
        q: "종목과 레버리지는 어떻게 정하나요?",
        a: "종목과 최대 레버리지, 리스크 한도는 전날 설명회에서 네 자리 모두 똑같이 정하고, 한도를 넘기면 실격이에요.",
      },
      {
        q: "영어를 못해도 괜찮나요?",
        a: "괜찮아요. 인터뷰와 대회 모두 편한 언어로 하면 되고, 무대에는 통역이 있어요.",
      },
      {
        q: "제 장비를 가져가도 되나요?",
        a: "PC와 모니터는 네 자리 모두 같은 사양으로 준비하고, 키보드와 마우스는 쓰던 걸 가져오셔도 돼요.",
      },
    ],
  },

  final: {
    kicker: "자리가 얼마 남지 않았어요.",
    title: ["네 자리 중,", "싱가포르행 티켓은 단 한 장"],
    body: "지원서는 순서대로 확인하며, 네 자리가 모두 차면 모집을 마감해요.",
    cta: "지원서 작성하기",
  },

  footer: { backToTop: "맨 위로 가기" },
};
