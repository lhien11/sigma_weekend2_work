/*************************** GLOBAL SCOPE **********************************/
var usersArray = [];
var currentIndex = 0;
var count = 0;

/*************************** MAIN FUNCTION **********************************/
$(document).ready(function(){

  init();
  getUserPicture();
  //updateUser(usersArray[3]);
  //displayItems(usersArray);
  //updateUser(usersArray[count]) = setInterval(timer, 500);
  //updateUser(usersArray[2]);
  count = usersArray.length-1;
  var counterIncrement = -1;
  var counter = setInterval(timer, 5000);


  function timer(){
    count = count + counterIncrement;
    if(count == 0 || count == usersArray.length-1){
      counterIncrement = -counterIncrement;
    }
    updateUser(usersArray[count]);
  }



});



/*************************** HELPER FUNCTION **********************************/
function init(){
  $.ajax({
      type: 'GET',
      url: '/data',
      async: false,
      success: function(data){
          usersArray = data.sigmanauts;
      },
      error: function(xhr){
        console.log('request failed');
      }
  })
}

function displayItems(itemArray){
  $.each(itemArray, function(i, person){
    //console.log("index number: ", i);
    $("#user-container").append('<div class="person"></div>');
    var $el = $("#user-container").children().last();
    $el.append('<h2>' + person.name + '</h2>');
    $el.append('<p>' + person.git_username + '</p>');
    $el.append('<p>' + person.shoutout + '</p>');
    $el.append('<img src="' + person.avatar + '" />');
  })
}


function updateUser(person){
    $('#user-container').fadeOut(function(){
        $('#user-name').text(person.name);
        $('#github-username').html(
            'GitHub: <a href="http://github.com/' + person.git_username + '">' + person.git_username + '</a>'
        );
        $('#avatar').attr('src', person.avatar);
        $('#shoutout').html('"' + person.shoutout + '"');
        $('#user-container').fadeIn();
    });
}

function getUserPicture(){
    for (var i = 0; i < usersArray.length; i++) {
        $.ajax({
            type: 'GET',
            async: false,
            url: 'https://api.github.com/users/' + usersArray[i].git_username,
            success: function(data){
                usersArray[i].avatar = data.avatar_url;
            },
            error: function(){
              console.log("no image available");
            }
        });
    }
}
