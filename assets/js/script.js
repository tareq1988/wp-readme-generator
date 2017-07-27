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
                url: 'https://ps.w.org/jetpack/assets/screenshot-1.png?rev=1594422',
                caption: 'Dashboard: Bird’s eye view of your site stats, status, and health.'
            },
            {
                url: 'https://ps.w.org/jetpack/assets/screenshot-2.png?rev=1594422',
                caption: 'Safety: Protect your site and data with powerful security services.'
            },
            {
                url: 'https://ps.w.org/jetpack/assets/screenshot-3.png?rev=1594422',
                caption: 'Engagement: Social sharing, likes, and related posts.'
            },
            {
                url: 'https://ps.w.org/jetpack/assets/screenshot-4.png?rev=1594422',
                caption: 'Analytics: Actionable site stats and traffic insights.'
            },
            {
                url: 'https://ps.w.org/jetpack/assets/screenshot-5.png?rev=1594422',
                caption: 'Traffic: SEO Tools for Google, Twitter, Facebook and more.'
            },
        ],
        faq: [
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
        upgrade: ''
    }
};

const App = new Vue({
    el: '#builder',
    data: Storage,
    methods: {
        update: _.debounce(function (e, section) {
            this.sections[section] = e.target.value;
        }, 300),

        addQuestion: function() {
            this.sections.faq.push( {
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
        }
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
        }

    },

    methods: {
        compile: function(section) {
            return marked( this.sections[section], { sanitize: false } );
        },

        transform: function(index) {
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

window.frames['previewframe'].window.onload = function () {
    // console.log('Iframe Window OnLoad');
    Preview.$mount(window.frames['previewframe'].window.document.getElementById('main'));
}

var panels = $('.panel');

panels.on('click', 'h3', function() {
    panels.removeClass('active').find('.panel-content').slideUp('fast');

    $(this).closest('.panel').addClass('active').find('.panel-content').slideDown('fast');
});