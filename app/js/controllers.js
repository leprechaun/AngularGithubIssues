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

      if(issue.pull_request.diff_url == null){
        $scope.issues.push(issue);
      }
    }
  });
}

function IssuesSearch_TopProjectsCtrl($scope, $routeParams, Gallery){
  Gallery.repos.search( {q:"language:Python"}, function(repos_list) {
    var issues = [];
    for( var i in repos_list.items ){
      var repo = repos_list.items[i];
      if( repo.has_issues )
      {
        Gallery.repos.issues({owner: repo.owner.login, repo: repo.name}, function(repo_issues){
          for(var i in repo_issues){
            if( typeof(repo_issues[i]) != 'function' ){
              issues.push(repo_issues[i]);
            }
          }
        });
      }
    }
  });
}
