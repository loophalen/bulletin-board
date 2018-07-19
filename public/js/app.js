// Create our main angular app
const app = angular.module("BulletinApp", []);

// Define the main controller for our app
app.controller("MainController", ['$http', function($http){
  // A trick to make the index.html and app.js use the same variable
  const ctrl = this;
  // Everything else uses ctrl
  ctrl.pageHeading = "Welcome to the Bulletin Board!";
  ctrl.posts = []
  ctrl.newPost = {};
  ctrl.editingPostId = null;

  // A post wos selected to be edited
  ctrl.startEdit = (post_id) => {
    ctrl.editingPostId = post_id;
  }

  // A test to see if a post is being edited
  ctrl.isBeingEdited = (post_id) => {
    return (ctrl.editingPostId == post_id);
  }

  // Return the disabled button class if a post is being edited
  // Otherwise return the generig button class
  ctrl.getButtonClass = () => {
    return (ctrl.editingPostId==null ? 'button' : 'button disabled');
  }

  // Cancel an edit
  // Since we were editing the post object directly, we need to
  // reload the posts to get the original back
  ctrl.cancelEdit = () => {
    ctrl.getPosts();
  }

  // Get all of the posts and store them into the posts variable
  ctrl.getPosts = () => {
    $http({
      method: 'GET',
      url: '/posts'
    }).then((response)=>{
      ctrl.posts = response.data;
      // Make sure nothing is being edited
      ctrl.editingPostId = null;
    },(error)=>{
      console.log("HTTP error:", error);
    }).catch((err)=>{ console.log("Promise error:", err); });
  }

  //DELETE
  ctrl.deletePost = (post_id) => {
    console.log('/posts/' + post_id)
    $http({
      method:'DELETE',
      url: '/posts/' + post_id
    }).then((response) => {
      ctrl.getPosts();
      },
      (error) => {

      }
    )
  }

  //EDIT
  ctrl.editPost = (post) => {
    $http({
      method:'PUT',
      url:'/posts/' + post._id,
      data: {
        title: post.title,
        message: post.message
      }
  }).then(
    function(response){
      // Make sure nothing is being edited
      ctrl.editingPostId = null;
    },
    function(error){

    }
  )
}

  // Create a new post (assuming the UI successfully populated the object)
  ctrl.createPost = () => {
    $http({
      method: 'POST',
      url: '/posts',
      data: ctrl.newPost
    }).then((response)=>{
      ctrl.posts.push(response.data);
      ctrl.newPost = {};
    },(error)=>{
      console.log("HTTP error:", error);
    }).catch((err)=>{ console.log("Promise error:", err); });
  }

  // Get the documents on page load
  ctrl.getPosts();
}]);
