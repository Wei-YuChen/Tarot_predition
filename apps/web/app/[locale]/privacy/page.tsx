import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Mystic Tarot',
  description: 'Privacy Policy for Mystic Tarot application and website',
  robots: 'index, follow',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Information We Collect
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Mystic Tarot is designed to respect your privacy. We collect
              minimal information necessary to provide our tarot reading
              services:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>
                Questions you ask during tarot readings (stored locally on your
                device)
              </li>
              <li>Language preference for localization</li>
              <li>Theme preference (light/dark mode)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. How We Use Your Information
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Your information is used solely to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>
                Provide personalized tarot readings based on your questions
              </li>
              <li>Remember your preferences for a better user experience</li>
              <li>Display relevant advertisements through Google AdSense</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Data Storage and Security
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We prioritize your privacy by:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>
                Storing your reading data locally on your device using browser
                localStorage
              </li>
              <li>
                Not transmitting personal questions or reading data to external
                servers
              </li>
              <li>
                Using industry-standard security measures to protect any data we
                do collect
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Third-Party Services
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Our app uses the following third-party services:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Google AdSense:</strong> Displays relevant
                advertisements. Google may collect and use data according to
                their privacy policy.
              </li>
              <li>
                <strong>Google AdMob (Mobile App):</strong> Provides mobile
                advertising services with data collection governed by Google's
                privacy policy.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Cookies and Tracking
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We use minimal cookies and local storage to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Remember your language and theme preferences</li>
              <li>Store your reading history locally on your device</li>
              <li>Enable Google AdSense to display relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Children's Privacy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Our service is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Your Rights
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>
                Clear your local data at any time through your browser settings
              </li>
              <li>
                Disable cookies in your browser (may affect functionality)
              </li>
              <li>Request information about data we may have collected</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Changes to This Policy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page with an updated "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Contact Us
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <ul className="list-none mb-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Email:</strong> privacy@mystictarot.app
              </li>
              <li>
                <strong>App:</strong> Mystic Tarot
              </li>
            </ul>
          </section>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Important:</strong> Mystic Tarot readings are for
              entertainment and self-reflection purposes only. We do not store
              your personal questions on our servers - they remain private on
              your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
