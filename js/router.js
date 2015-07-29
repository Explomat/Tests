﻿
function Router() {
    var routes = [{hash:'#settings', controller:'StructureController'},
                {hash:'#setting', controller:'StructureController'},
                {hash:'#settin', controller:'QuestionController'}];
    var defaultRoute = '#settings';
    var currentHash = '';
    var callBack;
    
    //callBack - function called each time when hash changed and controller is loaded
    this.startRouting = function(_callBack){
        callBack = _callBack;
        window.location.hash = window.location.hash || defaultRoute;
        setInterval(hashCheck, 100);
    }
    
    function hashCheck(){
        if (window.location.hash != currentHash){
            for (var i = 0, currentRoute; currentRoute = routes[i++];){
                if (window.location.hash == currentRoute.hash)
                    loadController(currentRoute.controller, callBack);
            }
            currentHash = window.location.hash;
        }
    }
    
    function loadController(controllerName, callBack){
        if (callBack) callBack();
        if (controllerName == 'QuestionController'){
            require('./controllers/QuestionController').start();
        }
        else if (controllerName == 'StructureController'){
            require('./controllers/StructureController').start();
        }

        /*require(['controllers/' + controllerName], function(controller){
            if (callBack) callBack();
                controller.start();
        });*/
    }
}

module.exports = new Router();
    