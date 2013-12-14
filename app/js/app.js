'use strict';

var tags = null;
var tags_hash = {};

/* App Module */
angular.module('gallery', ['galleryServices', 'ngRoute']).
    config(['$routeProvider', function($routeProvider){
        $routeProvider.

        when('/issues', {templateUrl: 'partials/issues.html',   controller: IssuesSearchCtrl}).
        when('/top_projects', {templateUrl: 'partials/issues.html',   controller: IssuesSearch_TopProjectsCtrl}).

        otherwise({redirectTo: '/issues'});
    }]);
