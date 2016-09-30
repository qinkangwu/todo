(function (angular) {
	'use strict';
	function getId(){
		//随机不重复ID
		return Math.random();
	}
	//创建模板
	var todoApp = angular.module('TodoApp',[]);
	//创建主程序控制器
	todoApp.controller('MainController',['$scope',function($scope){
		//初始化数据
		$scope.input = '';
		$scope.currentEditingId = 0;
		$scope.todos = [
			{id : getId() , text : 'HTML' , completed : true},
			{id : getId() , text : 'CSS' , completed : true},
			{id : getId() , text : 'JavaScript' , completed : false}
		];
		//双击进入编辑状态行为
		$scope.edit = function(current){
			$scope.currentEditingId = current.id;

		};
		//回车进入没有编辑的状态
		$scope.save = function(){
			$scope.currentEditingId = 0;
		};
		//新增todo
		$scope.add = function(){
			if(!$scope.input){
				return false;
			}
			$scope.todos.push({
				id : getId(),
				text : $scope.input,
				completed : false
			});
			$scope.input = "";
		};
		//删除todo
		$scope.remove = function(current){
			$scope.todos.splice($scope.todos.indexOf(current),1);
		};

		//遍历todos查看有没有已经完成的
		$scope.hasCompleted = function(){
			return $scope.todos.some(todo => todo.completed);
		};
		//清空已完成的todo
		$scope.clearCompleted = function(){
			var unCompleted = [];
			$scope.todos.forEach(todo => {
				if(!todo.completed){
					unCompleted.push(todo);
				}
			});
			$scope.todos = unCompleted;
		};
		//标记全部完成
		$scope.checkedAll = false;
		$scope.allCompleted = function(){
			$scope.todos.forEach(todo => {
				todo.completed = $scope.checkedAll;
			})
		};
	}]);

})(angular);
