import { useState } from 'react';
import './style.scss';

export default function Hangman() {

   const phrases = [
      "white house",
      "donald trump",
      "watermelon",
      "hit the waves",
      "feel the breeze",
      "summer memories",
      "just add water",
      "have a good jorney",
      "christmas is coming",
      "happy new year"
   ];

   let [word] = useState(phrases[Math.floor(Math.random() * phrases.length)]);
   let wordArr = [];
   for (let letter of word) { wordArr.push(letter) };

   const alphabet = "abcdefghijklmnopqrstuvwxyz";
   let [counter, setCounter] = useState(11);
   let [result, setResult] = useState('');
   const [matchArr, setMatchArr] = useState([]);
   let finalArr = [];

   if (result.length > 0) {
      window.onkeydown = null;
   } else {
      window.onkeydown = e => {
         if (alphabet.search(e.key) > -1) {
            let newMatchArr = [...matchArr];

            if (word.search(e.key) > -1) {
               newMatchArr.push(e.key);
               setMatchArr(newMatchArr);
            } else {
               setCounter(--counter);
            };

            let letters = [...document.querySelector('.letters').children];
            letters.forEach((item) => {
               finalArr.push(item.innerHTML);
               if (JSON.stringify(wordArr) === JSON.stringify(finalArr)) {
                  setResult('Congratulations! You won!');
               };
            });

            if (counter === 0) { setResult('Game Over!'); }
         };
      };
   };

   return (
      <div className="hangman py-5 bg-dark h-100 text-white">
         <div className="container">
            <h1 className="header">Hangman</h1>
            <h5 className="text-center">Start typing to start the game</h5>
            <div
               className="letters my-4 centered flex-row mx-auto flex-wrap"
               style={{ width: "95%" }}
            >
               {wordArr.map((item, index) => {
                  return (
                     <div
                        key={index}
                        className="m-2 border border-light centered text-uppercase text-white"
                        style={{ width: "40px", height: "40px", userSelect: "none" }}
                     >{matchArr.includes(item) ? item : item === ' ' ? ' ' : counter === 0 ? item : '*'}</div>
                  );
               })}
            </div>
            <div className="centered flex-column">
               <h1 className={"text-center fw-bold mb-3 " + (result === "Game Over!" ? "text-danger" : "text-success")}>{result}</h1>
               <button
                  className="btn text-white border border-light"
                  onClick={() => { window.location.reload(); }}
               >New Word</button>
            </div>
            <div className={"hangman-container" + (counter < 11 ? "" : "invisible")}>
               <div className={"stick" + (counter < 10 ? "" : "invisible")}></div>
               <div className={"stickhor" + (counter < 9 ? "" : "invisible")}></div>
               <div className={"angle" + (counter < 8 ? "" : "invisible")}></div>
               <div className={"loop" + (counter < 7 ? "" : "invisible")}></div>
               <div className={"head" + (counter < 6 ? "" : "invisible")}></div>
               <div className={"body" + (counter < 5 ? "" : "invisible")}></div>
               <div className={"lefthand" + (counter < 4 ? "" : "invisible")}></div>
               <div className={"righthand" + (counter < 3 ? "" : "invisible")}></div>
               <div className={"leftleg" + (counter < 2 ? "" : "invisible")}></div>
               <div className={"rightleg" + (counter < 1 ? "" : "invisible")}></div>
            </div>
         </div>
         <input className='d-none' autoFocus />
      </div>
   );
};