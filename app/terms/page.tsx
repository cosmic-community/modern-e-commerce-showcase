export const metadata = {
  title: 'Terms of Use | Modern E-Commerce Showcase',
  description: 'Read our terms and conditions for using our e-commerce platform',
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Terms of Use</h1>
        <p className="text-gray-600">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 mb-4">
            Welcome to Modern E-Commerce Showcase. By accessing or using our website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. Your continued use of the website following any changes constitutes acceptance of those changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Use License</h2>
          <p className="text-gray-700 mb-4">
            Permission is granted to temporarily access and use the materials on Modern E-Commerce Showcase's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or public display</li>
            <li>Attempt to decompile or reverse engineer any software on the website</li>
            <li>Remove any copyright or proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
          <p className="text-gray-700">
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by Modern E-Commerce Showcase at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">User Accounts</h2>
          <p className="text-gray-700 mb-4">
            When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
            <li>Ensuring your account information remains accurate and up-to-date</li>
          </ul>
          <p className="text-gray-700">
            We reserve the right to suspend or terminate your account if you provide false information, violate these terms, or engage in fraudulent activity.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Product Information and Pricing</h2>
          <p className="text-gray-700 mb-4">
            We strive to provide accurate product descriptions, images, and pricing. However:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Product colors may vary slightly from what appears on your screen</li>
            <li>We do not guarantee that product descriptions are error-free</li>
            <li>Prices are subject to change without notice</li>
            <li>We reserve the right to limit quantities or refuse orders</li>
            <li>We reserve the right to correct pricing errors, even after an order is placed</li>
          </ul>
          <p className="text-gray-700">
            If a product is listed at an incorrect price due to an error, we will contact you to either cancel the order or offer the product at the correct price.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Orders and Payment</h2>
          <p className="text-gray-700 mb-4">
            By placing an order, you agree to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Provide current, complete, and accurate purchase and account information</li>
            <li>Promptly update account information for continued service</li>
            <li>Pay all charges at prices in effect when incurred</li>
            <li>Pay applicable taxes and shipping fees</li>
          </ul>
          <p className="text-gray-700 mb-4">
            We accept the following payment methods: major credit cards, debit cards, and other payment options as displayed at checkout. All payments are processed securely through trusted third-party payment processors.
          </p>
          <p className="text-gray-700">
            Order confirmation does not guarantee product availability. We will notify you if a product becomes unavailable after you place an order.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Shipping and Delivery</h2>
          <p className="text-gray-700 mb-4">
            Shipping times and costs vary based on your location and selected shipping method. We are not responsible for:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Delays caused by shipping carriers</li>
            <li>Lost or stolen packages after delivery confirmation</li>
            <li>Customs fees or import duties for international orders</li>
            <li>Incorrect addresses provided by customers</li>
          </ul>
          <p className="text-gray-700">
            Risk of loss and title for products pass to you upon delivery to the shipping carrier.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Returns and Refunds</h2>
          <p className="text-gray-700 mb-4">
            We want you to be satisfied with your purchase. Our return policy includes:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Returns accepted within 30 days of delivery</li>
            <li>Products must be unused and in original packaging</li>
            <li>Original receipt or proof of purchase required</li>
            <li>Refunds processed within 5-10 business days of receiving the return</li>
            <li>Original shipping costs are non-refundable</li>
            <li>Customer responsible for return shipping costs unless item is defective</li>
          </ul>
          <p className="text-gray-700">
            Certain items may not be eligible for return due to hygiene or safety reasons. Please check product descriptions for specific return restrictions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">User-Generated Content</h2>
          <p className="text-gray-700 mb-4">
            By submitting product reviews, comments, or other content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content. You represent that:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>You own or have rights to the content you submit</li>
            <li>Your content does not violate any third-party rights</li>
            <li>Your content is not defamatory, obscene, or illegal</li>
            <li>Your reviews are based on your genuine experience with the product</li>
          </ul>
          <p className="text-gray-700">
            We reserve the right to remove any content that violates these terms or is otherwise objectionable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Prohibited Activities</h2>
          <p className="text-gray-700 mb-4">
            You agree not to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Use the website for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the website's operation</li>
            <li>Transmit viruses, malware, or harmful code</li>
            <li>Harvest or collect user information without consent</li>
            <li>Impersonate another person or entity</li>
            <li>Engage in any form of automated use of the system</li>
            <li>Use the website to distribute spam or unsolicited messages</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Intellectual Property</h2>
          <p className="text-gray-700 mb-4">
            All content on this website, including text, graphics, logos, images, and software, is the property of Modern E-Commerce Showcase or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-gray-700">
            You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Disclaimer of Warranties</h2>
          <p className="text-gray-700 mb-4">
            The materials on Modern E-Commerce Showcase's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Implied warranties of merchantability or fitness for a particular purpose</li>
            <li>That the website will be uninterrupted, timely, secure, or error-free</li>
            <li>That the results from using the website will be accurate or reliable</li>
            <li>That defects will be corrected</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            To the maximum extent permitted by law, Modern E-Commerce Showcase shall not be liable for any damages arising from:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Use or inability to use our website</li>
            <li>Unauthorized access to or alteration of your data</li>
            <li>Statements or conduct of any third party on the website</li>
            <li>Any other matter relating to the website or services</li>
          </ul>
          <p className="text-gray-700">
            In no event shall our total liability exceed the amount paid by you for the products purchased.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Indemnification</h2>
          <p className="text-gray-700">
            You agree to indemnify, defend, and hold harmless Modern E-Commerce Showcase and its affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the website, violation of these terms, or infringement of any third-party rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Governing Law</h2>
          <p className="text-gray-700">
            These terms shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts located in New York County, New York.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Severability</h2>
          <p className="text-gray-700">
            If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-4">
            Questions about these Terms of Use should be sent to:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong>{' '}
              <a href="mailto:legal@ecommerce-showcase.com" className="text-secondary hover:text-accent transition-colors">
                legal@ecommerce-showcase.com
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