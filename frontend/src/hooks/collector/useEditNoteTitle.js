import useSWRPut from "../useSWRPut";
// edit Note title
export default (sessionId) => {
  const apiUrl = "http://localhost:3000/note/" + sessionId ;

  const { data, trigger, isMutating } = useSWRPut(apiUrl); // 發送 PUT 請求

  return { title: data && data.title, trigger, isMutating };
};