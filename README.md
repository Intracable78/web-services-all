# Nom du Projet

L’objectif de ce projet est de créer plusieurs web services qui communiquent entre eux, afin de pour finalité avoir un service qui regroupe plusieurs mircro service, pour faire de la reservation.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les logiciels suivants :

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads) (optionnel, si vous clonez le projet depuis un dépôt Git)

## Installation

Clonez le dépôt GitHub pour obtenir le code source :

lancez les commandes suivantes dans votre bash :

- git clone : https://github.com/Intracable78/web-services-all
- cd web-service-all
- docker-compose up --build

# Tester

## (AUTH API)

- Dans un premier temps, rendez-vous sur votre navigateur et entrez l'url : http://localhost:4000/api-docs/
  créez vous un utilisateur a l'aide la route /account via (les datas sont pré remplies)
- Via swagger, sur /token authentifiez-vous pour obtenir un accessToken (les infos utilisateurs sonr ausis pré remplies), une fois le token obtenus, conservez-le.

## (MOVIE API)

- rendez-vous sur votre navigateur et entrez l'url : http://localhost:3000/api-docs/
- Dans /movie (post), créez un nouveau film (Inception préremplie de base), vous pouvez aussi tester de créer une catégorie ou autre... A votre convenance.

## (RESERVATION API)

- rendez-vous sur votre navigateur et entrez l'url : http://localhost:3001/api-docs/
- récupérez l'\_id du fil créé précedement dans le movie service (\_id de inception par exemple)
- Pour effectuer une reservation, en param mettez \_id du movie dans /movie/{id}/reservation
- Votre reservation s'est effectué avec succès
- Gardez l'id de la reservation
- Utilisez là pour : /reservations/{id}/confirm -> bien joué, votre reservation est bien effectuée !

## Pour finir

Etant tout seul et par manque de temps, je n'ai pas pu connecter tous les services entre eux (surtout pour la reservation ou je n'ai pas eu le temps de gérer la seance, le cinema et autre. La mise en place des "micro services" a été interessant à découvrir et à mettre en place avec docker, et de voir comment marchait la communication entre eux (mes services arrivent bien à communiquer entre-eux). Même si j'ai créé les routes et fonctions, je n'ai pas eu le temps de les gérer entre eux.) Je n'ai pas trouvé de groupe, donc j'ai fait comme j'ai pu avec le temps que j'avais. Mais j'ai quand même beaucoup appris avec la mise en place des diverses services. Merci.

# web-services-all
