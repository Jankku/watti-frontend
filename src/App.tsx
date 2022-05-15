import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Consumption from './pages/Consumption';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/consumption" element={<Consumption />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
