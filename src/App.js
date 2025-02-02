
import './App.css';
import Header from './components/header/header';
import GameField from './components/gameField/gameField';
import Menu from './components/menu/menu';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/easy" element={<GameField difficulty={'easy'} />} />
        <Route path="/medium" element={<GameField difficulty={'medium'} />} />
        <Route path="/hard" element={<GameField difficulty={'hard'} />} />
      </Routes>
    </Router>
  );
}





export default App;
