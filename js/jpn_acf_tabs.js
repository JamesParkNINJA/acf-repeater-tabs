jQuery(document).ready(function ($) {
    
    // Double checks the loaded admin page has any ACF Repeaters with the Block style selected
    if ($('.acf-repeater.-block').length > 0) { 
    
        // Deactivates all of the active tabs within the selected data attribute container
        function jpn_deactivate(id) {
            $('[data-jpn="'+id+'"] > table > tbody > tr.acf-row.active').removeClass('active');
            $('[data-jpn="'+id+'"] > #jpn-acf-tabs-'+id+' .jpn-acf-tab.active').removeClass('active');
        }

        // Activates the selected tab within the selected data attribute container
        function jpn_activate(el, id) {
            el.addClass('active');
            $('[data-id="'+id+'"]').addClass('active');
        }

        // Main function
        function jpn_acf_tabs(block = false, newrow = false) {
            // Initialises the count
            var jpn_acf_tab_count = 0;
            
            // Removes the existing tabs so it can regenerate them
            $(document).find('.jpn-acf-tabs').remove();

            // Adds the activation class to the parent block
            $('.acf-repeater.-block:not(.jpn-active)').addClass('jpn-active');

            $('.jpn-active').each(function() {
                
                // Increment parent repeater field count
                jpn_acf_tab_count++;
                
                // Applies the count as a unique data attribute to both the container and the "Add Row" button
                $(this).attr('data-jpn',jpn_acf_tab_count);
                $('[data-jpn="'+jpn_acf_tab_count+'"] > .acf-actions .acf-button.button.button-primary[data-event="add-row"]').attr('data-jpn',jpn_acf_tab_count); 
                
                // | Variables |
                // tabCount: Number of rows in this repeater field.
                // cta: Gets the name of the field rows, if custom. If it doesn't use "Add" as a prefix, adds it in.
                // text: Same as "cta" but without "Add".
                // minHeight: Due to the tabs being absolute, this is applied to the container element to stop overflow.
                var tabCount = $('[data-jpn="'+jpn_acf_tab_count+'"] .acf-row:not(.acf-clone)').length,
                    cta = $('[data-jpn="'+jpn_acf_tab_count+'"] > .acf-actions .acf-button.button.button-primary[data-event="add-row"]').text(),
                    cta = (cta.includes('Add ') ? cta : 'Add '+cta),
                    text = cta.replace('Add ','')+' ',
                    minHeight = (tabCount * 31) + 31;

                // Applies the minHeight value to the parent container
                $(this).css('min-height', minHeight+'px');
                
                // Adds in the empty tabs container and new "Add Row" button
                $(this).prepend('<div class="jpn-acf-tabs" id="jpn-acf-tabs-'+jpn_acf_tab_count+'"><div class="nav"></div><div class="add"><a class="acf-button" href="#" data-event="add-row">'+cta+'</a></div></div>');
                
                // For every repeater row in this container...
                $('[data-jpn="'+jpn_acf_tab_count+'"] > table > tbody > tr.acf-row:not(.acf-clone)').each(function() { 
                    // | Variables |
                    // id: the ACF data ID for the row
                    // num: the ACF row number, which is then parsed as an integer
                    var id = $(this).attr('data-id'), 
                        num = $('[data-id="'+id+'"] > .acf-row-handle.order > span').text(); 
                        num = parseInt(num);
                    
                    // If the function is passed through with "last" it activates the new row, rather than the first, by default
                    if (newrow == 'last') { var activeNum = tabCount; } else { var activeNum = 1; }
                    if (num == activeNum) { 
                        var css = ' active'; jpn_deactivate(jpn_acf_tab_count); $(this).addClass('active'); 
                    } else { var css = ''; }
                    
                    // Adds the Row's tab link to the empty tab container
                    $(this).parent().parent().parent().find('.jpn-acf-tabs .nav').append('<a href="'+id+'" class="jpn-acf-tab'+css+'" data-jpn="'+jpn_acf_tab_count+'">'+text+num+'</a>');
                });
            });
        }

        // On tab link click...
        $(document).on('click','.jpn-acf-tab', function(e) {
            e.preventDefault(); 
            var id = $(this).attr('href'), 
                active = ($(this).hasClass('active') ? true : false), 
                jpn = $(this).attr('data-jpn');
            
            if (!active) {
                jpn_deactivate(jpn); // Hide previous active tab
                jpn_activate($(this), id); // Make this tab active
            }
        });

        $(document).on('click', '.jpn-active a[data-event="add-row"]', function(e) {
            // Regenerates tabs when a row is added
            var id = $(this).closest('div').find('.jpn-active').attr('data-jpn');
            setTimeout(jpn_acf_tabs(id, 'last'), 100);
        });

        $(document).on('click', '.jpn-active a[data-event="remove-row"]', function(e) {
            // Regenerates tabs when a row is removed
            setTimeout(function(){ jpn_acf_tabs(); }, 550);
        });

        // Delayed initilisation to prefent loading before ACF
        setTimeout(jpn_acf_tabs(), 100);
    }
});