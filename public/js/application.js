$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  console.log("JS is active...");
  bindListeners();
});

var bindListeners = function(){
  voteListener();
  deleteListener();
  createPostListener();
};

var voteListener = function(){
  $('article a.vote-button').click(function(e){
    e.preventDefault();
    console.log("Got vote button click.")
    var this_path = $(this).attr('href');
    upVote(this_path);
  });
};

var deleteListener = function(){
  $('article a.delete').click(function(e){
    e.preventDefault();
    var this_path = $(this).attr('href');
    console.log("Got delete button click. data: " + this_path);
    deletePost(this_path);
  });
};

var createPostListener = function(){
  $('#posts').submit(function(e){
    e.preventDefault();
    var form_data = $(this).serialize();
    console.log("form data: " + form_data);
    createPost(form_data);
  });
};

// This method is unnecessary if we use $(this).attr('href')
// var createPath = function (full_path){
//   var str = String(full_path);
//   var this_path = str.replace("http://localhost:9393", "");
//   return this_path;
// };

var createPost = function(form_data){
  $.ajax({
    method: "POST",
    url:'/posts',
    data: form_data,
  }).done(function(response){
    console.log("Return from ajax post call: " + response);
    $(".post-container").append(response);
  });
};

var deletePost = function(path){
  console.log("path: " + path);
  $.ajax({
    method: "DELETE",
    url: path,
    dataType: 'json'
  }).done(function(response){
    console.log("removing post #: " + response.post_number);
    $('#' + response.post_number).remove();
  });
};

var upVote = function(path){
  $.ajax({
    method: "GET",
    url: path,
    dataType: 'json'
  }).done(function(response){
    console.log("response: " + response.points + "  " + response.post_number);
    $('#' +response.post_number+ ' .points').html(response.points);
    $('#' +response.post_number+ ' .vote-button').css('color', 'red');
  });
};

