import useSWRPut from "../useSWRPut";

export default (label) => {
  const apiUrl = "http://localhost:3000/user/article/label";
  //console.log('hello good')
  const { data, trigger, isMutating } = useSWRPut(apiUrl); // 發送 PUT 請求
  //console.log(data)
  return { title: data && data.title, trigger, isMutating };
};