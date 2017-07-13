window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
    
    $("#LeftUp").click(function(){
        console.log("LeftUp");
        device_controller.left_up();
    });
    
    $("#RightUp").click(function(){
        console.log("RightUp");
        device_controller.right_up();
    });
    
    $("#LeftDown").click(function(){
        console.log("LeftDown");
        device_controller.left_down();
    });
    
    $("#RightDown").click(function(){
        console.log("RightDown");
        device_controller.right_down();
    });

    
    $("#Restart").click(function(){
        console.log("Restart");
        device_controller.restart();
    });
    
    app_store.load(device_controller);
	device_discover_manager.set_discover_callback(
			function(id, description){ 
		    	console.log("found device " + description);
		    	device_discover_manager.add_discovered_device(id, description);    		    	
	});
	device_discover_manager.set_discover_completed_callback(function(){
		device_discover_manager.discover_finished();
	});

};