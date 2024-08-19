const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center m-auto">
          <img src="\src\assets\weather.png" alt="Weather App Logo" className="h-10 w-10 mr-2 rounded-lg" />
          <h1 className="text-2xl font-bold m-auto">Weather App</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
