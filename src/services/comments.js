const getCommentsList = async() => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=40`);
    const body = await res.json();
    return body;
};

export default getCommentsList;
