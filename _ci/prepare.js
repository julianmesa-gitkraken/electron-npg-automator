const downloadModule = require('../util/download-module');
const modulePath = require('../util/module-path');

let do_prepare;
try {
  do_prepare = require('./custom-prepare');
}
catch(e) {
  console.log('using default install script');
  do_prepare = function(_modulePath) {
    return new Promise((resolve, reject) => {
      cp.exec(
        'npm install',
        {cwd: _modulePath},
        (err, stdout, stderr) => {
          let out = err || {};
          out.stdout = stdout;
          out.stderr = stderr;
          if (err) {
            reject(out);
          }
          else {
            resolve(out);
          }
        }
      );
    });
  };
}

downloadModule()
  .then(() => do_prepare(modulePath()));
