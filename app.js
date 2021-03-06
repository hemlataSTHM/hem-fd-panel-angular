var app = angular.module('adminHemlata',['ngRoute']);
var global = {
    // url:'http://0.0.0.0:5000'
    url:'https://hemalata.herokuapp.com'
};

app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
        templateUrl:'./html_components/login.html',
        controller:'loginController',
        title:'Login Admin',
    })
    .when('/yjg',{
        controller:'defaultController',
    })
    .when('/dashboard', {
        templateUrl:'./html_components/home.html',
        controller:'homeController',
        title:'Home | dashboard'
    })
    .when('/patients', {
        templateUrl:'./html_components/patients.html',
        controller:'patientsController',
        title:'Patients'
    })
    .when('/patients/view', {
        templateUrl:'./html_components/patientsView.html',
        controller:'patientsController',
        title:'View More - Patients'  
    })
    .when('/volunteers', {
        templateUrl:'./html_components/volunteer.html',
        controller:'volunteerController',
        title:'Volunteers'
    })
    .when('/volunteers/view', {
        templateUrl:'./html_components/volunteerView.html',
        controller:'volunteerController',
        title:'View More - Volunteers'  
    })
})
app.controller('defaultController', function($location){
    $location.path('/login');
})
app.controller('loginController', function($scope, $rootScope, $route, $routeParams, $location){
    $scope.name='this';
    $rootScope.showHeader = false;
    $scope.checkLogin = function(){
        console.warn($scope.username+' is the $scope')
        console.warn('pass is '+$scope.password)
        if($scope.password==='123')
         {
            $scope.wrongPass='';
             $location.path('/dashboard');
             $rootScope.showHeader = true;
        }
        else
            $scope.wrongPass='Wrong password entered';
    }
})
app.controller('homeController', function($scope, $location,$rootScope){
    $scope.check = 'harkishen';
    $rootScope.showHeader = true;
})
app.controller('patientsController', function($scope,$location,$http) {

    $scope.patientsinit = function() {
        console.warn('patientsinit called')
        $http({
            url:global.url + '/getPatients',
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            })
            .then(res=>{
                res = res.data;
                if(res['Success']=='Y'){
                    console.warn(res['value'][0]);
                    $scope.patients = res.value;
                }
                    
                else
                    console.error('some err while receiving patients info from server')
            })
    }
    $scope.patientViewMore = function(){
        console.warn('patients viewmore called')
        $http({
            url:global.url + '/patientsViewMore',
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'adhaar='+$location.search().adhaar+'&disease='+$location.search().disease
        })
        .then(res => {
            res = res.data;
            console.warn(res['value']);
            if(res.Success == 'Y'){
                $scope.disease = res['value']['disease']
                $scope.timeclient = res['value']['timeclient']
                $scope.day = res['value']['dayclient']
                $scope.gender = res['value']['gender']
                $scope.fname = res['value']['firstname']
                $scope.lname = res['value']['lastname']
                $scope.fathername = res['value']['fathername']
                $scope.mothername = res['value']['mothername']
                $scope.mobile = res['value']['mobile']
                $scope.dob = res['value']['dob']
                $scope.address = res['value']['address']
                $scope.aadhaar = res['value']['aadhaar']
                // $scope.disease = res['value']['disease']
            }
            else
                console.error('some err while patients view more info from server')
        })
    }
    
})
app.controller('volunteerController', function($http,$scope,$location) {
    $scope.volunteersinit = function() {
        console.warn('volunteerinit called')
        $http({
            url:global.url + '/getVolunteers',
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            })
            .then(res=>{
                res = res.data;
                if(res['Success']=='Y'){
                    console.warn(res['value'][0]);
                    $scope.vol = res.value;
                }
                    
                else
                    console.error('some err while receiving patients info from server')
            })
    }
    $scope.volunteerViewMore = function() {
        console.warn('volunteerViewMore called')
        $http({
            url:global.url + '/volunteersViewMore',
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'adhaar='+$location.search().adhaar
        })
        .then(res => {
            res = res.data;
            console.warn(res['value']);
            if(res.Success == 'Y'){
                $scope.timeclient = res['value']['timeclient']
                $scope.day = res['value']['dayclient']
                $scope.gender = res['value']['gender']
                $scope.fname = res['value']['firstname']
                $scope.lname = res['value']['lastname']
                $scope.mobile = res['value']['mobile']
                $scope.dob = res['value']['dob']
                $scope.address = res['value']['address']
                $scope.aadhaar = res['value']['aadhaar']
                $scope.edu = res['value']['educationalqualifications']
            }
            else
                console.error('some err while patients view more info from server')
        })
    }
})