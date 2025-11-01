export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">E-Commerce</h3>
            <p className="text-gray-300">
              Discover quality products with authentic customer reviews
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-gray-300 hover:text-secondary transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/collections" className="text-gray-300 hover:text-secondary transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="/reviews" className="text-gray-300 hover:text-secondary transition-colors">
                  Reviews
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Powered By</h4>
            <p className="text-gray-300">
              Content managed with{' '}
              <a 
                href="https://www.cosmicjs.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent transition-colors"
              >
                Cosmic
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} E-Commerce Showcase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}