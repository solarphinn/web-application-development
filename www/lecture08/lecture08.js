
// keeps track of page views
var init_display = function() {
    // key used to track the number of times the page has been viewed
    var local_key = "local.lecture08.page.views";

    // if the key already exists...
    if (localStorage[local_key] !== undefined) {
        // get the old value out of storage
        var old_views_value = localStorage[local_key];
        // log it
        console.log("page views exists: " + old_views_value);
        // all storage values are strings, so it needs to be converted
        // to an int, incremented, and stored again
        var new_views = parseInt(old_views_value);
        localStorage[local_key] = (new_views + 1);
    }
    // if the key does not exist...
    else {
        // log that the page views value is being set to 1
        console.log("page views does not exist; setting to 1");
        localStorage.setItem(local_key, 1);
    }

    // display a message to the user
    var page_views = parseInt(localStorage.getItem(local_key));
    if (page_views == 1) {
        $('#views').html("It's your first time here!");
    }
    else {
        $('#views').html("You have visited " + page_views + " times!");
    }
};

// displays the contents of the storage parameter to the user by updating
// the jQuery object parameter
var display_storage = function(storage, jqo) {
   console.log("called");

    // create an unordered list
    var html = "<ul>";
    // .length is used to count the keys in storage
    for(var i=0; i<storage.length; i++) {
        // get the next key
        var k = storage.key(i);
        // get the corresponding value
        var v = storage[k];
        // add it as a list item to the html string
        html += "<li>" + k + " : " + v + "</li>";
    }
    // end the list
    html += "</ul>";
    // update the jQuery object
    jqo.html(html);
} ;

// displays the contents of local storage to the user
var display_local_storage = function() {
    // calls the generic function with the localStorage object and
    // the local_contents jQuery object
    display_storage(localStorage, $('#local_contents'));
} ;

var display_session_storage = function() {
    // calls the generic function with the sessionStorage object and
    // the session_contents jQuery object
    display_storage(sessionStorage, $('#session_contents'));
};

// clears all of the storage
var clear_all = function() {
    // clear local storage
    localStorage.clear();
    // clear session storage
    sessionStorage.clear();
    // reinitialize the display
    init_display();
    // display the local storage (will contain page views reset to 1)
    display_local_storage();
    // display the now empty session storage
    display_session_storage();

};

// function called by jQuery when the page is finished loading
$(document).ready(function() {
    // initialize the display (show page views)
    init_display();

    // function to handle  presses for local storage button
    $('#local_button').click(function(event) {
        // get the key and value that the user typed in
        var k = $('#key').val();
        var v = $('#value').val();
        // log them
        console.log('local key:value = ' + k + ':' + v);

        // store in local storage
        localStorage[k] = v;

        // update the local storage display
        display_local_storage();
    });

    // function to handle presses for session storage button
    $('#session_button').click(function() {
        // get the key and value that the user typed in
        var k = $('#key').val();
        var v = $('#value').val();
        // log them
        console.log('session key:value = ' + k + ':' + v);

        // store in session storage
        sessionStorage[k] = v;

        // update the session storage display
        display_session_storage();
    });

    // function to handle presses for the clear all button
    $('#clear_button').click(function(event) {
        // clears all storage and resets display
        clear_all();
    });

    // display the current contents of local storage
    display_local_storage();
    // display the current contents of session storage
    display_session_storage();
});
