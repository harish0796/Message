var index = 1;
var username = location.pathname.split('/')[2];

var element  = $('body')[0];
$(window).scroll(function() {
    // var element = event.target;
    console.log(`${element.scrollHeight - element.scrollTop }     ${element.clientHeight}`);
    if (element.scrollHeight - element.scrollTop === element.clientHeight )
    {
      console.log('scrolled');
      // alert("bottom");
      getPostData();
      index++;
        
    }
});

// $("p").append("<b>Appended text</b>");

function appendPosts(response){
  var htmlcontent = ""
  var posts = response[0];
  var user = response[1];
  
  for(var i=0;i<posts.length;i++){
    var post = posts[i];
    var postcontent = ""
    //---------------------------


    postcontent = ` <div id="userprofile" class="" style="background-color:white;width:60%;margin:10 auto;;border: 1px solid #e1e4e8;padding:15px 15px 15px 15px;">    
    <div class="row" style="margin-bottom:15px">
      <div>
          <div class="image-cropper" style="margin:0 auto;height:40px;width:40px;margin-left:10px;margin-right:10px">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj5GtJ1ndkXb1l4QSGefsh4DRrW7VHFNNBZI6wqXrU8kDmJxex" class="rounded" />
          </div>
      </div>
        
      <div>
          <div style="font-weight: 600">${user.username}</div>
          <div style="font-size:10px"> ${post.createdAt.toLocaleString()}</div>
      </div>
        
    </div>
    
   
   <h4 style="margin-bottom:0px;margin-top:5px;font-weight: 550 !important">${post.title}</h4>
   <div> ${post.content} </div>
  </div>`


    //--------------------------
    htmlcontent += postcontent;
  }
  
  $("#userPostsList").append(htmlcontent);
}

function getPostData(){
  $.ajax({
    url: "/getUserPost",
    type: "get", //send it through get method
    data: { 
      index: index, 
      username: username, 
    },
    success: function(response) {
      //Do Something
      console.log(response);
      appendPosts(response);
    },
    error: function(xhr) {
      //Do Something to handle error
    }
  });
}

getPostData();
index++;


function follow(user_id){
  $.ajax({
    url: '/follow_request',
    type: 'post',
    data: {
      user_id: user_id,
    },
    success: function(response){
      console.log(response);
      
      if(response["success"]){
        alert("Success");
        location.reload();
      }
      else{
        alert("failed");
      }
    },
    error: function(xhr){

    }
  });
}


function unfollow(user_id){
  $.ajax({
    url: '/unfollow_request',
    type: 'post',
    data: {
      user_id: user_id,
    },
    success: function(response){
      console.log(response);

      if(response["success"]){
        alert("Success");
        location.reload();
      }
      else{
        alert("failed");
      }
      
    },
    error: function(xhr){

    }
  });
}