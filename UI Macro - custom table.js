<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">

<g:evaluate var="jvar_orig" jelly="true" expression="
	var gr = new GlideRecord('question_answer');
	gr.addQuery('question', jelly.jvar_question_name.slice(-32));
	gr.addQuery('table_sys_id', RP.getParameterValue('sys_id'));
	gr.addNotNullQuery('value');
	gr.query();
	var orig = '';
	if (gr.next()) {
		orig = gr.getValue('value');
	}
	orig;
"/>


<g:evaluate var="jvar_shortid" jelly="true" expression="
	var shortid = jelly.jvar_question_name.substring(3);
	shortid;
"/>
<g:evaluate var="jvar_qid" jelly="true" expression="
	var shortid = jelly.jvar_question_name;
	shortid;
"/>


<input id="$[jvar_question_name]" type="hidden" name="$[jvar_question_name]" value="$[jvar_orig]" class="cat_item_option questionsettext"/>
<input id="sys_original.$[jvar_question_name]" type="hidden"  name="sys_original.$[jvar_question_name]" value="$[jvar_orig]"/>

<table id="toptable$[jvar_shortid]" class="wide" border="1">

	<tr class="header">
		<td class="column_head" colspan="4">
			Select data
		</td>
	</tr>
	<tr>
		<td class="label label_spacing">
			<center>REFERENCE FIELD</center>
		</td>
		<td class="label label_spacing">
			<center>CHOICE LIST</center>
		</td>
		<td class="label label_spacing">
			<center>FREE TEXT FIELD</center>
		</td>
		<td class="label label_spacing">
		</td>
	</tr>
	<tr>
		<td>
			<g:ui_reference table="sys_user" name="refid$[jvar_shortid]"/>
		</td>
		<td>
			<select id="select$[jvar_shortid]" style="width: 100%">
			   <option value="">-- None --</option>
			   <option value="1">One</option>
			   <option value="2">Two</option>
			   <option value="3">Three</option>
			 </select>
		</td>
		<td>
			<input maxlength="100" id="freetext$[jvar_shortid]" style="width: 100%" /> 
		</td>
		<td>
			<input type="button" onclick="addRow$[jvar_shortid]()" value="Add" style="width: 100px;" />
		</td>
	</tr>
</table>

<table class="wide" border="1" id="bottom$[jvar_shortid]">
	<tr class="header">
		<td class="column_head" colspan="4">
			Entered data
		</td>
	</tr>

	<tr>
		<td class="label label_spacing">
			<center>REFERENCE FIELD</center>
		</td>
		<td class="label label_spacing">
			<center>CHOICE LIST</center>
		</td>
		<td class="label label_spacing">
			<center>FREE TEXT FIELD</center>
		</td>
		<td class="label label_spacing">
		</td>
	</tr>
</table>

<script> 

function addRow$[jvar_shortid]() {

	var ref = $('sys_display.refid$[jvar_shortid]').value;
	var e = $('select$[jvar_shortid]');
	var sel = e.options[e.selectedIndex].text;
	var free = $('freetext$[jvar_shortid]').value;
	if (ref $[AND] sel $[AND] free) {
		var uniqueID = getUniqueID$[jvar_shortid]();
		alert(uniqueID);
		var html = '<tr class="dataRow$[jvar_shortid]" id="' + uniqueID + '">';
		html += '<td>' + ref + '</td>';
		html += '<td>' + sel + '</td>';
		html += '<td>' + free + '</td>';
		html += '<td><img src="/images/workflow_rejected.gif" onclick="deleteRow$[jvar_shortid](\'' + uniqueID + '\')"/></td>';
		html += '</tr>';
		$('bottom$[jvar_shortid]').insert( {
			bottom : html
		});
		$('sys_display.refid$[jvar_shortid]').value = '';
		$('freetext$[jvar_shortid]').value = '';
		$('select$[jvar_shortid]').value = '';
		populateJSON$[jvar_shortid]();	
	}
	else {
		alert('Not all values selected');
	}
}

function deleteRow$[jvar_shortid](id) {
	$(id).remove();
	populateJSON$[jvar_shortid]();
}
function populateJSON$[jvar_shortid]() {
	var totalArray = [];
	
		$$('.dataRow$[jvar_shortid]').each( function(e) {
		
				e.value = 'hi';
		});
	
	
	$$('.dataRow$[jvar_shortid]').each( function(e) {
		var rowArray = [];
		var i = 0;
		e.childElements().each( function(td) {
			i++;
			if (i != 4) {
				rowArray.push(td.innerHTML);
			}
		});
		totalArray.push(rowArray);
	});
	var answer = JSON.stringify(totalArray);
	if (totalArray.length == 0 ) {
		answer = '';
	}
	$('$[jvar_qid]').value = answer;
	variableOnChange('$[jvar_qid]');
	



}

function getUniqueID$[jvar_shortid]() {

	var uID = 'uid' + Math.ceil(Math.random() * 10000);
	while ($(uID)) {
		uID = 'uid' + Math.ceil(Math.random() * 10000);
	}
	return uID;
}

addLoadEvent( function() {

	var obj = '';
	if ('$[jvar_orig]') {
		obj = JSON.parse('$[jvar_orig]');

	}
	for (var i = 0; i != obj.length; i++) {

		var uniqueID = getUniqueID$[jvar_shortid]();
		var html = '<tr class="dataRow$[jvar_shortid]" id="' + uniqueID + '">';
		html += '<td>' + obj[i][0] + '</td>';
		html += '<td>' + obj[i][1] + '</td>';
		html += '<td>' + obj[i][2] + '</td>';
		html += '<td><img src="/images/workflow_rejected.gif" onclick="deleteRow$[jvar_shortid](\'' + uniqueID + '\')"/></td>';
		html += '</tr>';
		$('bottom$[jvar_shortid]').insert( {
			bottom : 	html
		});
	}
});


</script>


</j:jelly>
