(function (angular) {
	'use strict';
	//创建模板
	var todoApp = angular.module('TodoApp',[]);
	//创建主程序控制器
	todoApp.controller('MainController',['$scope',function($scope){
		//初始化数据
		$scope.input = '';
		$scope.todos = [
			{id : 1 , text : 'HTML' , completed : true , editing : false},
			{id : 2 , text : 'CSS' , completed : true , editing : false},
			{id : 3 , text : 'JavaScript' , completed : false , editing : false}
		];
		//暴露editing行为
		$scope.edit = function(current){
			$scope.todos.forEach(todo => {
				todo.editing = false;
			});
			current.editing = true;
		}
	}])

})(angular);
