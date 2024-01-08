import '../styles/login.css';
import { useEffect, useState } from 'react';

function Bienvenida() {    

    const [user, setUser] = useState("");
    const [showWelcome, setShowWelcome] = useState(false);

    return (
        <h1>HOLA {user}</h1>
    )
}

export default Bienvenida;