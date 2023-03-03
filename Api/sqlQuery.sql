CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    price float NOT NULL,
    taxes float NOT NULL,
    ads float NOT NULL,
    discount float NOT NULL,
    total float NOT NULL,
    count int NOT NULL,
    category VARCHAR(250) NOT NULL
);

INSERT INTO
    product (
        title,
        price,
        taxes,
        ads,
        discount,
        total,
        count,
        category
    )
Values
    ('blows', 200, 20, 5, 40, 185, 10, 'women');