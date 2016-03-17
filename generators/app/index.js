'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    //Configurations will be loaded here.
    //Ask for user input
    prompting: function() {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'name',
            message: 'Project Name/Slug?',
        }, function(answers) {
            this.props = answers
            this.log(answers.name);
            done();
        }.bind(this));
    },
    //Writing Logic here
    writing: {
        //Copy the configuration files
        config: function() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'), {
                    name: this.props.name
                }
            );
            this.fs.copyTpl(
                this.templatePath('_gruntfile.js'),
                this.destinationPath('Gruntfile.js'), {
                    name: this.props.name
                }
            );
        },

        //Copy application files
        app: function() {
            this.fs.copy(
                this.templatePath('_css/_less/_custom.less'),
                this.destinationPath('css/less/'+ this.props.name + '_custom.less')
            );
            this.fs.copy(
                this.templatePath('_css/_less/__colors.less'),
                this.destinationPath('css/less/__colors.less')
            );
            this.fs.copy(
                this.templatePath('_css/_less/__fonts.less'),
                this.destinationPath('css/less/__fonts.less')
            );
            this.fs.copy(
                this.templatePath('_css/_less/_global.less'),
                this.destinationPath('css/less/_global.less')
            );
            this.fs.copy(
                this.templatePath('_css/_less/_helpers.less'),
                this.destinationPath('css/less/_helpers.less')
            );
            this.fs.copy(
                this.templatePath('_css/_less/_variables.less'),
                this.destinationPath('css/less/_variables.less')
            );
            this.fs.copy(
                this.templatePath('_js/_custom.js'),
                this.destinationPath('javascript/'+ this.props.name + '_custom.js')
            );
        }
    },
    //Install Dependencies
    install: function() {
        this.installDependencies({
            callback: function () {
 
                    console.log('Starting Grunt Watch ...');
                    this.spawnCommand('grunt', ['watch'])
                        .on('close', function () {
                            console.log('The Grunt task has completed.');
                        });
                }.bind(this)
        });
    }
});