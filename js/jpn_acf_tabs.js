/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

/*!
 * Textarea and select clone() bug workaround | Spencer Tipping
 * Licensed under the terms of the MIT source code license
 */
!function(e){jQuery.fn.clone=function(){for(var t=e.apply(this,arguments),a=this.find("textarea").add(this.filter("textarea")),n=t.find("textarea").add(t.filter("textarea")),r=this.find("select").add(this.filter("select")),l=t.find("select").add(t.filter("select")),d=0,i=a.length;i>d;++d)jQuery(n[d]).val(jQuery(a[d]).val());for(var d=0,i=r.length;i>d;++d)l[d].selectedIndex=r[d].selectedIndex;return t}}(jQuery.fn.clone);

/*
 * ACF Pro - Repeater Tabs
 */

(function () {
    this.jpnuniqid = function (pr, en) {
        var pr = pr || '', en = en || false, result;

        this.seed = function (s, w) {
        s = parseInt(s, 10).toString(16);
        return w < s.length ? s.slice(s.length - w) : (w > s.length) ? new Array(1 + (w - s.length)).join('0') + s : s;
        };

        result = pr + this.seed(parseInt(new Date().getTime() / 1000, 10), 8) + this.seed(Math.floor(Math.random() * 0x75bcd15) + 1, 5);

        if (en) result += (Math.random() * 10).toFixed(8).toString();

        return result;
    };
})();

(function($) {
    $.fn.jpnChangeElementType = function(newType) {
        var attrs = {};

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
    };
})(jQuery);

jQuery(document).ready(function ($) {

    var jpn_confirm_delete = false,
        acf_version = parseFloat(jpn_acf_tabs_args.acf_version);

    // Double checks the loaded admin page has any ACF Repeaters with the Block style selected
    if ($('.jpn-tabs-activated > .acf-repeater').length > 0) {

        // Deactivates all of the active tabs within the selected data attribute container
        function jpn_deactivate(id) {
            $('[data-jpn="'+id+'"] > .acf-repeater > table > tbody > tr.acf-row.active').removeClass('active');
            $('[data-jpn="'+id+'"] > .jpn-acf-tabs > .nav > ul > li > .jpn-acf-tab.active').removeClass('active');
            $('[data-jpn="'+id+'"] > .jpn-acf-tabs > .nav > ul > li.active').removeClass('active');
        }

        // Activates the selected tab within the selected data attribute container
        function jpn_activate(el, id) {
            el.addClass('active');
            el.parent('li').addClass('active');
            $('[data-jpn-tab-id="'+id+'"]').addClass('active');
        }

        // Main function
        function jpn_acf_tabs(add = false, newrow = false, parent = false) {

            // Removes the existing tabs so it can regenerate them
            $(document).find('.jpn-acf-tabs').remove();
            $( '.jpn-sortable' ).each(function(){
                $(this).sortable('destroy');
            });

            // Adds the activation class to the parent block

            var blockArray = new Array();

            $('.jpn-tabs-activated').each(function() {

                // Initialises the unique id
                var isUnique = false;
                if ($(this).attr('data-jpn') && $(this).attr('data-jpn') != '') {
                    if (!blockArray.includes($(this).attr('data-jpn'))) {
                        var jpn = $(this).attr('data-jpn');
                        blockArray.push(jpn);
                        isUnique = true;
                    }
                }
                if (isUnique == false) {
                    // Applies the count as a unique data attribute to both the container and the "Add Row" button
                    var jpn = jpnuniqid('block_');
                    blockArray.push(jpn);
                    $(this).attr('data-jpn',jpn);
                }

                var repeaterBlock = '[data-jpn="'+jpn+'"] > .acf-repeater';
                if ($(repeaterBlock).hasClass('-block')) {
                    $('[data-jpn="'+jpn+'"] > .acf-repeater > .acf-actions > li > .acf-button.button.button-primary[data-event="add-row"]').addClass('jpn-tab-button').attr('data-jpn-button',jpn);
                    $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr > td.remove > a[data-event="remove-row"]').addClass('jpn-tab-button').attr('data-jpn-button',jpn);
                } else if ($(repeaterBlock).hasClass('-table')) {
                    $('[data-jpn="'+jpn+'"] > .acf-repeater > .acf-actions > li > .acf-button.button.button-primary[data-event="add-row"]').addClass('jpn-tab-button').attr('data-jpn-button',jpn);
                    $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr > td.remove > a[data-event="remove-row"]').addClass('jpn-tab-button').attr('data-jpn-button',jpn);
                } else if ($(repeaterBlock).hasClass('-row')) {
                    $('[data-jpn="'+jpn+'"] > .acf-repeater > .acf-actions > li > .acf-button.button.button-primary[data-event="add-row"]').addClass('jpn-tab-button').attr('data-jpn-button',jpn);
                    $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr > td.remove > a[data-event="remove-row"]').addClass('jpn-tab-button').attr('data-jpn-button',jpn);
                }

                // | Variables |
                // tabCount: Number of rows in this repeater field.
                // cta: Gets the name of the field rows, if custom. If it doesn't use "Add" as a prefix, adds it in.
                // text: Same as "cta" but without "Add".
                // minHeight: Due to the tabs being absolute, this is applied to the container element to stop overflow.
                var tabCount = $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr.acf-row:not(.acf-clone)').length,
                    cta = $('[data-jpn="'+jpn+'"] > .acf-repeater > .acf-actions > li > .acf-button.button.button-primary[data-event="add-row"]').first().text(),
                    text = cta.replace('Add ','')+' ',
                    minHeight = (tabCount * 37) + 37 + 37;
                    cta = (cta.includes('Add') ? cta : 'Add '+cta);

                // Applies the minHeight value to the parent container
				if ($(this).hasClass('jpn-vertical')) {
					$(this).css('min-height', minHeight+'px');
				}

                // Adds in the empty tabs container and new "Add Row" button
                $(this).prepend('<div class="jpn-acf-tabs" id="jpn-acf-tabs-'+jpn+'"><div class="nav"><ul id="nav_'+jpn+'"></ul></div><div class="add"><ul id="add_'+jpn+'"><li><a class="jpn-tab-button acf-button" href="#" data-event="add-row" data-jpn-button="'+jpn+'"><span class="dashicons dashicons-plus-alt"></span></a></li><li><div class="jpn-tab-hover"><a href="#" class="jpn-remove-all" data-jpn-block="'+jpn+'">ALL ROWS</a></div><a class="jpn-tab-button jpn-remove-row" href="#" data-jpn-button="'+jpn+'"><span class="dashicons dashicons-trash"></span></a></li></ul><a class="jpn-hidden-button acf-button" href="#" data-event="add-row" data-jpn-button="'+jpn+'"></a></div></div>');

                // For every repeater row in this container...
                var rowArray = new Array(), idArray = new Array(), height = 0, index = 0;
                $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr.acf-row:not(.acf-clone)').each(function() {
                    // | Variables |
                    // id: the ACF data ID for the row
                    // num: the ACF row number, which is then parsed as an integer

                    var id = $(this).attr('data-id'),
                        unq = jpnuniqid(id+'_');

                    var jpnUnq = false;
                    if ($(this).attr('data-jpn-tab-id') && $(this).attr('data-jpn-tab-id') != '') {
                        if (!rowArray.includes($(this).attr('data-jpn-tab-id'))) {
                            var tabID = $(this).attr('data-jpn-tab-id');
                            rowArray.push(tabID);
                            jpnUnq = true;
                        }
                    }

                    if (jpnUnq == false) {
                        var tabID = unq;
                        rowArray.push(tabID);
                        $(this).attr('data-jpn-tab-id', unq);
                    }

                    if (!idArray.includes(id)) {
                        idArray.push(id);
                    } else {
                        var newID = jpnuniqid('id_');
                        idArray.push(newID);
                        $(this).attr('data-id', newID);
                    }

                    var num = index + 1;

                    // If the function is passed through with "last" it activates the new row, rather than the first, by default
                    if (newrow == 'last' && jpn == add) {
                        var activeNum = tabCount;
                    } else if (parent && parent[0] == tabID) {
                        var activeNum = num;
                    } else {
                        var activeNum = 1;
                    }

                    $(this).attr('data-jpn-index', index);

                    if (num == activeNum) {
                        var css = ' active'; jpn_deactivate(jpn); $(this).addClass('active');
                    } else { var css = ''; }

                    var collapsed = '';
                    if ($(this).hasClass('-collapsed')) { collapsed = '-collapsed'; }

                    // Adds the Row's tab link to the empty tab container
                    $('[data-jpn="'+jpn+'"] > .jpn-acf-tabs > .nav > ul').append('<li data-jpn-index="'+index+'" data-jpn-tab-div="'+tabID+'" class="jpn-acf-tab-div'+css+'"><div class="jpn-tab-hover"><a href="#" class="jpn-tab-copy" data-jpn-tab-id="'+tabID+'" data-jpn-num="'+index+'"><span class="hide-h">COPY </span><span class="dashicons dashicons-clipboard"></span></a></div><a href="'+tabID+'" class="jpn-acf-tab'+css+' '+collapsed+'" data-jpn-nav="'+jpn+'" data-jpn-tab="'+tabID+'"><span>'+num+'</span></a></li>');

                    /* <a href="#" class="jpn-move" data-jpn-dir="up" data-jpn-nav="'+jpn+'" data-jpn-tab="'+tabID+'">&#9652;</a><a href="#" class="jpn-move" data-jpn-dir="down" data-jpn-nav="'+jpn+'" data-jpn-tab="'+tabID+'">&#9662;</a> */

                    //$('[data-id="'+id+'"] > .acf-row-handle.order').css('top',height+'px');
                    //$('[data-id="'+id+'"] > .acf-row-handle.order > span').text(text+num);
                    height = height + 37 + 37; index = index + 1;
                });

                $( '#nav_'+jpn ).addClass('jpn-sortable').sortable();
            });
        }

        // On tab link click...
        $(document).on('click','.jpn-acf-tab', function(e) {
            e.preventDefault();
            var id = $(this).attr('href'),
                active = ($(this).hasClass('active') ? true : false),
                jpn = $(this).attr('data-jpn-nav');

            if (!active) {
                jpn_deactivate(jpn); // Hide previous active tab
                jpn_activate($(this), id); // Make this tab active
            } else {
                $(this).toggleClass('-collapsed');
                $('tr[data-jpn-tab-id="'+id+'"] > .acf-row-handle > .-collapse').click();
            }
        });

        function escapeRegExp(str) {
          return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }

        $(document).on('click', '.jpn-tabs-activated .jpn-tab-copy', function(e){
            e.preventDefault();

            var block = $(this).closest('.jpn-tabs-activated').attr('data-jpn');

            $('div[data-jpn="'+block+'"] > .jpn-acf-tabs > .add > .jpn-hidden-button').click();

            var newRow = $('div[data-jpn="'+block+'"] > div > table > tbody > tr:nth-last-child(2)'),
                newID = $('div[data-jpn="'+block+'"] > div > table > tbody > tr:nth-last-child(2)').attr('data-id'),
                tabID = $(this).attr('data-jpn-tab-id'),
                oldID = $('tr[data-jpn-tab-id="'+tabID+'"]').attr('data-id'),
                num = parseInt($(this).attr('data-jpn-num'), 10),
                count = $('div[data-jpn="'+block+'"] > div > table > tbody > tr[data-jpn-tab-id]').length,
                html = $('tr[data-jpn-tab-id="'+tabID+'"]').html(),
                str1 = new RegExp("-"+oldID+"-field_", "g"), str2 = new RegExp("\\["+oldID+"\\]", "g"),
                html = html.replace(str1, '-'+newID+'-field_').replace(str2, '['+newID+']'),
                clone = $('tr[data-jpn-tab-id="'+tabID+'"]').clone(),
                parent = false;

            clone[0].classList.add('jpn-cloned');

            if ($('[data-jpn="'+block+'"]').parents('.jpn-tabs-activated').length >= 1) {
                var pID = $('[data-jpn="'+block+'"]').parent().closest('.jpn-tabs-activated').attr('data-jpn'),
                    tab = $('[data-jpn="'+pID+'"] > .jpn-acf-tabs > .nav > ul > li > .active').attr('data-jpn-tab');
                parent = [tab, pID];
            }

            $('tr[data-id="'+newID+'"]').remove();
            clone.insertAfter($('div[data-jpn="'+block+'"] > div > table > tbody > tr:nth-last-child(2)'));

            function replaceClonedValue(type, oldvalue, newvalue) {
                $('tr.jpn-cloned ['+type+'*="'+oldvalue+'"]').each(function(){
                    var value = $(this).attr(type);
                    $(this).attr(type, value.replace(oldvalue, newvalue));
                });
            }

            var oldClone = $('tr.jpn-cloned').attr('data-jpn-tab-id');
            $('tr.jpn-cloned').attr('data-jpn-tab-id', oldClone.replace(oldID, newID));

            replaceClonedValue('for', '-'+oldID+'-', '-'+newID+'-');
            replaceClonedValue('id', '-'+oldID+'-', '-'+newID+'-');
            replaceClonedValue('name', '['+oldID+']', '['+newID+']');

            $('tr.jpn-cloned').removeClass('jpn-cloned');

            setTimeout(function(){ jpn_acf_tabs(block, 'last', parent); }, 100);
        });

        $(document).on('click', '.jpn-tabs-activated a[data-event="add-row"].jpn-tab-button', function(e) {
            e.preventDefault();
            var id = $(this).attr('data-jpn-button'), parent = false;

            if ($('[data-jpn="'+id+'"]').parents('.jpn-tabs-activated').length >= 1) {
                var pID = $('[data-jpn="'+id+'"]').parent().closest('div.jpn-tabs-activated').attr('data-jpn'),
                    tab = $('[data-jpn="'+pID+'"] > .jpn-acf-tabs > .nav > ul > li > a.active').attr('data-jpn-tab');
                parent = [tab, pID];
            }

            if ($('[data-jpn="'+id+'"] > .acf-repeater').hasClass('-empty')) {
                $('[data-jpn="'+id+'"] > .acf-repeater').removeClass('-empty');
            }

            setTimeout(function(){ jpn_acf_tabs(id, 'last', parent); }, 100);
        });

        $(document).on('mousewheel', '.jpn-tabs-activated.jpn-horizontal > .jpn-acf-tabs > .nav', function(e) {
            e.preventDefault();
            if (!$(this).attr('data-scroll')) { $(this).attr('data-scroll', 0); }
            var scroll = +$(this).attr('data-scroll'),
                delta = ~e.deltaY+1,
                dir = scroll + delta,
                navW = +$(this).width(),
                ulW = $(this).find('ul li').length * 45;

            if (((dir*45) <= (ulW - navW)) && dir >= 0) {
                $(this).scrollLeft(dir * 45);
                $(this).attr('data-scroll',dir);
            }

        });

        $(document).on('click', '.jpn-tabs-activated a[data-event="remove-row"].jpn-tab-button', function(e) {
            // Regenerates tabs when a row is removed
            var id = $(this).attr('data-jpn-button');
            if (acf_version < 5.6) {
                if ($('[data-jpn="'+id+'"]').parents('.jpn-tabs-activated').length >= 1) {
                    var pID = $('[data-jpn="'+id+'"]').parent().closest('div.jpn-tabs-activated').attr('data-jpn'),
                        tab = $('[data-jpn="'+pID+'"] > .jpn-acf-tabs > .nav > ul > li > a.active').attr('data-jpn-tab'),
                        parent = [tab, pID];
                } else { var parent = false; }

                setTimeout(function(){ jpn_acf_tabs(id, false, parent); }, 550);
            } else {
                jpn_confirm_delete = id;
            }
        });

        // This is so hacky, but it seems to be the only way to jump in to this click event before the modal is deleted
        $(document).on('mousedown', 'a.acf-confirm-y', function(e) {
            if (jpn_confirm_delete) {
                if ($('[data-jpn="'+jpn_confirm_delete+'"]').parents('.jpn-tabs-activated').length >= 1) {
                    var pID = $('[data-jpn="'+jpn_confirm_delete+'"]').parent().closest('div.jpn-tabs-activated').attr('data-jpn'),
                        tab = $('[data-jpn="'+pID+'"] > .jpn-acf-tabs > .nav > ul > li > a.active').attr('data-jpn-tab'),
                        parent = [tab, pID];
                } else { var parent = false; }

                setTimeout(function(){ jpn_acf_tabs(jpn_confirm_delete, false, parent); }, 650);
            }
        });

        $(document).on('click', 'a.jpn-remove-row', function(e) {
            e.preventDefault();
            var id = $(this).attr('data-jpn-button');
            //$('[data-jpn="'+id+'"] > div > table > tbody > tr.acf-row.active > td.acf-row-handle.remove > a.jpn-tab-button').click();
        });

        $(document).on('click', 'a.jpn-remove-all', function(e) {
            e.preventDefault();
            var id = $(this).attr('data-jpn-block');

            if ($('[data-jpn="'+id+'"]').parents('.jpn-tabs-activated').length >= 1) {
                var pID = $('[data-jpn="'+id+'"]').parent().closest('.jpn-tabs-activated').attr('data-jpn'),
                    tab = $('[data-jpn="'+pID+'"] > .jpn-acf-tabs > .nav').find('.active').attr('data-jpn-tab'),
                    parent = [tab, pID];
            } else { var parent = false; }

            $('[data-jpn="'+id+'"] > div > table > tbody > tr.acf-row:not(.acf-clone)').each(function(){
                $(this).remove();
            });

            $('[data-jpn="'+id+'"] > div.acf-repeater').addClass('-empty');

            setTimeout(function(){ jpn_acf_tabs(id, false, parent); }, 550);
        });

        $(document).on('click', '.jpn-move', function(e) {
            e.preventDefault();
            var jpn = $(this).attr('data-jpn-nav'), dir = $(this).attr('data-jpn-dir'), id = $(this).attr('data-jpn-tab');

            var row = $('tr[data-jpn-tab-id="'+id+'"]');
            if (dir == 'up') {
                row.prev().insertAfter(row);
            } else {
                row.next().insertBefore(row);
            }

            if ($('[data-jpn="'+jpn+'"]').parents('.jpn-tabs-activated').length >= 1) {
                var pID = $('[data-jpn="'+jpn+'"]').parent().closest('.jpn-tabs-activated').attr('data-jpn'),
                    tab = $('[data-jpn="'+pID+'"] > .jpn-acf-tabs > .nav').find('.active').attr('data-jpn-tab'),
                    parent = [tab, pID];

                setTimeout(function(){ jpn_acf_tabs(id, false, parent); }, 100);
            } else {
                setTimeout(function(){ jpn_acf_tabs(id); }, 100);
            }
        });

        $(document).on('sortstop', '.jpn-sortable', function(event, ui) {
            var jpn = ui.item.find('a.jpn-acf-tab').attr('data-jpn-nav'),
                id = ui.item.find('a.jpn-acf-tab').attr('data-jpn-tab'),
                ul = ui.item.parent('ul'),
                index = ui.item.index(),
                trIndex = ui.item.attr('data-jpn-index'),
                diff = (index > trIndex ? (index - trIndex) : (trIndex - index)),
                newrow = $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr[data-jpn-index="'+index+'"]').get(0),
                parent = $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody').get(0),
                row = $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr[data-jpn-index="'+trIndex+'"]');

            for (var i=0; i<=(diff); i++) {
                if (i < diff) {
                    if (trIndex > index) {
                        row.prev().insertAfter(row);
                    } else {
                        row.next().insertBefore(row);
                    }
                } else {
                    ul.find('li').each(function(){
                        var i = $(this).index();
                        $(this).attr('data-jpn-index',i);
                    });

                    $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr').each(function(){
                        var i = $(this).index();
                        $(this).attr('data-jpn-index',i);
                    });
                }
            }
            $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr[data-id="acfcloneindex"]').removeAttr('data-jpn-index');
        });

        // Delayed initialisation to prevent loading before ACF
        acf.add_action('ready', function( $el ){ jpn_acf_tabs(); });
    }
});
