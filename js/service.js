(function(angular){
	var todoApp = angular.module('TodoApp');
	todoApp.service('Storage',['$window',function($window){
		var storage = $window.localStorage;

		function getId() {
			return Math.random();
		}

		var todos = JSON.parse(storage.getItem('my_todos') || '[]'); // x00001

		this.save = function() {
			storage.setItem('my_todos', JSON.stringify(todos));
		};

		this.get = function() {
			return todos;
		};

		this.add = function(input) {
			todos.push({ id: getId(), text: input, completed: false });
			this.save();
		};

		this.remove = function(current){
			todos.splice(todos.indexOf(current),1);
			this.save();
		};

		this.hasCompleted = function(){
			return $scope.todos.some(todo => todo.completed);
		};

		this.clearCompleted = function(){
			var unCompleted = [];
			todos.forEach(todo => {
				if(!todo.completed){
					unCompleted.push(todo);
				}
			});
			todos = unCompleted;
			return todos;
		};

		this.allCompleted = function(checked){
			todos.forEach(todo => {
				todo.completed = checked;
			})
		};
	}])
})(angular);
