import React from 'react'
import { motion } from "framer-motion"

const Card = ({ cardCount, mainContainer, title, desc ,deleteCard}) => {
    let arr = [0, 1, 2, 3, 4];
    let newArr = arr.splice(1, 1);
    console.log(arr, newArr);

    return (
        <motion.div drag={true} dragConstraints={mainContainer} className='card' id={cardCount} style={{
            top: `${Math.floor(Math.random() * 66)}%`,
            left: `${Math.floor(Math.random() * 70)}%`
        }}>
            <div className='deleteBtnHolder' >
                <button onClick={() => { deleteCard(cardCount) }}>✖</button>
            </div>

            <div className='cardInfo'>
                <div>{title}</div>
                <div>{desc}</div>
            </div>


        </motion.div>
    )
}

export default Card