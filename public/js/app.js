'use strict';

$(function() {

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

                if(index === 0) {
                    $li.addClass('active');
                }

                $('ul.nav-sidebar')
                    .append($li);
            });

        })
        .fail(function(data) {
            console.log(data);
        });

    /**
     * Handle switching log file
     */
    $('ul.nav-sidebar').on('click', 'li', function(event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        console.log($('a', this).attr('href'));
    })

});