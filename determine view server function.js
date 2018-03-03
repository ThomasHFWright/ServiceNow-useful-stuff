//USAGE
//new script_include_name().determineView() != 'ess'
determineView : function() {
		var myView = '';
		if (gs.getSession().isInteractive()) {
			var map = gs.action.getGlideURI().getMap();
			if (map.get('sysparm_view') != null) {
				myView = map.get('sysparm_view').toString();
			}
		}
		return myView;
		
	},