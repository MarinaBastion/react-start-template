import React, { useState } from "react";
import Styles from "./group-buttons.module.css";


export interface ButtonGroupProps {
    buttons: string[],
    doSomethingAfterClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({buttons,doSomethingAfterClick }) => {
  const [clickedId, setClickedId] = useState(-1);

  const handleClick = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, id:number) => {
    setClickedId(id);
    doSomethingAfterClick(event);
  };

  return (
    <>
      {buttons.map((buttonLabel, i) => (
        <button
          key={i}
          name={buttonLabel}
          onClick={(event) => handleClick(event, i)}
          className={i === clickedId ? Styles.customButton + " "+ Styles.active : Styles.customButton}
        >
          {buttonLabel}
        </button>
      ))}
    </>
  );
};