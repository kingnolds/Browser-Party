function Card({card, id, handleClick}) {
    const cardClass = card.status ? " active " + card.status : ""; 
    return (
        <div className= {"card" + cardClass} onClick={() => handleClick(id)}>
            <img src={card.img} alt="" />
        </div>
    )
}
export default Card;