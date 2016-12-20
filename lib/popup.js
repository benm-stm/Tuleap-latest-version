tuleap_repo = "https://raw.githubusercontent.com/Enalean/tuleap/master/";
element_counter = localStorage["element_counter"];
tuleap_plugins = read_plugins_from_storage(element_counter);

var show_result = 0;

$(document).ready(function() {
	
	load_version('Tuleap', tuleap_repo + 'VERSION', "tuleap_version_content");
	
    for(var i= 0; i < tuleap_plugins.length; i++)
	{
		load_version(tuleap_plugins[i], tuleap_repo + 'plugins/'+ tuleap_plugins[i] +'/VERSION', "tuleap_plugins_version_content");
	}
});

function load_version(package_name, theURL, recipient_div)
{
	$.ajax({
		url: theURL,
		context: document.body,
		success: function(data, text) {
		show_result++;
		$("#"+recipient_div).append("<br/><b>" +package_name + "</b> : " + data +"<br/>");
		if (show_result == tuleap_plugins.length) {
			$("#loading").html('<img src="img/tuleap_min.png" alt="Tuleap" />').fadeIn();
			$('#tuleap_version_container').fadeIn();
		}
		},
		error: function(request, status, error) {
		show_result++;
		$("#"+recipient_div).append("<br/><b>" +package_name + "</b> : " + error +"<br/>");
		if (show_result == tuleap_plugins.length) {
			$("#loading").html('<img src="img/tuleap_min.png" alt="Tuleap" />').fadeIn();
			$('#tuleap_version_container').fadeIn();
		}
		}
	});
}

function read_plugins_from_storage(element_counter) {
	var tuleap_plugins = [];
	for (i = 1; i <= element_counter; i++) {
		tuleap_plugins.push(localStorage["plugin_"+i]);
	}
	return tuleap_plugins;
}