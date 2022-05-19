import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Consumption from './pages/Consumption';
import Production from './pages/Production';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/consumption" element={<Consumption />} />
          <Route path="/production" element={<Production />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
