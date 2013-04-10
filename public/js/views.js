/*
|--------------------------------------------------------------------------
| Global App View
|--------------------------------------------------------------------------
*/
App.Views.App = Backbone.View.extend({
	initialize: function() {

		var addTaskView = new App.Views.AddTask({ collection: App.tasks });

		var allTasksView = new App.Views.Tasks({ collection: App.tasks }).render();

		$('.task-container').append(allTasksView.el);
	}
});


/*
|--------------------------------------------------------------------------
| Add Task View
|--------------------------------------------------------------------------
*/
App.Views.AddTask = Backbone.View.extend({
	el: '#addTask',

	initialize: function() {
		this.task_name = $('#name');
		this.task_status = 'in progress';
	},

	events: {
		'submit': 'addTask'
	},

	addTask: function(e) {
		e.preventDefault();
		this.collection.create({
			name: this.task_name.val(),
			status: this.task_status
		}, { wait: true });
		this.clearForm();
	},

	clearForm: function() {
		this.task_name.val('');
	}
});


/*
|--------------------------------------------------------------------------
| All Tasks View
|--------------------------------------------------------------------------
*/
App.Views.Tasks = Backbone.View.extend({



	initialize: function() {
		this.collection.on('sync', this.addOne, this);
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(task) {
		var taskView = new App.Views.Task({ model: task });
		this.$el.append(taskView.render().el);
	}
});

/*
|--------------------------------------------------------------------------
| Single Contact View
|--------------------------------------------------------------------------
*/
App.Views.Task = Backbone.View.extend({
	className: 'task',

	template: template('allTasksTemplate'),

	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.markCompleted, this);
	},

	events: {
		'click a.delete': 'deleteTask',
		'click a.complete': 'markTask'
	},

	markTask: function(e) {
		e.preventDefault();
		this.model.save({
			name: this.model.attributes.name,
			status: "completed"
		});
	},

	markCompleted: function() {
		this.$el.attr( 'class', 'completed' );
	},

	deleteTask: function(e) {
		e.preventDefault();
		this.model.destroy();
	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},

	unrender: function() {
		this.remove();
	}
});

