tuleap_plugins = ["IM", "admindelegation", "admssw", 
				  "agiledashboard", "archivedeleteditems", "boomerang",
				  "cardwall", "doaprdf", "docman",
				  "foafprofiles", "forumml", "fulltextsearch",
				  "fusionforge_compat", "git", "graphontrackers",
				  "graphontrackersv5", "hudson", "ldap",
				  "mediawiki", "openidconnectclient", "phpwiki",
				  "pluginsadministration", "proftpd", "projectlinks",
				  "pullrequest", "statistics", "svn",
				  "template", "tests", "tracker",
				  "tracker_date_reminder", "userlog", "webdav"
				  ];
// Saves options to localStorage.
function save_options() {
    try {
	   console.log(element_counter);
		for (i = 1; i <= element_counter; i++) {
			console.log("ba333 "+element_counter);
			element = "plugin_"+i;
			localStorage[element] = document.getElementById(element).value.replace(/\/*$/, '');
		}
		localStorage["element_counter"] = element_counter;
        chrome.runtime.reload();
    } catch (e) {
		console.log("error");
    }
}
 
// Restores select box state to saved value from localStorage.
function restore_options(element) {
    document.getElementById(element).value = localStorage[element];
}

// append a new field
function append_field(parent_name, element_name, element_value) {   
    var element = document.createElement("input");
    element.id = element_name;
	element.value = element_value;
	
    var parent = document.getElementById(parent_name);  
    parent.appendChild(element);
}

function delete_last_option(element) {
	var el = document.getElementById(element);
	el.parentNode.removeChild(el);
	element_counter--;
}

function reset_options() {
	console.log("counter = "+element_counter);
	counter = element_counter;
	for (i = 1; i <= counter; i++) {
		delete_last_option("plugin_"+i)
	}
}

function init_options(){
	reset_options();
	for (i = 0; i < tuleap_plugins.length; i++) {
		element = i+1;
		append_field("tuleap_plugins", "plugin_"+element, tuleap_plugins[i]);
	}
	element_counter = tuleap_plugins.length;
}

/******************** main **********************/
element_counter = localStorage["element_counter"];

//restore old values
if (element_counter > 0) {
	for (i = 1; i <= element_counter; i++) {
		element = "plugin_"+i;
		append_field("tuleap_plugins", element, "");
		restore_options(element);
	}
} else {
	element_counter = 1;
	element = "plugin_"+element_counter;
    append_field("tuleap_plugins", element, "");
}

// button actions
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#add_plugin').addEventListener('click', function(){
																	element_counter++;
																	element = "plugin_"+element_counter;
																	append_field("tuleap_plugins", element, "");
																});
document.querySelector('#delete_plugin').addEventListener('click', function(){
																	element = "plugin_"+element_counter;
																	delete_last_option(element);
																});
document.querySelector('#init').addEventListener('click', init_options);
document.querySelector('#reset').addEventListener('click', reset_options);

																