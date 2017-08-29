var jsdom = require('jsdom').jsdom;

global.document = jsdom('<html><head><script></script></head><body><div id="weather-chart"></div></body></html>');
global.window = global.document.parentWindow;
global.navigator = window.navigator = {userAgent: 'node.js'};
global.Node = window.Node;

global.document.createElementNS = function (ns, tagName) {
    var elem = global.document.createElement(tagName);

    // Set private namespace to satisfy jsdom's getter
    elem._namespaceURI = ns; // eslint-disable-line no-underscore-dangle
    /**
     * Pass Highcharts' test for SVG capabilities
     * @returns {undefined}
     */
    elem.createSVGRect = function () {};
    /**
     * jsdom doesn't compute layout (see https://github.com/tmpvar/jsdom/issues/135).
     * This getBBox implementation provides just enough information to get Highcharts
     * to render text boxes correctly, and is not intended to work like a general
     * getBBox implementation. The height of the boxes are computed from the sum of
     * tspans and their font sizes. The width is based on an average width for each glyph.
     * It could easily be improved to take font-weight into account.
     * For a more exact result we could to create a map over glyph widths for several
     * fonts and sizes, but it may not be necessary for the purpose.
     * @returns {Object} The bounding box
     */
    elem.getBBox = function () {
        var lineWidth = 0,
            width = 0,
            height = 0;

        [].forEach.call(elem.children.length ? elem.children : [elem], function (child) {
            var fontSize = child.style.fontSize || elem.style.fontSize,
                lineHeight,
                textLength;

            // The font size and lineHeight is based on empirical values, copied from
            // the SVGRenderer.fontMetrics function in Highcharts.
            if (/px/.test(fontSize)) {
                fontSize = parseInt(fontSize, 10);
            } else {
                fontSize = /em/.test(fontSize) ? parseFloat(fontSize) * 12 : 12;
            }
            lineHeight = fontSize < 24 ? fontSize + 3 : Math.round(fontSize * 1.2);
            textLength = child.textContent.length * fontSize * 0.55;

            // Tspans on the same line
            if (child.getAttribute('dx') !== '0') {
                height += lineHeight;
            }

            // New line
            if (child.getAttribute('dy') !== null) {
                lineWidth = 0;
            }

            lineWidth += textLength;
            width = Math.max(width, lineWidth);

        });

        return {
            x: 0,
            y: 0,
            width: width,
            height: height
        };
    };
    return elem;
};

global.window.mocha = {};
global.window.beforeEach = beforeEach;
global.window.afterEach = afterEach;


/*
 * Only for NPM users
 */
require('angular/angular');
require('angular-mocks');
require('underscore');
require('moment');

global.angular = window.angular;
global.inject = global.angular.mock.inject;
global.ngModule = global.angular.mock.module;
global._ = require('underscore');
global.Highcharts = require('highcharts');
global.moment = require('moment');
global.Highcharts.setOptions({
    plotOptions: {
        series: {
            animation: false,
            dataLabels: {
                defer: false
            }
        }
    }
});
