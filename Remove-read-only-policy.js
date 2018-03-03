var gr = new GlideRecord('sys_script_client');
gr.addEncodedQuery('sys_idIN119f2528c323210081d7dccdf3d3aee8');
gr.query();
while(gr.next()){
	gr.sys_policy = '';
	gr.update();
}