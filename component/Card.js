import React from 'react'
import { motion } from "framer-motion"
import gsap from 'gsap'

const Card = ({ cardCount, mainContainer, title, desc ,deleteCard }) => {
   
    return (
        <motion.div drag={true} dragConstraints={mainContainer} className='card' id={cardCount}>
            <div className='deleteBtnHolder' >
                <button onClick={() => {
                     deleteCard(cardCount)
                     console.log(cardCount);
                      }}>✖</button>
            </div>

            <div className='cardInfo'>
                <div>{title}</div>
                <div>{desc}</div>
            </div>


        </motion.div>
    )
}

export default Card