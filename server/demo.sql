-- Table `groups`
DROP TABLE IF EXISTS groups;

CREATE TABLE IF NOT EXISTS groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  owners_id INT,
  CONSTRAINT fk_groups_users FOREIGN KEY (owners_id)
    REFERENCES users (id)
);

-- Table `groupMembers`
DROP TABLE IF EXISTS groupMembers;

CREATE TABLE IF NOT EXISTS groupMembers (
  id SERIAL PRIMARY KEY,
  users_id INT,
  role VARCHAR(45),
  group_id INT,
  status SMALLINT,  -- 0 = 'pending', 1 = 'accepted', -1 = 'rejected'
  CONSTRAINT fk_groupMembers_groups FOREIGN KEY (group_id)
    REFERENCES groups (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
