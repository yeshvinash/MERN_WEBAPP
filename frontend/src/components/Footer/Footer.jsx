const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="flex justify-between items-center p-4">
        <p>&copy; {new Date().getFullYear()} MyCompany. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="Instagram"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
