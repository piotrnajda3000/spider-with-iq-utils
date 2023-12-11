
# Questions for voter_2:

## 1 collection(s) used in query:

-------------------------------------------------------------------------------

### 1.1:

#### Question

Find the number of students in total.

#### Query

SELECT count(*) FROM Student

#### Collections

Student

-------------------------------------------------------------------------------

### 1.2:

#### Question

How many students are there in total?

#### Query

SELECT count(*) FROM Student

#### Collections

Student

-------------------------------------------------------------------------------

### 1.3:

#### Question

Find the number of voting records in total.

#### Query

SELECT count(*) FROM Voting_record

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.4:

#### Question

How many voting records do we have?

#### Query

SELECT count(*) FROM Voting_record

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.5:

#### Question

Find the distinct number of president votes.

#### Query

SELECT count(DISTINCT President_Vote) FROM Voting_record

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.6:

#### Question

How many distinct president votes are recorded?

#### Query

SELECT count(DISTINCT President_Vote) FROM Voting_record

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.7:

#### Question

Find the maximum age of all the students.

#### Query

SELECT max(Age) FROM Student

#### Collections

Student

-------------------------------------------------------------------------------

### 1.8:

#### Question

What is the oldest age among the students?

#### Query

SELECT max(Age) FROM Student

#### Collections

Student

-------------------------------------------------------------------------------

### 1.9:

#### Question

Find the last names of students with major 50.

#### Query

SELECT LName FROM Student WHERE Major = 50

#### Collections

Student

-------------------------------------------------------------------------------

### 1.10:

#### Question

What are the last names of students studying major 50?

#### Query

SELECT LName FROM Student WHERE Major = 50

#### Collections

Student

-------------------------------------------------------------------------------

### 1.11:

#### Question

Find the first names of students with age above 22.

#### Query

SELECT Fname FROM Student WHERE Age > 22

#### Collections

Student

-------------------------------------------------------------------------------

### 1.12:

#### Question

What are the first names of all the students aged above 22?

#### Query

SELECT Fname FROM Student WHERE Age > 22

#### Collections

Student

-------------------------------------------------------------------------------

### 1.13:

#### Question

What are the majors of male (sex is M) students?

#### Query

SELECT Major FROM Student WHERE Sex = "M"

#### Collections

Student

-------------------------------------------------------------------------------

### 1.14:

#### Question

List the major of each male student.

#### Query

SELECT Major FROM Student WHERE Sex = "M"

#### Collections

Student

-------------------------------------------------------------------------------

### 1.15:

#### Question

What is the average age of female (sex is F) students?

#### Query

SELECT avg(Age) FROM Student WHERE Sex = "F"

#### Collections

Student

-------------------------------------------------------------------------------

### 1.16:

#### Question

Find the average age of female students.

#### Query

SELECT avg(Age) FROM Student WHERE Sex = "F"

#### Collections

Student

-------------------------------------------------------------------------------

### 1.17:

#### Question

What are the maximum and minimum age of students with major 600?

#### Query

SELECT max(Age), min(Age) FROM Student WHERE Major = 600

#### Collections

Student

-------------------------------------------------------------------------------

### 1.18:

#### Question

Tell me the ages of the oldest and youngest students studying major 600.

#### Query

SELECT max(Age), min(Age) FROM Student WHERE Major = 600

#### Collections

Student

-------------------------------------------------------------------------------

### 1.19:

#### Question

Who are the advisors for students that live in a city with city code "BAL"?

#### Query

SELECT Advisor FROM Student WHERE city_code = "BAL"

#### Collections

Student

-------------------------------------------------------------------------------

### 1.20:

#### Question

Show the advisors of the students whose city of residence has city code "BAL".

#### Query

SELECT Advisor FROM Student WHERE city_code = "BAL"

#### Collections

Student

-------------------------------------------------------------------------------

### 1.21:

#### Question

What are the distinct secretary votes in the fall election cycle?

#### Query

SELECT DISTINCT Secretary_Vote FROM Voting_record WHERE ELECTION_CYCLE = "Fall"

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.22:

#### Question

Return all the distinct secretary votes made in the fall election cycle.

#### Query

SELECT DISTINCT Secretary_Vote FROM Voting_record WHERE ELECTION_CYCLE = "Fall"

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.23:

#### Question

What are the distinct president votes on 08/30/2015?

#### Query

SELECT DISTINCT PRESIDENT_Vote FROM Voting_record WHERE Registration_Date = "08/30/2015"

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.24:

#### Question

Show all the distinct president votes made on 08/30/2015.

#### Query

SELECT DISTINCT PRESIDENT_Vote FROM Voting_record WHERE Registration_Date = "08/30/2015"

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.25:

#### Question

Report the distinct registration date and the election cycle.

#### Query

SELECT DISTINCT Registration_Date, Election_Cycle FROM Voting_record

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.26:

#### Question

What are the distinct registration dates and the election cycles?

#### Query

SELECT DISTINCT Registration_Date, Election_Cycle FROM Voting_record

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.27:

#### Question

Report the distinct president vote and the vice president vote.

#### Query

SELECT DISTINCT President_Vote, VICE_President_Vote FROM Voting_record

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.28:

#### Question

List all the distinct president votes and the vice president votes.

#### Query

SELECT DISTINCT President_Vote, VICE_President_Vote FROM Voting_record

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.29:

#### Question

For each advisor, report the total number of students advised by him or her.

#### Query

SELECT Advisor, count(*) FROM Student GROUP BY Advisor

#### Collections

Student

-------------------------------------------------------------------------------

### 1.30:

#### Question

How many students does each advisor have?

#### Query

SELECT Advisor, count(*) FROM Student GROUP BY Advisor

#### Collections

Student

-------------------------------------------------------------------------------

### 1.31:

#### Question

Report all advisors that advise more than 2 students.

#### Query

SELECT Advisor FROM Student GROUP BY Advisor HAVING COUNT(*) > 2

#### Collections

Student

-------------------------------------------------------------------------------

### 1.32:

#### Question

Which advisors have more than two students?

#### Query

SELECT Advisor FROM Student GROUP BY Advisor HAVING COUNT(*) > 2

#### Collections

Student

-------------------------------------------------------------------------------

### 1.33:

#### Question

Report all majors that have less than 3 students.

#### Query

SELECT Major FROM Student GROUP BY Major HAVING COUNT(*) < 3

#### Collections

Student

-------------------------------------------------------------------------------

### 1.34:

#### Question

What are the majors only less than three students are studying?

#### Query

SELECT Major FROM Student GROUP BY Major HAVING COUNT(*) < 3

#### Collections

Student

-------------------------------------------------------------------------------

### 1.35:

#### Question

For each election cycle, report the number of voting records.

#### Query

SELECT Election_Cycle, count(*) FROM Voting_record GROUP BY Election_Cycle

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.36:

#### Question

Count the number of voting records for each election cycle.

#### Query

SELECT Election_Cycle, count(*) FROM Voting_record GROUP BY Election_Cycle

#### Collections

Voting_record

-------------------------------------------------------------------------------

### 1.37:

#### Question

Which major has the most students?

#### Query

SELECT Major FROM Student GROUP BY major ORDER BY count(*) DESC LIMIT 1

#### Collections

Student

-------------------------------------------------------------------------------

### 1.38:

#### Question

Find the major that is studied by the largest number of students.

#### Query

SELECT Major FROM Student GROUP BY major ORDER BY count(*) DESC LIMIT 1

#### Collections

Student

-------------------------------------------------------------------------------

### 1.39:

#### Question

What is the most common major among female (sex is F) students?

#### Query

SELECT Major FROM Student WHERE Sex = "F" GROUP BY major ORDER BY count(*) DESC LIMIT 1

#### Collections

Student

-------------------------------------------------------------------------------

### 1.40:

#### Question

Find the major that is studied by the most female students.

#### Query

SELECT Major FROM Student WHERE Sex = "F" GROUP BY major ORDER BY count(*) DESC LIMIT 1

#### Collections

Student

-------------------------------------------------------------------------------

### 1.41:

#### Question

What is the city_code of the city that the most students live in?

#### Query

SELECT city_code FROM Student GROUP BY city_code ORDER BY count(*) DESC LIMIT 1

#### Collections

Student

-------------------------------------------------------------------------------

### 1.42:

#### Question

Return the code of the city that has the most students.

#### Query

SELECT city_code FROM Student GROUP BY city_code ORDER BY count(*) DESC LIMIT 1

#### Collections

Student

-------------------------------------------------------------------------------

### 1.43:

#### Question

Report the distinct advisors who have more than 2 students.

#### Query

SELECT Advisor FROM Student GROUP BY Advisor HAVING count(*) > 2

#### Collections

Student

-------------------------------------------------------------------------------

### 1.44:

#### Question

Which advisors are advising more than 2 students?

#### Query

SELECT Advisor FROM Student GROUP BY Advisor HAVING count(*) > 2

#### Collections

Student

,## 2 collection(s) used in query:

-------------------------------------------------------------------------------

### 2.1:

#### Question

Find the distinct last names of the students who have class president votes.

#### Query

SELECT DISTINCT T1.LName FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.CLASS_President_VOTE

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.2:

#### Question

What are the distinct last names of the students who have class president votes?

#### Query

SELECT DISTINCT T1.LName FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.CLASS_President_VOTE

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.3:

#### Question

Find the distinct first names of the students who have class senator votes.

#### Query

SELECT DISTINCT T1.Fname FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.CLASS_Senator_VOTE

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.4:

#### Question

What are the distinct first names of the students who have class president votes?

#### Query

SELECT DISTINCT T1.Fname FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.CLASS_Senator_VOTE

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.5:

#### Question

Find the distinct ages of students who have secretary votes in the fall election cycle.

#### Query

SELECT DISTINCT T1.Age FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.Secretary_Vote WHERE T2.Election_Cycle = "Fall"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.6:

#### Question

What are the distinct ages of students who have secretary votes in the fall election cycle?

#### Query

SELECT DISTINCT T1.Age FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.Secretary_Vote WHERE T2.Election_Cycle = "Fall"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.7:

#### Question

Find the distinct Advisor of students who have treasurer votes in the spring election cycle.

#### Query

SELECT DISTINCT T1.Advisor FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.Treasurer_Vote WHERE T2.Election_Cycle = "Spring"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.8:

#### Question

Who served as an advisor for students who have treasurer votes in the spring election cycle?

#### Query

SELECT DISTINCT T1.Advisor FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.Treasurer_Vote WHERE T2.Election_Cycle = "Spring"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.9:

#### Question

Find the distinct majors of students who have treasurer votes.

#### Query

SELECT DISTINCT T1.Major FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.Treasurer_Vote

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.10:

#### Question

What are the distinct majors that students with treasurer votes are studying?

#### Query

SELECT DISTINCT T1.Major FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.Treasurer_Vote

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.11:

#### Question

Find the first and last names of all the female (sex is F) students who have president votes.

#### Query

SELECT DISTINCT T1.Fname, T1.LName FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.President_VOTE WHERE T1.sex = "F"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.12:

#### Question

What are the first and last names of all the female students who have president votes?

#### Query

SELECT DISTINCT T1.Fname, T1.LName FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.President_VOTE WHERE T1.sex = "F"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.13:

#### Question

Find the first and last name of all the students of age 18 who have vice president votes.

#### Query

SELECT DISTINCT T1.Fname, T1.LName FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.VICE_President_VOTE WHERE T1.age = 18

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.14:

#### Question

What are the first names and last names of the students who are 18 years old and have vice president votes.

#### Query

SELECT DISTINCT T1.Fname, T1.LName FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.VICE_President_VOTE WHERE T1.age = 18

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.15:

#### Question

How many male (sex is M) students have class senator votes in the fall election cycle?

#### Query

SELECT count(*) FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = Class_Senator_Vote WHERE T1.Sex = "M" AND T2.Election_Cycle = "Fall"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.16:

#### Question

Count the number of male students who had class senator votes in the fall election cycle.

#### Query

SELECT count(*) FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = Class_Senator_Vote WHERE T1.Sex = "M" AND T2.Election_Cycle = "Fall"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.17:

#### Question

Find the number of students whose city code is NYC and who have class senator votes in the spring election cycle.

#### Query

SELECT count(*) FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = Class_Senator_Vote WHERE T1.city_code = "NYC" AND T2.Election_Cycle = "Spring"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.18:

#### Question

Which students live in the city with code "NYC" and have class senator votes in the spring election cycle? Count the numbers.

#### Query

SELECT count(*) FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = Class_Senator_Vote WHERE T1.city_code = "NYC" AND T2.Election_Cycle = "Spring"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.19:

#### Question

Find the average age of students who live in the city with code "NYC" and have secretary votes in the spring election cycle.

#### Query

SELECT avg(T1.Age) FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = SECRETARY_Vote WHERE T1.city_code = "NYC" AND T2.Election_Cycle = "Spring"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.20:

#### Question

What is the average age of students who have city code "NYC" and have secretary votes for the spring election cycle?

#### Query

SELECT avg(T1.Age) FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = SECRETARY_Vote WHERE T1.city_code = "NYC" AND T2.Election_Cycle = "Spring"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.21:

#### Question

Find the average age of female (sex is F) students who have secretary votes in the spring election cycle.

#### Query

SELECT avg(T1.Age) FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = SECRETARY_Vote WHERE T1.Sex = "F" AND T2.Election_Cycle = "Spring"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.22:

#### Question

What is the average age of the female students with secretary votes in the spring election cycle?

#### Query

SELECT avg(T1.Age) FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = SECRETARY_Vote WHERE T1.Sex = "F" AND T2.Election_Cycle = "Spring"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.23:

#### Question

Find the distinct first names of all the students who have vice president votes and whose city code is not PIT.

#### Query

SELECT DISTINCT T1.Fname FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.VICE_PRESIDENT_Vote EXCEPT SELECT DISTINCT Fname FROM Student WHERE city_code = "PIT"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.24:

#### Question

What are the distinct first names of the students who have vice president votes and reside in a city whose city code is not PIT?

#### Query

SELECT DISTINCT T1.Fname FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = T2.VICE_PRESIDENT_Vote EXCEPT SELECT DISTINCT Fname FROM Student WHERE city_code = "PIT"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.25:

#### Question

Find the distinct last names of all the students who have president votes and whose advisor is not 2192.

#### Query

SELECT DISTINCT T1.LName FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = PRESIDENT_Vote EXCEPT SELECT DISTINCT LName FROM Student WHERE Advisor = "2192"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.26:

#### Question

What are the distinct last names of the students who have president votes but do not have 2192 as the advisor?

#### Query

SELECT DISTINCT T1.LName FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = PRESIDENT_Vote EXCEPT SELECT DISTINCT LName FROM Student WHERE Advisor = "2192"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.27:

#### Question

Find the distinct last names of all the students who have president votes and whose advisor is 8741.

#### Query

SELECT DISTINCT T1.LName FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = PRESIDENT_Vote INTERSECT SELECT DISTINCT LName FROM Student WHERE Advisor = "8741"

#### Collections

Student, Voting_record

-------------------------------------------------------------------------------

### 2.28:

#### Question

What are the distinct last names of the students who have president votes and have 8741 as the advisor?

#### Query

SELECT DISTINCT T1.LName FROM Student AS T1 JOIN Voting_record AS T2 ON T1.StuID = PRESIDENT_Vote INTERSECT SELECT DISTINCT LName FROM Student WHERE Advisor = "8741"

#### Collections

Student, Voting_record


