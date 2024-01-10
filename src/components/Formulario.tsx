import '../styles/Formulario.css';
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { userName } from '../stores/userLogin';

interface Props {
    pizza: string;
}

function Formulario({pizza}: Props) {
    const $user = useStore(userName);
    const [size, setSize] = useState<string>("ch");
    const [type, setType] = useState<string>("Normal");
    const [price, setPrice] = useState<number>(150);

    // Inicializa el estado con el valor predeterminado del select
    const [number, setNumber] = useState<number>(1);

    // Manejador para cuando cambie la selección
    const handleChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
        setNumber(Number(event.target.value));
    };

    const sendToCart = () => {
        fetch(
            `http://localhost:8080/prueba/carrito.jsp?number=${number}&pizza=${pizza}&price=${price}&size=${size}&type=${type}&user="${$user}"`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
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


    useEffect(() => {
        let priceAux = 150;
        switch (size) {
            case 'ch':               
                priceAux = 80;
                break;
            case 'm':               
                priceAux = 120;
                break;
            case 'g':               
                priceAux = 180;
                break;
            case 'f':                
                priceAux = 250;
                break;
            default:
                priceAux = 150;
                break;
        }

        switch (type) {
            case 'Normal':
                priceAux += 0;
                break;
            case 'Cheese Stuffed':
                priceAux += 50;
                break;
            case 'Cheese fingers':
                priceAux += 100;
                break;
            default:
                priceAux += 0;
                break;
        }
        setPrice(priceAux * number);

    }, [size, type, number]);

    return (
        <>
            <label>Elige un tamaño: </label>
            <div className="chips">
                <button className={`chip ${size === 'ch' ? 'selected': ''}`} onClick={()=>setSize('ch')}>ch</button>
                <button className={`chip ${size === 'm' ? 'selected': ''}`} onClick={()=>setSize('m')} >m</button>
                <button className={`chip ${size === 'g' ? 'selected': ''}`} onClick={()=>setSize('g')} >g</button>
                <button className={`chip ${size === 'f' ? 'selected': ''}`} onClick={()=>setSize('f')} >f</button>
            </div>     
            <label>Choose the type of shore:</label>
            <div className="chips">  
                <button className={`chip-large ${type === 'Normal' ? 'selected': ''}`} onClick={()=>setType("Normal")}>Normal</button>
                <button className={`chip-large ${type === 'Cheese Stuffed' ? 'selected': ''}`} onClick={()=>setType("Cheese Stuffed")}>Cheese Stuffed</button>
                <button className={`chip-large ${type === 'Cheese fingers' ? 'selected': ''}`} onClick={()=>setType("Cheese fingers")}>Cheese fingers</button>
            </div>
            <label>Numero de pizzas: </label> 
            <select onChange={handleChange} value={number}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <label>Price: <span>${price}</span></label>
            <footer>
                <button onClick={sendToCart}>Add to cart</button>
            </footer>
        </>
    )
}

export default Formulario;