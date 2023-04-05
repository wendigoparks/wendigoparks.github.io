CREATE TABLE IF NOT EXISTS parks (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    state VARCHAR(32),
    county VARCHAR(64),
    address VARCHAR(512),
    latitude VARCHAR(16),
    longitude VARCHAR(16),
    description VARCHAR(512),
    amenities VARCHAR(1024),
    phone_nr VARCHAR(32),
    capacity INT,
    image_url VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS facilities (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    state VARCHAR(32),
    county VARCHAR(64),
    address VARCHAR(512),
    latitude VARCHAR(16),
    longitude VARCHAR(16),
    description VARCHAR(512),
    phone_nr VARCHAR(32),
    capacity INT,
    image_url VARCHAR(256),
    park_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (park_id)
        REFERENCES parks(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS courts (
    id VARCHAR(36) PRIMARY KEY,
    facility_id VARCHAR(36) NOT NULL,
    name VARCHAR(128) NOT NULL,
    type VARCHAR(64) NOT NULL,
    reservable TINYINT DEFAULT false,
    FOREIGN KEY (facility_id)
        REFERENCES facilities(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
	username VARCHAR(128) NOT NULL UNIQUE,
	email VARCHAR(128) NOT NULL UNIQUE,
	full_name VARCHAR(128),
	disabled BOOL default false,
	hashed_pswd VARCHAR(256) NOT NULL,
    admin BOOL default false
);

CREATE TABLE IF NOT EXISTS reservations (
    id VARCHAR(36) PRIMARY KEY,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    court_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (court_id)
        REFERENCES courts(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id)
        REFERENCES users(username)
        ON UPDATE CASCADE ON DELETE CASCADE
);
