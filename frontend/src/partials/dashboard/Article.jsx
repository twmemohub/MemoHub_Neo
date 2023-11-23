import ArticleCard from "./ArticleCard";
import { useUser } from "@clerk/clerk-react";
import useSendingArticle from "../../hooks/collector/useSendingArticle";

import { createContext, useContext, useState } from "react";
import { ShowNumContext } from "./ArticleProvider";
import NewCard from "./NewCard";

function Article() {
  const { user } = useUser();
  const userId = user?.id;

  const { titles, contents, categories, articleIds } =
    useSendingArticle(userId);
  const { showNum } = useContext(ShowNumContext);

  return (
    <div className="flex flex-col col-span-12 xl:col-span-12 h-screen bg-white dark:bg-slate-800 shadow-lg rounded-2xl  border ">
      <header className="px-5 py-4 border-b ">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Articles
        </h2>
      </header>
      <div className="flex flex-row gap-4 p-2 m-2 h-5/6 ">
        <div className=" basis-1/6 border-solid border rounded-lg overflow-y-auto shadow-lg">
          <header className="px-4 py-4 border-b">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              My Articles
            </h2>
          </header>
          <div className="flex flex-wrap justify-around gap-2 p-2 overflow-y-auto">
            {titles.map((item, index) => (
              <ArticleCard
                key={index}
                title_i={item}
                content_i={contents[index]}
                category_i={categories[index]}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="basis-2/3 border-solid border rounded-lg overflow-y-auto">
          <header>
            <div className="flex items-center p-5">
              <h1 className=" basis-1/2 text-slate-1000 dark:text-slate-100 py-2 text-lg">
                <span className="font-bold">Title:</span> {titles[showNum]}
              </h1>
              {/* <h1 className="font-semibold text-slate-600 dark:text-slate-100 text-sm">
                Category : {categories[showNum]}
              </h1> */}
            </div>
          </header>
          <div className=" h-200 overflow-y-auto shadow-lg p-8 border-solid border border-black-500">
            <p className="text-slate-800 dark:text-slate-100 py-2 text-lg ">
              {contents[showNum]}
            </p>
          </div>
        </div>

        <div className="basis-1/6 border-solid border h-800 rounded-lg">
          <div className="flex flex-wrap justify-around gap-2 p-2 overflow-y-auto">
            <NewCard Ids={articleIds} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
