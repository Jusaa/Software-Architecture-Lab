var CONFIG = require('../../config');
var { Pool, Client }  = require('pg');

var conString = 'postgres://' + CONFIG.user + ':' + CONFIG.password + '@' + CONFIG.address + ':' + CONFIG.port + '/' + CONFIG.database;
var pool = new Pool({
  connectionString: conString
});
  var users;
  pool.query("SELECT * FROM client;", (err, res) => {
    users = res.rows;
    console.log(users)
  });
async function authenticate({ username, password }) {

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    console.log(userWithoutPassword);
    return userWithoutPassword;
  }
}

async function getAll() {

  return users.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

module.exports = {
    authenticate,
    getAll
};
