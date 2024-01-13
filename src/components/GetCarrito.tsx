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

function GetCarrito() {
    const $user = useStore(userName);
    const [carrito, setCarrito] = useState<Product[]>([]);
    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        obtenerCarrito();
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
                    <h1>Address</h1>
                </header>
                <div className="container">
                <button className="btn-pagar">Buy</button>
            </div>
        </div>
        </main>
    )
}

export default GetCarrito;