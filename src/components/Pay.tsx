import '../styles/Pay.css';
import { useEffect, useState } from 'react';

interface Props {
    price: string;
}

function Pay({price}: Props) {    

    // Inicializa el estado con el valor predeterminado del select
    const [number, setNumber] = useState<number>(1);    

    const buy = () => {
        
    }

    useEffect(() => {
       
    }, []);

    return (
        <div className="precio">
            <header>
                <h1>Total to pay</h1>
                <h2>$</h2>
                <h1>Payment method</h1>
                <h1>Address</h1>
            </header>
            <div className="container">
            <button className="btn-pagar">Buy</button>
            </div>
        </div>
    )
}

export default Pay;