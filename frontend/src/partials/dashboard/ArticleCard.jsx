import React, { useContext } from "react";
import { ShowNumContext } from "./ArticleProvider";

function ArticleCard({ title_i, category_i, content_i, index }) {
  const editedTitle = title_i;
  const editedContent = content_i;
  const editedCategory = category_i;
  const { setShowNum } = useContext(ShowNumContext);

  const handleCardClick = () => {
    setShowNum(index); // Update the showNum value with article_num
  };

  return (
    <button
      className="border-solid border border-black-1000 relative rounded-lg bg-white h-45 w-60 p-4"
      onClick={handleCardClick}
    >
      <div className="flex items-center mb-3">
        <h1 className="font-bold text-slate-800">{editedTitle}</h1>
      </div>
      <p className="ml-3  text-slate-400">
        #
        {editedCategory}
      </p>
    </button>
  );
}

export default ArticleCard;
