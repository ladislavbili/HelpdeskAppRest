Informácia: vzhľad nižšie popisuje potrebné data

Zmeny:
1. assignedTo je len jedna osoba, nie pole osob
2. Každý task ma jeden status z databázy statusov
3. Používateľ nepotrebuje mať userData vo zvlášť objekte
4. Každý používateľ nemá firstname a surname ale len celé meno, name
5. Pri prihlásení potrebujeme nasledujúce informácie o používateľovi spolu s tokenom:
  jeho globálne ACL (sent_emails_from_comments,create_tasks_in_all_projects a ostatné z tejto skupiny ACL), username,e-mail,name,id, (token)
6. Neriešime ešte custom attributes, môžu byť pôvodné
7. Pagination funguje nasledovne, v requeste sa pošle ako veľký má byť počet získavaných prvkov, 0 pre VŠETKY, inak kladné číslo pre počet na stranu
8. Rozdeľujeme väčšinu requestov na získavanie zoznamu s menej datami a zvlášť všetky data pre jeden prvok zoznamu, jeden prvok zoznamu obsahuje všetky potrebné data, ktoré máme v databáze
9. (Ak nie je implementované) Ideálna optimalizácia: REST API príjma JSON.stringify data
  Príklad javascript requestu
    fetch(URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body:JSON.stringify(data),
    })
10. Čas ukladáme ako currentmills (1505118430509)
11. ACL su true alebo false
12. null je standardna hodnota pre nevyplnené udaje

OTAZKY:
1. Neda sa vytvorit task so vsetkymi parametrami?
2. Updatovanie tasklistu s pomocou api (subscription, napriklad cez updatedat co je datum poslendej zmeny, api sa poda request s casom posledneho updatu a ona vrati vsetky zmenene data skupiny- tasks,projects)

Ukážkový vzhľad získavaných REST dát:
Informácia: názov pred datami je informatívny, z API ho nedostávame

Zoznam firiem obsahuje nasledujúce data
"companies": [
  {
    "id": 1,
    "title": "Web-Solutions",
    "is_active": true
  },
  ...
]

Konkrétna firma má nasledujúce data
"company": {
    "id": 1,
    "title": "Web-Solutions",
    "subscription_time": 0,
    "ico": "1102587",
    "dic": "12587459644",
    "ic_dph": "12587459644",
    "phone": "0944788899",
    "street": "Cesta 125",
    "city": "Bratislava",
    "zip": "02587",
    "country": "SR",
    "is_active": true
  }

Zoznam používateľov obsahuje nasledujúce data
"users": [
  {
    "id": 1,
    "username": "mk",
    "name": "Matej Kurka",
    "email": "mk@email.sk",
    "is_active": true,
    "company": {
      "id": "1",
      "title": "prva firma"
    }
  },
  ...
]

Konkrétny používateľ má nasledujúce data
"user": {
    "id": 1,
    "is_active": true,
    "user_role": {
      "id": 1
    },
    "email": "mk@email.sk",
    "username": "mk",
    "name": "Matej Kurka",
    "company": {
      "id": "1",
      "title": "prva firma"
    },
    "function": "prvy",
    "mobile": "0911315467",
    "tel": "0911315467",
    "signature": "podpis 1"
  }

Zoznam úloh obsahuje nasledujúce data
"tasks": [
  {
    "id": 1,
    "title": "task name updated",
    "requestedBy": {
      "id": 1,
      "name": "Matej Kurka",
      "username": "mk",
      "email": "mk@email.sk"
    },
    "company": {
      "id": 1,
      "title": "Web-Solutions"
    },
    "assignedTo": {
      "id": 1,
      "name": "Matej Kurka",
      "username": "mk",
      "email": "mk@email.sk"
    },
    "createdAt": 1503479889210,
    "deadline": 1501761600000,
    "status": {
      "id": 1,
      "title": "New",
      "color": "#2DA3EC"
    }
  },
  ...
]

Samotná úloha obsahuje tieto data
"task": {
    "id": 1,
    "ACL": {
      ... všetky ACL vyplívajúce z projektu, v ktorom je daný task
    },
    "title": "task name edited",
    "description": "popis penky",
    "deadline": 1501761600000,
    "startedAt": 1504161000000,
    "important": true,
    "work": "what has been done til now now",
    "work_time": "100",
    "createdAt": 1503479889210,
    "updatedAt": 1503916953055,
    "statusChangedAt": 1503916953055,
    "createdBy": {
      "id": 1,
      "username": "mk",
      "name": "Matej Kurka",
      "email": "mk@email.sk"
    },
    "requestedBy": {
      "id": 1
    },
    "project": {
      "id": 1
    },
    "company": {
      "id": 1
    },
    "assignedTo": {
      "id": 1
    },
    "canEdit": true,
    "status": {
      "id": 1
    }
  }

Zoznam projektov obsahuje nasledujúce data
"projects": [
  {
    "id": 1,
    "title": "Projekt 1",
    "numberOfTasks": 4
  },
  ...
]

Samotný task obsahuje tieto data, ak nesmie nastavit pouzivatelom ACL tak null
"project": {
  "id": 1,
  "title":"Projekt 1",
  "users_ACL":[{
    "id": 1,
    "username": "mk",
    "name": "Matej Kurka",
    "email": "mk@email.sk",
    "is_active": true,
    "company": {
      "id": "1",
      "title": "prva firma"
      },
      "ACL": {
        ... všetky ACL vramci projektu daneho pouzivatela
      },
    },...],     
  }

Zoznam statusov obsahuje nasledujúce data
"statuses": [
  {
    "id": 1,
    "title": "New",
    "color": "#2DA3EC",
    "order": 1
  },
  ...
]

Samotný status
"status":{
  "id": 1,
  "title": "New",
  "color": "#2DA3EC",
  "is_active":true,
  "description":"popis",
  "order":1
}

Zoznam komentárov obsahuje nasledujúce data
"comments": [
  {
    "id": 1,
    "title": "t1",
    "body": "Sprava",
    "createdAt": 1504161000000,
    "internal": true,
    "email_to": [
      "mail@gmail.net",
      "em@tail.net"
    ],
    "createdBy": {
      "id": 1,
      "username": "mk",
      "name": "Matej Kurka",
      "email": "mk@email.sk"
    }
  },
  {
    "id": 2,
    "title": null,
    "body": "Sprava zlava",
    "createdAt": 1504161000000,
    "internal": true,
    "email_to": null,
    "createdBy": {
      "id": 1,
      "username": "mk",
      "name": "Matej Kurka",
      "email": "mk@email.sk"
    }
  },
  ...
]

Zoznam jednotiek obsahuje nasledujúce data
"units": [
  {
    "id": 1,
    "is_active":true,
    "title": "Kilogram",
    "shortcut": "kg"
  },
  ...
]


Zoznam vecí obsahuje nasledujúce data
"items": [
  {
    "id": 1,
    "title": "Chleba0",
    "amount": 30,
    "unit": {
      "id": 1
    },
    "price": 30
  },
  ...
]

Samotný item
"item": {
  "id": 1,
  "title": "Chleba0",
  "amount": 30,
  "unit": {
    "id": 1
  },
  "price": 30
}

Zoznam rolí obsahuje nasledujúce data
"user-roles": [
  {
    "id": 1,
    "order": 1,
    "title": "Admin",
    "is_active":true
  },
  ...
]

Samotná rola
"user-role": {
  "id": 1,
  "order": 1,
  "title": "Admin",
  "is_active":true,
  "description":"rolaaa",
  "ACL":[všetky globalne ACL používateľa]
}

SMTP zostáva nezmenené

IMAP neurcene, pravdepodobne identicke s API, zmena v datume na cas v milisekdundach
