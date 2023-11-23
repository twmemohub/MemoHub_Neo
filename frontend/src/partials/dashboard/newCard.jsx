import React from "react";
import useSendingLinkedNotes from "../../hooks/collector/useSendingLinkedNotes";
import { ShowNumContext } from "./ArticleProvider";
import NewCards from "./NewCards";
import { useContext, useState } from "react";

function NewCard({ Ids }) {
  const { showNum } = useContext(ShowNumContext);
  const { noteTitles, noteContents, noteIds } = useSendingLinkedNotes(
    Ids[showNum]
  );

  return (
    <div className=" flex flex-wrap">
      <header className="px-5 py-4 border-b ">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Linked Notes
        </h2>
      </header>
      <div className="flex flex-wrap justify-around gap-2 p-2 overflow-y-auto">
        {noteTitles.map((item, index) => (
          <NewCards
            key={noteIds[index]}
            title={item}
            content={noteContents[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default NewCard;
