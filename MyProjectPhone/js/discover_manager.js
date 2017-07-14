/*
 * Copyright (c) 2016 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global $, tau*/
/*jslint unparam: true */

(function() {
    "use strict";
    var 
    	devices = [],
    	discover_callback = null,
    	discover_completed_callback = null;

       
	// loader
	function discover_manager() {
	    return {
	    	start_discover : start_discover,
	    	get_device_info : get_device_info, 
	    	set_discover_callback : set_discover_callback,
	    	set_discover_completed_callback : set_discover_completed_callback,
	    	insert_test_tvs : insert_test_tvs,
	    	add_discovered_device : add_discovered_device,
	    	discover_finished : discover_finished,
	    	add_device : add_device
	    };
	}
	
	// implementation
	function start_discover()
	{
		console.log("[device_discover_manager::start_discover] ");
		devices = [];
		insert_test_tvs();
		if (discover_completed_callback){
			discover_completed_callback();
		}
	}
	
	function get_device_info(id)
	{
		console.log("[device_discover_manager::get_device_info] - get device with id=" + id);
		
		if(typeof devices[id] === 'undefined') {
		    return null;
		}
		
		return devices[id];
	}
	
	function set_discover_callback(callback)
	{
		discover_callback = callback;
	}
	
	function set_discover_completed_callback(callback)
	{
		discover_completed_callback = callback;
	}
	
	function add_device(ip, port, description)
	{
		var id = -1;
		devices.push({
			ip : ip,
			port : port,
			description : description
		});
		
		if (devices.length > 0){
			id = devices.length - 1;
			if (discover_callback){
				discover_callback(devices.length - 1, description);
			}
		}
		
		return id;
	}
	
/*    function findLocalDevices(){
        msf.search(function(err, services){
            if (err || !services) {
                return;
            }
            services.forEach(function(service){
                devices[service.id] = service;
            });
            refreshDeviceSelect();
        });
        
    }*/
	
	
	function insert_test_tvs()
	{
		
		add_device("192.168.26.101", 26101, "МММ");
		
	}
	
	function add_discovered_device(id, description)
	{
		$('#device_list').append("<li id_attr='"+  id +"' class='ui-marquee " + "ddst" + id + "'>"+  description +"</li>");
	    $(/*"#device_list li " + */".ddst" + id).click(function() {
	        var inter_li = $(this),
	    		selected_device = inter_li.attr('id_attr');
	        	
	        console.log("selected device - " + selected_device);
	        device_controller.set_device(selected_device);
	    });   		
	}
	
	function discover_finished()
	{
		fsm.event_discover_ok();
	}

	window.discover_manager = discover_manager();
}());

