DROP TABLE IF EXISTS Places;
CREATE TABLE IF NOT EXISTS Places (
    name VARCHAR(255) PRIMARY KEY,
    maxCount INT NOT NULL
);

DROP TABLE IF EXISTS Activity;
CREATE TABLE IF NOT EXISTS Activity (
    name VARCHAR(255) PRIMARY KEY,
    count INT DEFAULT NULL /* Count can be null */
);

DROP TABLE IF EXISTS Activity_Places;
CREATE TABLE IF NOT EXISTS Activity_Places (
    place_name VARCHAR(255),
    activity_name VARCHAR(255),
    PRIMARY KEY (place_name, activity_name),
    FOREIGN KEY (place_name) REFERENCES Places(name),
    FOREIGN KEY (activity_name) REFERENCES Activity(name)
);

DROP TABLE IF EXISTS Times;
CREATE TABLE IF NOT EXISTS Times (
    id INT PRIMARY KEY,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL
);

DROP TABLE IF EXISTS Job;
CREATE TABLE IF NOT EXISTS Job (
    name VARCHAR(255) PRIMARY KEY,
    shift TIME NOT NULL,
    base_place VARCHAR(255) NOT NULL,
    FOREIGN KEY (base_place) REFERENCES Places(name),
    FOREIGN KEY (shift) REFERENCES Times(shift)
);