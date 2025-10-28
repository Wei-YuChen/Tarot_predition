import type { Metadata } from 'next';

interface FAQPageProps {
  params: { locale: string };
}

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Mystic Tarot',
  description:
    'Find answers to common questions about Mystic Tarot, tarot card readings, interpretations, and how to use our platform effectively.',
  keywords:
    'tarot faq, tarot questions, how to read tarot, tarot meanings, tarot help',
  robots: 'index, follow',
};

export default function FAQPage({ params }: FAQPageProps) {
  const { locale } = params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 font-serif">
          Frequently Asked Questions
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              General Questions
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                What is Mystic Tarot?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Mystic Tarot is a free online tarot reading platform that offers
                authentic three-card spreads using a complete 78-card tarot
                deck. Our platform combines traditional tarot wisdom with modern
                web technology to provide meaningful readings that can help with
                self-reflection and personal insight. Whether you're new to
                tarot or an experienced reader, our intuitive interface makes it
                easy to draw cards and receive comprehensive interpretations.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Is Mystic Tarot really free?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes! Mystic Tarot is completely free to use. You can perform
                unlimited tarot readings without any subscription fees or hidden
                costs. We support our platform through ethical advertising,
                which allows us to provide this service at no cost to our users
                while maintaining high-quality readings and interpretations.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Do I need to create an account to use Mystic Tarot?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                No account is required! You can start receiving tarot readings
                immediately without registering or providing any personal
                information. Your reading history is stored locally on your
                device, ensuring complete privacy and convenience without the
                need for account management.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              About Tarot Readings
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                How accurate are online tarot readings?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                The accuracy of tarot readings depends on your interpretation
                and how well you connect with the cards' messages. Mystic Tarot
                uses authentic tarot card meanings and spreads that have been
                used for centuries. While we use digital technology to shuffle
                and draw cards, the wisdom and symbolism remain the same as
                traditional physical tarot decks. The cards offer insights and
                perspectives—it's up to you to apply them to your specific
                situation.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                What is a three-card spread?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                A three-card spread is one of the most popular tarot layouts. In
                Mystic Tarot, the three cards represent Past, Present, and
                Future. The first card reveals influences from your past that
                led to your current situation. The second card shows your
                present circumstances and current energies. The third card
                indicates potential future outcomes based on your current path.
                This spread provides a comprehensive overview while remaining
                simple enough for beginners to understand.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                What does it mean when a card is reversed?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                In tarot, a reversed card (upside down) typically indicates that
                the card's energy is blocked, internalized, or manifesting in a
                challenging way. Reversed cards can suggest delays, internal
                conflicts, or the need to look at a situation from a different
                perspective. They're not necessarily negative—they often
                highlight areas where growth or awareness is needed. Mystic
                Tarot provides detailed interpretations for both upright and
                reversed positions.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Can I ask the same question multiple times?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                While you technically can, it's generally not recommended in
                tarot tradition. If you receive a reading you don't like, asking
                the same question repeatedly (called "reading shopping") can
                create confusion rather than clarity. Instead, take time to
                reflect on the reading you received, consider its message, and
                if needed, rephrase your question to seek different perspectives
                or ask follow-up questions after some time has passed.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Using the Platform
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                How do I get a reading?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Getting a reading is simple! Click the "Draw My Cards" button on
                the homepage, then think of a question or situation you'd like
                guidance on. Type your question into the text box—this helps
                focus your intention. Then click to draw your three cards. The
                platform will display your cards along with detailed
                interpretations for each position in your spread.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                What languages does Mystic Tarot support?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Mystic Tarot supports multiple languages including English,
                Traditional Chinese (繁體中文), Simplified Chinese (简体中文),
                Japanese (日本語), Korean (한국어), Vietnamese (Tiếng Việt),
                Thai (ไทย), Indonesian (Bahasa Indonesia), and Malay (Bahasa
                Melayu). You can easily switch between languages using the
                language selector in the navigation menu.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Is my reading data private?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Absolutely! Your questions and reading results are stored
                locally on your device using browser local storage. We do not
                transmit your personal questions or reading data to our servers.
                This means your spiritual journey remains completely private.
                Only you have access to your reading history, and you can clear
                it at any time through your browser settings.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Can I use Mystic Tarot on my mobile device?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes! Mystic Tarot is fully responsive and works beautifully on
                smartphones, tablets, and desktop computers. The interface
                automatically adapts to your screen size, ensuring a smooth
                experience whether you're on the go or reading from the comfort
                of your home. For the best experience, we recommend using modern
                browsers like Chrome, Safari, Firefox, or Edge.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Tarot Card Meanings
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                What's the difference between Major and Minor Arcana?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                The Major Arcana consists of 22 cards (0-21) representing
                significant life themes, spiritual lessons, and major events or
                turning points. These cards include well-known images like The
                Fool, The Magician, and The World. The Minor Arcana contains 56
                cards divided into four suits (Wands, Cups, Swords, Pentacles),
                representing day-to-day events, challenges, and opportunities.
                Major Arcana cards typically indicate more important or
                transformative experiences, while Minor Arcana cards relate to
                everyday situations and influences.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                What do the four suits represent?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Each suit in the Minor Arcana corresponds to different aspects
                of life: Wands represent passion, creativity, action, and
                ambition; Cups symbolize emotions, relationships, love, and
                intuition; Swords signify thoughts, communication, conflicts,
                and decision-making; Pentacles (or Coins) relate to material
                matters, finances, work, and physical health. Understanding
                these associations helps you interpret the cards more deeply.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Technical Support
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                What should I do if the website isn't working properly?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                First, try refreshing the page or clearing your browser cache.
                Make sure you're using an updated browser version. If problems
                persist, try accessing the site from a different browser or
                device to isolate the issue. For ongoing technical issues,
                please contact our support team through the{' '}
                <a
                  href={`/${locale}/contact`}
                  className="text-tarot-purple dark:text-tarot-gold hover:underline"
                >
                  Contact page
                </a>{' '}
                with details about your device, browser, and the specific
                problem you're experiencing.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                How do I switch between light and dark mode?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Mystic Tarot features both light and dark themes. You can toggle
                between them using the theme switch button in the navigation
                bar. Your preference will be saved locally and remembered for
                future visits. The dark mode provides a more mystical atmosphere
                and is easier on the eyes during evening readings.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Philosophy and Ethics
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Should I make important decisions based on tarot readings?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Tarot readings are designed for entertainment and
                self-reflection purposes. While they can offer valuable insights
                and perspectives, they should not replace professional advice
                for important decisions. For matters involving health, legal
                issues, or financial planning, always consult qualified
                professionals. Use tarot as a tool for introspection and
                personal growth, but remember that you have the power and
                responsibility to make your own choices.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Can tarot predict the future?
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Tarot doesn't predict a fixed, unchangeable future. Instead, it
                shows potential outcomes based on current energies and paths.
                The future is not set in stone—your choices and actions can
                influence what happens next. Think of tarot as showing you
                possibilities and tendencies rather than certainties. The power
                to shape your destiny ultimately lies with you.
              </p>
            </div>
          </section>

          <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Still Have Questions?
            </h3>
            <p className="text-gray-800 dark:text-gray-200">
              If you couldn't find the answer you were looking for, please don't
              hesitate to reach out through our{' '}
              <a
                href={`/${locale}/contact`}
                className="text-tarot-purple dark:text-tarot-gold hover:underline font-semibold"
              >
                Contact page
              </a>
              . We're here to help and typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
