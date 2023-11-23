import useSWRFetch from "../useSWRFetch";

export default (userId) => {
 

  const apiUrl = `http://localhost:3000/user/${userId}/articles`;

  const { data, error, isLoading } = useSWRFetch(apiUrl); // 發送 GET 請求

  if (error) {
      console.error(error);
      return [];
  }
  if (isLoading) {
    // Data is still loading, return null or a loading indicator
    return {
      titles: [],
      contents: [],
      categories: [],
      articleIds: [],
    };
  }
  else {
      return {
        titles: data?.map((each) => each.title),
        contents: data?.map((each) => each.content),
        categories: data?.map((each) => each.category), 
        articleIds: data?.map((each) => each._id), 
      };
  }
  // return { title: data && data.title,
  //   content: data && data.content,
  //   category: data && data.category,
  //   linkedNotes: data && data.linkedNotes,
  //   mutate };
};