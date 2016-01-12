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
};

var voteListener = function(){
  $('article a.vote-button').click(function(e){
    e.preventDefault();
    console.log("Got vote button click.")
    this_path = createPath(this);
    upVote(this_path);
  });
};

var deleteListener = function(){
  $('article a.delete').click(function(e){
    e.preventDefault();
    console.log("Got delete button click.");
    this_path = createPath(this);
    deletePost(this_path);
  });
};

var createPath = function (full_path){
  var str = String(full_path);
  var this_path = str.replace("http://localhost:9393", "");
  return this_path;
};

var deletePost = function(path){
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

