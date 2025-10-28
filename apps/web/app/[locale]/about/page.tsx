import type { Metadata } from 'next';

interface AboutPageProps {
  params: { locale: string };
}

export const metadata: Metadata = {
  title: 'About Us - Mystic Tarot',
  description:
    'Learn about Mystic Tarot, our mission to bring ancient tarot wisdom to the modern world, and how our platform helps you explore spiritual guidance through traditional tarot card readings.',
  keywords:
    'about mystic tarot, tarot reading platform, spiritual guidance, tarot wisdom, divination service',
  robots: 'index, follow',
};

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 font-serif">
          About Mystic Tarot
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Welcome to Your Gateway to Ancient Wisdom
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Mystic Tarot is a comprehensive online tarot reading platform
              designed to bring the ancient art of tarot divination to the
              modern world. Our mission is to make spiritual guidance accessible
              to everyone, whether you're a seasoned tarot enthusiast or just
              beginning your journey into the mystical world of divination. We
              believe that everyone deserves access to the insights and wisdom
              that tarot cards can provide, and we've created this platform to
              make that possible.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Founded on the principles of authenticity and respect for
              traditional tarot practices, Mystic Tarot offers a unique digital
              experience that honors centuries-old divination methods while
              embracing modern technology. Our platform combines the mystical
              elements of traditional tarot reading with an intuitive, beautiful
              interface that makes the experience both meaningful and enjoyable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Philosophy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              At Mystic Tarot, we understand that tarot reading is more than
              just fortune-telling—it's a tool for self-reflection,
              introspection, and personal growth. Each card in the tarot deck
              carries symbolic meanings that have been refined over centuries,
              representing universal human experiences, challenges, and
              triumphs. When you draw cards through our platform, you're not
              just receiving random predictions; you're engaging with archetypal
              imagery and wisdom that can help illuminate your path forward.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              We believe that tarot readings should be used as a complementary
              tool for self-discovery and reflection rather than as definitive
              life decisions. The cards offer perspectives and insights that can
              help you think more deeply about your situation, consider
              different angles, and make more informed choices. Our approach
              emphasizes empowerment—reminding you that while the cards can
              offer guidance, you ultimately hold the power to shape your own
              destiny.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What We Offer
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Our platform features a complete 78-card tarot deck, including all
              22 Major Arcana cards and 56 Minor Arcana cards across four
              suits—Wands, Cups, Swords, and Pentacles. Each card comes with
              comprehensive interpretations for both upright and reversed
              positions, ensuring you receive nuanced and meaningful readings
              that reflect the full spectrum of possibilities.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              We offer the classic three-card spread focusing on Past, Present,
              and Future, which is one of the most popular and insightful tarot
              spreads. This spread provides a comprehensive view of your
              situation by examining where you've come from, where you are now,
              and where you're heading. The three-card spread is perfect for
              both beginners and experienced readers, offering clarity without
              overwhelming complexity.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Our platform supports multiple languages including English,
              Traditional Chinese, Simplified Chinese, Japanese, Korean,
              Vietnamese, Thai, Indonesian, and Malay, making tarot accessible
              to people around the world. We've carefully translated all card
              meanings and interpretations to ensure that the spiritual essence
              and symbolism are preserved across different cultural contexts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Technology Meets Tradition
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Mystic Tarot uses advanced algorithms to simulate authentic tarot
              card shuffling and drawing, ensuring that each reading feels
              genuine and unique. Our deterministic random number generator
              creates reproducible results based on your question and the time
              of your reading, giving you a personalized experience that
              respects the sacred nature of tarot divination.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              The platform is built with modern web technologies including
              Next.js 14, TypeScript, and Tailwind CSS, providing a fast,
              responsive, and visually stunning experience across all devices.
              Whether you're reading on your phone, tablet, or computer, you'll
              enjoy smooth animations, elegant design, and an interface that
              enhances rather than distracts from your spiritual practice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Privacy and Security
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              We take your privacy seriously. Your personal questions and
              reading data are stored locally on your device, not on our
              servers. This means your spiritual journey remains entirely
              private and personal. We collect minimal information necessary to
              provide our services, and we're transparent about how we use any
              data we do collect. You can read more about our privacy practices
              in our{' '}
              <a
                href={`/${locale}/privacy`}
                className="text-tarot-purple dark:text-tarot-gold hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Join Our Community
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether you're seeking guidance on a specific question, looking
              for daily inspiration, or simply curious about what the cards have
              to say, Mystic Tarot welcomes you. We're committed to providing a
              safe, respectful space where you can explore the mysteries of
              tarot and gain insights into your life's journey. Start your first
              reading today and discover what the ancient wisdom of the tarot
              can reveal to you.
            </p>
          </section>

          <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-gray-800 dark:text-gray-200 text-center font-serif italic">
              "The tarot is a mirror reflecting the depths of your soul, a map
              to navigate life's complexities, and a companion on your journey
              of self-discovery."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
