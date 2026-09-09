import type { Dictionary } from "../types.ts";

export const ko: Dictionary = {
  a11y: {
    skip: "본문으로 건너뛰기",
    menu: "메뉴 열기",
    events: "행사 선택",
  },

  meta: {
    title: "PERP-DEX DAY / 트레이더 모집",
    description:
      "Variational, Lighter, Aster, Extended, MetaMask와 함께 2026년 9월 28일 서울에서 열리는 실시간 무기한 선물 트레이딩 대회에 참가할 트레이더 네 명을 찾고 있어요. 1위는 Kalshi와 함께하는 Asia Trading Championship에 진출해요.",
    ogTitle: "PERP-DEX DAY / 트레이더 모집",
    ogDescription:
      "자리는 네 개, 싱가포르행은 단 한 자리. 1위는 항공과 숙소를 지원받고 Asia Trading Championship에 진출해요.",
  },

  nav: {
    about: "행사 소개",
    prize: "1위 혜택",
    arena: "대회 방식",
    partners: "참여 파트너",
    who: "모집 대상",
    process: "선발 과정",
    faq: "자주 묻는 질문",
    apply: "지원하기",
  },

  hero: {
    kicker: "PERP-DEX DAY · 코리아 블록체인 위크 2026",
    titleTop: "Four seats,",
    titleLit: "One ticket",
    sub: [
      [
        {
          t: "Variational, Lighter, Aster, Extended, MetaMask가 함께하는 PERP-DEX Day에서 무대에 오를 트레이더 네 명을 모집해요.",
        },
      ],
      [
        {
          t: "1위는 싱가포르 Asia Trading Championship에 진출해요.",
        },
      ],
    ],
    facts: [
      { k: "일시", v: "2026년 9월 28일" },
      { k: "장소", v: "SJ KUNSTHALLE, 서울" },
      { k: "참가자", v: "트레이더 4명" },
      { k: "거래 자금", v: "전액 지원" },
    ],
    ctaPrimary: "지원서 작성하기",
  },

  marquee: [
    "무대 위 실시간 트레이딩",
    "실제 계좌·실제 자금",
    "거래 자금 전액 지원",
    "1위는 싱가포르로",
    "왕복 항공권과 숙소 지원",
    "WITH VARIATIONAL",
    "WITH LIGHTER",
    "WITH EXTENDED",
    "WITH ASTER",
    "WITH METAMASK",
  ],

  about: {
    title: ["무대 위에서 실력을 증명할", "트레이더 네 명을 찾아요"],
    lead:
      "Variational, Lighter, Aster, Extended, MetaMask가 함께하는 PERP-DEX Day의 무대에 오를 트레이더 네 명을 모집해요.",
    items: [
      {
        k: "01",
        title: "PERP-DEX DAY는",
        body:
          "PERP DEX 프로젝트와 트레이더가 한자리에 모여 피칭과 네트워킹, 라이브 트레이딩 대회를 함께하는 행사예요.",
      },
      {
        k: "02",
        title: "무대에서는",
        body:
          "네 명의 트레이더가 실제 계좌와 자금으로 거래하고, 관객은 실시간 거래 화면과 순위 변화를 보며 우승자를 예측해요.",
      },
      {
        k: "03",
        title: "네 자리에 도전하세요",
        body:
          "거래 자금과 손실은 주최 측이 부담하며, 1위는 싱가포르 Asia Trading Championship에 진출해요.",
      },
    ],
  },

  seat: {
    status: "모집 중",
    note: "지원할 수 있어요.",
    takenStatus: "마감",
    takenNote: "이미 확정된 자리예요.",
    remaining: "네 자리 중 {n}자리가 남았어요",
  },

  countdown: {
    label: "대회까지 남은 시간",
    units: { d: "일", h: "시간", m: "분", s: "초" },
  },

  prize: {
    title: ["오직 1위만", "싱가포르로 가요"],
    intro: "서울에서 증명한 실력으로 아시아 챔피언에 도전해요.",
    kicker: "1위가 받는 것",
    heading: [
      { t: "Asia Trading Championship 결승 출전권", mark: true },
      { t: ", 항공과 숙소까지 지원해요." },
    ],
    items: [
      {
        k: "01",
        lead: "결승 출전권과 상금",
        body: "Kalshi와 함께하는 싱가포르 Asia Trading Championship 결승에 진출해 상금에 도전해요.",
      },
      {
        k: "02",
        lead: "항공권과 숙소",
        body: "싱가포르 대회 참가에 필요한 왕복 항공권과 숙소를 모두 지원해요.",
      },
      {
        k: "03",
        lead: "글로벌 무대 노출",
        body: "PERP-DEX DAY 파트너와 글로벌 Tier 1 거래소 앞에서 실력을 보여주고 이름을 알릴 기회를 얻어요.",
      },
    ],
    sideNote:
      "싱가포르행은 1위에게만 주어지며, 네 참가자의 대회 중 거래 손실은 모두 저희가 부담해요.",
    payout: {
      label: "상금",
      total: "1,500 USDT",
      rows: [
        { place: "1위", prize: "싱가포르 결승 직행" },
        { place: "2위", prize: "700 USDT" },
        { place: "3위", prize: "500 USDT" },
        { place: "4위", prize: "300 USDT" },
      ],
    },
  },

  arena: {
    prev: "이전 카드",
    next: "다음 카드",
    title: ["거래 결과로", "실력을 증명해요"],
    intro:
      "관객이 거래 화면과 순위 변화를 실시간으로 지켜보는 e-스포츠형 트레이딩 대회예요.",
    cards: [
      {
        idx: "01 / 방식",
        title: "네 명이 동시에 거래해요",
        body: "모두 포지션이 없는 같은 조건에서, 같은 시간에 지정된 종목을 거래해요.",
      },
      {
        idx: "02 / 자금",
        title: "거래 자금은 저희가 준비해요",
        body: "네 명 모두 같은 금액으로 시작하며, 대회 중 발생한 손실도 저희가 부담해요.",
      },
      {
        idx: "03 / 순위",
        title: "손익 순위가 실시간으로 공개돼요",
        body: "순위는 거래 손익으로 정하고, 모든 변화를 대형 화면에 실시간으로 보여줘요.",
      },
      {
        idx: "04 / 중계",
        title: "거래 화면이 그대로 중계돼요",
        body: "포지션과 진입·청산 가격이 대형 화면에 공개되고, e-스포츠처럼 현장 해설이 더해져요.",
      },
      {
        idx: "05 / 관객",
        title: "관객이 우승자를 예측해요",
        body: "대회 시작 전, 우승할 것 같은 트레이더에게 투표해요.",
      },
      {
        idx: "06 / 장소",
        title: "KBW 2026, 서울",
        body: "코리아 블록체인 위크 기간인 2026년 9월 28일, SJ KUNSTHALLE에서 열려요.",
      },
    ],
  },

  partners: {
    title: ["PERP-DEX DAY를 함께하는", "파트너를 소개해요"],
    intro:
      "Variational, Lighter, Aster, Extended, MetaMask가 함께하는 무대에서 거래 실력과 이름을 업계에 알릴 수 있어요.",
    items: ["Variational", "Lighter", "Aster", "Extended", "MetaMask"],
  },

  who: {
    title: ["무대 위에서도 실력으로 증명할", "트레이더를 찾고 있어요"],
    intro:
      "거래 규모보다 실제 매매 기록과 리스크 관리 방식, 관객 앞에서도 전략을 유지할 수 있는지를 봐요.",
    haveLabel: "이런 분이면 좋아요",
    have: [
      "현재 무기한 선물을 거래하고 있어요",
      "거래소 손익 화면, 읽기 전용 API, 공개 프로필 중 하나로 매매 기록을 보여줄 수 있어요",
      "본인의 매매 원칙과 리스크 관리 방식을 설명할 수 있어요",
      "카메라와 실시간 순위표 앞에서도 평소처럼 거래할 수 있어요",
      "2026년 9월 28일 서울 현장에 종일 참여할 수 있어요",
      "싱가포르 본선 참가를 위해 출국할 수 있어요",
    ],
    not: [
      "팔로워 수나 인지도만으로 선발하지 않아요.",
      "대회 자금은 저희가 준비하므로 본인 자금은 필요하지 않아요.",
      "기관 경력이 없는 개인 트레이더도 지원할 수 있어요.",
      "출금 권한이 있는 API 키나 시드 문구는 받지 않아요.",
    ],
  },

  process: {
    title: ["트레이더는 이렇게 선발해요"],
    intro: "지원서를 검토한 순서대로 인터뷰를 진행하고, 네 자리가 차면 마감해요.",
    steps: [
      {
        n: "01",
        title: "지원서 작성",
        body: "연락처와 주로 쓰는 거래소, 매매 기록 링크를 작성해요.",
        when: "상시 접수",
      },
      {
        n: "02",
        title: "매매 기록 확인",
        body: "보내 주신 자료로 거래 손익과 리스크 관리 방식을 확인해요.",
        when: "5일 이내",
      },
      {
        n: "03",
        title: "30분 인터뷰",
        body: "매매 원칙과 손실 관리 방식, 라이브 무대에서 보여줄 전략을 물어봐요.",
        when: "개별 안내",
      },
      {
        n: "04",
        title: "출전 확정",
        body: "계약서와 참가 안내를 보내드리고, 대회 페이지에 이름을 공개해요.",
        when: "개별 안내",
      },
      {
        n: "05",
        title: "대회 당일",
        body: "현장 등록과 장비 점검을 마치면 실시간 거래를 시작해요.",
        when: "9월 28일 · 서울",
      },
    ],
  },

  apply: {
    title: ["네 자리 중 하나에", "도전해 보세요"],
    kv: [
      {
        k: "평가 기준",
        v: "실제 매매 기록과 리스크 관리 방식, 라이브 무대 적합성을 함께 봐요.",
      },
      {
        k: "보안",
        v: "출금 권한이 있는 키나 시드 문구, 비밀번호는 받지 않아요. 읽기 전용 API나 화면 캡처를 보내 주세요.",
      },
    ],
    contactLabel: "문의",
    selectPlaceholder: "선택해 주세요",
    fields: {
      name: { label: "이름", placeholder: "실명" },
      handle: { label: "닉네임", placeholder: "순위표에 올라갈 이름" },
      email: { label: "이메일", placeholder: "you@domain.com" },
      telegram: { label: "Telegram", placeholder: "@Handle" },
      x: { label: "X", placeholder: "@Handle" },
      city: { label: "사는 곳", placeholder: "도시, 국가" },
      years: {
        label: "무기한 선물 거래 경력",
        options: ["1년 미만", "1~2년", "3~5년", "5년 이상"],
      },
      venue: {
        label: "주로 쓰는 거래소·프로토콜",
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
          "10만~100만 달러",
          "100만~1,000만 달러",
          "1,000만 달러 이상",
        ],
      },
      proof: {
        label: "매매 기록 링크",
        placeholder: "거래소 손익 화면, 공개 프로필, 순위표 등 확인 가능한 링크",
      },
      risk: {
        label: "리스크 관리 방식",
        placeholder:
          "포지션 규모, 최대 레버리지, 손절 기준 등 본인의 원칙을 적어 주세요",
      },
      why: {
        label: "지원 이유",
        placeholder: "PERP-DEX DAY 무대에 서고 싶은 이유를 짧게 적어 주세요",
      },
      available: {
        label: "9월 28일 서울 현장에 참여할 수 있나요?",
        options: [
          "네, 종일 참여할 수 있어요.",
          "네, 일정 조율이 필요해요.",
          "아직 확실하지 않아요.",
        ],
      },
    },
    agree:
      "제출한 매매 기록이 본인의 것이며, 서울 현장 참여와 이벤트 약관, 개인정보처리방침, 거래 손실 위험에 동의해요.",
    submit: "지원서 보내기",
    status: {
      missing: "별표(*) 표시된 칸을 채워 주세요",
      required: "꼭 입력해 주세요",
      eitherSocial: "Telegram과 X 중 하나는 입력해 주세요",
      duplicate: "이미 지원한 이메일이에요. 다른 이메일을 입력해 주세요",
      sending: "보내는 중이에요…",
      error: "전송에 실패했어요. 텔레그램 @{telegram} 으로 보내 주세요",
    },
    success: {
      title: "지원이 완료됐어요",
      body: "지원서를 확인한 뒤 입력해 주신 연락처로 개별 안내드릴게요.",
      back: "PERP-DEX DAY 돌아가기",
      note: "지원 내용은 제출 후 수정할 수 없어요. 변경이 필요하면 Telegram {telegram}로 문의해 주세요.",
    },
  },

  faq: {
    title: ["자주 묻는 질문"],
    intro: "궁금한 내용은 Telegram @reboundx_cs로 문의해 주세요.",
    items: [
      {
        q: "어떤 파트너가 대회에 참여하나요?",
        a: "Variational, Lighter, Aster, Extended, MetaMask가 PERP-DEX DAY에 함께해요.",
      },
      {
        q: "한국에 살지 않아도 지원할 수 있나요?",
        a: "지원할 수 있어요. 다만 2026년 9월 28일 서울 현장에는 직접 참여해야 해요.",
      },
      {
        q: "매매 기록은 어떻게 제출하나요?",
        a: "거래소 손익 화면, 공개 프로필, 순위표, 읽기 전용 API 등 본인의 기록을 확인할 수 있는 자료를 보내 주세요. 출금 권한이 있는 API 키나 시드 문구, 비밀번호는 받지 않아요.",
      },
      {
        q: "종목과 레버리지는 어떻게 정하나요?",
        a: "종목과 최대 레버리지, 리스크 한도는 참가자 모두에게 같은 기준으로 적용하며, 세부 규정은 출전 확정 후 안내해요.",
      },
      {
        q: "대회에서 손실이 발생하면 누가 부담하나요?",
        a: "대회 자금은 주최 측이 준비하며, 대회 중 발생한 참가자 네 명의 거래 손실도 모두 주최 측이 부담해요.",
      },
      {
        q: "1위는 어떤 대회에 진출하나요?",
        a: "Kalshi와 함께하는 Asia Trading Championship에 진출해요. TOKEN2049 Singapore 주간에 열리며, 왕복 항공권과 대회 기간 숙소를 지원해요.",
      },
      {
        q: "영어를 못해도 괜찮나요?",
        a: "괜찮아요. 인터뷰와 서울 대회는 편한 언어로 참여할 수 있어요.",
      },
      {
        q: "개인 장비를 가져가도 되나요?",
        a: "PC와 모니터는 참가자 모두 같은 사양으로 준비해요. 키보드와 마우스 사용 기준은 출전 확정 후 안내해요.",
      },
    ],
  },

  final: {
    kicker: "네 자리가 차면 모집을 마감해요.",
    title: ["자리는 네 개,", "싱가포르행은 단 한 자리"],
    body: "지원서는 접수 순서대로 검토하며, 마지막 출전자가 확정되면 모집을 마감해요.",
    cta: "지원서 작성하기",
  },

  footer: {
    backToTop: "맨 위로 가기",
  },
};
