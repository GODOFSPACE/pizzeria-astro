import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { userName } from '../stores/userLogin';
import CardCarrito from './CardCarrtio';

import '../styles/getOrders.css';

interface Orders {
    total: number;
    fecha: string;
    payment: string;
    colony: string;
    postalcode: string;
    municipality: string;
}

function GetOrders() {    
    const [orders, setOrders] = useState<Orders[]>([]);
    const $user = useStore(userName);
    useEffect(() => {
        getOrders();
    }, [])
    const getOrders = async() => {
        const res = await fetch(
            `http://localhost:8080/prueba/orders.jsp?user=${$user}`, {
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
        setOrders(data);
    }
    return (
        <div>
            <h1>Orders</h1>
            <div className="container">
                {orders.map((order: Orders) => (
                    <>
                        <header>
                            <h1>Fecha: {order.fecha}</h1>
                        </header>
                        <section>
                            <p>Payment: {order.payment}</p>
                            <p>Colony: {order.colony}</p>
                            <p>PostalCode: {order.postalcode}</p>
                            <p>Municipality: {order.municipality}</p>
                            <p>Total: ${order.total}</p>
                        </section>
                    </>
                ))}
            </div>
        </div>
    )
}

export default GetOrders;