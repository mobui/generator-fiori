'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const util = require('util');
const shelljs = require('shelljs');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the delightful ' + chalk.red('generator-fiori') + ' generator!'
    ));

    // Get information about user from git config
    this.gitInfo = {
      name: shelljs.exec('git config user.name', {
        silent: true
      }).stdout.replace(/\n/g, ''),
      email: shelljs.exec('git config user.email', {
        silent: true
      }).stdout.replace(/\n/g, ''),
      github: shelljs.exec('git config github.user', {
        silent: true
      }).stdout.replace(/\n/g, ''),
    };

    const prompts = [{
        type: 'input',
        name: 'projectName',
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description',
        default: this.appname
      },
      {
        type: 'input',
        name: 'authors',
        message: 'Authors',
        default: this.gitInfo.name + ' <' + this.gitInfo.email + '>'
      },
      {
        type: 'list',
        name: 'license',
        message: 'License',
        choices: ['MIT License', 'Apache License 2.0', 'GNU GPLv3', 'Other']
      },
      {
        type: 'input',
        name: 'namespace',
        message: 'Your project namespace',
        default: 'target.namespace'
      },
      {
        type: 'list',
        name: 'template',
        message: 'Template',
        choices: ['Master-Details']
      },
       {
        type: 'input',
        name: 'serviceURL',
        message: 'OData Service Root URL',
        default: '/' + this.appname + '.srv'
      },
      {
        type: "confirm",
        name: "mock",
        message: "Use Mock Server",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {

      this.props = props;
      // build path for namespace
      // it.is.name.space -> it/is/name/space
      if (props.namespace && typeof (props.namespace === "string")) {
        this.props.namespacePath = props.namespace.replace(/\./g, '/');
      } else {
        this.props.namespacePath = '';
      }
     
     // bult git reposityry path
      if (this.gitInfo.github) {
        this.props.githubPath = this.gitInfo.github + '/' + this.props.projectName
      } else {
        this.props.githubPath = '';
      }
      // buid application id
      // delete non-alphanumeric chars
      this.props.appid = this.appname.replace(/\W/g, '');
      console.log(this.props);

    });
  }

  writing() {
    // Main application
    switch (this.props.template) {
      case 'Master-Details':
        this.fs.copyTpl(
          this.templatePath('webapp-master-details/'),
          this.destinationPath('webapp/'),
          this.props
        )
        break;
      case 'Simple':
        break;
      default:
        break;
    }
    // Mock Server
    if (this.props.mock) {
      this.fs.copyTpl(
        this.templatePath('localService/'),
        this.destinationPath('webapp/localService'),
        this.props
      );
    }
    // Build System
    this.fs.copyTpl(
      this.templatePath('Gruntfile.js'),
      this.destinationPath('Gruntfile.js'),
      this.props
    );
    this.fs.copy(
      this.templatePath('grunt/'),
      this.destinationPath('grunt/')
    );
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc'),
      this.props
    );

    // License
    switch (this.props.license) {
      case 'MIT License':
        this.fs.copyTpl(
          this.templatePath('LICENSE.MIT'),
          this.destinationPath('LICENSE'),
          this.props
        )
        break;
      case 'Apache License 2.0':
        this.fs.copyTpl(
          this.templatePath('LICENSE.APACHE2'),
          this.destinationPath('LICENSE'),
          this.props
        )
        break;
      case 'GNU GPLv3':
        this.fs.copyTpl(
          this.templatePath('LICENSE.GNU3'),
          this.destinationPath('LICENSE'),
          this.props
        )
        break;
      default:
        break;
    }
  }

  install() {
    this.installDependencies();
  }
};
