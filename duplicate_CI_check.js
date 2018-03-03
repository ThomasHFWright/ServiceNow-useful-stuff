var ga = new GlideAggregate('cmdb_ci_hardware');
ga.addAggregate('COUNT','serial_number');
ga.groupBy('serial_number');
ga.addHaving('COUNT','>',1);
ga.query();

while(ga.next()){
	gs.print(ga.serial_number+' '+ga.getAggregate('COUNT','serial_number'));
}