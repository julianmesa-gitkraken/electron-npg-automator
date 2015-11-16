var queryGithub = require('./query-github');
var getTagInfo = require('./get-tag-info');

module.exports = function getUrl() {
  let moduleVersion;
  let url;
  return getTagInfo()
    .then((tagInfo) => moduleVersion = tagInfo.moduleVersion)
    .then(() => queryGithub('module', 'releases'))
    .then((response) => {
      response.body.some((release) => {
        console.log('moduleVersion: '+ moduleVersion);
        console.log('tag_name: ' + release.tag_name);
        if (release.tag_name == moduleVersion) {
          url = release.tarball_url;
          return true;
        }
      });
    })
    .then(() => url);
};
