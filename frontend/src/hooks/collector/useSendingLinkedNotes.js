import useSWRFetch from "../useSWRFetch";

export default (articleId) => {
 

  if(articleId === undefined){
    return {
      noteTitles: [],
      noterContents: [],
    };
  }
  const apiUrl = `http://localhost:3000/article/${articleId}/linkedNotes`;

  const { data, error, isLoading } = useSWRFetch(apiUrl); // 發送 GET 請求
    if (error) {
        console.error(error);
        return [];
    }
    if (isLoading) {
      // Data is still loading, return null or a loading indicator
      return {
        noteTitles: [],
        noterContents: [],
      };
    }
    else {
        return {
          noteTitles: data?.map((each) => each.title),
          noteContents: data?.map((each) => each.content),
          noteIds: data?.map((each) => each._id),
        };
    }
  // return { title: data && data.title,
  //   content: data && data.content,
  //   category: data && data.category,
  //   linkedNotes: data && data.linkedNotes,
  //   mutate };
};