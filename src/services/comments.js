const getCommentsList = async() => {
    const res = await fetch(`https://run.mocky.io/v3/6fd19c31-4349-4853-818f-7f1654561a9d`);
    const body = await res.json();
    return body;
};

export default getCommentsList;
