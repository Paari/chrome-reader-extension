import React, { useEffect, useState, useRef } from 'react';
import './Focus.css';

const Focus = ({ content }) => {
  const [wordPosition, setWordPosition] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [lastMove, setLastMove] = useState(0);
  const [lastToLastMove, setlastToLastMove] = useState(0);

  /**
   * Reference to the position & index
   * needed to get value of state from event listner
   */
  const wordPositionRef = useRef(wordPosition);
  const activeWordIndexRef = useRef(activeWordIndex);
  const activeElement = useRef(null);
  const nextElement = useRef(null);
  const prevElement = useRef(null);
  const lastMoveRef = useRef(lastMove);
  const lastToLastMoveRef = useRef(lastToLastMove);

  /**
   * update state and save the current change
   * event listner is already mounted so it doesn't take state changes
   * @param {number} wordPosition - current position value
   * @param {number} wordIndex - index of the active word
   */
  const setMyState = (wordPosition, wordIndex) => {
    let newPosition = wordPosition;
    // if it is the first element on the page, reset position to 0
    if (activeWordIndexRef.current - 1 === 0) {
      newPosition = 0;
    }
    wordPositionRef.current = newPosition;
    activeWordIndexRef.current = wordIndex;
    setWordPosition(newPosition);
    setActiveWordIndex(wordIndex);
  };

  const updateLastMove = (value, back = false) => {
    lastToLastMoveRef.current = lastMoveRef.current;
    setlastToLastMove(lastMoveRef.current);

    // if the left arrow is pressed
    // update the last move to the width of the previous element in sequence
    // else on right arrow, update with the value
    if (back) {
      let width = prevElement.current.clientWidth + 5;
      lastMoveRef.current = width;
      setLastMove(value);
    } else {
      lastMoveRef.current = value;
      setLastMove(value);
    }
  }

  /**
   * Check the key press and update the position based on the arrow
   * @param {object} event - event listner
   */
  const ArrowPress = (event) => {
    if (event.keyCode === 39) {
      let width = 0;
      if (nextElement && nextElement.current) {
        width = nextElement.current.clientWidth + 5;
      }

      updateLastMove(width);
      const position = wordPositionRef.current - (width);
      const index = activeWordIndexRef.current + 1;
      setMyState(position, index);
    }
    if (event.keyCode === 37) {
      // don't go back if it is the first word
      if (activeWordIndexRef.current < 1) {
        return;
      }

      const position = wordPositionRef.current + (lastMoveRef.current);
      const index = activeWordIndexRef.current - 1;
      updateLastMove(lastToLastMoveRef.current, true);
      setMyState(position, index);
    }
  }

  /**
   * Add event listner to check for key press on component mount
   */
  useEffect(() => {
    // add even listener for keyboard arrows
    document.addEventListener('keydown', ArrowPress);

    return () => {
      window.removeEventListener('keydown', ArrowPress);
    }
  }, []);

  return (
    <div className="rr-focus__container">
      <div
        className="rr-focus__slider"
        style={{
          transform: `translateX(${wordPosition}px)`,
        }}>
        {content.map((word, index) => {
          let re = activeElement;
          if (index === activeWordIndex + 1) {
            re = nextElement;
          }
          if (index === activeWordIndex - 1) {
            re = prevElement;
          }
          return (
            <span
              ref={re}
              key={`key${index}`}
              className={index === activeWordIndex ? 'rr-word active' : 'rr-word'}
            >
              {word}
            </span>
          )
        }
        )}
      </div>
    </div>
  )
}

export default Focus;
