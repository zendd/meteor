Package.describe({
  summary: "Password support for accounts",
  // This version was bumped to 2.0.0 temporarily during the Meteor 1.5.1
  // release process, so versions 2.0.0-beta.2 through -beta.5 and -rc.0
  // have already been published. The next time this package reaches 2.x
  // territory, I would recommend jumping straight to 2.1.0.
  version: "1.4.0"
});

Package.onUse(function(api) {
  api.use('npm-bcrypt', 'server');

  api.use([
    'accounts-base',
    'srp',
    'sha',
    'ejson',
    'ddp'
  ], ['client', 'server']);

  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);

  api.use('email', ['server']);
  api.use('random', ['server']);
  api.use('check');
  api.use('underscore');
  api.use('ecmascript');

  api.addFiles('email_templates.js', 'server');
  api.addFiles('password_server.js', 'server');
  api.addFiles('password_client.js', 'client');
});

Package.onTest(function(api) {
  api.use(['accounts-password', 'tinytest', 'test-helpers', 'tracker',
           'accounts-base', 'random', 'email', 'underscore', 'check',
           'ddp', 'ecmascript']);
  api.addFiles('password_tests_setup.js', 'server');
  api.addFiles('password_tests.js', ['client', 'server']);
  api.addFiles('email_tests_setup.js', 'server');
  api.addFiles('email_tests.js', 'client');
});
