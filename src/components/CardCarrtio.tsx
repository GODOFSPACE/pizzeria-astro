interface Props {
    id:number;
    pizza:string,
    size:string,
    type:string,
    price:number,
    number:number,

}
import '../styles/cardCarrito.css';
function CardCarrito({id, pizza, size, type, price, number}:Props) {

    const deletePizza = () => {
        fetch(
            `http://localhost:8080/prueba/delete.jsp?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return (
        <section className="card">
            <header>
                <h1>{pizza}</h1>
            </header>
            <picture>
                <img
                    src="https://selecciones.com.mx/wp-content/uploads/2022/02/recetas-de-pizzas-amigables-con-el-planeta.jpg"
                    alt="Imagen"
                />
            </picture>    
            <div className="chips">
                <button className="chip selected">{size}</button>
                <button className="chip-large selected">{type}</button>
            </div>
            <footer>
                <div className="price">Precio: {price}<span></span></div>
                <div className="">cantidad: {number}</div>
                <button className="btn-card" onClick={()=>deletePizza()}>Delete</button>
            </footer>
        </section>
    )
}
export default CardCarrito;