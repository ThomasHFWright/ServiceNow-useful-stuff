//Schedule a clone immediately, ignore 2hr time limit
var gr = new GlideRecord('clone_instance');
gr.initialize();
gr.target_instance = 'cc3ca22edb1e3ac4ceb6fd551d96192e'; //sysid of the target instance
gr.source_instance = 'f1fff5dc371120004f6a80f7bcbe5dca'; //sysid of the source (same table as target instance but source = true)
gr.exclude_large_data = true;
gr.filter_attachment_data = true;
gr.preserve_theme = true;
gr.email = 'youremail@mail.com';
gr.scheduled = gs.nowDateTime();
gr.state = "Requested";
gr.insert();