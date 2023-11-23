import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import useAddingArticle from "../../hooks/collector/useAddingArticle";
import { useUser } from "@clerk/clerk-react";

function CreateNote() {
  const [status, setStatus] = useState(true);
  const labelButtonClick = (text) => {
    setStatus(text); // 更新 question
  };
  const { user } = useUser();
  const userId = user?.id;
  const initialformData = {
    userId: userId,
    title: "",
    content: "",
    category: "",
    linkedNotes: [],
  };

  const [formData, setFormData] = useState(initialformData);

  //const { trigger } = useAddingArticle();

  const handleFormSubmit = async () => {
    // console.log(formData);
    try {
      // const response = await trigger({
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      const response = await fetch(
        `http://localhost:3000/user/${user.id}/note`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      // console.log(response);
      if (!formData.title || !formData.content) {
        alert("Please fill in all required fields");
        return;
      }
      try {
        // Your POST request code here
      } catch (error) {
        alert("Post error", error);
      }

      if (response.ok) {
        alert("Upload success!");
        setFormData(initialformData);
      } else {
        alert("Post error");
      }
    } catch (error) {
      alert("Post error", error);
    }
  };

  return (
    <div className="flex flex-col col-span-8 bg-white dark:bg-slate-800 shadow-lg px-6 py-2 rounded-2xl ">
      <header>
        <h1 className="font-semibold text-slate-800 dark:text-slate-100 py-2 text-lg">
          Want to create? Write an note now
        </h1>
      </header>
      <div className="py-2 flex flex-col items-center">
        <div className="flex flex-row space-x-4 py-4">
          <TextField
            id="outlined-multiline-static_1"
            label="Note Title"
            multiline
            rows={1}
            style={{ width: "100%" }}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            variant="outlined"
            className="  bg-slate-100 text-white px-4 rounded-2xl mt-6"
          />
        </div>

        <TextField
          id="outlined-multiline-static_2"
          label="Write Down Your Thoughts!"
          multiline
          rows={4}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          style={{ width: "100%" }}
          className="bg-slate-100 text-white px-4 rounded-2xl mt-6 relative w-full"
          variant="outlined"
        />
        <button
          type="submit"
          onClick={handleFormSubmit}
          className="bg-black text-white px-4 py-2 rounded-xl mt-6"
          style={{ width: "15%" }}
        >
          Create Note
        </button>
      </div>
    </div>
  );
}

export default CreateNote;
