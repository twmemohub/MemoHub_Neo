import React, { useState } from "react";

function CardWithState({
  title,
  content,
  index,
  setCardSelected,
  cardSelected,
}) {
  const handleNoteState = () => {
    const location = cardSelected.indexOf(index);
    if (location !== -1) {
      const temp = cardSelected;
      temp.splice(location, 1);
      setCardSelected(temp);
      setCardSelected([...cardSelected]);
    } else {
      setCardSelected([...cardSelected, index]);
    }
  };

  return (
    <div className="border-solid border border-black-1000 relative rounded-lg bg-white h-45 w-60 p-4">
      <button
        type="button"
        className="font-bold bg-transparent text-black px-2 rounded-xl absolute top-3 right-3 "
        onClick={handleNoteState}
      >
        {cardSelected.indexOf(index) !== -1 ? "-" : "+"}
      </button>
      <div className="flex">
        <h1 className="font-bold mt-3 text-black-500">{title}</h1>
      </div>
      <p className="px-3 mt-1 ml-3">{content}</p>
    </div>
  );
}

export default CardWithState;
