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
    
    // Double checks the loaded admin page has any ACF Repeaters with the Block style selected
    if ($('.jpn-tabs-activated > .acf-repeater').length > 0) { 
    
        // Deactivates all of the active tabs within the selected data attribute container
        function jpn_deactivate(id) {
            $('[data-jpn="'+id+'"] > .acf-repeater > table > tbody > tr.acf-row.active').removeClass('active');
            $('[data-jpn="'+id+'"] > .jpn-acf-tabs > .nav > ul > li > .jpn-acf-tab.active').removeClass('active');
        }

        // Activates the selected tab within the selected data attribute container
        function jpn_activate(el, id) {
            el.addClass('active');
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
                
                // Initialises the jpnuniqid
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
                    minHeight = (tabCount * 37) + 37;
                    cta = (cta.includes('Add') ? cta : 'Add '+cta);

                // Applies the minHeight value to the parent container
                $(this).css('min-height', minHeight+'px');

                // Adds in the empty tabs container and new "Add Row" button
                $(this).prepend('<div class="jpn-acf-tabs" id="jpn-acf-tabs-'+jpn+'"><div class="nav"><ul id="nav_'+jpn+'"></div><div class="add"><a class="jpn-tab-button acf-button" href="#" data-event="add-row" data-jpn-button="'+jpn+'">'+cta+'</a></div></div>');

                // For every repeater row in this container...
                var rowArray = new Array(), height = 0, index = 0;
                $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr.acf-row:not(.acf-clone)').each(function() {
                    // | Variables |
                    // id: the ACF data ID for the row
                    // num: the ACF row number, which is then parsed as an integer
                    
                    var id = $(this).attr('data-id'),
                        unq = jpnuniqid(id+'_');
                    
                    var isUnique = false;
                    if ($(this).attr('data-jpn-tab-id') && $(this).attr('data-jpn-tab-id') != '') {
                        if (!rowArray.includes($(this).attr('data-jpn-tab-id'))) {
                            var tabID = $(this).attr('data-jpn-tab-id');
                            rowArray.push(tabID);
                            isUnique = true;
                        }
                    }
                    if (isUnique == false) {
                        var tabID = unq;
                        rowArray.push(tabID);
                        $(this).attr('data-jpn-tab-id', unq);
                    }
                    
                    var num = $('[data-jpn-tab-id="'+tabID+'"] > .acf-row-handle.order > span').text();
                        num = parseInt(num);
                    
                    // If the function is passed through with "last" it activates the new row, rather than the first, by default
                    if (newrow == 'last' && jpn == add) { 
                        var activeNum = tabCount; 
                    } else if (parent && parent[1] == jpn && parent[0] == tabID) {
                        var activeNum = num;
                    } else { 
                        var activeNum = 1; 
                    }
                    
                    $(this).attr('data-jpn-index', index);
                        
                    if (num == activeNum) { 
                        var css = ' active'; jpn_deactivate(jpn); $(this).addClass('active'); 
                    } else { var css = ''; }

                    // Adds the Row's tab link to the empty tab container
                    $('[data-jpn="'+jpn+'"] > .jpn-acf-tabs > .nav > ul').append('<li data-jpn-index="'+index+'" data-jpn-tab-div="'+tabID+'" class="jpn-acf-tab-div"><a href="'+tabID+'" class="jpn-acf-tab'+css+'" data-jpn-nav="'+jpn+'" data-jpn-tab="'+tabID+'">'+text+num+'</a></li>');
                    
                    /* <a href="#" class="jpn-move" data-jpn-dir="up" data-jpn-nav="'+jpn+'" data-jpn-tab="'+tabID+'">&#9652;</a><a href="#" class="jpn-move" data-jpn-dir="down" data-jpn-nav="'+jpn+'" data-jpn-tab="'+tabID+'">&#9662;</a> */
                    
                    //$('[data-id="'+id+'"] > .acf-row-handle.order').css('top',height+'px');
                    //$('[data-id="'+id+'"] > .acf-row-handle.order > span').text(text+num);
                    height = height + 37; index = index + 1;
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
            }
        });

        $(document).on('click', '.jpn-tabs-activated a[data-event="add-row"].jpn-tab-button', function(e) {
            // Regenerates tabs when a row is added
            var id = $(this).attr('data-jpn-button');
            if ($('[data-jpn="'+id+'"]').parents('.jpn-tabs-activated').length >= 1) {
                var pID = $('[data-jpn="'+id+'"]').parent().closest('.jpn-tabs-activated').attr('data-jpn'),
                    tab = $('[data-jpn="'+pID+'"] > .jpn-acf-tabs > .nav').find('.active').attr('data-jpn-tab'),
                    parent = [tab, pID];
                
                setTimeout(jpn_acf_tabs(id, 'last', parent), 100);
            } else {
                setTimeout(jpn_acf_tabs(id, 'last'), 100);
            }
        });

        $(document).on('click', '.jpn-tabs-activated a[data-event="remove-row"].jpn-tab-button', function(e) {
            // Regenerates tabs when a row is removed
            var id = $(this).attr('data-jpn-button');
            if ($('[data-jpn="'+id+'"]').parents('.jpn-tabs-activated').length >= 1) {
                var pID = $('[data-jpn="'+id+'"]').parent().closest('.jpn-tabs-activated').attr('data-jpn'),
                    tab = $('[data-jpn="'+pID+'"] > .jpn-acf-tabs > .nav').find('.active').attr('data-jpn-tab'),
                    parent = [tab, pID];
            } else { var parent = false; }
            
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
                
                setTimeout(jpn_acf_tabs(id, false, parent), 100);
            } else {
                setTimeout(jpn_acf_tabs(id), 100);
            }
        }); 
        
        $(document).on('sortstop', '.jpn-sortable', function(event, ui) {
            var jpn = ui.item.find('a').attr('data-jpn-nav'), 
                dir = ui.item.find('a').attr('data-jpn-dir'), 
                id = ui.item.find('a').attr('data-jpn-tab'), 
                ul = ui.item.parent('ul'),
                index = ui.item.index(),
                trIndex = ui.item.attr('data-jpn-index'),
                diff = (index > trIndex ? (index - trIndex) : (trIndex - index)),
                newrow = $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr[data-jpn-index="'+index+'"]').get(0), 
                parent = $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody').get(0), 
                row = $('[data-jpn="'+jpn+'"] > .acf-repeater > table > tbody > tr[data-jpn-index="'+trIndex+'"]');
            
            console.log(trIndex);
            console.log(index);
            
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
            
        });      

        // Delayed initilisation to prefent loading before ACF
        acf.add_action('ready', function( $el ){ jpn_acf_tabs(); });
    }
});