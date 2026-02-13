CREATE TABLE books (
    -- 'isbn' is the Primary Key
    isbn VARCHAR(20) PRIMARY KEY, 
    
    -- 'title' is text
    title VARCHAR(255) NOT NULL,
    
    -- 'booktype' and 'status' are categories
    booktype VARCHAR(100),
    current_status VARCHAR(50),
    
    -- 'purchasedate' is a DATE type for proper sorting
    purchasedate DATE
);

CREATE TABLE users (
    -- 'net-ID' is the primary key
    net-ID VARCHAR(10) PRIMARY KEY,

    -- 'password' is a text
    passwords VARCHAR(255) NOT NULL
);