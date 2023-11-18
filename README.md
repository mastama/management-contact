# management-contact
Contact Management

Requirment:

1. User Data
    - username string
    - password string
    - name string
      API:
        - register
        - login
        - update user by id
        - get user by id
        - get all user
        - logout

2. Contact Data
    - firstname string
    - lastname string
    - email string
    - phone string
      API:
        - create contact
        - update contact
        - get contact
        - search contact by ...
        - remove contact

3. Contact Address Data
    - street string
    - city
    - province
    - country
    - postalcode
      API:
        - create address
        - update address
        - get address
        - list address
        - remove address


Installer:
npm init
npm i joi > untuk validation
npm i express > framework
npm i --save-dev @types/express (autocomplete)
npm i --save-dev prisma > database
npm i winston > logger
npm i bcrypt > untuk hashing password
npm i --save-dev @types/bcrypt
npm i uuid > id login (user)
npm i --save-dev @types/uuid

npm i jest
npm i --save-dev @types/jest
npm i --save-dev babel-jest > karena jest hanya support commonJS makanya perlu menggunakna ini agar support module
npm i --save-dev @babel/preset-env

npm i --save-dev supertest @types/supertest > karena menggunakan express maka perlu menginstall ini supaya mempermudah dalam proses unit testing dengan jest

noted:
"scripts": {
"test": "jest -i"
},
ditambahkan -i karena jest running secara pararel dan itu akan merepotkan saat proses testing makanya dibuat sequencial dengan menambahkan -i

5. setup databse
6. setup prisma:
   npx prisma init
7. membuat model User, Contact, Address
8. npx prisma migrate dev --create-only > untuk cek apakah data yang akan di migrate sudah benar
9. npx prisma migrate dev
   #SETUP PROJECT
10. setup database prisma
11. setup logging winston
12. setup web application
13. 