async function searchBooksByAuthorORTitle({author,title}){

    let queryParts=[];

    if (author) queryParts.push(`inauthor:${encodeURIComponent(author)}`);
    if (title) queryParts.push(`intitle:${encodeURIComponent(title)}`);

    const query = queryParts.join("+") || "harry potter"; 

     const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=3`;
     const response=await fetch(url);
     const data= await response.json();
     const books=data.items || [];
     return books;
    
}

    


 module.exports=searchBooksByAuthorORTitle;

