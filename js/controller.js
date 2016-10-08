(function(angular){
	function getId(){
		//随机不重复ID
		return Math.random();
	}
	var todoApp = angular.module('TodoApp');
	todoApp.controller('MainController',['$scope','$location','Storage',function($scope,$location,Storage){
		//初始化数据
		$scope.input = '';
		$scope.currentEditingId = 0;
		$scope.todos = Storage.get();
		//双击进入编辑状态行为
		$scope.edit = function(current){
			$scope.currentEditingId = current.id;

		};
		//回车进入没有编辑的状态
		$scope.save = function(){
			$scope.currentEditingId = 0;
			Storage.save();
		};
		//新增todo
		$scope.add = function(){
			if (!$scope.input) return;

			// $scope.todos.push({ id: getId(), text: $scope.input, completed: false });
			Storage.add($scope.input); // 添加到todos列表 并且存起来
			$scope.input = '';
		};
		//删除todo
		$scope.remove = function(current){
			Storage.remove(current)
		};

		//遍历todos查看有没有已经完成的
		$scope.hasCompleted = Storage.hasCompleted;
		//清空已完成的todo
		$scope.clearCompleted = function(){
			var temp = Storage.clearCompleted();
			$scope.todos = temp;
		};
		//标记全部完成
		$scope.checkedAll = false;
		$scope.allCompleted = function(){
			Storage.allCompleted($scope.checkedAll);
		};
		//筛选问题
		$scope.filterData = {};
		$scope.location = $location;
		$scope.$watch('location.url()',function(now,old){
			switch(now){
				case '/completed' :
					$scope.filterData = {completed : true};
					break;
				case '/active' :
					$scope.filterData = {completed : false};
					break;
				default :
					$scope.filterData = {};
					break;
			}
		})
	}]);
})(angular);
