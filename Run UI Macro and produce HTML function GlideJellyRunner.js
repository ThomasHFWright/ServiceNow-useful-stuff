fillRequestItemvariablesHTML: function(requestID){
            
            //this function returns an encoded query string which can be used to filter out all RITMs which are for certified software
            function generateNonCertifiedItemQuery(){

                  var queryString = '';  
                var mapGR = new GlideAggregate('u_movers_trf_tier_mappings');
                mapGR.groupBy('u_request_item');
                mapGR.addQuery('u_certified_item', true);
                mapGR.query();
                var counter = 0;
                while(mapGR.next()){
                          queryString += 'cat_item!=' + mapGR.u_request_item + '^';   
                }
                
                queryString = queryString.substring(0, queryString.length - 1);
                return queryString;
            }
                  
            //this function returns an encoded query string which can be used to get all RITMs which are for certified software
            function generateCertifiedItemQuery(){
         
                  var queryString = '';                 
                  var mapGR = new GlideAggregate('u_movers_trf_tier_mappings');
                  mapGR.groupBy('u_request_item');
                  mapGR.addQuery('u_certified_item', true);
                  mapGR.query();
                  while(mapGR.next()){
                        
                        queryString += 'cat_item=' + mapGR.u_request_item + '^OR';  
                  }
                  queryString = queryString.substring(0, queryString.length - 3);
                  return queryString;

           }
            
            //generate html for non-certified software items
            var reqI = new GlideRecord('sc_req_item');
            reqI.addQuery('request',requestID);
            reqI.addQuery(generateNonCertifiedItemQuery());
            reqI.orderBy('cat_item.name');
            reqI.query();

            generateHtml(reqI);

            //generate HTML for certified software items
            var reqICert = new GlideRecord('sc_req_item');
            reqICert.addQuery('request',requestID);
            reqICert.addQuery(generateCertifiedItemQuery());
            reqICert.orderBy('cat_item.name');
            reqICert.query();
            if(reqICert.hasNext()){
                  generateHtml(reqICert);
            }
            
            function generateHtml(GR){
                  var help_class = 'odd';
                  while(GR.next()){
                        var smart_description = GR.short_description;
                        smart_description = smart_description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
                        var sc_req_item = GR.sys_id; //sys_id of request item 
                        var string = '<g:call function="variable_summary_approval.xml" question_name="'+sc_req_item+'" question_help_tag="'+smart_description+'" sc_req_item="'+sc_req_item+'" help_class="'+help_class+'"/>'
                        var change = true;  ///it re-cert is completed before the approval is generated, therefor it will never be displayed n the list and shouldn't change the color in the list.
						if(GR.cat_item.name  == 'IT Re-Certification Review'){
							change = false;
							
						}
                        var jr = new GlideJellyRunner();
                        jr.setEscaping(true);
                        var m = jr.runFromScript(string);
                        // Two lines below added as part of Fuji upgrade fixes to get rid of $[SP] that was appearing in list of variables on sc_request approvals
                        m = ''+m;
                        m = m.replace(/\$\[SP\]/g,'');
                        GR.u_variable_html = m;
                        GR.update();
						  if(change){
                        if(help_class=='odd'){
                              help_class = 'even';
                        }
                        else{
                              help_class = 'odd';
                        }
						  }
                  }
            }
      },