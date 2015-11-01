'use strict';

$(function() {

    var $logLines = $('#log-lines');

    /**
     * Populate list of log files
     */
    $.ajax('/logs')
        .done(function(data) {

            data.forEach(function(value, index) {
                var $a = $('<a></a>')
                    .attr('href', '/logs/' + value)
                    .text(value);

                var $li = $('<li></li>')
                    .append($a);

                $('ul.nav-sidebar')
                    .append($li);

                //activate the first log file
                if(index === 0) {
                    $li.addClass('active');
                    $('a', $li).trigger('click');
                }
            });

            $logLines.empty();
        })
        .fail(function(data) {
            var $li = $('<p></p>')
                .addClass('bg-danger')
                .text(data);

            $logLines.empty().append($li);
        });

    /**
     * Handle switching log file
     */
    $('ul.nav-sidebar').on('click', 'li', function(event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');

        var path = $('a', this).attr('href');

        $logLines.empty();

        /**
         * request the log file contents and load into the page
         */
        $.ajax(path + '?n=50')
            .done(function(data) {

                //wrap each line in an <li> tag
                data.split("\n").forEach(function(line) {
                    if(line) $logLines.append($('<li></li>').text(line))
                });

                //scroll to the bottom of the page
                $('html, body').scrollTop( $(document).height() - $(window).height() );
            })
            .fail(function(data) {
                var $li = $('<p></p>')
                    .addClass('bg-danger')
                    .text(data);

                $logLines.empty().append($li);
            });
    })

});