var topics =["Frozen", "Pinocchio", "Kim Possible", "The Lion King","Toy Story","A Wrinkle in Time","The incredibles", "Wreck-It Ralph","Beauty and the Beast","Coco","Pirates of the Caribbean","Finding Dory"];
    console.log(topics);

    var btn;

    function renderButtons() {
        $("#itemList").empty();

        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            // Adding a class
            btn.addClass("gifs-btn btn-info");
            // Adding a data-attribute with a value of the movie at index i
            btn.attr("data-name", topics[i]);
            // Providing the button's text with a value of the movie at index i
            btn.text(topics[i]);
            // Adding the button to the HTML
            
            $("#itemList").append(btn);
        }
    };
// add the text value to the array topics
    $("#add-gif").click(function(event) {
        event.preventDefault();
        var top= $("#gifs-input").val().trim();
        if (top == "") {
            alert("Put in a Disney movie name!")
        }
        else {
            topics.push(top);
            renderButtons();
            console.log(topics);
        }
    });

    console.log(topics);
    renderButtons();
  
$(document).on('click', '.gifs-btn', function() {

    var topic1 = $(this).attr("data-name");
    console.log(topic1);
    var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=N7Xczx6vHkDSSDlyQ0RM9F7hSbu47lVh&q=" + topic1 + "&limit=10&rating=g";
    console.log(giphyURL);
    $.ajax({url: giphyURL, method: 'GET'}).then(function(giphy) {
        var results = giphy.data;
        console.log(results);
        // Looping over every result item
        for (var t = 0; t < topic1.length; t++) {

        // Only taking action if the photo has an appropriate rating
        if (results[t].rating !== "r") {
            // Storing the result item's rating
            var rating = results[t].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<h5>").text("Rating: " + rating.toUpperCase());
            p.addClass("card-title")
            // Creating an image tag
            var card=$("<div>");
            var newGif= $("<img>");
            card.addClass("card")

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            newGif.attr("src", results[t].images.fixed_height_still.url);
            newGif.attr("still", results[t].images.fixed_height_still.url)
            newGif.attr("animated", results[t].images.fixed_height.url)
            newGif.addClass("gifimage card-img-top")



            // Appending the paragraph and personImage we created to the  div we created
            $("#gifs-view").prepend(card);
            card.prepend(p);
            card.prepend(newGif);

        }}
    });
});
// on click function to animate and still the gifs
$(document).on('click', 'img', function(event) {
    var animated = $(event.target).attr('animated')
    var still= $(event.target).attr('still')
    var current = $(event.target).attr('src')
    if (current === still) {
      $(event.target).attr('src', animated)
    } else {
      $(event.target).attr('src', still)
    }
});




