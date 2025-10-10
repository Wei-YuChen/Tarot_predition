import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Mystic Tarot',
  description:
    'Read the Terms of Service for Mystic Tarot. Understand your rights and responsibilities when using our online tarot reading platform.',
  keywords:
    'terms of service, user agreement, tarot terms, mystic tarot conditions',
  robots: 'index, follow',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 font-serif">
          Terms of Service
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to Mystic Tarot. By accessing and using this website and
              our services, you accept and agree to be bound by the terms and
              provisions of this agreement. If you do not agree to these terms,
              please do not use our services. We reserve the right to modify
              these terms at any time, and your continued use of the service
              after such modifications constitutes your acceptance of the
              updated terms.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms of Service govern your use of Mystic Tarot's website,
              mobile applications, and all related services (collectively, the
              "Service"). By using the Service, you represent that you are at
              least 13 years of age (or the age of majority in your
              jurisdiction) and have the legal capacity to enter into these
              terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Description of Service
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Mystic Tarot provides an online tarot card reading platform that
              offers three-card spread readings based on traditional tarot
              interpretations. Our service includes access to a complete 78-card
              tarot deck with interpretations for both upright and reversed
              positions. The Service is designed for entertainment,
              self-reflection, and personal insight purposes only.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              We provide multilingual support, customizable themes, and a
              user-friendly interface to enhance your tarot reading experience.
              While we strive to maintain continuous availability, we do not
              guarantee that the Service will be uninterrupted or error-free. We
              reserve the right to modify, suspend, or discontinue any aspect of
              the Service at any time with or without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. User Conduct and Responsibilities
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              When using Mystic Tarot, you agree to use the Service in a lawful
              and respectful manner. You are responsible for maintaining the
              confidentiality of any information you input into the Service and
              for all activities that occur under your use of the Service. You
              agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li className="mb-2">
                Use the Service for any illegal purpose or in violation of any
                local, state, national, or international law
              </li>
              <li className="mb-2">
                Attempt to gain unauthorized access to any portion of the
                Service or any systems or networks connected to the Service
              </li>
              <li className="mb-2">
                Interfere with or disrupt the Service or servers or networks
                connected to the Service
              </li>
              <li className="mb-2">
                Reproduce, duplicate, copy, sell, resell, or exploit any portion
                of the Service without express written permission
              </li>
              <li className="mb-2">
                Use automated means (such as bots or scrapers) to access the
                Service without our prior written consent
              </li>
              <li className="mb-2">
                Transmit any viruses, malware, or other malicious code through
                the Service
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Entertainment and Disclaimer
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>IMPORTANT:</strong> Mystic Tarot readings are provided for
              entertainment and self-reflection purposes only. Tarot readings
              should not be considered as professional advice regarding health,
              legal matters, financial decisions, or any other serious life
              matters. We explicitly disclaim any responsibility for decisions
              you make based on tarot readings obtained through our Service.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              You acknowledge and agree that tarot readings are subjective and
              open to interpretation. Results may vary based on individual
              circumstances, and we make no guarantees about the accuracy,
              completeness, or usefulness of any reading. Always consult with
              qualified professionals for important decisions affecting your
              health, finances, legal status, or other significant life matters.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Intellectual Property Rights
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              All content on Mystic Tarot, including but not limited to text,
              graphics, logos, icons, images, tarot card images, audio clips,
              digital downloads, data compilations, and software, is the
              property of Mystic Tarot or its content suppliers and is protected
              by international copyright laws. The compilation of all content on
              this site is the exclusive property of Mystic Tarot.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, publicly perform, republish, download,
              store, or transmit any material from our Service without prior
              written consent, except for personal, non-commercial use as
              permitted by these terms. Tarot card interpretations and meanings
              are based on traditional tarot wisdom and public domain sources,
              adapted and presented in our unique format.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Privacy and Data Protection
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Your privacy is important to us. Our collection and use of
              personal information is governed by our{' '}
              <a
                href="/tw/privacy"
                className="text-tarot-purple dark:text-tarot-gold hover:underline"
              >
                Privacy Policy
              </a>
              , which is incorporated into these Terms of Service by reference.
              By using the Service, you consent to the collection and use of
              your information as described in the Privacy Policy.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              We take data protection seriously and implement appropriate
              technical and organizational measures to protect your information.
              Your reading data and questions are stored locally on your device
              and are not transmitted to our servers, ensuring maximum privacy
              for your spiritual practice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Third-Party Services and Advertising
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Mystic Tarot is supported by advertising through Google AdSense
              and Google AdMob. These third-party services may collect and use
              data according to their own privacy policies. We are not
              responsible for the content or privacy practices of third-party
              websites or services. We recommend reviewing the privacy policies
              of any third-party services you interact with through our
              platform.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              The Service may contain links to external websites that are not
              operated by us. We have no control over the content and practices
              of these sites and cannot accept responsibility or liability for
              their respective privacy policies or content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Limitation of Liability
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              To the fullest extent permitted by applicable law, Mystic Tarot
              and its affiliates, officers, employees, agents, partners, and
              licensors shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including but not
              limited to loss of profits, data, use, goodwill, or other
              intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li className="mb-2">
                Your access to or use of or inability to access or use the
                Service
              </li>
              <li className="mb-2">
                Any conduct or content of any third party on the Service
              </li>
              <li className="mb-2">
                Any content obtained from the Service, including tarot readings
                and interpretations
              </li>
              <li className="mb-2">
                Unauthorized access, use, or alteration of your transmissions or
                content
              </li>
              <li className="mb-2">
                Decisions or actions taken based on tarot readings obtained
                through the Service
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Disclaimer of Warranties
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis,
              without warranties of any kind, either express or implied,
              including but not limited to implied warranties of
              merchantability, fitness for a particular purpose,
              non-infringement, or course of performance. Mystic Tarot does not
              warrant that the Service will function uninterrupted, be secure or
              available at any particular time or location, be error-free or
              free of viruses or other harmful components, or that defects will
              be corrected.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Indemnification
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Mystic Tarot and
              its affiliates, licensors, and service providers, and their
              respective officers, directors, employees, contractors, agents,
              licensors, suppliers, successors, and assigns from and against any
              claims, liabilities, damages, judgments, awards, losses, costs,
              expenses, or fees (including reasonable attorneys' fees) arising
              out of or relating to your violation of these Terms of Service or
              your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              11. Termination
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              We may terminate or suspend your access to the Service
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach these Terms
              of Service. Upon termination, your right to use the Service will
              immediately cease. You may discontinue using the Service at any
              time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              12. Governing Law and Dispute Resolution
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which Mystic Tarot operates,
              without regard to its conflict of law provisions. Any disputes
              arising from or relating to these Terms or the Service shall first
              be attempted to be resolved through good faith negotiations. If a
              dispute cannot be resolved through negotiation, it shall be
              resolved through binding arbitration or in the appropriate courts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              13. Changes to Terms
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time
              at our sole discretion. If a revision is material, we will provide
              at least 30 days' notice prior to any new terms taking effect.
              What constitutes a material change will be determined at our sole
              discretion. By continuing to access or use our Service after any
              revisions become effective, you agree to be bound by the revised
              terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              14. Contact Information
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:fish760217@gmail.com"
                className="text-tarot-purple dark:text-tarot-gold hover:underline"
              >
                fish760217@gmail.com
              </a>
            </p>
          </section>

          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-gray-800 dark:text-gray-200">
              <strong className="block mb-2">Important Reminder:</strong>
              Mystic Tarot is designed for entertainment and self-reflection. By
              using our Service, you acknowledge that tarot readings are not a
              substitute for professional medical, legal, financial, or
              psychological advice. Always consult qualified professionals for
              important life decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
