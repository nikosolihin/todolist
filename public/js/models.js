App.Models.Task = Backbone.Model.extend({

	idAttribute: '_id',

	validate: function(attrs) {
		if ( ! attrs.name ) {
			return 'A task name is required.';
		}
	}
});