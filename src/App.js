
import './App.css';
import Header from './components/header/header';
import GameField from './components/gameField/gameField';
import Menu from './components/menu/menu';
import SignIn from './components/loginPage/signinPage';
import LogIn from './components/loginPage/loginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (

    <Router>

      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="easy" element={<GameField difficulty={'easy'} />} />
        <Route path="medium" element={<GameField difficulty={'medium'} />} />
        <Route path="hard" element={<GameField difficulty={'hard'} />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/login' element={<LogIn />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}





export default App;
