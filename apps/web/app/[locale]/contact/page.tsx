import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Mystic Tarot',
  description:
    'Get in touch with the Mystic Tarot team. We welcome your questions, feedback, and suggestions about our tarot reading platform.',
  keywords: 'contact mystic tarot, feedback, support, tarot questions',
  robots: 'index, follow',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 font-serif">
          Contact Us
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              We love hearing from our users! Whether you have questions about
              tarot readings, need technical support, have suggestions for new
              features, or simply want to share your experience with Mystic
              Tarot, we're here to listen. Your feedback helps us improve and
              provide better service to our growing community of tarot
              enthusiasts around the world.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Our team is dedicated to ensuring you have the best possible
              experience with our platform. We strive to respond to all
              inquiries promptly and thoroughly. Please don't hesitate to reach
              out—whether your question is about the meaning of a specific card,
              technical issues with the website, or general inquiries about our
              services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  📧 Email Support
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  For general inquiries, technical support, and feedback:
                </p>
                <a
                  href="mailto:fish760217@gmail.com"
                  className="text-tarot-purple dark:text-tarot-gold hover:underline text-lg"
                >
                  fish760217@gmail.com
                </a>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  🕐 Response Time
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We typically respond to all inquiries within 24-48 hours
                  during business days. For urgent technical issues, please
                  include "URGENT" in your email subject line.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  🌍 Language Support
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We offer support in multiple languages including English,
                  Traditional Chinese (繁體中文), Simplified Chinese (简体中文),
                  and other Asian languages. Feel free to write to us in your
                  preferred language.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What to Include in Your Message
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              To help us assist you better, please include the following
              information when contacting us:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li className="mb-2">
                <strong>For Technical Issues:</strong> Describe the problem,
                what you were trying to do, which device and browser you're
                using, and any error messages you received.
              </li>
              <li className="mb-2">
                <strong>For Tarot Questions:</strong> Provide context about your
                reading, which cards you drew, and what specific interpretation
                or guidance you're seeking.
              </li>
              <li className="mb-2">
                <strong>For Feature Suggestions:</strong> Describe the feature
                you'd like to see, how it would enhance your experience, and any
                similar features you've seen elsewhere.
              </li>
              <li className="mb-2">
                <strong>For Partnership Inquiries:</strong> Include information
                about your organization, the nature of the partnership you're
                proposing, and your contact details.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Before reaching out, you might want to check our{' '}
              <a
                href="/faq"
                className="text-tarot-purple dark:text-tarot-gold hover:underline"
              >
                FAQ page
              </a>{' '}
              where we answer common questions about tarot readings, our
              platform, and how to get the most out of your experience. Many
              questions can be quickly resolved by browsing through our
              comprehensive FAQ section.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Privacy and Data Protection
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              When you contact us, we treat your information with the utmost
              respect and confidentiality. Your email address and any personal
              information you share will only be used to respond to your inquiry
              and will never be shared with third parties. We take your privacy
              seriously and comply with all applicable data protection
              regulations. For more details, please review our{' '}
              <a
                href="/tw/privacy"
                className="text-tarot-purple dark:text-tarot-gold hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Community Guidelines
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Mystic Tarot is committed to maintaining a respectful and
              welcoming environment for all users. We welcome constructive
              feedback, thoughtful questions, and meaningful discussions about
              tarot and spirituality. Please be respectful in your
              communications and remember that our team is here to help you have
              the best possible experience with our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              We Value Your Feedback
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Your insights and experiences help us continuously improve Mystic
              Tarot. Whether you've had a particularly meaningful reading, have
              ideas for new features, or encountered any challenges, we want to
              hear about it. Every piece of feedback contributes to making our
              platform better for the entire community. Thank you for being part
              of the Mystic Tarot family!
            </p>
          </section>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-gray-800 dark:text-gray-200">
              <strong className="block mb-2">Note:</strong>
              While we're happy to discuss general tarot meanings and
              interpretations, please remember that Mystic Tarot readings are
              designed for entertainment and self-reflection purposes. We
              recommend consulting qualified professionals for important life
              decisions regarding health, legal matters, or financial planning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
