import './style.css';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="wraper">


                <div className="menu-container">
                    <div className="menu-header">
                        <h1>Choose a level </h1>
                    </div>
                    <link></link>
                    <button onClick={() => navigate('/easy')}>Easy</button>
                    <button onClick={() => navigate('/medium')}>Medium</button>
                    <button onClick={() => navigate('/hard')}>Hard</button>
                    <button className='new-game-button' onClick={() => navigate('/')}>Back &larr;</button>

                </div>

            </div>


        </>

    );
}

export default Menu;