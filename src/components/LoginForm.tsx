import '../styles/login.css';
import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isLogin, userName } from '../stores/userLogin';

function LoginForm() {    

    const $isLogin = useStore(isLogin);
    const $userName = useStore(userName);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        console.log('Login con:', username, password);
        const response = await fetch(`http://localhost:8080/prueba/login.jsp?user=${username}&password=${password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
    
        // Aquí puedes trabajar con 'data', que es la respuesta en formato JSON
        if(data.login){
            // Uso
            isLogin.set(true);
            userName.set(username);
            var enlace = document.createElement('a');
            // Establecer el href del enlace
            enlace.href = "/";

            // (Opcional) Ocultar el enlace para que no altere tu layout
            enlace.style.display = 'none';

            // Agregar el enlace al cuerpo del documento
            document.body.appendChild(enlace);

            // Simular un clic en el enlace
            enlace.click();              
        }
    };

    return (
        <section className="card">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password}  onChange={handlePasswordChange} required />
                
                <button type="submit" className="btn-login">Login</button>
            </form>
        </section>
    )
}

export default LoginForm;