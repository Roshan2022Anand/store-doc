"use client"
import React, { useEffect, useRef, useState } from 'react';
import Card from '@/component/Card';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const page = () => {
  
  //all the states are declared here
  const [cardCount, setcardCount] = useState(0);
  const [cardComponentArr, setcardComponentArr] = useState([]);
  const [formForCard, setformForCard] = useState(false);
  const [formContainerState, setformContainerState] = useState(false);
  const [titleValue, settitleValue] = useState("");
  const [descValue, setdescValue] = useState("");


  //all the reference of the element
  const allCardContainer = useRef(null);
  const mainContainer = useRef(null);

  //tracking the mouse movement 
  const [mousePosX, setMousePosX] = useState();
  const [mousePosY, setMousePosY] = useState();
  const [mouseTargetEle, setMouseTargetEle] = useState();

  useEffect(() => {
    const handleMouseMove = (point) => {
      setMousePosX(point.x);
      setMousePosY(point.y);
      setMouseTargetEle(point.target.id);
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }

  }, [])

  //funtion to open or close form
  const openCloseForm = () => {
    if (formContainerState) {
      gsap.to(".formContainer", {
        width: 50,
        height: 40,
        duration: 0.5
      })
    } else {
      gsap.to(".formContainer", {
        width: 250,
        height: 200,
        duration: 0.5
      })
    }
    setformForCard(!formForCard);
    setformContainerState(!formContainerState);
  }

  // funtion to delete the exciting card
  const deleteCard=(index)=>{
    console.log("working");    
    let newCardComponentArr=cardComponentArr;
    newCardComponentArr.slice(index,1);
    setcardComponentArr(newCardComponentArr);
  }

  //funtion to create a new card whenever clicked
  const creatCard = () => {
    setcardComponentArr([...cardComponentArr, <Card cardCount={cardCount} mainContainer={mainContainer} title={titleValue} desc={descValue} deleteCard={deleteCard}/>])
    openCloseForm();
    setcardCount(cardCount + 1);
  }


  // funtion to not let the user to create the card
  const dontCreate=()=>{
    gsap.fromTo(".shake",{
      x:-5,
      border:'2px solid red'
    },{
      x:5,
      yoyo:true,
      repeat:6,
      duration:0.09,
      ease: "power1.inOut", 
    })
  }

  //gsap design for initial page relode
  useGSAP(() => {
    gsap.from('.logo', {
      opacity: 0,
      y: 200,
      duration: 0.7,
      scale: 0,
      stagger: 0.5,
      color: 'orange',
    })
    gsap.to('.ball', {
      y: -100,
      duration: 0.5,
      yoyo: true,
      repeat: -1
    })

  })

  return (
    <>

      <div ref={mainContainer} className='w-screen h-screen relative'>

        {/* container which holds the button and form for creating a card */}
        <div className='formContainer flex flex-col items-end z-50' >
          <button className='border-black text-black border-2 rounded-lg w-[40px] font-bold z-50 m-1' onClick={openCloseForm} id='addBtn'>
            {(formContainerState) ? '-' : '+'}</button>
          {/* form for creating a card */}
          {(formForCard) ? <form className='form' onSubmit={(e) => {
            e.preventDefault();
            if(titleValue!="" && descValue!=""){
              creatCard();
              settitleValue("");
              setdescValue("");
            }else{dontCreate();}
          }}>
            <input className='shake' type='text' placeholder='Title' value={titleValue} onChange={(e) => { settitleValue(e.target.value) }} />
            <textarea className='shake' cols={5} placeholder='Description' value={descValue}
              onChange={(e) => { setdescValue(e.target.value) }} />
            <button className='font-bold'>Attach file +</button>
            <input type='submit' value='Create' className='createBtn'/>
          </form>
            : <></>}
        </div>

        {/* main logo of the website */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 text-9xl text-zinc-500 flex'>
          <p className='logo'>D</p>
          <p className='logo'>O</p>
          <p className='logo'>C</p>
          <p className='logo'>.</p>
        </div>

        {/* div container which will contain all the cards */}
        <div ref={allCardContainer} className=''>
          {cardComponentArr.map((ele) => {
            return ele
          })}
        </div>

        <div className='ball -z-100'></div>

      </div>

      {/* div for mouse circle */}
      <div style={{
        top: `${mousePosY}px`,
        left: `${mousePosX}px`,
        display: `${(mouseTargetEle != "") ? 'none' : 'block'}`
      }} className='mouseCircle'></div>

    </>
  )
}

export default page