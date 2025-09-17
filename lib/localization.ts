export interface HomeTexts {
  title: string;
  subtitle: string;
  description: string;
  questionTitle: string;
  questionPlaceholder: string;
  questionHelper: string;
  drawCards: string;
  disclaimer: string;
  features: {
    deck: {
      title: string;
      desc: string;
    };
    daily: {
      title: string;
      desc: string;
    };
    detailed: {
      title: string;
      desc: string;
    };
  };
  nav: {
    home: string;
    reading: string;
  };
}

// Client-side translations map
const clientTexts: Record<string, HomeTexts> = {
  en: {
    title: 'Mystic Tarot',
    subtitle: 'Unlock the mysteries of your past, present, and future',
    description:
      "Experience the ancient art of tarot reading with our mystical three-card spread. Let the cards guide you through life's journey with wisdom passed down through centuries.",
    questionTitle: 'Ask Your Question',
    questionPlaceholder: 'What guidance do you seek from the cards today?',
    questionHelper:
      "Think of a specific situation, decision, or area of your life you'd like insight into.",
    drawCards: 'Draw My Cards',
    disclaimer:
      'Our tarot readings are designed for entertainment and self-reflection purposes. While the cards can offer insights and guidance, remember that you hold the power to shape your own destiny.',
    features: {
      deck: {
        title: 'Complete Tarot Deck',
        desc: 'Full 78-card deck with traditional Major and Minor Arcana meanings',
      },
      daily: {
        title: 'Daily Readings',
        desc: 'Unlimited readings to guide your spiritual journey',
      },
      detailed: {
        title: 'Detailed Interpretations',
        desc: 'Comprehensive meanings for both upright and reversed card positions',
      },
    },
    nav: {
      home: 'Home',
      reading: 'Reading',
    },
  },
  zh: {
    title: '神秘塔罗',
    subtitle: '揭开你过去、现在和未来的神秘面纱',
    description:
      '体验古老的塔罗牌占卜艺术，用我们神秘的三牌展开。让牌卡以世代传承的智慧指引你的人生旅程。',
    questionTitle: '提出你的问题',
    questionPlaceholder: '今天你想从牌卡中寻求什么指引？',
    questionHelper: '想想你希望获得洞察的具体情况、决定或生活领域。',
    drawCards: '抽取我的牌卡',
    disclaimer:
      '我们的塔罗牌阅读是为娱乐和自我反思而设计的。虽然牌卡可以提供洞察和指导，但请记住，你拥有塑造自己命运的力量。',
    features: {
      deck: {
        title: '完整塔罗牌组',
        desc: '完整的78张牌，包含传统的大阿尔卡纳和小阿尔卡纳含义',
      },
      daily: {
        title: '每日阅读',
        desc: '无限次阅读，指引你的精神旅程',
      },
      detailed: {
        title: '详细解释',
        desc: '正位和逆位牌卡的全面含义',
      },
    },
    nav: {
      home: '首页',
      reading: '抽牌',
    },
  },
  tw: {
    title: '神秘塔羅',
    subtitle: '揭開你過去、現在和未來的神秘面紗',
    description:
      '體驗古老的塔羅牌占卜藝術，用我們神秘的三牌展開。讓牌卡以世代傳承的智慧指引你的人生旅程。',
    questionTitle: '提出你的問題',
    questionPlaceholder: '今天你想從牌卡中尋求什麼指引？',
    questionHelper: '想想你希望獲得洞察的具體情況、決定或生活領域。',
    drawCards: '抽取我的牌卡',
    disclaimer:
      '我們的塔羅牌閱讀是為娛樂和自我反思而設計的。雖然牌卡可以提供洞察和指導，但請記住，你擁有塑造自己命運的力量。',
    features: {
      deck: {
        title: '完整塔羅牌組',
        desc: '完整的78張牌，包含傳統的大阿爾卡納和小阿爾卡納含義',
      },
      daily: {
        title: '每日閱讀',
        desc: '無限次閱讀，指引你的精神旅程',
      },
      detailed: {
        title: '詳細解釋',
        desc: '正位和逆位牌卡的全面含義',
      },
    },
    nav: {
      home: '首頁',
      reading: '抽牌',
    },
  },
  ja: {
    title: '神秘タロット',
    subtitle: 'あなたの過去、現在、未来の謎を解き明かす',
    description:
      '神秘的な3枚のスプレッドで古代のタロット占いの技術を体験してください。世代を超えて受け継がれた知恵で、カードがあなたの人生の旅路を導きます。',
    questionTitle: '質問をしてください',
    questionPlaceholder: '今日カードからどのような導きを求めますか？',
    questionHelper:
      '洞察を得たい具体的な状況、決断、または人生の分野について考えてみてください。',
    drawCards: '私のカードを引く',
    disclaimer:
      '私たちのタロットリーディングは娯楽と自己省察を目的として設計されています。カードは洞察と導きを提供できますが、あなた自身の運命を形作る力はあなたが持っていることを忘れないでください。',
    features: {
      deck: {
        title: '完全なタロットデッキ',
        desc: '伝統的な大アルカナと小アルカナの意味を持つ78枚の完全なデッキ',
      },
      daily: {
        title: 'デイリーリーディング',
        desc: 'あなたのスピリチュアルな旅を導く無制限のリーディング',
      },
      detailed: {
        title: '詳細な解釈',
        desc: '正位置と逆位置のカードポジションの包括的な意味',
      },
    },
    nav: {
      home: 'ホーム',
      reading: 'リーディング',
    },
  },
  ko: {
    title: '신비로운 타로',
    subtitle: '당신의 과거, 현재, 미래의 신비를 풀어보세요',
    description:
      '신비로운 3장 스프레드로 고대 타로 점술의 기술을 경험해보세요. 세대를 거쳐 전해진 지혜로 카드가 당신의 인생 여정을 안내할 것입니다.',
    questionTitle: '질문을 해보세요',
    questionPlaceholder: '오늘 카드로부터 어떤 안내를 구하시나요?',
    questionHelper:
      '통찰을 얻고 싶은 구체적인 상황, 결정, 또는 삶의 영역에 대해 생각해보세요.',
    drawCards: '내 카드 뽑기',
    disclaimer:
      '우리의 타로 리딩은 오락과 자기 성찰 목적으로 설계되었습니다. 카드가 통찰과 안내를 제공할 수 있지만, 당신 자신의 운명을 형성하는 힘은 당신에게 있다는 것을 기억하세요.',
    features: {
      deck: {
        title: '완전한 타로 덱',
        desc: '전통적인 메이저 아르카나와 마이너 아르카나 의미를 가진 78장의 완전한 덱',
      },
      daily: {
        title: '일일 리딩',
        desc: '당신의 영적 여정을 안내하는 무제한 리딩',
      },
      detailed: {
        title: '상세한 해석',
        desc: '정방향과 역방향 카드 위치의 포괄적인 의미',
      },
    },
    nav: {
      home: '홈',
      reading: '리딩',
    },
  },
  vi: {
    title: 'Tarot Huyền Bí',
    subtitle: 'Khám phá những bí ẩn về quá khứ, hiện tại và tương lai của bạn',
    description:
      'Trải nghiệm nghệ thuật đọc bài tarot cổ xưa với bộ ba lá bài huyền bí của chúng tôi. Hãy để những lá bài dẫn dắt bạn qua hành trình cuộc sống với trí tuệ được truyền qua nhiều thế kỷ.',
    questionTitle: 'Đặt Câu Hỏi Của Bạn',
    questionPlaceholder:
      'Hôm nay bạn tìm kiếm sự hướng dẫn gì từ những lá bài?',
    questionHelper:
      'Hãy nghĩ về một tình huống cụ thể, quyết định, hoặc khía cạnh cuộc sống mà bạn muốn có cái nhìn sâu sắc.',
    drawCards: 'Rút Bài Của Tôi',
    disclaimer:
      'Việc đọc bài tarot của chúng tôi được thiết kế cho mục đích giải trí và tự suy ngẫm. Mặc dù những lá bài có thể mang lại cái nhìn sâu sắc và hướng dẫn, hãy nhớ rằng bạn có quyền định hình số phận của chính mình.',
    features: {
      deck: {
        title: 'Bộ Bài Tarot Hoàn Chỉnh',
        desc: 'Bộ 78 lá bài đầy đủ với ý nghĩa truyền thống của Major và Minor Arcana',
      },
      daily: {
        title: 'Đọc Bài Hàng Ngày',
        desc: 'Không giới hạn việc đọc bài để hướng dẫn hành trình tâm linh của bạn',
      },
      detailed: {
        title: 'Giải Thích Chi Tiết',
        desc: 'Ý nghĩa toàn diện cho cả vị trí thuận và nghịch của lá bài',
      },
    },
    nav: {
      home: 'Trang Chủ',
      reading: 'Đọc Bài',
    },
  },
  th: {
    title: 'ทาโรต์ลึกลับ',
    subtitle: 'เปิดเผยความลึกลับของอดีต ปัจจุบัน และอนาคตของคุณ',
    description:
      'สัมผัสประสบการณ์ศิลปะการอ่านไพ่ทาโรต์โบราณด้วยการเปิดไพ่สามใบลึกลับของเรา ให้ไพ่นำทางคุณผ่านการเดินทางของชีวิตด้วยภูมิปัญญาที่สืบทอดมาหลายศตวรรษ',
    questionTitle: 'ตั้งคำถามของคุณ',
    questionPlaceholder: 'วันนี้คุณต้องการคำแนะนำอะไรจากไพ่?',
    questionHelper:
      'คิดถึงสถานการณ์เฉพาะ การตัดสินใจ หรือด้านของชีวิตที่คุณต้องการข้อมูลเชิงลึก',
    drawCards: 'เปิดไพ่ของฉัน',
    disclaimer:
      'การอ่านไพ่ทาโรต์ของเราได้รับการออกแบบมาเพื่อความบันเทิงและการไตร่ตรองตนเอง แม้ว่าไพ่จะสามารถให้ข้อมูลเชิงลึกและคำแนะนำได้ แต่จำไว้ว่าคุณมีพลังในการกำหนดชะตากรรมของตัวเอง',
    features: {
      deck: {
        title: 'ชุดไพ่ทาโรต์ครบชุด',
        desc: 'ไพ่ครบ 78 ใบพร้อมความหมายแบบดั้งเดิมของ Major และ Minor Arcana',
      },
      daily: {
        title: 'การอ่านประจำวัน',
        desc: 'การอ่านไม่จำกัดเพื่อแนะนำการเดินทางทางจิตวิญญาณของคุณ',
      },
      detailed: {
        title: 'การตีความโดยละเอียด',
        desc: 'ความหมายที่ครอบคลุมสำหรับตำแหน่งไพ่ทั้งหงายและคว่ำ',
      },
    },
    nav: {
      home: 'หน้าหลัก',
      reading: 'อ่านไพ่',
    },
  },
  id: {
    title: 'Tarot Mistis',
    subtitle: 'Buka misteri masa lalu, sekarang, dan masa depan Anda',
    description:
      'Rasakan seni kuno membaca kartu tarot dengan penyebaran tiga kartu mistis kami. Biarkan kartu memandu Anda melalui perjalanan hidup dengan kebijaksanaan yang diturunkan melalui berabad-abad.',
    questionTitle: 'Ajukan Pertanyaan Anda',
    questionPlaceholder: 'Bimbingan apa yang Anda cari dari kartu hari ini?',
    questionHelper:
      'Pikirkan situasi spesifik, keputusan, atau bidang kehidupan yang ingin Anda dapatkan wawasannya.',
    drawCards: 'Ambil Kartu Saya',
    disclaimer:
      'Pembacaan tarot kami dirancang untuk tujuan hiburan dan refleksi diri. Meskipun kartu dapat menawarkan wawasan dan bimbingan, ingatlah bahwa Anda memiliki kekuatan untuk membentuk takdir Anda sendiri.',
    features: {
      deck: {
        title: 'Dek Tarot Lengkap',
        desc: 'Dek lengkap 78 kartu dengan makna tradisional Major dan Minor Arcana',
      },
      daily: {
        title: 'Pembacaan Harian',
        desc: 'Pembacaan tanpa batas untuk memandu perjalanan spiritual Anda',
      },
      detailed: {
        title: 'Interpretasi Terperinci',
        desc: 'Makna komprehensif untuk posisi kartu tegak dan terbalik',
      },
    },
    nav: {
      home: 'Beranda',
      reading: 'Pembacaan',
    },
  },
  ms: {
    title: 'Tarot Mistik',
    subtitle: 'Buka misteri masa lalu, sekarang, dan masa depan anda',
    description:
      'Alami seni kuno membaca kad tarot dengan sebaran tiga kad mistik kami. Biarkan kad membimbing anda melalui perjalanan hidup dengan kebijaksanaan yang diwarisi selama berabad-abad.',
    questionTitle: 'Tanya Soalan Anda',
    questionPlaceholder: 'Apakah bimbingan yang anda cari dari kad hari ini?',
    questionHelper:
      'Fikirkan situasi tertentu, keputusan, atau bidang kehidupan yang anda ingin mendapat wawasan.',
    drawCards: 'Cabut Kad Saya',
    disclaimer:
      'Pembacaan tarot kami dirancang untuk tujuan hiburan dan refleksi diri. Walaupun kad boleh menawarkan wawasan dan bimbingan, ingatlah bahawa anda mempunyai kuasa untuk membentuk nasib anda sendiri.',
    features: {
      deck: {
        title: 'Dek Tarot Lengkap',
        desc: 'Dek lengkap 78 kad dengan makna tradisional Major dan Minor Arcana',
      },
      daily: {
        title: 'Pembacaan Harian',
        desc: 'Pembacaan tanpa had untuk membimbing perjalanan spiritual anda',
      },
      detailed: {
        title: 'Tafsiran Terperinci',
        desc: 'Makna komprehensif untuk kedudukan kad tegak dan terbalik',
      },
    },
    nav: {
      home: 'Laman Utama',
      reading: 'Pembacaan',
    },
  },
};

export function getHomeTexts(locale: string): HomeTexts {
  // Check if we have exact match
  if (clientTexts[locale]) {
    return clientTexts[locale];
  }

  // Apply fallback chain
  if (locale === 'tw' && clientTexts.zh) {
    return clientTexts.zh;
  }

  if (locale === 'id' && clientTexts.ms) {
    return clientTexts.ms;
  }

  // Default fallback to English
  return clientTexts.en;
}
