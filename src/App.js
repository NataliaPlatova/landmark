import './App.css';
import HomePage from './pages/HomePage';
import CookiesProvider from "react-cookie/cjs/CookiesProvider";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <HomePage />
      </CookiesProvider>
    </div>
  );
}

export default App;
