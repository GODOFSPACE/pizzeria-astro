import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { userName } from '../stores/userLogin';
import CardCarrito from './CardCarrtio';

import '../styles/GetCarrito.css';

interface Product {
    pizza: string;
    size: string;
    type: string;
    price: number;
    number: number;
    id: number;
    img: string;
}

interface Address {
    colony: string;
    postalcode: string;
    municipality: string;
}

function GetCarrito() {
    const $user = useStore(userName);
    const [carrito, setCarrito] = useState<Product[]>([]);
    const [address, setAddress] = useState<Address>({colony: '', postalcode: '', municipality: ''});
    const [payment, setPayment] = useState('Credit card');
    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        obtenerCarrito();
        getDireccion();
    }, [])
    const obtenerCarrito = async() => {
        const res = await fetch(
            `http://localhost:8080/prueba/carrito.jsp?user=${$user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!res.ok){
            return;
        }

        const data = await res.json();
        console.log(data);
        setCarrito(data);
        let totalAux = 0;
        data.map((product: Product) => {
            totalAux += product.price;
        });
        setTotal(totalAux);
    }
    const getDireccion = async() => {
        const res = await fetch(
            `http://localhost:8080/prueba/address.jsp?user=${$user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!res.ok){
            return;
        }

        const data = await res.json();
        setAddress(data);
    }
    const sendOrder = async () => {
        await fetch(
            `http://localhost:8080/prueba/orders.jsp?user=${$user}&payment=${payment}&total=${total}&colony=${address.colony}&postalcode=${address.postalcode}&municipality=${address.municipality}`, {
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
    return (
        <main>
            <div>
                {
                    carrito.map( (product) => (
                        <CardCarrito
                            id={product.id}
                            pizza={product.pizza}
                            size={product.size}
                            type={product.type}
                            price={product.price}
                            number={product.number}
                            img={product.img}
                        ></CardCarrito>
                    ))
                }
            </div>
            <div className="precio">
                <header>
                    <h1>Total to pay</h1>
                    <h2>${total}</h2>
                    <h1>Payment method</h1>
                    <div className="chips">
                        <button className={`chip-large ${payment==='Credit card' ? 'selected': null}`} onClick={() => setPayment('Credit card')}>Credit card</button>
                        <button className={`chip-large ${payment==='Cash' ? 'selected': null}`} onClick={() => setPayment('Cash')}>Cash</button>
                    </div>
                    <h1>Address</h1>
                    <p>Colony: {address.colony}</p>
                    <p>Postal Code: {address.postalcode}</p>
                    <p>Municipality: {address.municipality}</p>
                </header>
                <div className="container">
                <button className="btn-pagar" onClick={sendOrder}>Buy</button>
            </div>
        </div>
        </main>
    )
}

export default GetCarrito;