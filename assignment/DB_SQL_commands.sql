CREATE DATABASE hotwax;
USE hotwax;

CREATE TABLE party (
    party_id VARCHAR(20) NOT NULL,
    party_enum_type_id VARCHAR(20),
    PRIMARY KEY (party_id)
);

CREATE TABLE product (
    product_id VARCHAR(20) NOT NULL,
    party_id VARCHAR(20),
    product_name VARCHAR(255),
    description VARCHAR(1000),
    charge_shipping CHAR(1),
    returnable CHAR(1),
    PRIMARY KEY (product_id),
    FOREIGN KEY (party_id) REFERENCES party(party_id)
);

CREATE TABLE person (
    party_id VARCHAR(20) NOT NULL,
    first_name VARCHAR(255),
    middle_name VARCHAR(255),
    last_name VARCHAR(255),
    gender CHAR(1),
    birth_date DATE,
    marital_status_enum_id VARCHAR(20),
    employment_status_enum_id VARCHAR(20),
    occupation VARCHAR(255),
    PRIMARY KEY (party_id),
    FOREIGN KEY (party_id) REFERENCES party(party_id)
);


CREATE TABLE order_header (
    order_id VARCHAR(20) NOT NULL,
    order_name VARCHAR(255),
    placed_date DATETIME,
    approved_date DATETIME,
    status_id VARCHAR(20),
    party_id VARCHAR(20),
    currency_uom_id VARCHAR(20),
    product_store_id VARCHAR(20),
    sales_channel_enum_id VARCHAR(20),
    grand_total DECIMAL(24,4),
    completed_date DATETIME,
    credit_card VARBINARY(255), -- Assuming this is for encrypted credit card data
    PRIMARY KEY (order_id),
    FOREIGN KEY (party_id) REFERENCES party(party_id)
);

CREATE TABLE order_item (
    order_id VARCHAR(20) NOT NULL,
    order_item_seq_id VARCHAR(20) NOT NULL,
    product_id VARCHAR(20),
    item_description VARCHAR(255),
    quantity DECIMAL(24,4),
    unit_amount DECIMAL(24,4),
    item_type_enum_id VARCHAR(20),
    PRIMARY KEY (order_id, order_item_seq_id),
    FOREIGN KEY (order_id) REFERENCES order_header(order_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);


-- sample data insertion

INSERT INTO party (party_id, party_enum_type_id) VALUES
    ('P1000', 'PERSON'),
    ('P1001', 'PERSON'),
    ('P1002', 'PERSON');
    
select * from party;


INSERT INTO product (product_id, party_id, product_name, description, charge_shipping, returnable) VALUES
    ('PD1001', 'P1001', 'Smartphone X', 'High-end smartphone with advanced features', 'Y', 'Y'),
    ('PD1002', 'P1002', 'Laptop Pro', 'Powerful laptop for professional use', 'Y', 'Y');



INSERT INTO person (party_id, first_name, middle_name, last_name, gender, birth_date, marital_status_enum_id, employment_status_enum_id, occupation) VALUES
    ('P1001', 'Alice', 'Marie', 'Smith', 'F', '1995-08-20', 'SINGLE', 'EMPLOYED', 'Data Scientist'),
    ('P1002', 'Joe', 'D', 'Jackson', 'M', '1998-08-23', 'SINGLE', 'EMPLOYED', 'Data Scientist');

SELECT * FROM product;

INSERT INTO person (party_id, first_name, middle_name, last_name, gender, birth_date, marital_status_enum_id, employment_status_enum_id, occupation) VALUES
('P1004', 'John', 'Doe', 'Smith', 'M', '1990-05-15', 'SINGLE', 'EMPLOYED', 'Software Engineer');

INSERT INTO party (party_id, party_enum_type_id) VALUES
    ('P1008', 'PERSON');


select * from order_header;


