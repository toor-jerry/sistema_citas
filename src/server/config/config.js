// ==========================
// Enviroment
// ==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==========================
// Server Port 
// ==========================
process.env.PORT = process.env.PORT || 3000;

// ==========================
// DataBase URI
// ==========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/cites';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URL_DB = urlDB;

// ==========================
// Session secret
// ==========================
process.env.KEY_1 = 'this-a-my-secret-key-2020';
process.env.KEY_2 = 'this-a-my-secret-key-2020';

// ==========================
// Name enterprise
// ==========================
process.env.NAME_ENTERPRISE = process.env.NAME_ENTERPRISE || 'Name enterprise';