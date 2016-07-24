$(function() {
    var $ul = $("ul");
    
    $.ajax({
        url: "api/test.php",
        type: "GET",
        dataType : "json"
    }).done(function(colors) {
        setColors(colors);
    });
    
    function setColors(colors) {
        colors.forEach(function(color) {
            $ul.append($("<li>"+color+"</li>)").css("color", color));
        })
    }
});

