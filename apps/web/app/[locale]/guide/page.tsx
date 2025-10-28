import type { Metadata } from 'next';

interface GuidePageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { locale } = params;

  if (locale === 'tw') {
    return {
      title: '塔羅牌完整指南 - 神秘塔羅',
      description:
        '深入了解塔羅牌的歷史、意義、牌組結構和解讀方法。學習如何使用塔羅牌進行自我探索和靈性成長。',
      keywords:
        '塔羅牌指南, 塔羅牌教學, 大阿爾卡納, 小阿爾卡納, 塔羅牌意義, 塔羅解讀',
      robots: 'index, follow',
    };
  }

  return {
    title: 'Complete Tarot Guide - Mystic Tarot',
    description:
      'Learn about tarot card history, meanings, deck structure, and reading methods. Discover how to use tarot for self-discovery and spiritual growth.',
    keywords:
      'tarot guide, tarot tutorial, major arcana, minor arcana, tarot meanings, tarot reading',
    robots: 'index, follow',
  };
}

export default function GuidePage({ params }: GuidePageProps) {
  const { locale } = params;
  const isTw = locale === 'tw';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 font-serif">
          {isTw ? '塔羅牌完整指南' : 'Complete Tarot Guide'}
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {isTw ? '塔羅牌簡介' : 'Introduction to Tarot'}
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {isTw
                ? '塔羅牌是一種古老的占卜工具，起源於15世紀的歐洲。最初作為一種紙牌遊戲，塔羅牌逐漸演變成為一種深刻的靈性工具，用於自我探索、冥想和占卜。一副完整的塔羅牌組包含78張牌，每張牌都承載著豐富的象徵意義和深層的智慧。這些牌卡不僅能幫助我們理解當前的處境，還能為未來的選擇提供洞察。塔羅牌的美妙之處在於它能夠反映我們內心深處的想法和感受，幫助我們更好地認識自己，並在人生的十字路口做出更明智的決定。'
                : "Tarot is an ancient divination tool that originated in 15th century Europe. Initially used as a card game, tarot gradually evolved into a profound spiritual tool for self-exploration, meditation, and divination. A complete tarot deck contains 78 cards, each carrying rich symbolic meanings and deep wisdom. These cards not only help us understand our current situation but also provide insights for future choices. The beauty of tarot lies in its ability to reflect our innermost thoughts and feelings, helping us better understand ourselves and make wiser decisions at life's crossroads."}
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {isTw
                ? '在神秘塔羅平台上，我們提供專業的塔羅牌占卜服務，使用完整的78張牌組，包括傳統的解釋和現代的心理學觀點。無論您是想尋求人生方向的指引，還是希望深入了解某個特定問題，我們的平台都能為您提供有價值的洞察。我們相信，塔羅牌不是用來預測一個無法改變的未來，而是用來照亮您的道路，幫助您看清當前的選擇和可能的結果，最終讓您能夠做出最適合自己的決定。'
                : "At Mystic Tarot, we provide professional tarot divination services using a complete 78-card deck, incorporating both traditional interpretations and modern psychological perspectives. Whether you're seeking guidance for life direction or wanting to delve deeper into a specific question, our platform offers valuable insights. We believe that tarot is not meant to predict an unchangeable future, but rather to illuminate your path, helping you see your current choices and possible outcomes clearly, ultimately enabling you to make the best decisions for yourself."}
            </p>
          </section>

          {/* Deck Structure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {isTw ? '塔羅牌組結構' : 'Tarot Deck Structure'}
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {isTw ? '大阿爾卡納（Major Arcana）' : 'Major Arcana'}
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {isTw
                  ? '大阿爾卡納包含22張牌，編號從0到21，代表人生旅程中的重大主題和精神課題。這些牌卡象徵著人生的重要轉折點、深刻的人生經驗和靈性覺醒。大阿爾卡納的牌通常預示著重大事件或深刻的內在轉變。例如，「愚者」代表新的開始和無畏的冒險精神；「魔術師」象徵著創造力和顯化的力量；「女祭司」代表直覺和內在智慧；「皇帝」象徵權威和結構。每張大阿爾卡納牌都承載著豐富的象徵意義，反映了人類經驗的普遍主題。'
                  : 'The Major Arcana consists of 22 cards, numbered from 0 to 21, representing significant life themes and spiritual lessons. These cards symbolize important turning points, profound life experiences, and spiritual awakenings. Major Arcana cards typically indicate major events or deep inner transformations. For example, The Fool represents new beginnings and fearless adventure; The Magician symbolizes creativity and manifestation power; The High Priestess represents intuition and inner wisdom; The Emperor symbolizes authority and structure. Each Major Arcana card carries rich symbolic meanings, reflecting universal themes of human experience.'}
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {isTw
                  ? '當大阿爾卡納牌在占卜中出現時，它們通常表示您正處於人生的重要時刻，需要特別關注這些牌卡所傳達的訊息。這些牌卡往往涉及命運、業力和靈性成長等深層議題。理解大阿爾卡納的意義是學習塔羅的基礎，因為這些牌卡提供了關於人生旅程的核心洞察。'
                  : "When Major Arcana cards appear in a reading, they usually indicate that you are at an important moment in life and need to pay special attention to the messages these cards convey. These cards often involve deep issues such as destiny, karma, and spiritual growth. Understanding the meanings of the Major Arcana is fundamental to learning tarot, as these cards provide core insights into life's journey."}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {isTw ? '小阿爾卡納（Minor Arcana）' : 'Minor Arcana'}
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {isTw
                  ? '小阿爾卡納包含56張牌，分為四個牌組：權杖、聖杯、寶劍和錢幣。每個牌組有14張牌，包括Ace到10的數字牌，以及侍者、騎士、王后和國王四張宮廷牌。小阿爾卡納代表日常生活中的事件、挑戰和機會，反映了我們在不同生活領域中的經驗。這些牌卡提供了關於具體情況的詳細信息，幫助我們理解日常生活中的能量流動和發展趨勢。'
                  : 'The Minor Arcana contains 56 cards, divided into four suits: Wands, Cups, Swords, and Pentacles. Each suit has 14 cards, including numbered cards from Ace to 10, and four court cards: Page, Knight, Queen, and King. The Minor Arcana represents daily events, challenges, and opportunities, reflecting our experiences in different life areas. These cards provide detailed information about specific situations, helping us understand energy flows and development trends in everyday life.'}
              </p>

              <div className="space-y-4 mt-4">
                <div className="pl-4 border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {isTw ? '權杖牌組（Wands）' : 'Wands'}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {isTw
                      ? '權杖代表火元素，象徵熱情、創造力、行動和野心。這個牌組與我們的靈感、動力和生命力有關。權杖牌通常預示著新的項目、創造性的努力和個人成長的機會。當權杖牌在占卜中出現時，它們可能暗示您需要採取行動、追求您的激情或展現您的領導才能。權杖牌組反映了我們的意志力和驅動力，幫助我們實現目標和願景。'
                      : 'Wands represent the fire element, symbolizing passion, creativity, action, and ambition. This suit relates to our inspiration, motivation, and life force. Wands cards typically indicate new projects, creative efforts, and opportunities for personal growth. When Wands appear in a reading, they may suggest that you need to take action, pursue your passions, or demonstrate your leadership abilities. The Wands suit reflects our willpower and drive, helping us achieve our goals and visions.'}
                  </p>
                </div>

                <div className="pl-4 border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {isTw ? '聖杯牌組（Cups）' : 'Cups'}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {isTw
                      ? '聖杯代表水元素，象徵情感、關係、愛和直覺。這個牌組涉及我們的內心世界、情感連結和精神滿足。聖杯牌通常與愛情、友誼、家庭關係和情感表達有關。當聖杯牌在占卜中出現時，它們可能暗示情感上的發展、關係的深化或直覺的指引。聖杯牌組幫助我們理解自己的感受，並與他人建立有意義的連結。'
                      : 'Cups represent the water element, symbolizing emotions, relationships, love, and intuition. This suit involves our inner world, emotional connections, and spiritual fulfillment. Cups cards typically relate to love, friendship, family relationships, and emotional expression. When Cups appear in a reading, they may suggest emotional developments, deepening relationships, or intuitive guidance. The Cups suit helps us understand our feelings and establish meaningful connections with others.'}
                  </p>
                </div>

                <div className="pl-4 border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {isTw ? '寶劍牌組（Swords）' : 'Swords'}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {isTw
                      ? '寶劍代表風元素，象徵思想、溝通、衝突和決策。這個牌組與我們的理智、邏輯思維和心智清晰度有關。寶劍牌通常涉及挑戰、困難和需要做出艱難決定的情況。雖然寶劍牌有時看起來具有挑戰性，但它們也代表智慧、真理和突破性的洞察。當寶劍牌在占卜中出現時，它們提醒我們運用理性思考，清晰地溝通，並勇敢面對現實。'
                      : 'Swords represent the air element, symbolizing thoughts, communication, conflict, and decision-making. This suit relates to our intellect, logical thinking, and mental clarity. Swords cards typically involve challenges, difficulties, and situations requiring tough decisions. While Swords cards may seem challenging, they also represent wisdom, truth, and breakthrough insights. When Swords appear in a reading, they remind us to use rational thinking, communicate clearly, and bravely face reality.'}
                  </p>
                </div>

                <div className="pl-4 border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {isTw ? '錢幣牌組（Pentacles）' : 'Pentacles'}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {isTw
                      ? '錢幣代表土元素，象徵物質、金錢、工作和身體健康。這個牌組與我們的實際生活、財務狀況和物質安全感有關。錢幣牌通常涉及職業發展、財務管理、健康問題和物質資源。當錢幣牌在占卜中出現時，它們可能暗示需要關注實際事務、財務規劃或身體健康。錢幣牌組提醒我們在追求精神成長的同時，也要照顧好物質層面的需求。'
                      : 'Pentacles represent the earth element, symbolizing material matters, money, work, and physical health. This suit relates to our practical life, financial situation, and material security. Pentacles cards typically involve career development, financial management, health issues, and material resources. When Pentacles appear in a reading, they may suggest the need to focus on practical matters, financial planning, or physical health. The Pentacles suit reminds us to take care of material needs while pursuing spiritual growth.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Reading Methods */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {isTw ? '如何進行塔羅占卜' : 'How to Read Tarot'}
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {isTw
                ? '進行塔羅占卜時，首先需要保持平靜和專注的心態。在開始之前，花一些時間冥想或深呼吸，讓自己的思緒沉澱下來。然後，清晰地形成您想要詢問的問題。一個好的問題應該是開放式的，而不是只能回答"是"或"否"的問題。例如，與其問"我會找到新工作嗎？"，不如問"我在職業發展方面應該關注什麼？"這樣的問題能夠引發更深入的洞察和更有意義的解讀。'
                : 'When conducting a tarot reading, it\'s essential to maintain a calm and focused mindset. Before starting, take some time to meditate or breathe deeply, allowing your thoughts to settle. Then, clearly formulate the question you want to ask. A good question should be open-ended rather than one that can only be answered with "yes" or "no." For example, instead of asking "Will I find a new job?", ask "What should I focus on in my career development?" Such questions lead to deeper insights and more meaningful interpretations.'}
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {isTw
                ? '在神秘塔羅，我們使用經典的三牌展開法，這是最受歡迎和最具洞察力的塔羅牌陣之一。第一張牌代表過去，揭示了影響您當前情況的歷史因素和背景；第二張牌象徵現在，展現您目前所處的情境和當下的能量；第三張牌指向未來，顯示基於當前路徑的可能結果。這個簡單而強大的牌陣提供了一個完整的時間線視角，幫助您理解事件的發展脈絡。'
                : 'At Mystic Tarot, we use the classic three-card spread, one of the most popular and insightful tarot layouts. The first card represents the past, revealing historical factors and background that have influenced your current situation; the second card symbolizes the present, showing your current circumstances and energies; the third card points to the future, displaying potential outcomes based on your current path. This simple yet powerful spread provides a complete timeline perspective, helping you understand the development context of events.'}
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {isTw
                ? '解讀塔羅牌時，重要的是要相信您的直覺。雖然每張牌都有傳統的意義，但最重要的是您在看到這張牌時的第一反應和感受。牌卡上的圖像、顏色和符號可能會觸發您的潛意識，帶來個人化的洞察。同時，也要考慮牌卡之間的關係和整體的故事線。三張牌不是孤立存在的，它們共同講述了一個關於您的情況的完整故事。花時間反思每張牌的意義，以及它們如何相互關聯，將幫助您獲得更深刻的理解。'
                : "When interpreting tarot cards, it's important to trust your intuition. While each card has traditional meanings, what matters most is your initial reaction and feelings when you see the card. The images, colors, and symbols on the cards may trigger your subconscious, bringing personalized insights. At the same time, consider the relationships between cards and the overall storyline. The three cards are not isolated; together they tell a complete story about your situation. Taking time to reflect on the meaning of each card and how they relate to each other will help you gain deeper understanding."}
            </p>
          </section>

          {/* Benefits and Uses */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {isTw
                ? '塔羅牌的益處與應用'
                : 'Benefits and Applications of Tarot'}
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {isTw
                ? '塔羅牌是一種多功能的工具，可以應用於生活的許多方面。它最常被用於自我反思和個人成長。通過定期進行塔羅占卜，您可以更深入地了解自己的思維模式、情感反應和行為傾向。塔羅牌幫助我們識別潛意識中的障礙和限制性信念，從而促進個人轉變和成長。許多人發現，塔羅占卜能夠提供一種獨特的視角，幫助他們從不同角度看待問題，並找到創造性的解決方案。'
                : 'Tarot is a versatile tool that can be applied to many aspects of life. It is most commonly used for self-reflection and personal growth. Through regular tarot readings, you can gain deeper insights into your thought patterns, emotional responses, and behavioral tendencies. Tarot helps us identify subconscious obstacles and limiting beliefs, thereby promoting personal transformation and growth. Many people find that tarot readings provide a unique perspective, helping them view problems from different angles and find creative solutions.'}
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {isTw
                ? '塔羅牌也可以用於決策支持。當您面臨重要的人生選擇時，塔羅牌可以幫助您權衡不同選項的利弊，並了解每個選擇可能帶來的結果。它不會告訴您應該做什麼，而是為您提供信息和洞察，幫助您做出更明智的決定。此外，塔羅牌在關係諮詢、職業規劃和精神發展等領域也非常有價值。無論您是想了解一段關係的動態，探索職業機會，還是尋求精神指引，塔羅牌都能提供有意義的洞察。'
                : "Tarot can also be used for decision support. When facing important life choices, tarot can help you weigh the pros and cons of different options and understand the potential outcomes of each choice. It won't tell you what you should do, but rather provides information and insights to help you make wiser decisions. Additionally, tarot is valuable in relationship counseling, career planning, and spiritual development. Whether you want to understand relationship dynamics, explore career opportunities, or seek spiritual guidance, tarot can provide meaningful insights."}
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {isTw
                ? '重要的是要記住，塔羅牌是一種指引工具，而不是命運的絕對預言。它展示的是基於當前能量和路徑的可能性，而非不可改變的未來。您始終擁有自由意志和選擇的力量。塔羅牌的真正價值在於它能夠激發您的思考，幫助您更清晰地看待自己的處境，並賦予您做出改變的勇氣和智慧。將塔羅占卜視為一種自我探索的旅程，而不僅僅是尋求答案的過程，您將從中獲得更多的收獲。'
                : "It's important to remember that tarot is a guidance tool, not an absolute prophecy of fate. It shows possibilities based on current energies and paths, not an unchangeable future. You always have free will and the power to choose. The true value of tarot lies in its ability to stimulate your thinking, help you see your situation more clearly, and give you the courage and wisdom to make changes. View tarot reading as a journey of self-discovery rather than just a process of seeking answers, and you will gain much more from it."}
            </p>
          </section>

          {/* Getting Started */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {isTw ? '開始使用神秘塔羅' : 'Getting Started with Mystic Tarot'}
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {isTw
                ? '在神秘塔羅平台上開始您的塔羅之旅非常簡單。我們的平台提供了直觀、易用的界面，讓您無需任何經驗就能進行專業的塔羅占卜。首先，訪問我們的首頁，點擊"抽取我的牌卡"按鈕。然後，花一些時間思考您想要尋求指引的問題或情況。將您的問題清晰地表述出來，輸入到文本框中。這個過程不僅幫助您專注，還能讓占卜的結果更加準確和有意義。'
                : 'Starting your tarot journey on the Mystic Tarot platform is very simple. Our platform provides an intuitive, easy-to-use interface that allows you to conduct professional tarot readings without any experience. First, visit our homepage and click the "Draw My Cards" button. Then, take some time to think about the question or situation for which you seek guidance. Clearly articulate your question and enter it into the text box. This process not only helps you focus but also makes the reading results more accurate and meaningful.'}
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {isTw
                ? '提交問題後，我們的系統會為您抽取三張牌，分別代表過去、現在和未來。每張牌都配有詳細的解釋，包括正位和逆位的含義。我們的解釋基於傳統塔羅智慧，同時融入了現代心理學的觀點，為您提供既有深度又實用的指引。您可以隨時返回查看您的占卜結果，因為所有數據都保存在您的設備本地，完全私密和安全。我們還提供多種語言選擇，包括繁體中文、簡體中文、英文、日文、韓文等，確保您能以最舒適的語言進行占卜。'
                : 'After submitting your question, our system will draw three cards for you, representing the past, present, and future. Each card comes with detailed explanations, including meanings for both upright and reversed positions. Our interpretations are based on traditional tarot wisdom while incorporating modern psychological perspectives, providing you with guidance that is both profound and practical. You can return to view your reading results at any time, as all data is stored locally on your device, completely private and secure. We also offer multiple language options, including Traditional Chinese, Simplified Chinese, English, Japanese, Korean, and more, ensuring you can conduct readings in your most comfortable language.'}
            </p>
          </section>

          {/* Call to Action */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isTw
                ? '準備開始您的塔羅之旅了嗎？'
                : 'Ready to Start Your Tarot Journey?'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {isTw
                ? '現在就開始您的第一次占卜，讓古老的智慧照亮您的道路。'
                : 'Start your first reading now and let ancient wisdom illuminate your path.'}
            </p>
            <a
              href={`/${locale}/reading`}
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isTw ? '開始占卜' : 'Start Reading'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
