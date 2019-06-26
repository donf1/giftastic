$(document).ready(function () {

    var players = ["Michael Jordan", "Larry Bird", "Ben Simmons", "Kobe Bryant"];

    function createButton() {

        $("#button").empty();

        for (var i = 0; i < players.length; i++) {

            var choice = $("<button>")
            choice.addClass("character");
            choice.attr("data-name", players[i]);
            choice.text(players[i]);

            $("#button").append(choice);
        }

    }

    function showGifs() {
        $('#images').empty();
        var char = $(this).attr("data-name");
        var apiKey = "vGUtPeMJWT1o0VY6346eUbOLcv3hpStY";
        var fullUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + char + "&limit=4&offset=0&rating=G&lang=en";

        $.ajax({
            url: fullUrl,
            method: 'GET'
        }).done(function (response) {
            console.log(response.data);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class=characters>");
                var showChar = $("<img>");

                showChar.attr('src', results[i].images.fixed_height_small_still.url);
                showChar.attr("data-still", results[i].images.fixed_height_small_still.url);
                showChar.attr('data-animate', results[i].images.fixed_height_small.url);
                showChar.attr("data-state", "still");
                showChar.addClass('gif');
                gifDiv.append(showChar)

                var rating = results[i].rating;
                var gifRating = $("<p>").text("Rating: " + rating);
                gifDiv.append(gifRating)

                $("#images").prepend(gifDiv);

            }
        })

    }

    $(document).on('click', '.gif', function () {

        var state = $(this).attr('data-state');

        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');

        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    })

    $("#submitButton").on("click", function () {
        var char = $("#userinput").val().trim();
        players.push(char)
        form.reset();
        createButton()
        return false;
    })

    $(document).on("click", ".character", showGifs);
    createButton()

})