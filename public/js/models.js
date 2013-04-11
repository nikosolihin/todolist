App.Models.Task = Backbone.Model.extend({

	idAttribute: '_id',

	validate: function(attrs) {
		if ( ! attrs.name ) {
			alert ('Cannot submit an empty task');
			return 'Cannot submit an empty task';
		}
	}
});