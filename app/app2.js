$(function() {
    var titles = $("div#titles");
    var allBooks = $("#all_books");
    var oneBook = $("#one_book");
    var submit = $("#submit");

    allBooks.on("click", function(event) {
        titles.children().remove();
        event.preventDefault();
        showAllBooks();
    });

    oneBook.on("click", function(event) {
        var id = $("#id").val();
        titles.children().remove();
        event.preventDefault();
        showOneBook(id);
    });

    submit.on("click", function(event) {
        var title = "name="+$("#title").val();
        var author = "author="+$("#author").val();
        var data = title+"&"+author;
        $.ajax({
            url: "api/books.php",
            type: "POST",
            data: data,
            dataType: "json"
        }).done(function() {
            titles.children().remove();
            showAllBooks();
        }).fail(function () {
            console.log("fail")
        });
        var inputs = $("form").find("input");
        inputs.val("");
    });

    Book = function(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    };

    Book.prototype.add = function() {
        var p = "<p>" + this.title + "</p>";
        var div = "<div class='info'>" + this.author + "</div>";
        var btn = "<button type='submit' method='DELETE' class='del_btn' data-id='" + this.id + "'>delete</button>";
        titles.append(p).append(div).append(btn);
    };

    // Book.prototype.addDelEvent = function() {
    //     var btn = $(".del_btn");
    //     var idStr = "id="+this.attr("data-id");
    //     btn.on("click", function(event) {
    //         $.ajax({
    //             url: "api/books.php",
    //             type: "DELETE",
    //             data: idStr,
    //             dataType: "json"
    //         }).done(function(response) {console.log("done")}
    //         ).fail(function () {
    //             console.log("fail")
    //         });
    //     })
    // };

    function showAllBooks() {
        $.ajax({
            url: "api/books.php",
            type: "GET",
            dataType: "json"
        }).done(function(response) {response.forEach(function(resp) {
            var book = new Book(resp[0], resp[1], resp[2]);
            book.add();
            // book.addDelEvents(resp[0]);
        })
        }).fail(function () {
            console.log("fail")
        });
    }

    function showOneBook(id) {
        var idStr = "id="+id;
        $.ajax({
            url: "api/books.php",
            type: "GET",
            data: idStr,
            dataType: "json"
        }).done(function(response) {
            response.forEach(function (resp) {
                var book = new Book(resp[0], resp[1], resp[2]);
                book.add();
                // book.addDelEvents(resp[0]);
            })
        }).fail(function () {
                console.log("fail")
            });
    };
    

});
