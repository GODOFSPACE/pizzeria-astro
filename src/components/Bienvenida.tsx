import '../styles/login.css';
import { useStore } from '@nanostores/react';
import { isLogin, userName } from '../stores/userLogin';

function Bienvenida() {
    const $isLogin = useStore(isLogin);
    const $userName = useStore(userName);
    console.log($isLogin);
    return (
        <div>
            { $isLogin ? <h1>Hi {$userName}!</h1> : <h1>NotLogin</h1>}
        </div>
    )
}

export default Bienvenida;