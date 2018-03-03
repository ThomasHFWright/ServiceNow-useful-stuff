//Script Include
//Name: getNextFriday
//Description: Returns a string of the Friday next week @ 23:59:59
//Client Callable: true
function getNextFriday(){
	//gs.log(gs.endOfNextWeek(),'getNextFriday');
	var gdt = new GlideDateTime(gs.endOfNextWeek());
	gdt.addDays(-2);
	//gs.log(gdt.toString(),'getNextFriday');
    return gdt;
}
