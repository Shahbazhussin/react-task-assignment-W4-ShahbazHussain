const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white mt-8">
      <div className="container mx-auto flex flex-col items-center p-4">
        <p className="text-center">&copy; {new Date().getFullYear()} Weather App. All rights reserved.</p>
        <div className="flex space-x-4 mt-2">
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
