DROP TABLE IF EXISTS student;
CREATE TABLE student(
	id CHAR(36) PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	registration VARCHAR(10) DEFAULT NULL,
	"createdAt" DATE DEFAULT NULL,
	"updatedAt" DATE DEFAULT NULL
);

DROP TABLE IF EXISTS course;
CREATE TABLE course(
	id CHAR(36) PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) DEFAULT NULL,
	"createdAt" DATE DEFAULT NULL,
	"updatedAt" DATE DEFAULT NULL
);

DROP TABLE IF EXISTS student_course;
CREATE TABLE student_course(
	student_id CHAR(36) DEFAULT NULL,
	course_id CHAR(36) DEFAULT NULL,
	created_at DATE DEFAULT NULL,
	updated_at DATE DEFAULT NULL,

	FOREIGN KEY (student_id) REFERENCES student (id),
	FOREIGN KEY (course_id) REFERENCES course (id)
);