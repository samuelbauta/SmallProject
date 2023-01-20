CREATE DATABASE COP4331;

USE COP4331;

CREATE TABLE `COP4331`.`Users` (
       `ID` INT NOT NULL UNIQUE AUTO_INCREMENT ,
       `DateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
       `DateLastLoggedIn` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
       `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
       `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
       `Login` VARCHAR(50) NOT NULL UNIQUE DEFAULT '' ,
       `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
       PRIMARY KEY (`ID`));
       
CREATE TABLE `COP4331`.`Contacts` (
       `ID` INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
       `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
       `LastName` VARCHAR(50) NOT NULL DEFAULT '',
       `Email` VARCHAR(50)  DEFAULT '' ,
       `Phone` VARCHAR(20) DEFAULT '' ,
       `DateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
       `UserID` INT NOT NULL,
       FOREIGN KEY (UserID) REFERENCES Users (ID));

INSERT INTO Users (FirstName, LastName, Login, Password)
            Values ('Admin', 'Admin', 'admin', 'admin'),
                   ('Justin', 'Mazor', 'jmazor', 'puppies');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Rick','Leinecker','RickL','COP4331');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Sam','Hill','SamH','Test');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Rick','Leinecker','RickL','5832a71366768098cceb7095efb774f2');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Sam','Hill','SamH','0cbc6611f5540bd0809a388dc95a615b');


INSERT INTO Contacts (FirstName, LastName, Email, Phone, UserID)
            Values ('Admin', 'Admin', 'admin@admin.com', '123-456-7890', 1),
                   ('Justin', 'Mazor', 'jh@mazor.sh', '098-765-4321', 1),
                   ('Random', 'Person', 'person@random.com', '123-456-7890', 2);
        
                   
create user 'TheBeast' identified by 'WeLoveCOP4331';
grant all privileges on COP4331.* to 'TheBeast'@'%';
