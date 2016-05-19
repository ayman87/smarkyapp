var app = angular.module('main', ['ngRoute']).run(function($rootScope,$http,$location){

//rootScope variables 
//authenticated for if the user is logged in or not
    $rootScope.authenticated = false ;
//current_user is the name for the cuurrent logged in user
    $rootScope.current_user = "";
//Error message for  wrong username or password   
    $rootScope.show=false;
//Sucess message for succesful sign up    
    $rootScope.done=false;
//signout function
    $rootScope.signout = function(){
        $http.get('/auth/signout');
        $rootScope.authenticated = false ;
        $rootScope.current_user = "";
        $rootScope.show=false;
        $rootScope.done=false;
        $rootScope.admin=false;
        localStorage.setItem("name",$rootScope.current_user);
        localStorage.setItem("auth",$rootScope.authenticated);
        $location.path('/');
    };
    

});

//routes configurations
 app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login.html',
        controller: 'authController'
      })
      .when('/:name/home', {
    	templateUrl: 'books.html',
    	controller: 'bookController'
      })
      .when('/:name/home/:bookIsbn/:edition/:pagenumber/details', {
        templateUrl: 'details.html'
      }) 
       .when('/:name/home/:bookIsbn/:edition/pages', {
    	templateUrl: 'rfids.html',
    	controller: 'pageController'
      })
       .when('/:name/aboutus', {
        templateUrl: 'about.html'
      })
       .when('/:name/home/:bookIsbn/:edition/:pagenumber/discussion/:idques', {
        templateUrl: 'discussion.html',
        controller: 'discqandaController'
      })
       .when('/home/:bookIsbn/details/:pagenumber/summaries', {
        templateUrl: 'summary.html',
        controller: 'summaryController'
      })
       .when('/signup', {
        templateUrl: 'signup.html',
        controller: 'authController'
      })
       .when('/login', {
        templateUrl: 'login.html',
        controller: 'authController'
      })
       .when('/home/:bookIsbn/:pagenumber/questions', {
    	templateUrl: 'qanda.html',
    	controller: 'questionController'
      })
       .when('/:name/home/:bookIsbn/:edition/:pagenumber/questions/:idques', {
    	templateUrl: 'questions.html',
    	controller: 'qandaController'
      })
        .otherwise({
        redirectTo: '/'

      });
}]);

 
//Discussion board controller 
app.controller('discqandaController', function($scope,$http,$routeParams,$route,$rootScope, $location){
 //Variable to store Discussion board questions
$scope.discqData = {};
//Variable to store Discussion board questions
$scope.discaData = {};
//Variable to store the answer text coming from textbox
$scope.answer = {};
//Store the value of book isbn from the route
$scope.bookIsbn = $routeParams.bookIsbn;
//Store the value of page number from the route
$scope.pagenumber= $routeParams.pagenumber;
//Store the value of edition from the route
$scope.edition = $routeParams.edition;
//Store the value of id of the question from the route
$scope.idques=$routeParams.idques;
//Store the value of username from the route
$rootScope.name=localStorage.getItem("name");
$scope.name= $rootScope.name;

$(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })
//Functions to post and  Dicussion board questions and answers
$scope.create = function(){
$http.post('api/testdqa/'+$scope.name+'/'+$scope.bookIsbn+'/'+$scope.edition+'/'+$scope.pagenumber+'/'+$scope.idques, $scope.answers)
    .success(function(data) {
        $scope.answer = data;
        $scope.answers = {};
        $scope.discaData=data;
        console.log(data);
        if(localStorage.getItem("auth") == 'false')
        {
            alert("You must login to view this page");
                $location.path('/');
        }
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });  
};

 $http.get('api/testdqa/'+$scope.bookIsbn+'/'+$scope.edition+'/'+$scope.pagenumber+'/'+$scope.idques)
        .success(function(data) {
            $rootScope.current_user = localStorage.getItem("name");
            $rootScope.authenticated = localStorage.getItem("auth");
            $scope.discqData = data;
            console.log(data);
            if(localStorage.getItem("auth") == 'false')
            {
                alert("You must login to view this page");
                $location.path('/');
            }
        })
        .error(function(error) {
            console.log('Error: ' + data);
        });

 $http.get('api/testda/'+$scope.bookIsbn+'/'+$scope.edition+'/'+$scope.pagenumber+'/'+$scope.idques)
        .success(function(data) {
            $rootScope.current_user = localStorage.getItem("name");
            $rootScope.authenticated = localStorage.getItem("auth");
            $scope.discaData = data;
            console.log(data);
            if(localStorage.getItem("auth") == 'false')
            {
                alert("You must login to view this page");
                $location.path('/');
            }
        })
        .error(function(error) {
            console.log('Error: ' + data);
        });


});
//Controller to get the questions for the Discussion board tab
app.controller('discController', function($scope,$http,$routeParams,$rootScope, $location){
 
$scope.discData = {};
$scope.bookIsbn = $routeParams.bookIsbn;
$scope.edition = $routeParams.edition;
$scope.pagenumber= $routeParams.pagenumber;

$(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })

 $http.get('api/testd/'+$scope.bookIsbn+'/'+$scope.edition+'/'+$scope.pagenumber)
        .success(function(data) {
            if(localStorage.getItem("auth") == 'false')
            {   
                alert("You must login to view this page");
                $location.path('/');
            }
            $rootScope.current_user = localStorage.getItem("name");
            $rootScope.authenticated = localStorage.getItem("auth");
            $scope.discData = data;
            console.log(data);
            
        })
        .error(function(error) {
            console.log('Error: ' + data);
        });

});
//Controller to get and post the link tab data
app.controller('linkController', function($scope,$http,$routeParams,$rootScope, $location,$route){
 
$scope.linkData = {};
$scope.bookIsbn = $routeParams.bookIsbn;
$scope.pagenumber= $routeParams.pagenumber;
$scope.edition = $routeParams.edition;
$rootScope.name=localStorage.getItem("name");
$scope.name= $rootScope.name;

$(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })

 $http.get('api/testl/'+$scope.bookIsbn+'/'+$scope.edition+'/'+$scope.pagenumber)
        .success(function(data) {
            if(localStorage.getItem("auth") == 'false')
            {   
                alert("You must login to view this page");
                $location.path('/');
            }
            $rootScope.current_user = localStorage.getItem("name");
            $rootScope.authenticated = localStorage.getItem("auth");
            $scope.linkData = data;
            console.log(data);
            
        })
        .error(function(error) {
            console.log('Error: ' + data);
        });


         $scope.create = function(){
            $http.post('api/testl/'+$scope.name+'/'+$scope.bookIsbn+'/'+$scope.edition+'/'+$scope.pagenumber, $scope.link , $scope.userid)
                .success(function(data) {
                    $rootScope.current_user = localStorage.getItem("name");
                    // $scope.answer = data;

                        $scope.userid = $rootScope.current_user;
                        $scope.link = {};
                        $scope.linkData=data;
                    console.log(data);
                    if(localStorage.getItem("auth") == 'false')
                    {
                        alert("You must login to view this page");
                            $location.path('/');
                    }
                })
                .error(function(error) {
                    console.log('Error: ' + data);
            });  
     };

});
//Controller to get and post the summary tab data
app.controller('summaryController', function($scope,$http,$routeParams,$rootScope, $location,$route){
 
$scope.summaryData = {};
$scope.bookIsbn = $routeParams.bookIsbn;
$scope.pagenumber= $routeParams.pagenumber;
$scope.edition = $routeParams.edition;
$rootScope.name=localStorage.getItem("name");
$scope.name= $rootScope.name;

$(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })


 $http.get('api/tests/'+$scope.bookIsbn+'/'+$scope.edition+'/'+$scope.pagenumber)
        .success(function(data) {
            if(localStorage.getItem("auth") == 'false')
            {   
                alert("You must login to view this page");
                $location.path('/');
            }
            $rootScope.current_user = localStorage.getItem("name");
            $rootScope.authenticated = localStorage.getItem("auth");
            $scope.summaryData = data;
            console.log(data);
            
        })
        .error(function(error) {
            console.log('Error: ' + data);
        });


         $scope.create = function(){
            $http.post('api/tests/'+$scope.name+'/'+$scope.bookIsbn+'/'+$scope.edition+'/'+$scope.pagenumber, $scope.summary , $scope.userid)
                .success(function(data) {
                    $rootScope.current_user = localStorage.getItem("name");
                    // $scope.answer = data;

                        $scope.userid = $rootScope.current_user;
                        $scope.summary = {}
                        $scope.summaryData = data;

                    console.log("SUMMARY DATA: ", data);
                    if(localStorage.getItem("auth") == 'false')
                    {
                        alert("You must login to view this page");
                            $location.path('/');
                    }
                })
                .error(function(error) {
                    console.log('Error: ' + data);
            });  
     };

});
//Controller to get and post textbook questions
app.controller('questionController', function($scope,$http,$routeParams,$rootScope, $location , $route){
 
$scope.questionData = {};
$scope.bookIsbn = $routeParams.bookIsbn;
$scope.pagenumber= $routeParams.pagenumber;
$scope.edition = $routeParams.edition; 

$(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })

 $http.get('api/testq/'+$scope.bookIsbn+'/'+$scope.pagenumber)
        .success(function(data) {
            if(localStorage.getItem("auth") == 'false')
            {   
                alert("You must login to view this page");
                $location.path('/');
            }
            $rootScope.current_user = localStorage.getItem("name");
            $rootScope.authenticated = localStorage.getItem("auth");
            $scope.questionData = data;
            console.log(data);
            
        })
        .error(function(error) {
            console.log('Error: ' + data);
        });

        $scope.createq = function(){
            $http.post('api/testq/'+$scope.name+'/'+$scope.bookIsbn+'/'+$scope.edition+'/'+$scope.pagenumber, $scope.admin_answer )
                .success(function(data) {
                        $scope.admin_answer = {};
                        $scope.questionData=data;
                    console.log(data);
                    if(localStorage.getItem("auth") == 'false')
                    {
                        alert("You must login to view this page");
                            $location.path('/');
                    }
                })
                .error(function(error) {
                    console.log('Error: ' + data);
            });  
     };


});
//Controller to update , post and get textbook questions
app.controller('qandaController', function($scope,$http,$routeParams,$route,$rootScope, $location){
 
$scope.qandaData = {};
$scope.answer = {};
$scope.bookIsbn = $routeParams.bookIsbn;
$scope.pagenumber= $routeParams.pagenumber;
$scope.idques=$routeParams.idques;

$(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })

$scope.update = function(){
$http.put('api/testqa/'+$scope.bookIsbn+'/'+$scope.pagenumber+'/'+$scope.idques, $scope.admin_answer)
    .success(function(data) {
        $scope.answer = data;
        $scope.admin_answer = {};
        $scope.qandaData = data;
        console.log(data);
        if(localStorage.getItem("auth") == 'false')
        {
            alert("You must login to view this page");
                $location.path('/');
        }
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });  
};

 $http.get('api/testqa/'+$scope.bookIsbn+'/'+$scope.pagenumber+'/'+$scope.idques)
        .success(function(data) {
            $rootScope.current_user = localStorage.getItem("name");
            $rootScope.authenticated = localStorage.getItem("auth");
            $scope.qandaData = data;
            console.log(data);
            if(localStorage.getItem("auth") == 'false')
            {
                alert("You must login to view this page");
                $location.path('/');
            }
        })
        .error(function(error) {
            console.log('Error: ' + data);
        });



});
//Controller to get and post rfid data 
app.controller('pageController', function($scope,$http,$routeParams,$rootScope, $location){
 
$scope.pageData = {};
$scope.bookIsbn = $routeParams.bookIsbn;
$scope.edition = $routeParams.edition;

$(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })

 $http.get('api/testp/'+$scope.bookIsbn+'/'+$scope.edition)
        .success(function(data) {
            $rootScope.current_user = localStorage.getItem("name");
            $rootScope.authenticated = localStorage.getItem("auth");
            $scope.pageData = data;
            console.log(data);
            if(localStorage.getItem("auth") == 'false')
            {
                alert("You must login to view this page");
                $location.path('/');
            }

        })
        .error(function(error) {
            console.log('Error: ' + error);
        });


    $scope.createp = function(){
    $http.post('api/testp/'+$scope.bookIsbn+'/'+$scope.edition, $scope.rfid)
    .success(function(data) {
        $scope.rfid={}
        $scope.pageData = data;
        console.log(data);
        if(localStorage.getItem("auth") == 'false')
        {
            alert("You must login to view this page");
                $location.path('/');
        }
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });  
};
});

//Controller to get and post Books data 
app.controller('bookController', function($scope,$http,$routeParams,$rootScope,$location){
 
$scope.bookData = {};
$rootScope.name=localStorage.getItem("name");
$scope.name= $rootScope.name;
$scope.bookIsbn = $routeParams.bookIsbn;

//alert($scope.bookIsbn);
// console.log($scope.bookIsbn);

    $(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })

 $http.get('api/testb')
        .success(function(data) {
            $rootScope.current_user = localStorage.getItem("name");
            $rootScope.authenticated = localStorage.getItem("auth");
            $scope.bookData = data;
            if(localStorage.getItem("auth") == 'false')
            {
                alert("You must login to view this page");
                $location.path('/');
            }
        })
        .error(function(error) {
            console.log('Error: ' + data);
        });
});


//Controller for login and signup process
app.controller('authController', function($scope,$http,$rootScope,$location){
	$scope.user = {};
    $scope.user.email;
	$scope.userData={};
    $rootScope.name=localStorage.getItem("name");
    $scope.name= $rootScope.name;
	$scope.formData={};

   

//This function create user in the database
   $scope.createUser = function(){

       $http.post('/auth/signup',$scope.user)
       .success(function(data){
        if(localStorage.getItem("auth") == 'false')
            {   
                alert("You must login to view this page");
                $location.path('/');
            }
            else{
//The authenticated flag is set to true because when a new user is created he is automaticlly logged in after it  
        $rootScope.authenticated = true;
        $rootScope.done=true;
        $rootScope.successMessage="Successfully resgistered! ";
        $rootScope.current_user = data.user.name;
        localStorage.setItem("name",$rootScope.current_user);
        localStorage.setItem("auth",$rootScope.authenticated);
        $location.path($rootScope.current_user+'/home');
    }
       });
};
//This function log in the user
	$scope.login = function(){
		$http.post('/auth/login',$scope.user)
            .success(function(data){
            if(data.user == null){
                $rootScope.show=true;
                $rootScope.errorMessage="Wrong email or password ! ";
            }
            //if the user is an admin set the admin flag to true and redirect to the home page
            else if ($scope.user.email == "admin@guc.com") {
                $rootScope.admin= true;
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.name; 
                localStorage.setItem("name",$rootScope.current_user);
                localStorage.setItem("auth",$rootScope.authenticated);
                $location.path($rootScope.current_user+'/home');
            }
            //else if the user is not an admin set the admin flag to false and redirect to the home page
            else{
                $rootScope.admin=false;
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.name; 
                localStorage.setItem("name",$rootScope.current_user);
                localStorage.setItem("auth",$rootScope.authenticated);
                $location.path($rootScope.current_user+'/home');
            }
           

        });
}
//This function to initalize the jquery
 $(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })
        
	});
    