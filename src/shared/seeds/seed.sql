INSERT INTO `soccer`.`Country` (`Name`) VALUES ('Portugal');
INSERT INTO `soccer`.`Country` (`Name`) VALUES ('Argentina');
INSERT INTO `soccer`.`Country` (`Name`) VALUES ('Germany');
INSERT INTO `soccer`.`Country` (`Name`) VALUES ('Spain');
INSERT INTO `soccer`.`Country` (`Name`) VALUES ('England');
INSERT INTO `soccer`.`Country` (`Name`) VALUES ('Italy');

INSERT INTO `soccer`.`Club` (`Name`, `CountryId`) VALUES ('Real Madrid CF', '4');
INSERT INTO `soccer`.`Club` (`Name`, `CountryId`) VALUES ('FC Barcelona', '4');
INSERT INTO `soccer`.`Club` (`Name`, `CountryId`) VALUES ('Bayern Munich', '3');
INSERT INTO `soccer`.`Club` (`Name`, `CountryId`) VALUES ('Manchester United', '5');
INSERT INTO `soccer`.`Club` (`Name`, `CountryId`) VALUES ('Juventus', '6');

INSERT INTO `soccer`.`Player` (`Name`, `Position`, `ShirtNumber`, `CountryId`) VALUES ('Cristiano Ronaldo', 'forward', '7', '1');
INSERT INTO `soccer`.`Player` (`Name`, `Position`, `ShirtNumber`, `CountryId`) VALUES ('Lionel Messi', 'forward', '10', '2');
INSERT INTO `soccer`.`Player` (`Name`, `Position`, `ShirtNumber`, `CountryId`) VALUES ('Toni Kroos', 'midfielder', '8', '3');
INSERT INTO `soccer`.`Player` (`Name`, `Position`, `ShirtNumber`, `CountryId`) VALUES ('Manuel Neuer', 'goalkeeper', '1', '3');

INSERT INTO `soccer`.`PlayerClub` (`PlayerId`, `ClubId`) VALUES ('1', '1');
INSERT INTO `soccer`.`PlayerClub` (`PlayerId`, `ClubId`) VALUES ('1', '5');
INSERT INTO `soccer`.`PlayerClub` (`PlayerId`, `ClubId`) VALUES ('1', '4');
INSERT INTO `soccer`.`PlayerClub` (`PlayerId`, `ClubId`) VALUES ('2', '2');
INSERT INTO `soccer`.`PlayerClub` (`PlayerId`, `ClubId`) VALUES ('3', '3');
INSERT INTO `soccer`.`PlayerClub` (`PlayerId`, `ClubId`) VALUES ('3', '1');
INSERT INTO `soccer`.`PlayerClub` (`PlayerId`, `ClubId`) VALUES ('4', '3');
