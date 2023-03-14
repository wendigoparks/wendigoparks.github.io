CREATE TABLE IF NOT EXISTS parks (
    name VARCHAR(128) PRIMARY KEY,
    description VARCHAR(512),
    address VARCHAR(512),
    amenities VARCHAR(1024),
    phone_nr VARCHAR(32),
    capacity INT,
    image_url VARCHAR(256)
);
