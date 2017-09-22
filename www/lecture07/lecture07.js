/**
 * Created by robertstjacquesjr on 9/21/17.
 *
 * Lecture 07 JavaScript/jQuery/Ajax demo
 */

$(document).ready(function() {
    console.log("Lecture 07 script loaded...");

    // when the button with the id 'fetch_sushi' is clicked...
    $('#fetch_sushi').click(get_status);
    $('#customer_name').keypress(function(event) {
        var key = event.which;
        if(key == 13) { // enter key event
            //get_status();
            get_status_simple();
        }
    });
});

// function to execute upon a successful request
var status_returned = function( data ) {
    console.log("success!");
    // update all of the
    $('#error').empty(); // clear any errors
    $('#name').html('Name: ' + data.name);
    $('#fries').html('Fries: ' + data.fries);
    $('#rolls').html('Rolls: ' + data.rolls);
    $('#phone').html('Phone Number: ' + data.phone);
    $('#credit_card').html('Credit Card Number: ' + data.credit_card);
};

var get_status = function() {
    // get the value typed into the input field with the id 'customer_name'
    var $name = $('#customer_name').val();
    console.log("name: " + $name);

    // .ajax is the core Ajax function supported by jQuery and requires the
    //     following parameters:
    //  url: the URL of the resource to send the request to
    //  data: the data to send along with the request; encoded as a query
    //     string for GET
    //  dataType: the expected format of the data coming back in the response
    //  success: a function to execute if the request is successful
    //  error: a function to execute if the request fails for any reason
    $.ajax({
        // lecture 8 script to query the pizza database
        url: '../cgi-bin/lecture07-get-sushi-orders.py',

        data: {                       // the data to send
            customer_name: $name
        },

        type: "GET",                  // GET or POST

        dataType: "json",             // json format

        success: function( data ) {   // function to execute upon a successful
                                      // request
            console.log("success!");
            console.log(data);
            $('#error').empty();
            $('#name').html('Name: ' + data.name);
            $('#fries').html('Fries: ' + data.fries);
            $('#rolls').html('Rolls: ' + data.rolls);
            $('#phone').html('Phone Number: ' + data.phone);
            $('#credit_card').html('Credit Card Number: ' + data.credit_card);
        },

        error: function(request) {   // function to call when the request fails
            console.log("error!");
            console.log(request);
            $('.order_data').empty();
            $('#error').html(
                "<p>There has been an error fetching the order for " + $name +
                ", are you sure that this person has an outstanding " +
                "order?</p>");
        }
    });
};

var handle_error = function(request) {
    console.log("error!");
        console.log(request);
        $('.order_data').empty();
        $('#error').html(
            "<p>There has been an error fetching the order for " + $name +
            ", are you sure that this person has an outstanding order?</p>");
    };

var get_status_simple = function() {
    var $name = $('#customer_name').val();
    $.getJSON(
        "../cgi-bin/lecture07-get-sushi-orders.py",
        { customer_name: $name },
        status_returned).fail(handle_error);
};