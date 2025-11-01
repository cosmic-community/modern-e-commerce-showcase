export const metadata = {
  title: 'About Us | Modern E-Commerce Showcase',
  description: 'Learn more about our mission to provide quality products with authentic customer reviews',
}

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
        <p className="text-xl text-gray-600">
          Discover our story and commitment to quality
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            At E-Commerce Showcase, we're dedicated to providing our customers with premium products backed by authentic customer reviews. We believe in transparency, quality, and exceptional service.
          </p>
          <p className="text-lg text-gray-700">
            Our curated collections are carefully selected to ensure every product meets our high standards. We value honest feedback and work continuously to improve our offerings based on customer experiences.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-primary mb-3">Quality First</h3>
            <p className="text-gray-600">
              Every product is carefully vetted to ensure it meets our rigorous quality standards.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-primary mb-3">Customer Trust</h3>
            <p className="text-gray-600">
              We prioritize authentic reviews and transparent communication with our customers.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-primary mb-3">Innovation</h3>
            <p className="text-gray-600">
              We continuously improve our platform and offerings to provide the best shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="mb-16">
        <div className="bg-secondary bg-opacity-10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 mb-4">
            Founded with a vision to revolutionize online shopping, we started as a small team passionate about connecting customers with quality products. Today, we've grown into a trusted platform that serves thousands of satisfied customers.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            What sets us apart is our commitment to authenticity. Every review on our platform is from a verified customer, and we showcase both positive and constructive feedback to help shoppers make informed decisions.
          </p>
          <p className="text-lg text-gray-700">
            As we continue to grow, our core mission remains the same: to provide exceptional products, honest reviews, and outstanding customer service.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg mb-6">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <p className="text-lg">
            Email us at{' '}
            <a href="mailto:hello@ecommerce-showcase.com" className="text-secondary hover:text-accent transition-colors font-semibold">
              hello@ecommerce-showcase.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}