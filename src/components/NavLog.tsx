import { useStore } from '@nanostores/react';
import { isLogin, userName } from '../stores/userLogin';

function NavLog() {
    const $isLogin = useStore(isLogin);
    const $userName = useStore(userName);
    console.log($isLogin);
    return (
        <div>
            { !$isLogin ? <a href='/login'>Login</a> : <a>{$userName}</a>}
        </div>
    )
}

export default NavLog;