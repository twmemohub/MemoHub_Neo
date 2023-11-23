import useSWRFetch from "../useSWRFetch";
import { useUser } from "@clerk/clerk-react";

export default (userId) => {
  const { user } = useUser();

  const apiUrl = `http://localhost:3000/user/${userId}/notes`;

  const { data,  error, isLoading } = useSWRFetch(apiUrl); // 發送 GET 請求


  if (error) {
    console.log(error);
    return [];
  }
  if (isLoading) {
    // Data is still loading, return null or a loading indicator
    return {
      titles: [],
      contents: [],
      noteids: []
    };
  }
  else {
      return {
        titles: data?.map((each) => each.title),
        contents: data?.map((each) => each.content),
        noteids: data?.map((each) => each._id),
      };
  }
};  