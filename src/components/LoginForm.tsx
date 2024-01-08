import '../styles/login.css';
import { useState } from 'react';

function LoginForm() {    

    
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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json(); // Suponiendo que el servidor responde con JSON
    
        // Aquí puedes trabajar con 'data', que es la respuesta en formato JSON
        if(data.login){
            
            // Encode value in order to escape semicolons, commas, and whitespace
            var cookie = "auth =" + encodeURIComponent(true);
            if (typeof 7 === "number") {
                cookie += "; max-age=" + (7*24*60*60);
                cookie += "; path=/";
                document.cookie = cookie;
            }
            cookie = "user =" + encodeURIComponent(username);
            document.cookie = cookie;
            
            // Uso
            window.location.href = '/';
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