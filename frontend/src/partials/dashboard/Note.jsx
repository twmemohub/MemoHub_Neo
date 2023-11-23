import Card from "./card";
import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import useSendingNote from "../../hooks/collector/useSendingNote";
function Note() {
  // const [data, setData] = useState([]);
  const { user } = useUser();
  const userId = user?.id;
  //const userId = "1234567654323456765432"
  const {titles, contents, noteids} = useSendingNote(userId);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/user/${userId}/notes`);
  //       if (response.ok) {
  //         const result = await response.json();
  //         console.log("data", data);
  //         setData(result);
  //         console.log("result", result)
  //         console.log("new data", data);
  //       } else {
  //         console.error('API request failed');
  //       }
  //     } catch (error) {
  //       console.error('API request error', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="flex flex-col col-span-12 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-2xl h-screen border ">
      <header className="px-5 py-4 border-b ">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Thought Note
        </h2>
      </header>
      <div className="flex flex-wrap justify-around items-center  gap-2 mt-3 overflow-y-auto">
        {titles.map((item,index) => (
          //console.log(item),
          <Card key={noteids[index]} title={item} content={contents[index]} />
        ))}
      </div>
    </div>
  );
}

export default Note;
