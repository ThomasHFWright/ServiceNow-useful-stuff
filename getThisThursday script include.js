//Script Include
//Name: getThisThursday
//Description: Returns a string of the Thursday This week @ 00:00:00
//Client Callable: true
function getThisThursday(){
	//gs.log(gs.beginningOfThisWeek(),'getThisThursday');
	var gdt = new GlideDateTime(gs.beginningOfThisWeek());
	gdt.addDays(3);
	//gs.log(gdt.toString(),'getThisThursday');
    return gdt;
}
