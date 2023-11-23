import useSWRPut from "../useSWRPut";
// edit article title
export default (sessionId) => {
  const apiUrl = "http://localhost:3000/article/" + sessionId ;

  const { data, trigger, isMutating } = useSWRPut(apiUrl); // 發送 PUT 請求

  return { title: data && data.title, trigger, isMutating };
};