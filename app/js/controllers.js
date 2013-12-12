'use strict';

/* EventDetail */
function IssuesSearchCtrl($scope, $routeParams, Gallery) {
  /* SET SOME DEFAULTS */
  Gallery.issues.search({q:"state:open", sort:"updated", order:"desc"}, function(search_results){
    $scope.issues = [];
    for( var i in search_results.items){
      var issue = search_results.items[i];
      issue.repo = issue.html_url.replace("https://github.com/", "");
      issue.repo = issue.repo.replace("/issues/" + issue.number, "");

      console.log(issue);


      if(issue.pull_request.diff_url == null){
        $scope.issues.push(issue);
      }
    }
  });
}
