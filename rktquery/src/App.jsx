import Header from "./components/Header";
import RecentSearches from "./components/RecentSearches";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <RecentSearches />
      </main>
      <Footer />
    </div>
  );
}

export default App;
