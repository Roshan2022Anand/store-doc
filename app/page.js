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

  })


  // all the save cards are shown when the website is mounted
  useEffect(() => {
    let cardProps = JSON.parse(localStorage.getItem('card-props'));
    if (cardProps) {
      setcardComponentArr([...cardComponentArr, ...cardProps])
    }

  }, [])

  //funtion to open or close form
  const openCloseForm = () => {
    if (formContainerState) {
      gsap.to(".formContainer", {
        width: 'fit-content',
        height: 'fit-content',
        border: 'none',
        backgroundColor: 'transparent',
        duration: 0.5
      })

      gsap.to("#addBtn", {
        borderRadius: '10px',
        width: 40,
        rotate: -360,
        duration: 0.5
      })
    } else {
      gsap.to(".formContainer", {
        borderLeft: '1px solid white',
        borderBottom: '1px solid white',
        width: 250,
        height: 250,
        backgroundColor: 'black',
      })
      gsap.to("#addBtn", {
        width: 35,
        height: 35,
        borderRadius: '50%',
        rotate: 360,
        duration: 0.5
      })

    }
    setformForCard(!formForCard);
    setformContainerState(!formContainerState);
  }

  // funtion to delete the exciting card
  const deleteCard = (index) => {
    let newCardComponentArr = cardComponentArr;
    newCardComponentArr.splice(index, 1);
    setcardComponentArr([...newCardComponentArr]);
    localStorage.setItem('card-props', JSON.stringify([...newCardComponentArr]))
  }
  // localStorage.clear();
  //funtion to create a new card whenever clicked
  const creatCard = () => {
    let cardInfoObj = {
      "cardcount": cardCount,
      "title": titleValue,
      "description": descValue
    }

    // localStorage.setItem('count',cardCount);
    setcardComponentArr([...cardComponentArr, cardInfoObj]);
    localStorage.setItem('card-props', JSON.stringify([...cardComponentArr, cardInfoObj]))
    openCloseForm();
    setcardCount(cardCount + 1);
  }


  // funtion to not let the user to create the card
  const dontCreate = () => {
    gsap.fromTo(".shake", {
      x: -5,
      border: '2px solid red'
    }, {
      x: 5,
      yoyo: true,
      repeat: 6,
      duration: 0.09,
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
          <button className='border-zinc-500 text-zinc-500 border-2 rounded-lg w-[40px] font-bold z-50 m-1' onClick={openCloseForm} id='addBtn'>
            {(formContainerState) ? '-' : '+'}</button>
          {/* form for creating a card */}
          {(formForCard) ? <form className='form' onSubmit={(e) => {
            e.preventDefault();
          }}>
            <input className='shake' type='text' placeholder='Title' value={titleValue} onChange={(e) => { settitleValue(e.target.value) }} />
            <textarea className='shake' cols={5} rows={10}
              placeholder='Description' value={descValue}
              onChange={(e) => { setdescValue(e.target.value) }} />
            <button className='font-bold'>Attach file +</button>
            <input type='submit' value='Create' className='createBtn' onClick={() => {
              if (titleValue != "" && descValue != "") {
                creatCard();
                settitleValue("");
                setdescValue("");
              } else { dontCreate(); }
            }} />
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
            return <Card cardCount={ele['cardcount']} mainContainer={mainContainer} title={ele.title} desc={ele.description} deleteCard={deleteCard} />
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