
# Questions for concert_singer:

## 1 collection(s) used in query:

-------------------------------------------------------------------------------

### 1.1:

#### Question

How many singers do we have?

#### Query

SELECT count(*) FROM singer

#### Collections

singer

-------------------------------------------------------------------------------

### 1.2:

#### Question

What is the total number of singers?

#### Query

SELECT count(*) FROM singer

#### Collections

singer

-------------------------------------------------------------------------------

### 1.3:

#### Question

Show name, country, age for all singers ordered by age from the oldest to the youngest.

#### Query

SELECT name, country, age FROM singer ORDER BY age DESC

#### Collections

singer

-------------------------------------------------------------------------------

### 1.4:

#### Question

What are the names, countries, and ages for every singer in descending order of age?

#### Query

SELECT name, country, age FROM singer ORDER BY age DESC

#### Collections

singer

-------------------------------------------------------------------------------

### 1.5:

#### Question

What is the average, minimum, and maximum age of all singers from France?

#### Query

SELECT avg(age), min(age), max(age) FROM singer WHERE country = 'France'

#### Collections

singer

-------------------------------------------------------------------------------

### 1.6:

#### Question

What is the average, minimum, and maximum age for all French singers?

#### Query

SELECT avg(age), min(age), max(age) FROM singer WHERE country = 'France'

#### Collections

singer

-------------------------------------------------------------------------------

### 1.7:

#### Question

Show the name and the release year of the song by the youngest singer.

#### Query

SELECT song_name, song_release_year FROM singer ORDER BY age LIMIT 1

#### Collections

singer

-------------------------------------------------------------------------------

### 1.8:

#### Question

What are the names and release years for all the songs of the youngest singer?

#### Query

SELECT song_name, song_release_year FROM singer ORDER BY age LIMIT 1

#### Collections

singer

-------------------------------------------------------------------------------

### 1.9:

#### Question

What are all distinct countries where singers above age 20 are from?

#### Query

SELECT DISTINCT country FROM singer WHERE age > 20

#### Collections

singer

-------------------------------------------------------------------------------

### 1.10:

#### Question

What are the different countries with singers above age 20?

#### Query

SELECT DISTINCT country FROM singer WHERE age > 20

#### Collections

singer

-------------------------------------------------------------------------------

### 1.11:

#### Question

Show all countries and the number of singers in each country.

#### Query

SELECT country, count(*) FROM singer GROUP BY country

#### Collections

singer

-------------------------------------------------------------------------------

### 1.12:

#### Question

How many singers are from each country?

#### Query

SELECT country, count(*) FROM singer GROUP BY country

#### Collections

singer

-------------------------------------------------------------------------------

### 1.13:

#### Question

List all song names by singers above the average age.

#### Query

SELECT song_name FROM singer WHERE age > (SELECT avg(age) FROM singer)

#### Collections

singer

-------------------------------------------------------------------------------

### 1.14:

#### Question

What are all the song names by singers who are older than average?

#### Query

SELECT song_name FROM singer WHERE age > (SELECT avg(age) FROM singer)

#### Collections

singer

-------------------------------------------------------------------------------

### 1.15:

#### Question

Show location and name for all stadiums with a capacity between 5000 and 10000.

#### Query

SELECT LOCATION, name FROM stadium WHERE capacity BETWEEN 5000 AND 10000

#### Collections

stadium

-------------------------------------------------------------------------------

### 1.16:

#### Question

What are the locations and names of all stations with capacity between 5000 and 10000?

#### Query

SELECT LOCATION, name FROM stadium WHERE capacity BETWEEN 5000 AND 10000

#### Collections

stadium

-------------------------------------------------------------------------------

### 1.17:

#### Question

What is the maximum capacity and the average of all stadiums?

#### Query

select max(capacity), average from stadium

#### Collections

stadium

-------------------------------------------------------------------------------

### 1.18:

#### Question

What is the average and maximum capacities for all stadiums?

#### Query

select avg(capacity), max(capacity) from stadium

#### Collections

stadium

-------------------------------------------------------------------------------

### 1.19:

#### Question

What is the name and capacity for the stadium with highest average attendance?

#### Query

SELECT name, capacity FROM stadium ORDER BY average DESC LIMIT 1

#### Collections

stadium

-------------------------------------------------------------------------------

### 1.20:

#### Question

What is the name and capacity for the stadium with the highest average attendance?

#### Query

SELECT name, capacity FROM stadium ORDER BY average DESC LIMIT 1

#### Collections

stadium

-------------------------------------------------------------------------------

### 1.21:

#### Question

How many concerts are there in year 2014 or 2015?

#### Query

SELECT count(*) FROM concert WHERE YEAR = 2014 OR YEAR = 2015

#### Collections

concert

-------------------------------------------------------------------------------

### 1.22:

#### Question

How many concerts occurred in 2014 or 2015?

#### Query

SELECT count(*) FROM concert WHERE YEAR = 2014 OR YEAR = 2015

#### Collections

concert

-------------------------------------------------------------------------------

### 1.23:

#### Question

Which year has most number of concerts?

#### Query

SELECT YEAR FROM concert GROUP BY YEAR ORDER BY count(*) DESC LIMIT 1

#### Collections

concert

-------------------------------------------------------------------------------

### 1.24:

#### Question

What is the year that had the most concerts?

#### Query

SELECT YEAR FROM concert GROUP BY YEAR ORDER BY count(*) DESC LIMIT 1

#### Collections

concert

-------------------------------------------------------------------------------

### 1.25:

#### Question

Show countries where a singer above age 40 and a singer below 30 are from.

#### Query

SELECT country FROM singer WHERE age > 40 INTERSECT SELECT country FROM singer WHERE age < 30

#### Collections

singer

-------------------------------------------------------------------------------

### 1.26:

#### Question

what is the name and nation of the singer who have a song having 'Hey' in its name?

#### Query

SELECT name, country FROM singer WHERE song_name LIKE '%Hey%'

#### Collections

singer

-------------------------------------------------------------------------------

### 1.27:

#### Question

What is the name and country of origin of every singer who has a song with the word 'Hey' in its title?

#### Query

SELECT name, country FROM singer WHERE song_name LIKE '%Hey%'

#### Collections

singer

,## 2 collection(s) used in query:

-------------------------------------------------------------------------------

### 2.1:

#### Question

Show the stadium name and the number of concerts in each stadium.

#### Query

SELECT T2.name, count(*) FROM concert AS T1 JOIN stadium AS T2 ON T1.stadium_id = T2.stadium_id GROUP BY T1.stadium_id

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.2:

#### Question

For each stadium, how many concerts play there?

#### Query

SELECT T2.name, count(*) FROM concert AS T1 JOIN stadium AS T2 ON T1.stadium_id = T2.stadium_id GROUP BY T1.stadium_id

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.3:

#### Question

Show the stadium name and capacity with most number of concerts in year 2014 or after.

#### Query

SELECT T2.name, T2.capacity FROM concert AS T1 JOIN stadium AS T2 ON T1.stadium_id = T2.stadium_id WHERE T1.year >= 2014 GROUP BY T2.stadium_id ORDER BY count(*) DESC LIMIT 1

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.4:

#### Question

What is the name and capacity of the stadium with the most concerts after 2013?

#### Query

select t2.name, t2.capacity from concert as t1 join stadium as t2 on t1.stadium_id = t2.stadium_id where t1.year > 2013 group by t2.stadium_id order by count(*) desc limit 1

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.5:

#### Question

Show the stadium names without any concert.

#### Query

SELECT name FROM stadium WHERE stadium_id NOT IN (SELECT stadium_id FROM concert)

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.6:

#### Question

What are the names of the stadiums without any concerts?

#### Query

SELECT name FROM stadium WHERE stadium_id NOT IN (SELECT stadium_id FROM concert)

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.7:

#### Question

Show names for all stadiums except for stadiums having a concert in year 2014.

#### Query

SELECT name FROM stadium EXCEPT SELECT T2.name FROM concert AS T1 JOIN stadium AS T2 ON T1.stadium_id = T2.stadium_id WHERE T1.year = 2014

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.8:

#### Question

What are the names of all stadiums that did not have a concert in 2014?

#### Query

SELECT name FROM stadium EXCEPT SELECT T2.name FROM concert AS T1 JOIN stadium AS T2 ON T1.stadium_id = T2.stadium_id WHERE T1.year = 2014

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.9:

#### Question

Show the name and theme for all concerts and the number of singers in each concert.

#### Query

SELECT T2.concert_name, T2.theme, count(*) FROM singer_in_concert AS T1 JOIN concert AS T2 ON T1.concert_id = T2.concert_id GROUP BY T2.concert_id

#### Collections

concert, singer_in_concert

-------------------------------------------------------------------------------

### 2.10:

#### Question

What are the names, themes, and number of singers for every concert?

#### Query

select t2.concert_name, t2.theme, count(*) from singer_in_concert as t1 join concert as t2 on t1.concert_id = t2.concert_id group by t2.concert_id

#### Collections

concert, singer_in_concert

-------------------------------------------------------------------------------

### 2.11:

#### Question

List singer names and number of concerts for each singer.

#### Query

SELECT T2.name, count(*) FROM singer_in_concert AS T1 JOIN singer AS T2 ON T1.singer_id = T2.singer_id GROUP BY T2.singer_id

#### Collections

singer, singer_in_concert

-------------------------------------------------------------------------------

### 2.12:

#### Question

What are the names of the singers and number of concerts for each person?

#### Query

SELECT T2.name, count(*) FROM singer_in_concert AS T1 JOIN singer AS T2 ON T1.singer_id = T2.singer_id GROUP BY T2.singer_id

#### Collections

singer, singer_in_concert

-------------------------------------------------------------------------------

### 2.13:

#### Question

Find the name and location of the stadiums which some concerts happened in the years of both 2014 and 2015.

#### Query

SELECT T2.name, T2.location FROM concert AS T1 JOIN stadium AS T2 ON T1.stadium_id = T2.stadium_id WHERE T1.Year = 2014 INTERSECT SELECT T2.name, T2.location FROM concert AS T1 JOIN stadium AS T2 ON T1.stadium_id = T2.stadium_id WHERE T1.Year = 2015

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.14:

#### Question

What are the names and locations of the stadiums that had concerts that occurred in both 2014 and 2015?

#### Query

SELECT T2.name, T2.location FROM concert AS T1 JOIN stadium AS T2 ON T1.stadium_id = T2.stadium_id WHERE T1.Year = 2014 INTERSECT SELECT T2.name, T2.location FROM concert AS T1 JOIN stadium AS T2 ON T1.stadium_id = T2.stadium_id WHERE T1.Year = 2015

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.15:

#### Question

Find the number of concerts happened in the stadium with the highest capacity.

#### Query

select count(*) from concert where stadium_id = (select stadium_id from stadium order by capacity desc limit 1)

#### Collections

concert, stadium

-------------------------------------------------------------------------------

### 2.16:

#### Question

What are the number of concerts that occurred in the stadium with the largest capacity?

#### Query

select count(*) from concert where stadium_id = (select stadium_id from stadium order by capacity desc limit 1)

#### Collections

concert, stadium

,## 3 collection(s) used in query:

-------------------------------------------------------------------------------

### 3.1:

#### Question

List all singer names in concerts in year 2014.

#### Query

SELECT T2.name FROM singer_in_concert AS T1 JOIN singer AS T2 ON T1.singer_id = T2.singer_id JOIN concert AS T3 ON T1.concert_id = T3.concert_id WHERE T3.year = 2014

#### Collections

concert, singer, singer_in_concert

-------------------------------------------------------------------------------

### 3.2:

#### Question

What are the names of the singers who performed in a concert in 2014?

#### Query

SELECT T2.name FROM singer_in_concert AS T1 JOIN singer AS T2 ON T1.singer_id = T2.singer_id JOIN concert AS T3 ON T1.concert_id = T3.concert_id WHERE T3.year = 2014

#### Collections

concert, singer, singer_in_concert


