import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import useSendingNote from "../../hooks/collector/useSendingNote";
import CardWithState from "./CardWithState";
// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
// ["I want to learn flutter", "I want to create my product"]

//api

function SetQuestions({
  setQuestion,
  cardSelected,
  setCardSelected,
  setNoteId,
}) {
  const { user } = useUser();
  const userId = user?.id;
  const { titles, contents, noteids } = useSendingNote(userId);
  // const noteId = ["6537d7982c4af51ff9cd13ad", "6537d8052c4af51ff9cd13b0"];

  const labelButtonClick = async () => {
    const LinkednoteId = cardSelected.map((item) => noteids[item]);
    setQuestion({"initial":"Loading question...."});
    setNoteId(LinkednoteId);
    setCardSelected([]);
    console.log("question starts creating");
    // Mapping all noteId
    const noteTitle = LinkednoteId.map(async (noteId) => {
      const noteApiUrl = `http://localhost:3000/note/${noteId}`;
      const res = await fetch(noteApiUrl, {
        method: "GET",
      });
      const note = await res.json();
      return note.title;
    });
    const noteTitleList = await Promise.all(noteTitle);
    // console.log(noteTitleList)
    const AIapiUrl = "http://localhost:3000/user/article/label";
    const res = await fetch(AIapiUrl, {
      method: "POST",
      headers: {
        // 確定傳JSON
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: noteTitleList }),
    });
    const question = await res.json();
    console.log(question.ans);
    setQuestion(question.ans);
    setNoteId(LinkednoteId);
  };

  return (
    <>
      <div className="col-span-12 xl:col-span-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
        <div className="px-5 pt-5">
          <div className="flex justify-center items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2 mb-2">
              Your Related Notes
            </div>
          </div>

          <div className="flex justify-center w-full mb-5 gap-5">
            {/* box1 */}
            <div className="w-40% basis-1/2 mb-5 ">
              <div className="flex items-start">
                <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mr-2 mb-5 font-['Poppins']">
                  Your Notes
                </div>
              </div>
              <div className="flex w-full h-[800px] bg-neutral-100 rounded-[10px] overflow-y-auto shadow-lg">
                <div className="flex flex-wrap justify-around gap-2 p-2">
                  {titles.map((item, index) =>
                    cardSelected.indexOf(index) !== -1 ? null : (
                      <CardWithState
                        key={noteids[index]}
                        title={item}
                        content={contents[index]}
                        index={index}
                        setCardSelected={setCardSelected}
                        cardSelected={cardSelected}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* box2 */}
            <div className="w-40% basis-1/2 mb-5 ">
              <div className="flex items-start">
                <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mr-2 mb-5 font-['Poppins']">
                  Picked Notes
                </div>
              </div>
              <div className="flex w-full h-[800px]  bg-neutral-100 rounded-[10px] overflow-y-auto shadow-lg">
                <div className="flex flex-wrap justify-around gap-2 p-2">
                  {titles.map((item, index) =>
                    cardSelected.indexOf(index) !== -1 ? (
                      <CardWithState
                        key={noteids[index]}
                        title={item}
                        content={contents[index]}
                        index={index}
                        setCardSelected={setCardSelected}
                        cardSelected={cardSelected}
                      />
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex flex-col items-center ">
          <button
            type="button"
            className="bg-black text-white px-4 py-2 rounded-xl mb-6"
            style={{ width: "15%" }}
            onClick={labelButtonClick}
          >
            Help Me Think
          </button>
        </div>
      </div>
    </>
  );
}

export default SetQuestions;
