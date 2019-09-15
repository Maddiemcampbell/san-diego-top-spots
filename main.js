$(document).ready(function() {
    $.getJSON('data.json', function(data){
        $.each(data, function (value){
            $("table").append("<tr><td>" 
            + value.name + "</td><td>" 
            + value.description + "</td><td><a href=https://www.google.com/maps?q=" 
            + value.location + ">Open in Google Maps</a></td></tr>");
        });
    });
});
