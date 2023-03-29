CREATE TABLE IF NOT EXISTS parks (
    name VARCHAR(128) PRIMARY KEY,
    description VARCHAR(512),
    address VARCHAR(512),
    amenities VARCHAR(1024),
    phone_nr VARCHAR(32),
    capacity INT,
    image_url VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS users (
	username VARCHAR(128) PRIMARY KEY,
	email VARCHAR(128),
	full_name VARCHAR(128),
	disabled BOOL,
	hashed_pswd VARCHAR(256)
);