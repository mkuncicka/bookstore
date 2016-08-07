$(function() {
    var titles = $("div#titles");
    var allBooks = $("#all_books");
    var oneBook = $("#one_book");
    var submit = $("#submit");
    var clear = $("#clear");
    var select = $("#select_titles");
    var home = $("#home");
    var allInputs = $("input");
    var textarea = $("textarea");

    //clicking on the book in the corner clears the titles
    home.on("click", function() {
        titles.children().remove();
        allInputs.val("");
        $("select").val("0");
    });

    //shows one book by select
    select.on("change", function() {
        var id = $("select").val();
        titles.children().remove();
        showOneBook(id);
    });

    //shows all books
    allBooks.on("click", function(event) {
        titles.children().remove();
        event.preventDefault();
        showAllBooks();
    });

    //shows one book by id typed by user (after pressing the button)
    oneBook.on("click", function(event) {
        var id = $("#id").val();
        titles.children().remove();
        event.preventDefault();
        showOneBook(id);
    });

    //clears titles list after pressing the button
    clear.on("click", function() {
        titles.children().remove();
        });

    //creating a book in database after pressing the button (submit)
    submit.on("click", function() {
        var title = "name="+$("#title").val();
        var author = "author="+$("#author").val();
        var description = "description="+$("#description").val();
        var data = title+"&"+author+"&"+description;
        $.ajax({
            url: "api/books.php?" + data,
            type: "POST",
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

    Book = function(title, author, description, id) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.id = id;
    };

    Book.prototype.add = function() {
        var emptyDiv = "<div class='book' data-id='"+this.id+"'></div>";
        var p = "<p class='book_title' data-id='"+this.id+"'>" + this.title + " - " + this.author + "</p>";
        var div = "<div class='info'>" + this.description + "</div>";
        var btn = "<button type='submit' class='del_btn' data-id='" + this.id + "'>delete</button>";
        titles.append(emptyDiv);
        titles.find("[data-id="+this.id+"]").first().append(p);
        titles.find("[data-id="+this.id+"]").first().append(btn);
        //find("[data-id="+this.id+"]")
        titles.find("[data-id="+this.id+"]").first().append(div);
    };

    Book.prototype.addDelEvents = function() {
        var btn = $(".del_btn");
        btn.on("click", function() {
            var idStr = "id="+$(this).data("id");
            $.ajax({
                url: "api/books.php?" + idStr,
                type: "DELETE",
                dataType: "json"
            }).done(function() {
                titles.children().remove();
                showAllBooks();
            }
            ).fail(function () {
                console.log("fail")
            });
        })
    };

    //function is loading all books from database, creates Book object instance
    //  it's adding del button to every book and adds event on this button
    //  finaly function is adding event that hides/shows the discription of the book
    function showAllBooks() {
        $.ajax({
            url: "api/books.php",
            type: "GET",
            dataType: "json"
        }).done(function(response) {response.forEach(function(resp) {
            var book = new Book(resp[0], resp[1], resp[2], resp[3]);
            book.add();
            book.addDelEvents();
            addTitleEvents();
        })
        }).fail(function () {
            console.log("fail")
        });
    }

    //function similar to showAllBooks - with the diference that it shows one book by given id
    function showOneBook(id) {
        var idStr = "id="+id;
        $.ajax({
            url: "api/books.php?" + idStr,
            type: "GET",
            dataType: "json"
        }).done(function(response) {
            response.forEach(function (resp) {
                var book = new Book(resp[0], resp[1], resp[2], resp[3]);
                if (resp[0] != null) {
                    book.add();
                    book.addDelEvents();
                    addTitleEvents();
                } else {
                    titles.append("<p>Brak książki o podanym id</p>");
                }

            })
        }).fail(function () {
                console.log("fail")
            });
    };

    function addTitleEvents() {
        var bookTitle = $(".book_title");
        bookTitle.on("click", function(event) {
            event.stopImmediatePropagation();
            var info = $(this).next().next();
            if ($(this).next().next().css('display') == 'none') {
                info.show();
            } else {
                info.hide();
            }
        })
    }
});
