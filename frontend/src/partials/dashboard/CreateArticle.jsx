import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import useSendingNote from "../../hooks/collector/useSendingNote";
import { useUser } from "@clerk/clerk-react";
import Card from "./Card";

function CreateArticle({ question, setQuestion, noteId }) {
  // const [question, setQuestion]= useState("Hello!!Choose notes you like.");
  const [status, setStatus] = useState(true);
  const labelButtonClick = (text) => {
    setStatus(text); // 更新 question
  };

  const { user } = useUser();
  const userId = user?.id;
  const { titles, contents, noteids } = useSendingNote(userId);

  const initialformData = {
    // "userId": userId,
    // user.id has been passed to API in url.params, so no need to include it in body
    // or we can use formData.userId, remove variable userId instead
    title: "",
    content: "",
    category: "",
    linkedNotes: [],
  };
  //console.log(noteId);

  const [formData, setFormData] = useState(initialformData);

  //const { trigger } = useAddingArticle();

  const handleFormSubmit = async () => {
    //console.log("handleFormSubmit");
    formData.linkedNotes = noteId;
    //console.log(formData);
    try {
      // const response = await trigger({
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      const response = await fetch(
        `http://localhost:3000/user/${user.id}/article`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      //console.log(response);
      if (!formData.title || !formData.content) {
        console.error("Please fill in all required fields");
        return;
      }
      try {
        // Your POST request code here
      } catch (error) {
        console.error("Post error", error);
      }

      if (response.ok) {
        //console.log('Post success!');
      } else {
        console.error("Post error");
      }
    } catch (error) {
      console.error("Post error", error);
    }

    setFormData(initialformData); // 輸入完清空
    setQuestion({"initial":"Hello!! Choose a note you like."});
  };

  return (
    <div className="flex flex-col col-span-12 xl:col-span-6 h-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl  border">
      <div className="px-5 pt-5">
        <header className="px-5 py-4 border-b ">
          <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mr-2 mb-2">
            Create a article! I will help you reflect your thoughts of picked notes.
          </div>
        </header>

        {/* Question area */}
        <div className="flex justify-center mb-10">
          <div className="w-full h-36 bg-neutral-100 rounded-[10px] overflow-y-auto">
            <div className="pl-4 p-2">
              {" "}
              {/* 左内边距 */}
              {Object.values(question).map((q, index) => (
              <React.Fragment key={index}>
                {q}
                {index < Object.values(question).length - 1 && <br />}
                </React.Fragment>
              ))}
              {/* {question.question1} <br/>
              {question.question2} <br/>
              {question.question3} <br/>
              {question.question4} <br/>
              {question.question5} <br/> */}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-5 gap-5">
          {/* box1 */}
          <div className="w-full mb-5 ">
            <header className="flex items-start">
              <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mr-2 mb-5 font-['Poppins']">
                Your Notes
              </div>
            </header>
            <div className="w-100% h-[200px] bg-neutral-100 rounded-[10px] overflow-y-auto shadow-lg">
              <div className="flex flex-wrap justify-around gap-2 p-2">
                {titles.map((item, index) =>
                  noteId.indexOf(noteids[index]) !== -1 ? (
                    <Card
                      key={noteids[index]}
                      title={item}
                      content={contents[index]}
                    />
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-semibold text-slate-800 dark:text-slate-100 py-2 text-lg">
            Write an {status === true ? "article" : "note"} now
          </h1>
        </div>
        <div className="py-2 flex flex-col items-center">
          <div className="flex flex-row w-full space-x-4 py-4">
            <TextField
              id="outlined-multiline-static_1"
              label="Article Title"
              multiline
              rows={1}
              style={{ width: "100%" }}
              // defaultValue="Write Title "
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              variant="outlined"
              className="  bg-slate-100 text-white px-4 rounded-2xl mt-6"
            />
            <TextField
              id="outlined-multiline-static_2"
              label="Category"
              multiline
              rows={1}
              style={{ width: "100%" }}
              // defaultValue="Write category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="  bg-slate-100 text-white px-4 rounded-2xl mt-6"
              variant="outlined"
            />
          </div>

          <TextField
            id="outlined-multiline-static_3"
            label="Write Down Your Thoughts!"
            multiline
            rows={7}
            // defaultValue="Write Down Your Thoughts!"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            style={{ width: "100%" }}
            className="bg-slate-100 text-white px-4 rounded-2xl mt-6 relative w-full"
            variant="outlined"
          />
          <button
            type="button"
            className=" bg-black text-white px-4 py-2 rounded-xl mt-6"
            style={{ width: "15%" }}
            onClick={handleFormSubmit}
          >
            Create Article
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateArticle;
