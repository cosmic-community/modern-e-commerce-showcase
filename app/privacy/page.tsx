export const metadata = {
  title: 'Privacy Policy | Modern E-Commerce Showcase',
  description: 'Learn how we collect, use, and protect your personal information',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
        <p className="text-gray-600">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Introduction</h2>
          <p className="text-gray-700 mb-4">
            Welcome to Modern E-Commerce Showcase ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p className="text-gray-700">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-primary mb-3">Personal Information</h3>
          <p className="text-gray-700 mb-4">
            We collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Register for an account</li>
            <li>Make a purchase</li>
            <li>Submit a product review</li>
            <li>Contact us for support</li>
            <li>Subscribe to our newsletter</li>
          </ul>
          <p className="text-gray-700 mb-4">
            This information may include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Name and contact information (email address, phone number)</li>
            <li>Account credentials (username, password)</li>
            <li>Payment information (processed securely through third-party payment processors)</li>
            <li>Shipping and billing addresses</li>
            <li>Product reviews and ratings</li>
          </ul>

          <h3 className="text-xl font-semibold text-primary mb-3">Automatically Collected Information</h3>
          <p className="text-gray-700 mb-4">
            When you visit our website, we automatically collect certain information about your device and browsing behavior, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>IP address and browser type</li>
            <li>Operating system and device information</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Manage your account and provide customer support</li>
            <li>Send you order confirmations and shipping updates</li>
            <li>Respond to your inquiries and requests</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Detect and prevent fraud or security issues</li>
            <li>Comply with legal obligations</li>
            <li>Display personalized product recommendations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Sharing Your Information</h2>
          <p className="text-gray-700 mb-4">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Service Providers:</strong> Third-party vendors who assist with payment processing, shipping, email delivery, and analytics</li>
            <li><strong>Business Partners:</strong> Companies we partner with to offer combined services or promotions</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition of our business</li>
          </ul>
          <p className="text-gray-700">
            We do not sell your personal information to third parties for their marketing purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 mb-4">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser preferences, but disabling cookies may limit certain features of our website.
          </p>
          <p className="text-gray-700">
            Types of cookies we use include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            <li><strong>Marketing Cookies:</strong> Track your browsing to show relevant ads</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Secure password hashing</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication protocols</li>
            <li>Employee training on data protection</li>
          </ul>
          <p className="text-gray-700">
            However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Your Privacy Rights</h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Objection:</strong> Object to the processing of your personal information</li>
            <li><strong>Portability:</strong> Request transfer of your data to another service</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
          </ul>
          <p className="text-gray-700">
            To exercise these rights, please contact us at{' '}
            <a href="mailto:privacy@ecommerce-showcase.com" className="text-secondary hover:text-accent transition-colors">
              privacy@ecommerce-showcase.com
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Data Retention</h2>
          <p className="text-gray-700">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Children's Privacy</h2>
          <p className="text-gray-700">
            Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately so we can delete it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">International Data Transfers</h2>
          <p className="text-gray-700">
            Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have questions or concerns about this privacy policy or our data practices, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@ecommerce-showcase.com" className="text-secondary hover:text-accent transition-colors">
                privacy@ecommerce-showcase.com
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> Modern E-Commerce Showcase, 123 Commerce Street, Suite 100, New York, NY 10001
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}