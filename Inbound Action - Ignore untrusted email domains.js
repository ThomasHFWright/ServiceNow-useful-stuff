var gr = new GlideRecord("sys_email");
gr.addQuery("type",'received');
gr.addQuery("sys_created_on", ">", gs.hoursAgo(24));
gr.addQuery('uid',email.uid);
gr.orderByDesc("sys_updated_on");	
gr.setLimit(1);
gr.query();

if(gr.next()){
	//We allow the email if the user exists in the system, regardless of their domain
	if(!gr.user_id){
		//If the from address is not on the trusted list of domains, cancel all evaluation of this email
		var domain = gr.user.split('@')[1].toLowerCase();
		var trusted_domains = gs.getProperty('glide.pop3.trusted_domain').toLowerCase(); //This is a new system property created. Comma separated list of domains eg gmail.com, innovise.com
		if(trusted_domains && trusted_domains.indexOf(domain) < 0){
			gs.log("Email evaluation cancelled as "+domain+" is not in the list of trusted domains contained within glide.pop3.trusted_domain");
			event.state="stop_processing";
		}
	}
}