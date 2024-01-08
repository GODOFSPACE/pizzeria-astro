import '../styles/signup.css';
import { useEffect, useState } from 'react';

function SignUpForm() {    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [colonia, setColonia] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [municipio, setMunicipio] = useState('');

    const handleUsernameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleColoniaChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setColonia(event.target.value);
    };
    const handleCodigoPostalChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setCodigoPostal(event.target.value);
    };
    const handleMunicipioChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setMunicipio(event.target.value);
    };

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        fetch(
            `http://localhost:8080/prueba/prueba.jsp?user=${username}&password=${password}&colony=${colonia}&cp=${codigoPostal}&municipality=${municipio}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    return (
        <section className="card">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Username:</label>
                <input type="text" id="name" name="username" value={username} onChange={handleUsernameChange} required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password}  onChange={handlePasswordChange} required />
                <label htmlFor="direction">Address</label>
                <label htmlFor="colonia">Colony:</label>
                <input type="text" id="colonia" name="colonia" value={colonia}  onChange={handleColoniaChange} required />
                <label htmlFor="codigoPostal">Postal Code:</label>
                <input type="text" id="codigoPostal" name="codigoPostal" value={codigoPostal}  onChange={handleCodigoPostalChange} required />
                <label htmlFor="municipio">Municipality</label>
                <input type="text" id="municipio" name="municipio" value={municipio}  onChange={handleMunicipioChange} required />
                <button type="submit" className="btn-login">SignUp</button>
            </form>
        </section>
    )
}

export default SignUpForm;