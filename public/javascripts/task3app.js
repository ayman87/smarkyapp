var app = angular.module('task3app', ['ngRoute']).run(function($rootScope,$http,$location){


    $rootScope.authenticated = false ;
    $rootScope.current_user = "";
    $rootScope.show=false;
    $rootScope.done=false;
    // localStorage.setItem("name",$rootScope.current_user);
    // localStorage.setItem("auth",$rootScope.authenticated);

    $rootScope.signout = function(){
        $http.get('/auth/signout');
        $rootScope.authenticated = false ;
        $rootScope.current_user = "";
        $rootScope.show=false;
        $rootScope.done=false;
        localStorage.setItem("name",$rootScope.current_user);
        localStorage.setItem("auth",$rootScope.authenticated);
        $location.path('/');
    };
    

});


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
    	templateUrl: 'serway.html',
    	controller: 'pageController'
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
      });
       // .otherwise({
       //  redirectTo: '/'

       // });
}]);

app.controller('mainController', function($scope,$http){
 
$scope.testData = {};
$scope.formData={};

 $http.get('/api/test')
        .success(function(data) {
            $rootScope.current_user = localStorage.getItem("name");
            $rootScope.authenticated = localStorage.getItem("auth");
            $scope.testData = data;
            console.log(data);

        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
});

// app.controller('detailsController', function($scope,$location,$routeParams){

// $scope.bookIsbn = $routeParams.bookIsbn;
//     $scope.navClass = function (page) {
//     var currentRoute = $location.path().substring(1) || 'home';
//     return page === currentRoute ? 'active' : '';
//   };
  
//   $scope.loadrfids = function () {
//         $location.url('/home/'+$scope.bookIsbn+'/details/pages');
//     };
    
//       $scope.loadAbout = function () {
//         $location.url('/about');
//     };
    
//       $scope.loadContact = function () {
//         $location.url('/contact');
//     };
 
// });
app.controller('discqandaController', function($scope,$http,$routeParams,$route,$rootScope, $location){
 
$scope.discqData = {};
$scope.discaData = {};
$scope.answer = {};
$scope.bookIsbn = $routeParams.bookIsbn;
$scope.pagenumber= $routeParams.pagenumber;
$scope.edition = $routeParams.edition;
$scope.idques=$routeParams.idques;
$rootScope.name=localStorage.getItem("name");
$scope.name= $rootScope.name;

$(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })

$scope.create = function(){
$http.post('api/testdqa/'+$scope.name+'/'+$scope.bookIsbn+'/'+$scope.edition+'/'+$scope.pagenumber+'/'+$scope.idques, $scope.answers)
    .success(function(data) {
        $scope.answer = data;
        $scope.answers = {};
        console.log(data);
        if(localStorage.getItem("auth") == 'false')
        {
            alert("You must login to view this page");
                $location.path('/');
        }else
        {
            $route.reload();
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
                        alert($scope.userid+' : asasa');
                        $scope.link = {};

                    console.log(data);
                    if(localStorage.getItem("auth") == 'false')
                    {
                        alert("You must login to view this page");
                            $location.path('/');
                    }
                    else{
                        $route.reload();
                    }
                })
                .error(function(error) {
                    console.log('Error: ' + data);
            });  
     };

});

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
                        $scope.summary = {};

                    console.log(data);
                    if(localStorage.getItem("auth") == 'false')
                    {
                        alert("You must login to view this page");
                            $location.path('/');
                    }
                    else{
                        $route.reload();
                    }
                })
                .error(function(error) {
                    console.log('Error: ' + data);
            });  
     };

});

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

                    console.log(data);
                    if(localStorage.getItem("auth") == 'false')
                    {
                        alert("You must login to view this page");
                            $location.path('/');
                    }
                    else{
                        $route.reload();
                    }
                })
                .error(function(error) {
                    console.log('Error: ' + data);
            });  
     };


});

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
        console.log(data);
        if(localStorage.getItem("auth") == 'false')
        {
            alert("You must login to view this page");
                $location.path('/');
        }else
        {
            $route.reload();
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
});


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



app.controller('authController', function($scope,$http,$rootScope,$location){
	$scope.user = {};
    $scope.user.email;
	$scope.userData={};
    $rootScope.name=localStorage.getItem("name");
    $scope.name= $rootScope.name;
	$scope.formData={};

   


   $scope.createUser = function(){

       $http.post('/auth/signup',$scope.user)
       .success(function(data){
        $rootScope.authenticated = true;
        $rootScope.done=true;
        $rootScope.successMessage="Successfully resgistered! ";
        $rootScope.current_user = data.user.name;
        localStorage.setItem("name",$rootScope.current_user);
        localStorage.setItem("auth",$rootScope.authenticated);
        $location.path($rootScope.current_user+'/home');
       });
};
	$scope.login = function(){
		$http.post('/auth/login',$scope.user)
            .success(function(data){
            if(data.user == null){
                $rootScope.show=true;
                $rootScope.errorMessage="Wrong email or password ! ";
            }
            else{
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.name; 
                localStorage.setItem("name",$rootScope.current_user);
                localStorage.setItem("auth",$rootScope.authenticated);
                $location.path($rootScope.current_user+'/home');
            }
           

        });
}

 $(document).ready(function() {
        App.init();
        console.log("APP UI: ", App);
    })
        
	});
    