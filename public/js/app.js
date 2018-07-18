// Create our main angular app
const app = angular.module("BulletinApp", []);

// Define the main controller for our app
app.controller("MainController", ['$http', function($http){
  this.pageHeading = "Welcome to the Bulletin Board!";
}]);
