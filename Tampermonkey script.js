// ==UserScript==
// @name         Free Premium Gyazo
// @namespace    https://www.gyazo.com
// @version      0.1
// @description  Unlimited image preview
// @author       Sander Jonk (http://www.web-sj.com)
// @match        https://www.gyazo.com/captures
// @match        http://www.gyazo.com/captures
// @match        www.gyazo.com/captrues
// @match        gyazo.com/captures
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    window.initFreeGyazo = function() {
        var grid = document.getElementsByClassName('images-grid-view')[0];
        var children = grid.children[0].children;
        var elements = [];
        var x;
        for (x=0; x<children.length; x++) {
            if (children[x].className == 'grid-view-cell') {
                elements.push(children[x]);
            }
        }
        
        
        // Get disabled elements
        var disabled = [];
        // console.log(elements);
        for (x=0; x<elements.length; x++) {
            if (typeof(elements[x].children[0]) == 'undefined') {
                console.log(elements[x]);
            } else {
                if (elements[x].children[0].className.split(' ').indexOf('disabled') !== -1) {
                    // Current element is disabled
                    disabled.push(elements[x]);
                }
            }
        }
        
        
        for (x=0; x<disabled.length; x++) {

            var thumbnailimage = disabled[x].children[0].children[0].children[0].src;

            if (thumbnailimage.split('.')[thumbnailimage.split('.').length - 1] == 'gif') {
                // Is gif 
                var suffix = '-gif.gif';
                var prefix = 'https://thumb.gyazo.com/thumb/1920_w/_';
            } else {
                // Is no gif
                var suffix = '-png.jpg';
                var prefix = 'https://thumb.gyazo.com/thumb/_';
            }

            // Check if gif or no


            var metadata = disabled[x].children[0].children[1].innerHTML;
            var id = thumbnailimage.split('/')[thumbnailimage.split('/').length - 1].split('_')[1].split('-')[0];
            var html = '<div class="card medium-card checkable"><div class="grid-view-cell-inner-image"><img class="thumb" src="' + thumbnailimage + '"></div><div class="metadata">' + metadata + '</div><div class="hover-layer"><a class="view-operation skip-page" href="' + prefix + id + suffix + '"<div class="view-operation-inner"></div></a></div><div class="checking-overlay"></div><div class="card-checkmark"><div class="checkmark"></div></div></div>';
            // console.log(disabled[x].innerHTML);
            disabled[x].innerHTML = html;
            disabled[x].children[0].style.border = '2px solid #3e87f4';
            disabled[x].children[0].title = 'Recovered by "Free Gyazo"';

        }        
    };


    window.gyazoReady = function() {
        
        if (typeof(document.getElementsByClassName('images-grid-view')[0]) !== 'undefined') {
            var grid = document.getElementsByClassName('images-grid-view')[0];
            var children = grid.children[0].children;
            var x;
            var ready = true;
            for (x=0; x<children.length; x++) {
                if (children[x].className == 'grid-view-cell') {
                    if (children[x].children[0].className.split(' ').indexOf('checkable') == -1) {
                        ready = false;
                    }
                }
            }
            // console.log('Gyazo ready: ' + ready);
            return ready;
        } else {
            // console.log('Gyazo ready: ' + false);
            return false;
        }


    };

    window.addEventListener('load', function() {
        window.initFreeGyazoInterval = setInterval(function() {
            console.log('Trying to init Free Gyazo...');
            if (window.gyazoReady()) {
                clearInterval(window.initFreeGyazoInterval);
                window.initFreeGyazo();
                console.log('Free Gyazo initialized');


                document.getElementsByClassName('images-grid-view')[0].addEventListener('DOMSubtreeModified', window.initFreeGyazo);

            }
        }, 250);
    });
    
    
})();