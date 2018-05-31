var appT = angular.module('2ledger-sample-client-manager');

appT.controller('login', login)

function login($scope, $http, $rootScope, $timeout, $filter, ngTableParams, $location, $anchorScroll) {

    var me = this;

    me.passwordClient = '';
    me.emailClient = '';
    me.showWaiting = false;

    $('.alert').css({'margin-top':'-300px'});
    $('.error').css({'margin-top':'-300px'});
    
    $('.boxClient').css({'margin-top':'-800px'});

    $scope.$on('hideScreen', function (){
        $('.screenManager').css({'opacity':0})
    })

    $scope.$on('showScreen', function (){
        $('.screenManager').css({'opacity':1})
    }) 
  
    me.showLoading = function (text) {
        me.loadingText = text;
        me.showWaiting = true;

        $('.loadingText').animate({ 'opacity': '0', 'margin-top': '40' }, 100, function () {
            $('.loadingText').animate({ 'opacity': '1', 'margin-top': '5' }, 100);
        });

    }

    me.IsEmail = function (email) {
        user = email.substring(0, email.indexOf("@"));
        dominio = email.substring(email.indexOf("@") + 1, email.length);

        if ((user.length >= 1) &&
            (dominio.length >= 3) &&
            (user.search("@") == -1) &&
            (dominio.search("@") == -1) &&
            (user.search(" ") == -1) &&
            (dominio.search(" ") == -1) &&
            (dominio.search(".") != -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            return true;
        }
        else {
            return false;
        }
    }

    me.verifyFields = function (){
        if(me.emailClient == '' || me.passwordClient == '')
            return true;
        else
            return false;
    }

    me.login = function () {
        if(!me.IsEmail(me.emailClient)){
            //return;
        }

        $('.inputEmailLogin').css({'border-color': '#FFFFFF'});

        me.showLoading('Logging in, Please wait');

        var rest = {
            method: 'POST',
            url: "login/loginClient",
            headers: { 'Content-Type': 'application/json' },
            data: {
                emailClient: me.emailClient,
                passwordClient: me.passwordClient
            }
        }

        $http(rest).then(function (e) {
            me.showWaiting = false;

            if(e.data.type == 'error')
                me.showAlert(e.data.message);
            else
                me.clientValidated(e.data)
            
        }, function (err) {
            me.showError(err.data.error_message);      
            me.showWaiting = false;
            console.log(err);
        });
    }    

    me.showClient = function(text){
        $('.boxClient').css({'margin-top':'-800px'});
        setTimeout(function (){
            $('.boxClient').animate({'margin-top':'3px'}, 300);
        }, 300)        
        
    }

    me.hideClient = function(text){
        $('.boxClient').animate({'margin-top':'-800px'}, 300);
    }

    me.showAlert = function(text){
        me.responseText = text;

        $('.alert').css({'margin-top':'-300px'});
        $('.alert').animate({'margin-top':'3px'}, 100);

        setTimeout(function (){
            me.hideAlert();
        }, 2000)
        
    }

    me.hideAlert = function(text){
        $('.alert').animate({'margin-top':'-300px'}, 100);
    }

    me.clientValidated = function (client){
        me.clientValid = client.data;
        me.showClient();
    }

    me.showError = function (text) {
        me.errorMessage = text;

        $('.error').animate({ 'margin-top': '3px' }, 100);

        me.timerErro = setTimeout(function () {
            me.hideError();
        }, 6000)

    }

    me.hideError = function (text) {
        clearTimeout(me.timerErro);

        $('.error').animate({ 'margin-top': '-300px' }, 100);
    }
    
    me.getToken = function () {
        var rest = {
            method: 'GET',
            url: "client/getToken/",
            headers: { 'Content-Type': 'application/json' },
        }

        $http(rest).then(function (e) {

        }, function (err) {
            me.showError(err.data.error_message);      
            me.showWaiting = false;            
            console.log(err);
        });
    }

    me.getToken();
}

