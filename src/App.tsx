import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Consumption from './pages/Consumption';
import Production from './pages/Production';
import Transmission from './pages/Transmission';
import AppProviders from './AppProviders';
import Price from './pages/Price';

function App() {
  return (
    <AppProviders>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/consumption" element={<Consumption />} />
            <Route path="/production" element={<Production />} />
            <Route path="/transmission" element={<Transmission />} />
            <Route path="/price" element={<Price />} />
          </Route>
        </Routes>
      </div>
    </AppProviders>
  );
}

export default App;
