import React from 'react';
import { useNavigate } from 'react-router-dom';

function ButtonHome() {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/Home');
    };
    
    return (
        <button className="w-10 h-10 pl-4" onClick={handleClick}>
            <img src="./Casita.png" alt="Home" />
        </button>
    );
}

export default ButtonHome;