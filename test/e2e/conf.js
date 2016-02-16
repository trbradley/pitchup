exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [{'browserName': 'firefox' }],
  specs: ['features/*Feature.js'],
  getMultiCapabilities: function() {
      return q.all([
          makeFirefoxProfile(
              {"geo.prompt.testing": true, "geo.prompt.testing.allow": true},
              ["features/*Feature.js"]
          )
      ]);
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    print: function() {}
  },

  onPrepare: function() {
    require('protractor-http-mock').config = {
      rootDirectory: __dirname,
      protractorConfig: 'conf.js'
    };
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  }
};


var q = require("q");
var FirefoxProfile = require("firefox-profile");

var makeFirefoxProfile = function(preferenceMap, specs) {
   var deferred = q.defer();
   var firefoxProfile = new FirefoxProfile();

   for (var key in preferenceMap) {
       firefoxProfile.setPreference(key, preferenceMap[key]);
   }

   firefoxProfile.encoded(function (encodedProfile) {
       var capabilities = {
          browserName: 'firefox',
           firefox_profile: encodedProfile,
           specs: specs
       };
       deferred.resolve(capabilities);
   });
   return deferred.promise;
};
