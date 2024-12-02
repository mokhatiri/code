-- Insert data into Places
INSERT OR IGNORE INTO Places (name, maxCount) VALUES
('Library', 1),
('Cafeteria', 2),
('Gym', 1),
('Departement', 1);
/* as in 5 were telling the truth */

-- Insert data into Activity
INSERT OR IGNORE INTO Activity (name, count) VALUES
('Reading', 1),
('Eating', 2),
('Exercising', 2);

-- Insert data into Activity_Places
INSERT OR IGNORE INTO Activity_Places (place_name, activity_name) VALUES
('Library', 'Reading'),
('Cafeteria', 'Eating'),
('Gym', 'Exercising'),
('Departement', 'Eating'),
('Departement', 'Reading');

-- Insert data into Times
INSERT OR IGNORE INTO Times (startTime, endTime) VALUES
('08:00:00', '12:00:00'), -- Morning shift
('12:00:00', '16:00:00'), -- Afternoon shift
('16:00:00', '20:00:00'); -- Evening shift

-- Insert data into Job
INSERT OR IGNORE INTO Job (name, shift, base_place) VALUES
('Librarian', 1, 'Library'),
('Chef', 2, 'Cafeteria'),
('Chef', 3, 'Cafeteria'),
('Trainer', 1, 'Gym'),
('Trainer', 3, 'Gym'),
('Scientist', 1, 'Laboratory');