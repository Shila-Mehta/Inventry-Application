async function randomBook(books){
   const randomBook=Math.floor(Math.random()*books.length);
   return   books[randomBook] ;
}
  

module.exports=randomBook;