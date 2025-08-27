const {client}=require("pg");

const DBURL=`
 CREATE TABLE Book (
 id  INTEGER PRIMARY KEY,
 title TEXT,
 publisher TEXT,
 description TEXT,
 pageCount INTEGER,
 publishedDate TEXT
 );
`