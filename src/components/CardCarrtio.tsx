import '../styles/cardCarrito.css';
interface Props {
    id:number;
    pizza:string,
    size:string,
    type:string,
    price:number,
    number:number,
    img:string,

}
function CardCarrito({id, pizza, size, type, price, number,img}:Props) {
    console.log(img)
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
                    src={img}
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