var Storage = {
    banner: 'https://ps.w.org/hello-dolly/assets/banner-772x250.png?rev=478342',
    icon: 'https://ps.w.org/hello-dolly/assets/icon-256x256.jpg?rev=969907',
    name: 'Plugin Name',
    contributors: 'matt',
    donate: 'https://tareq.co/donate/',
    tags: 'comments, spam',
    requires: '4.0',
    tested: '4.8',
    stable: 'trunk',
    license: 'GPLv2 or later',
    licenseuri: 'https://www.gnu.org/licenses/gpl-2.0.html',
    short: 'Here is a short description of the plugin.  This should be no more than 150 characters.  No markup here.',
    sections: {
        description: 'This is the long description. No limit, and you can use Markdown (as well as in the following sections).\n\nFor backwards compatibility, if this section is missing, the full length of the short description will be used, and\nMarkdown parsed.\n\nA few notes about the sections above:\n\n* \"Contributors\" is a comma separated list of wordpress.org usernames\n* \"Tags\" is a comma separated list of tags that apply to the plugin\n* \"Requires at least\" is the lowest version that the plugin will work on\n* \"Tested up to\" is the highest version that you\'ve *successfully used to test the plugin*. Note that it might work on\nhigher versions... this is just the highest one you\'ve verified.\n* Stable tag should indicate the Subversion \"tag\" of the latest stable version, or \"trunk,\" if you use `/trunk/` for\nstable.\n\n Note that the `readme.txt` of the stable tag is the one that is considered the defining one for the plugin, so\nif the `/trunk/readme.txt` file says that the stable tag is `4.3`, then it is `/tags/4.3/readme.txt` that\'ll be used\nfor displaying information about the plugin. In this situation, the only thing considered from the trunk `readme.txt`\nis the stable tag pointer. Thus, if you develop in trunk, you can update the trunk `readme.txt` to reflect changes in\nyour in-development version, without having that information incorrectly disclosed about the current stable version\nthat lacks those changes -- as long as the trunk\'s `readme.txt` points to the correct stable tag.\n\n If no stable tag is provided, it is assumed that trunk is stable, but you should specify \"trunk\" if that\'s where\nyou put the stable version, in order to eliminate any doubt.\n\nOrdered list:\r\n\r\n1. Some feature\r\n1. Another feature\r\n1. Something else about the plugin\r\n\r\nUnordered list:\r\n\r\n* something\r\n* something else\r\n* third thing\r\n\r\nHere\'s a link to [WordPress](http:\/\/wordpress.org\/ \"Your favorite software\") and one to [Markdown\'s Syntax Documentation][markdown syntax].\r\nTitles are optional, naturally.\r\n\r\n[markdown syntax]: http:\/\/daringfireball.net\/projects\/markdown\/syntax\r\n    \"Markdown is what the parser uses to process much of the readme file\"\r\n\r\nMarkdown uses email style notation for blockquotes and I\'ve been told:\r\n> Asterisks for *emphasis*. Double it up  for **strong**.\r\n\r\n`<?php code(); \/\/ goes in backticks ?>`',
        installation: 'This section describes how to install the plugin and get it working.\r\n\r\ne.g.\r\n\r\n1. Upload the plugin files to the `\/wp-content\/plugins\/plugin-name` directory, or install the plugin through the WordPress plugins screen directly.\r\n1. Activate the plugin through the \'Plugins\' screen in WordPress\r\n1. Use the Settings->Plugin Name screen to configure the plugin\r\n1. (Make your instructions match the desired user flow for activating and installing your plugin. Include any steps that might be needed for explanatory purposes)',
        screenshots: [
            {
                url: 'https://via.placeholder.com/640x480&text=Screenshot+1',
                caption: 'This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif).'
            },
            {
                url: 'https://via.placeholder.com/640x480&text=Screenshot+2',
                caption: 'This is the second screen shot'
            }
        ],
        frequently_asked_questions: [
            {
                question: 'A question that someone might have',
                answer: 'An answer to that question.'
            },
            {
                question: 'What about foo bar?',
                answer: 'Answer to foo bar dilemma.'
            }
        ],
        changelog: '',
        upgrade_notice: ''
    }
};

const App = new Vue({
    el: '#builder',
    data: Storage,

    computed: {
        preparedScreenshots: function() {
            var string = '';

            _.each( this.sections.screenshots, function(el, index) {
                string += ( index + 1 ) + '. ' + el.caption + '\n';
            });

            return string;
        },

        preparedFaq: function() {
            var string = '';

            _.each( this.sections.frequently_asked_questions, function(el, index) {
                string += '= ' + el.question + ' =\n\n';
                string += '' + el.answer + '\n\n';
            });

            return string;
        },

        generated: function() {

            var readme = '=== ' + this.name + ' ===\n' +
                'Contributors: ' + this.contributors + '\n' +
                'Donate link: ' + this.donate + '\n' +
                'Tags: ' + this.tags + '\n' +
                'Requires at least: ' + this.requires + '\n' +
                'Tested up to: ' + this.tested + '\n' +
                'Stable tag: ' + this.stable + '\n' +
                'License: ' + this.license + '\n' +
                'License URI: ' + this.licenseuri + '\n\n' +
                this.short + '\n\n' +
                '== Description ==\n\n' + this.sections.description + '\n\n' +
                '== Installation ==\n\n' + this.sections.installation + '\n\n' +
                '== Frequently Asked Questions ==\n\n' + this.preparedFaq + '\n' +
                '== Screenshots ==\n\n' + this.preparedScreenshots + '\n' +
                '== Changelog ==\n\n' + this.sections.changelog + '\n' +
                '== Upgrade Notice ==\n\n' + this.sections.upgrade_notice;

            return readme;
        }
    },

    methods: {
        update: _.debounce(function (e, section) {
            this.sections[section] = e.target.value;
        }, 300),

        addQuestion: function() {
            this.sections.frequently_asked_questions.push( {
                question: '',
                answer: ''
            });
        },

        addScreenshot: function() {
            this.sections.screenshots.push( {
                url: '',
                caption: ''
            });
        },

        removeItem: function(index, section) {
            this.sections[section].splice(index, 1);
        },

        showModal: function() {
            $('#modal-window').addClass('showing');
            $('#modal-backdrop').addClass('showing');
        },

        showExportModal: function() {
            $('#export-modal-window').addClass('showing');
            $('#export-modal-backdrop').addClass('showing');
        },

        closeModal: function() {
            $('#export-modal-window').removeClass('showing');
            $('#export-modal-backdrop').removeClass('showing');
        },
    }
});

const Preview = new Vue({
    data: Storage,

    computed: {

        compiledDescription: function () {
            return this.compile( 'description' );
        },

        compiledInstallation: function () {
            return this.compile( 'installation' );
        },

        contribs: function() {
            return this.contributors.split( ',' );
        },

        tagsArray: function() {
            return this.tags.split( ',' );
        }

    },

    methods: {
        compile: function(section) {
            var text = this.sections[section].replace(/^[\s]*=[\s]+(.+?)[\s]+=/gm, '#### $1' );

            return marked( text, { sanitize: false } );
        },

        transform: function(index) {
            if ( index === 0 ) {
                return 0;
            }

            if ( index === this.sections.screenshots.length - 1 ) {
                return -100;
            } else {
                return ( index * 100 );
            }
        },

        galleryClass: function(index) {

            // first item
            if ( index === 0 ) {
                return 'center';
            }

            if ( this.sections.screenshots.length > 2 && index == 1 ) {
                return 'right';
            }

            if ( index === this.sections.screenshots.length - 1 ) {
                return 'left';
            }

        },

        toggleFaq: function(event) {
            var faqs = $(event.target).closest('#faq');

            faqs.find('dt').removeClass('open');
            faqs.find('dd').hide();

            if ( 'DT' === event.target.tagName ) {
                $(event.target).addClass('open');
                $(event.target).next().show();
            } else {
                var dt = $(event.target).closest('dt');
                dt.addClass('open');
                dt.next().show();
            }
        }
    }
});

var interval = setInterval(function() {
    if ( 'complete' === window.frames['previewframe'].document.readyState ) {
        Preview.$mount(window.frames['previewframe'].window.document.getElementById('main'));
        clearInterval(interval);
    }
}, 300);


var panels = $('.panel');

panels.on('click', 'h3', function() {
    panels.removeClass('active').find('.panel-content').slideUp('fast');

    $(this).closest('.panel').addClass('active').find('.panel-content').slideDown('fast');
});

function hide_modal() {
    $('#modal-window').removeClass('showing');
    $('#modal-backdrop').removeClass('showing');
}

jQuery(function($) {

    $('body').on('click', 'a#close-modal', function(event) {
        event.preventDefault();

        hide_modal();
    });

    $('body').on('click', 'a#btn-resize', function(event) {
        event.preventDefault();

        var page = $('#page');

        if ( page.hasClass('mini') ) {
            page.removeClass('mini').addClass('expanded');
        } else if ( page.hasClass('expanded' ) ) {
            page.removeClass('expanded').addClass('mini');
        }
    });

    $('#submit').on('click', function(event) {
        event.preventDefault();

        var readme = $.trim( $('#readme').val() );

        if ( '' === readme ) {
            return;
        }

        var data = {};
        var reg = {
            name: /^===(.*)===/,
            contributors: /Contributors:(.*)/,
            donate: /Donate link:(.*)/,
            tags: /Tags:(.*)/,
            requires: /Requires at least:(.*)/,
            tested: /Tested up to:(.*)/,
            stable: /Stable tag:(.*)/,
            license: /License:(.*)/,
            licenseuri: /License URI:(.*)/,
            short: /(.*)/,
        };

        _.each(reg, function(regex, key) {
            var value = readme.match(regex);

            if ( null !== value ) {
                Storage[key] = $.trim( value[1] );
                readme       = $.trim( readme.replace(regex, '') );
            }
        });

        var sections = {
            'description': '',
            'installation': '',
            'frequently_asked_questions': [],
            'screenshots': [],
            'changelog': '',
            'upgrade_notice': ''
        };

        var sectionsRegexp = /^[\s]*==[\s]*(.+?)[\s]*==/gm;
        var sectionHeaders = readme.split(sectionsRegexp);

        if ( sectionHeaders.length < 2 ) {
            return;
        }

        for (var i = 1; i <= sectionHeaders.length; i += 2 ) {

            if ( sectionHeaders[i] !== undefined ) {
                var key = sectionHeaders[i].toLowerCase().split( ' ' ).join( '_' );

                if ( Storage.sections[ key ] !== undefined ) {
                    var section_content = $.trim( sectionHeaders[ i+1 ] );

                    if ( 'frequently_asked_questions' === key ) {
                        var _faq_sections = section_content.split(/^[\s]*=[\s]+(.+?)[\s]+=/m);

                        if ( _faq_sections.length > 1 ) {
                            Storage.sections[key] = [];

                            for (var i = 1; i <= _faq_sections.length; i += 2 ) {
                                Storage.sections[key].push( {
                                    question: $.trim(_faq_sections[i]),
                                    answer: $.trim(_faq_sections[i+1])
                                });
                            }
                        }

                    } else if ( 'screenshots' === key ) {

                        Storage.sections[key] = [];

                        var _screenshots = section_content.split("\n");

                        _.each(_screenshots, function(el, index) {
                            Storage.sections[key].push({
                                url: 'https://via.placeholder.com/640x480&text=Screenshot+' + (index+1),
                                caption: $.trim( el.substr( el.indexOf('.') + 1 ) )
                            });
                        });

                    } else {
                        Storage.sections[ key ] = section_content;
                    }

                }
            }
        }

        hide_modal();
    });
});
