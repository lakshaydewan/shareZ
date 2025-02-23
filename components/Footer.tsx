export default function Footer() {
    return (
      <footer className="w-full absolute bottom-0 text-white py-3 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          <nav className="flex flex-wrap justify-center md:justify-start space-x-6 md:space-x-10 text-gray-300 text-sm">
            <a href="/about" className="hover:text-white transition">About</a>
            <a href="/blog" className="hover:text-white transition">Blog</a>
            <a href="/careers" className="hover:text-white transition">Careers</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </nav>
          <div className="flex space-x-6 text-gray-300 text-sm">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Twitter
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              GitHub
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Discord
            </a>
          </div>
        </div>
      </footer>
    );
  }
  