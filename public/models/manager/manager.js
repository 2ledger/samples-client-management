var appT = angular.module('2ledger-sample-client-manager');

appT.controller('manager', manager)

function manager($scope, $http, $rootScope, $timeout, $filter, ngTableParams, $location, $anchorScroll, jwt) {

    var me = this;

    me.clients = [];
    me.showEdit = false;
    me.showWaiting = true;
    me.showConfirmation = false;
    me.textForm = 'New Client';
    me.textConfirmation = 'Are you sure?';
    me.editMode = false;
    me.loadingText = '';
    me.responseText = 'Client registered successfully.';
    me.fieldQuery = '';

    $('.alert').css({'margin-top':'-300px'});
    $('.error').css({'margin-top':'-300px'});
    $('.invalidMail').css({'opacity': '0'});

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

    me.showEditMode = function () {
        $('.localFields').css({ 'margin-left': '50px' });
        $('.localFields').css({ 'opacity': '0' });

        $('.listPlace').animate({ 'opacity': '0' }, 100, function () {
            me.showEdit = true;

            $('.localFields').animate({ 'opacity': '1', 'margin-left': '10px' }, 100);

            $scope.$apply();
        });
    }

    me.hideEditMode = function () {
        $('.localFields').animate({ 'margin-left': '50px' }, 100);
        $('.localFields').animate({ 'opacity': '0' }, 100, function () {
            me.showEdit = false;
            $scope.$apply();

            $('.listPlace').animate({ 'opacity': '1' }, 100);
        });
    }

    me.onMouseDownImage = function () {
		$('.cmpUploadImage')[0].addEventListener('change', onImageChange, false);
		$('.cmpUploadImage')[0].click();
    }
    
    
	var onImageChange = function () {
		var files = $('.cmpUploadImage')[0].files[0];
		var img = document.createElement("img");
		img.addEventListener("load", function () {
			base64data = reduceImage(img);
            me.photoClient = base64data;
            $scope.$apply();
		});

		var reader = new window.FileReader();
		reader.readAsDataURL(files);
		reader.onload = function (e) {
			img.src = reader.result;
		}
	}

	var reduceImage = function (img) {
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);

		var MAX_WIDTH = 160;
		var MAX_HEIGHT = 160;
		var width = img.width;
		var height = img.height;

		if (width > height) {
			if (width > MAX_WIDTH) {
				height *= MAX_WIDTH / width;
				width = MAX_WIDTH;
			}
		} else {
			if (height > MAX_HEIGHT) {
				width *= MAX_HEIGHT / height;
				height = MAX_HEIGHT;
			}
		}
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");

		ctx.drawImage(img, 0, 0, width, height);

		return canvas.toDataURL("image/jpg");
	}

    me.showAlert = function(text){
        me.responseText = text;

        $('.alert').css({'margin-top':'-300px'});
        $('.alert').animate({'margin-top':'3px'}, 100);

        setTimeout(function (){
            me.hideAlert();
        }, 2000)
        
    }

    me.confirmConfirmation = function(){
        me.cancelConfirmation();
        me.confirmDeleteClient();
    }

    me.cancelConfirmation = function (){
        me.showConfirmation = false;
    }

    me.verifyFields = function (){
        if(me.emailClient == '' || me.nameClient == '' || me.passwordClient == '')
            return true;
        else
            return false;
    }

    me.hideAlert = function(text){
        $('.alert').animate({'margin-top':'-300px'}, 100);
    }

    me.addClient = function () {
        me.cleanFields();
        me.showEditMode();
        me.editMode = false;
    }

    me.cancelClient = function () {
        me.hideEditMode();
        me.cleanFields();
    }

    me.editClient = function (item) {
        $('.invalidMail').css({'opacity': '0'}); 
        $('.invalidMail').css({'padding-right': '0'}); 
        
        me.nameClient = item.value.nameClient;
        me.emailClient = item.value.emailClient;
        me.addressClient = item.value.addressClient;
        me.passwordClient = item.value.passwordClient;
        me.photoClient = item.value.photoClient;
        me.editMode = true;
        setTimeout(function () {
            me.showEditMode();

            me.textForm = 'Edit Client';
            $scope.$apply();
        }, 200);
    }

    me.confirmDeleteClient = function (){
        me.showLoading('Removing client, Please wait');

        me.clients = [];
        var rest = {
            method: 'DELETE',
            url: "client/deleteClient",
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: me.clientRemove.key,
                data: me.clientRemove.value
            }
        }

        $http(rest).then(function (e) {
            me.getAllClients();
            me.clientRemove = null;
            me.showAlert('Client registered successfully.');
        }, function (err) {
            me.showError(err.data.error_message);      
            me.showWaiting = false;

            console.log(err);
        });
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
    
    me.deleteClient = function (item) {
        me.showConfirmation = true;
        me.clientRemove = item;
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

    me.validateMail = function (){
        if(me.emailClient == ''){
            $('.inputEmailClient').css({'border-color': '#FFFFFF'});
            $('.invalidMail').animate({'opacity': '0', 'padding-right': '0px'});     
            return;
        }

        if(!me.IsEmail(me.emailClient)){
            $('.inputEmailClient').css({'border-color': '#f30000'});
            $('.invalidMail').css({'padding-right': '50px'}); 
            $('.invalidMail').animate({'opacity': '1', 'padding-right': '0px'});
            
        }else{
            $('.inputEmailClient').css({'border-color': '#FFFFFF'});
            $('.invalidMail').animate({'opacity': '0', 'padding-right': '0px'});     
        }

    }
    me.saveClient = function () {
        if(!me.IsEmail(me.emailClient)){
            return;
        }

        $('.inputEmailClient').css({'border-color': '#FFFFFF'});

        me.showLoading('Saving client, Please wait');

        me.clients = [];
        var rest = {
            method: 'POST',
            url: "client/saveClient",
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: me.emailClient,
                data: {
                    addressClient: me.addressClient,
                    nameClient: me.nameClient,
                    emailClient: me.emailClient,
                    passwordClient: me.passwordClient,
                    photoClient:me.photoClient
                }
            }
        }

        $http(rest).then(function (e) {
            me.cleanFields();
            me.getAllClients();
            me.hideEditMode();

            me.showAlert('Client successiful saved');

        }, function (err) {
            me.showError(err.data.error_message);      
            me.showWaiting = false;
            console.log(err);
        });
    }

    me.searchClient = function (){
        if(me.fieldQuery == ''){
            me.getAllClients();
            return;
        }

        me.showLoading('Searching clients, Please wait');

        me.clients = [];

        var rest = {
            method: 'GET',
            url: "client/searchClient/" + me.fieldQuery,
            headers: { 'Content-Type': 'application/json' },
        }

        $http(rest).then(function (e) {
            me.clients = e.data;

            me.showWaiting = false;
        }, function (err) {
            me.showError(err.data.error_message);      
            me.showWaiting = false;
            console.log(err);
        });
    }
    
    me.getAllClients = function () {
        me.showLoading('Loading clients, Please wait');

        me.clients = [];

        var rest = {
            method: 'GET',
            url: "client/getAllClients",
            headers: { 'Content-Type': 'application/json' },
        }

        $http(rest).then(function (e) {
            me.clients = e.data;

            me.showWaiting = false;
        }, function (err) {
            me.showError(err.data.error_message);      
            me.showWaiting = false;
            console.log(err);
        });
    }

    me.cleanFields = function () {
        $('.inputEmailClient').css({'border-color': '#FFFFFF'});
        $('.invalidMail').css({'opacity': '0'});
        
        me.nameClient = '';
        me.emailClient = '';
        me.addressClient = '';
        me.passwordClient = '';
        me.photoClient = '';
    }

    me.getToken = function () {
        var rest = {
            method: 'GET',
            url: "client/getToken/",
            headers: { 'Content-Type': 'application/json' },
        }

        $http(rest).then(function (e) {

            me.getAllClients();

        }, function (err) {
            me.showError(err.data.error_message);      
            me.showWaiting = false;            
            console.log(err);
        });
    }

    me.cleanFields();
    me.getToken();
}

