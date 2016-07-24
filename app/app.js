$(function() {
    var titles = $("div#titles");
    var id = 5;

    function showOneBook(id) {
        var idStr = "id="+id;
        $.ajax({
            url: "api/books.php",
            type: "GET",
            data: idStr,
            dataType: "json"
        }).done(function(response) {response.forEach(function(resp) {show(resp)})})
            .fail(function () {
                console.log("fail")
            });
    }

    function showAllBooks() {
        $.ajax({
            url: "api/books.php",
            type: "GET",
            dataType: "json"
        }).done(function(response) {response.forEach(function(resp) {show(resp)})})
            .fail(function () {
                console.log("fail")
            });
    }

    function show(response) {
        var data = "<p>" + response[1] + "&nbsp&nbsp<a>delete book</a><div class='info'>&nbsp&nbsp" + response[2] + "</div></p>";
        titles.append(data);
        titles.find("div").hide();
        divs = titles.find("div");
        titles.on("click.info", "p", function() {
            if ($(this).next().css("display") == "none") {
                $(this).next().show();
            } else {
                $(this).next().hide();
            }
        });

        titles.on("click.info", "a", function(event) {
            console.log("book deleted");
            event.stopImmediatePropagation();
            showAllBooks();
        })
    }

    var submit = $("#submit");
    submit.on("click", function(event) {
        var title = "name="+$("#title").val();
        var author = "author="+$("#author").val();
        var data = title+"&"+author;
        $.ajax({
            url: "api/books.php",
            type: "POST",
            data: data,
            dataType: "json"
        }).done(showAllBooks())
            .fail(function () {
                console.log("fail")
            });
        var inputs = $("form").find("input");
        inputs.val("");
    });

    var allBooks = $("#all_books");

    allBooks.on("click", function(event) {
        event.preventDefault();
        showAllBooks();
    });

    var oneBook = $("#one_book");

    oneBook.on("click", function(event) {
        titles.children().remove();
        event.preventDefault();
        showOneBook(id);
    });    
});
