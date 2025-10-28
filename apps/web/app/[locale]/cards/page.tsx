import type { Metadata } from 'next';

interface CardsPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params,
}: CardsPageProps): Promise<Metadata> {
  const { locale } = params;

  const titles: Record<string, string> = {
    tw: '塔羅牌意義指南 - 神秘塔羅',
    zh: '塔罗牌意义指南 - 神秘塔罗',
    ja: 'タロットカード意味ガイド - ミスティックタロット',
    ko: '타로 카드 의미 가이드 - 미스틱 타로',
    en: 'Tarot Card Meanings Guide - Mystic Tarot',
  };

  const descriptions: Record<string, string> = {
    tw: '探索完整78張塔羅牌的詳細含義，包括大阿爾卡納和小阿爾卡納的正位與逆位解釋。深入了解每張牌的象徵意義、關鍵詞和實用解讀指南。',
    zh: '探索完整78张塔罗牌的详细含义，包括大阿尔卡纳和小阿尔卡纳的正位与逆位解释。深入了解每张牌的象征意义、关键词和实用解读指南。',
    ja: '78枚すべてのタロットカードの詳細な意味を探求します。メジャーアルカナとマイナーアルカナの正位置と逆位置の解釈を含みます。',
    ko: '78장의 타로 카드 의미를 상세히 탐색하세요. 메이저 아르카나와 마이너 아르카나의 정방향 및 역방향 해석을 포함합니다.',
    en: 'Explore comprehensive meanings of all 78 tarot cards, including Major and Minor Arcana with upright and reversed interpretations. Learn the symbolism, keywords, and practical guidance for each card.',
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords:
      locale === 'tw' || locale === 'zh'
        ? '塔羅牌意義, 大阿爾卡納, 小阿爾卡納, 塔羅牌解讀, 逆位牌意, 正位牌意'
        : 'tarot card meanings, major arcana, minor arcana, tarot interpretations, reversed meanings, upright meanings',
    robots: 'index, follow',
  };
}

export default function CardsPage({ params }: CardsPageProps) {
  const { locale } = params;
  const isTw = locale === 'tw';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 font-serif text-center">
          {isTw ? '塔羅牌意義指南' : 'Tarot Card Meanings Guide'}
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-12 text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {isTw
                ? '歡迎來到我們的塔羅牌意義指南。這裡收錄了完整78張塔羅牌的詳細解釋，包括每張牌的正位和逆位含義。無論您是初學者還是經驗豐富的塔羅愛好者，這個全面的指南都能幫助您更深入地理解塔羅牌的智慧。'
                : 'Welcome to our comprehensive tarot card meanings guide. Here you will find detailed interpretations of all 78 tarot cards, including both upright and reversed meanings for each card. Whether you are a beginner or an experienced tarot enthusiast, this comprehensive guide will help you deepen your understanding of tarot wisdom.'}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {isTw
                ? '塔羅牌的每張牌都承載著豐富的象徵意義和深層的智慧。通過學習這些意義，您可以更準確地解讀占卜結果，並將其應用於日常生活中。點擊下方的分類來探索不同的塔羅牌組。'
                : 'Each tarot card carries rich symbolic meanings and deep wisdom. By learning these meanings, you can more accurately interpret reading results and apply them to everyday life. Click on the categories below to explore different tarot card groups.'}
            </p>
          </section>

          {/* Major Arcana Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              {isTw ? '大阿爾卡納（Major Arcana）' : 'Major Arcana'}
            </h2>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {isTw
                ? '大阿爾卡納包含22張牌，代表人生旅程中的重要主題和精神課題。這些牌卡象徵著重大的人生轉折點和深刻的內在轉變。'
                : 'The Major Arcana consists of 22 cards representing significant life themes and spiritual lessons. These cards symbolize major life turning points and profound inner transformations.'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* The Fool */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  0. {isTw ? '愚者 (The Fool)' : 'The Fool'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '正位關鍵詞：' : 'Upright Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '新的開始、自發性、信念的飛躍、冒險、潛力、自由'
                        : 'New beginnings, spontaneity, leap of faith, adventure, potential, freedom'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '逆位關鍵詞：' : 'Reversed Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '魯莽、冒失、風險、愚蠢的選擇、缺乏方向'
                        : 'Recklessness, carelessness, risk, foolish choices, lack of direction'}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {isTw
                      ? '愚者代表著新旅程的開始。它鼓勵我們帶著樂觀和開放的心態踏上未知的道路，相信宇宙會支持我們。逆位時，它提醒我們在行動前要更加謹慎思考。'
                      : 'The Fool represents the beginning of a new journey. It encourages us to embark on unknown paths with optimism and an open heart, trusting that the universe will support us. When reversed, it reminds us to think more carefully before taking action.'}
                  </p>
                </div>
              </div>

              {/* The Magician */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  I. {isTw ? '魔術師 (The Magician)' : 'The Magician'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '正位關鍵詞：' : 'Upright Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '顯化、創造力、技能、力量、自信、資源運用'
                        : 'Manifestation, creativity, skill, power, confidence, resourcefulness'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '逆位關鍵詞：' : 'Reversed Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '操縱、虛假、未實現的潛力、缺乏靈感'
                        : 'Manipulation, deception, unrealized potential, lack of inspiration'}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {isTw
                      ? '魔術師象徵著將想法轉化為現實的力量。它提醒我們，我們擁有所有必要的工具和技能來實現目標。逆位時，它可能表示我們沒有充分利用自己的能力。'
                      : 'The Magician symbolizes the power to turn ideas into reality. It reminds us that we have all the necessary tools and skills to achieve our goals. When reversed, it may indicate that we are not fully utilizing our abilities.'}
                  </p>
                </div>
              </div>

              {/* The High Priestess */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  II.{' '}
                  {isTw ? '女祭司 (The High Priestess)' : 'The High Priestess'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '正位關鍵詞：' : 'Upright Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '直覺、內在智慧、神秘、潛意識、靈性洞察'
                        : 'Intuition, inner wisdom, mystery, subconscious, spiritual insight'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '逆位關鍵詞：' : 'Reversed Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '忽視直覺、秘密、壓抑、缺乏內在聯繫'
                        : 'Ignoring intuition, secrets, repression, lack of inner connection'}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {isTw
                      ? '女祭司代表內在智慧和直覺的力量。她鼓勵我們傾聽內心的聲音，信任我們的直覺。逆位時，她提醒我們不要忽視或壓抑內在的知識。'
                      : 'The High Priestess represents inner wisdom and the power of intuition. She encourages us to listen to our inner voice and trust our intuition. When reversed, she reminds us not to ignore or suppress our inner knowledge.'}
                  </p>
                </div>
              </div>

              {/* The Empress */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  III. {isTw ? '皇后 (The Empress)' : 'The Empress'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '正位關鍵詞：' : 'Upright Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '豐饒、滋養、母性、豐盛、自然、感官享受'
                        : 'Fertility, nurturing, motherhood, abundance, nature, sensual pleasure'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '逆位關鍵詞：' : 'Reversed Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '創造力受阻、依賴、過度保護、物質損失'
                        : 'Creative block, dependence, overprotectiveness, material loss'}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {isTw
                      ? '皇后象徵著創造、滋養和豐盛。她代表生命力、美和自然的豐饒。逆位時，她可能表示創造力受阻或需要更好地照顧自己。'
                      : 'The Empress symbolizes creation, nurturing, and abundance. She represents life force, beauty, and the fertility of nature. When reversed, she may indicate blocked creativity or the need to better care for oneself.'}
                  </p>
                </div>
              </div>

              {/* The Emperor */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  IV. {isTw ? '皇帝 (The Emperor)' : 'The Emperor'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '正位關鍵詞：' : 'Upright Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '權威、結構、控制、父性、領導力、穩定'
                        : 'Authority, structure, control, fatherhood, leadership, stability'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '逆位關鍵詞：' : 'Reversed Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '過度控制、僵化、權威濫用、缺乏紀律'
                        : 'Excessive control, rigidity, abuse of authority, lack of discipline'}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {isTw
                      ? '皇帝代表權威、結構和穩定的力量。他象徵著秩序、紀律和理性思考。逆位時，他可能表示過度控制或需要更靈活的方法。'
                      : 'The Emperor represents authority, structure, and the power of stability. He symbolizes order, discipline, and rational thinking. When reversed, he may indicate excessive control or the need for a more flexible approach.'}
                  </p>
                </div>
              </div>

              {/* The Hierophant */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  V. {isTw ? '教皇 (The Hierophant)' : 'The Hierophant'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '正位關鍵詞：' : 'Upright Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '傳統、教育、信仰、遵從規則、精神指導'
                        : 'Tradition, education, belief, conformity, spiritual guidance'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {isTw ? '逆位關鍵詞：' : 'Reversed Keywords:'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {isTw
                        ? '叛逆、非傳統、挑戰規範、個人信仰'
                        : 'Rebellion, unconventionality, challenging norms, personal beliefs'}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {isTw
                      ? '教皇代表傳統智慧、制度和精神教導。他象徵著遵循傳統價值觀和尋求精神指導。逆位時，他鼓勵我們質疑傳統並探索個人信仰。'
                      : 'The Hierophant represents traditional wisdom, institutions, and spiritual teaching. He symbolizes following traditional values and seeking spiritual guidance. When reversed, he encourages us to question tradition and explore personal beliefs.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {isTw
                  ? '以上僅展示部分大阿爾卡納牌卡。完整的大阿爾卡納包含22張牌，每張都有其獨特的意義和象徵。'
                  : 'Above are just a few examples of Major Arcana cards. The complete Major Arcana consists of 22 cards, each with its unique meaning and symbolism.'}
              </p>
            </div>
          </section>

          {/* Minor Arcana Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              {isTw ? '小阿爾卡納（Minor Arcana）' : 'Minor Arcana'}
            </h2>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {isTw
                ? '小阿爾卡納包含56張牌，分為四個牌組。每個牌組代表生活的不同面向，從情感到物質，從思想到行動。'
                : 'The Minor Arcana contains 56 cards divided into four suits. Each suit represents different aspects of life, from emotions to material matters, from thoughts to actions.'}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Wands */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">
                  {isTw ? '權杖牌組 (Wands)' : 'Suit of Wands'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {isTw
                    ? '權杖代表火元素，象徵創造力、激情、行動和野心。這個牌組涉及我們的靈感、動力和生命力。權杖牌通常與事業、項目和個人成長有關。'
                    : 'Wands represent the fire element, symbolizing creativity, passion, action, and ambition. This suit relates to our inspiration, motivation, and life force. Wands cards typically involve career, projects, and personal growth.'}
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-2">
                    <strong>{isTw ? '關鍵主題：' : 'Key Themes:'}</strong>{' '}
                    {isTw
                      ? '創造力、激情、能量、冒險、成長、行動'
                      : 'Creativity, passion, energy, adventure, growth, action'}
                  </p>
                  <p>
                    <strong>{isTw ? '生活領域：' : 'Life Areas:'}</strong>{' '}
                    {isTw
                      ? '事業、靈感、項目、目標、個人發展'
                      : 'Career, inspiration, projects, goals, personal development'}
                  </p>
                </div>
              </div>

              {/* Cups */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">
                  {isTw ? '聖杯牌組 (Cups)' : 'Suit of Cups'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {isTw
                    ? '聖杯代表水元素，象徵情感、關係、愛和直覺。這個牌組涉及我們的內心世界、情感連結和精神滿足。聖杯牌通常與人際關係和情感狀態有關。'
                    : 'Cups represent the water element, symbolizing emotions, relationships, love, and intuition. This suit relates to our inner world, emotional connections, and spiritual fulfillment. Cups cards typically involve relationships and emotional states.'}
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-2">
                    <strong>{isTw ? '關鍵主題：' : 'Key Themes:'}</strong>{' '}
                    {isTw
                      ? '情感、愛、關係、直覺、同情心、夢想'
                      : 'Emotions, love, relationships, intuition, compassion, dreams'}
                  </p>
                  <p>
                    <strong>{isTw ? '生活領域：' : 'Life Areas:'}</strong>{' '}
                    {isTw
                      ? '愛情、友誼、家庭、情感健康、靈性連結'
                      : 'Love, friendship, family, emotional health, spiritual connection'}
                  </p>
                </div>
              </div>

              {/* Swords */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-400 mb-4">
                  {isTw ? '寶劍牌組 (Swords)' : 'Suit of Swords'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {isTw
                    ? '寶劍代表風元素，象徵思想、溝通、衝突和決策。這個牌組涉及我們的理智、邏輯思維和心智清晰度。寶劍牌通常與挑戰、衝突和重要決定有關。'
                    : 'Swords represent the air element, symbolizing thoughts, communication, conflict, and decision-making. This suit relates to our intellect, logical thinking, and mental clarity. Swords cards typically involve challenges, conflicts, and important decisions.'}
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-2">
                    <strong>{isTw ? '關鍵主題：' : 'Key Themes:'}</strong>{' '}
                    {isTw
                      ? '思想、真理、正義、衝突、決策、清晰'
                      : 'Thoughts, truth, justice, conflict, decisions, clarity'}
                  </p>
                  <p>
                    <strong>{isTw ? '生活領域：' : 'Life Areas:'}</strong>{' '}
                    {isTw
                      ? '溝通、決策、心理健康、衝突解決、真相'
                      : 'Communication, decisions, mental health, conflict resolution, truth'}
                  </p>
                </div>
              </div>

              {/* Pentacles */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                  {isTw ? '錢幣牌組 (Pentacles)' : 'Suit of Pentacles'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {isTw
                    ? '錢幣代表土元素，象徵物質、金錢、工作和身體健康。這個牌組涉及我們的實際生活、財務狀況和物質安全感。錢幣牌通常與工作、財富和實際事務有關。'
                    : 'Pentacles represent the earth element, symbolizing material matters, money, work, and physical health. This suit relates to our practical life, financial situation, and material security. Pentacles cards typically involve work, wealth, and practical matters.'}
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-2">
                    <strong>{isTw ? '關鍵主題：' : 'Key Themes:'}</strong>{' '}
                    {isTw
                      ? '物質、金錢、工作、健康、安全、實用性'
                      : 'Material, money, work, health, security, practicality'}
                  </p>
                  <p>
                    <strong>{isTw ? '生活領域：' : 'Life Areas:'}</strong>{' '}
                    {isTw
                      ? '財務、事業、健康、物質資源、實際目標'
                      : 'Finances, career, health, material resources, practical goals'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use This Guide */}
          <section className="mb-12 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              {isTw ? '如何使用本指南' : 'How to Use This Guide'}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">
                {isTw
                  ? '這個指南旨在幫助您深入理解塔羅牌的意義。每張牌的解釋包括正位和逆位的關鍵詞，以及該牌的核心含義和實用建議。當您進行塔羅占卜時，可以參考這些解釋來更好地理解牌卡的訊息。'
                  : 'This guide is designed to help you deeply understand the meanings of tarot cards. Each card interpretation includes keywords for both upright and reversed positions, along with the core meaning and practical advice of the card. When conducting tarot readings, you can refer to these interpretations to better understand the messages of the cards.'}
              </p>
              <p className="leading-relaxed">
                {isTw
                  ? '記住，塔羅牌的意義是靈活的。書本上的解釋是一個起點，但最重要的是您自己的直覺和對牌卡的個人理解。每次占卜時，相同的牌卡可能會帶來不同的訊息，這取決於問題的背景和您當時的狀況。'
                  : 'Remember, tarot card meanings are flexible. Book interpretations are a starting point, but what matters most is your own intuition and personal understanding of the cards. In each reading, the same card may bring different messages depending on the context of the question and your situation at the time.'}
              </p>
              <p className="leading-relaxed">
                {isTw
                  ? '要充分利用這個指南，建議您將這些意義與您的實際占卜經驗結合起來。隨著時間的推移，您會發展出對每張牌的個人理解和聯想，這將豐富您的塔羅實踐。'
                  : 'To make the most of this guide, we recommend combining these meanings with your actual reading experience. Over time, you will develop your personal understanding and associations for each card, which will enrich your tarot practice.'}
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {isTw ? '準備好進行占卜了嗎？' : 'Ready for a Reading?'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {isTw
                ? '運用您學到的知識，開始您的塔羅之旅。我們的平台提供專業的三牌展開法，幫助您探索過去、現在和未來。'
                : 'Use the knowledge you have learned to start your tarot journey. Our platform provides professional three-card spreads to help you explore the past, present, and future.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/reading`}
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {isTw ? '開始占卜' : 'Start Reading'}
              </a>
              <a
                href={`/${locale}/guide`}
                className="inline-block bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border-2 border-purple-600 dark:border-purple-400"
              >
                {isTw ? '塔羅指南' : 'Tarot Guide'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
