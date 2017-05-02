import electron from 'electron';
import fs from 'fs';
import path from 'path';

const { ipcRenderer } = electron;

const form = document.getElementById('login-form');

const AUTH_INFO_PATH = path.join(__dirname, '../../../', 'auth_info.json');

var authInfo = null;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username-input').value;
  const password = document.getElementById('password-input').value;
  const remember = document.getElementById('remember-input').checked;

  if (remember) {
    if (!(authInfo && authInfo.username === username && authInfo.password === password)) {
      fs.writeFileSync(AUTH_INFO_PATH, JSON.stringify({
        username: username,
        password: password
      }));
    }
  } else {
    fs.existsSync(AUTH_INFO_PATH) && fs.unlinkSync(AUTH_INFO_PATH);
  }

  ipcRenderer.send('login-message', [username, password]);
});

(function(){
    if (fs.existsSync(AUTH_INFO_PATH)) {
        authInfo = JSON.parse(fs.readFileSync(AUTH_INFO_PATH, 'utf8'));
        if (authInfo && authInfo.username && (authInfo.password || authInfo.password === '')) {
            document.getElementById('username-input').value = authInfo.username;
            document.getElementById('password-input').value = authInfo.password;
            document.getElementById('remember-input').checked = true;
        } else {
            fs.unlinkSync(AUTH_INFO_PATH)
        }
    }
})();
