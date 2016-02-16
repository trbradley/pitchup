module.exports = function(config) {
  config.set({

    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      '../public/libs/angular/angular.js',
      '../public/libs/angular-route/angular-route.js',
      '../public/libs/angular-resource/angular-resource.js',
      '../public/libs/angular-mocks/angular-mocks.js',
      '../public/libs/angular-loading-bar/build/loading-bar.min.js',
      '../public/libs/angular-animate/angular-animate.min.js',
      '../public/libs/lodash/dist/lodash.min.js',
      '../public/libs/angular-simple-logger/dist/angular-simple-logger.light.min.js',
      '../public/libs/angular-google-maps/dist/angular-google-maps.min.js',
      '../public/libs/ngGeolocation/ngGeolocation.min.js',
      '../public/js/**/*.js',
      './front_end/**/*.spec.js'
    ],

    exclude: [],

    preprocessors: {
      '../public/js/**/*.js': ['coverage']
    },

    reporters: ['spec', 'coverage', 'coveralls'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    singleRun: true,

    coverageReporter: {
      type: 'lcov',
      dir : 'front_end/coverage/'
    }

  });
};
