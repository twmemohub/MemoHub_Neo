import useSWRFetch from "../useSWRFetch";

export default (articleId) => {

    const apiUrl = `http://localhost:3000/article/${articleId}/linkedNotes`;

    const { linkedNotes, error, isLoading } = useSWRFetch(apiUrl); // 發送 GET 請求
    if (error) {
        console.error(error);
        return [];
    }
    if (isLoading) { return []; }
    else {
        return linkedNotes;
    }
};
