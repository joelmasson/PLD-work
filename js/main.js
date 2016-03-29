$(document).ready(function () {

	
	$.getJSON("js/contacts.js", function (data) { // Get JSON
		var items = []; // Create Array to store values

		// Loop through values and create li elements
		$.each( data.contacts, function( key, val ) { 
			items.push( "<li><a class='add-to-list'>" + val.email + "</a></li>" );
		});

		// Append ul & li elements
		$( "<ul>", {
			html: items.join( "" )
		}).appendTo( $("#email-select") );

		// Add value to list function
		$(".add-to-list").bind('click', function () {
			var email = $(this).text();
			$(this).parent().remove(); // remove from ul
			$("#email-container").append("<span>"+email+"</span>");

			var l = $("#email-container span").length;
			var w = $("#email-form").css('width').replace(/[^-\d\.]/g, '');
			var p = $("#email-form").css('padding-left').replace(/[^-\d\.]/g, '');
			
			$("#email-form").css('padding-left',135*l + "px"); // Move padding when email is added
			if (p > w-205){ // if padding is to long add to top
				$("#email-form").css('padding-top',42 + "px");
				$("#email-form").css('padding-left',15 + "px");
			}

			$('#email-container').promise().done(function(){ // Hide email select if it is empty
				if (isEmpty($("#email-select ul"))){
					$("#email-select").addClass("hidden");
				}
			});
		});
	});
	
	$(".bar span").each(function( index ) { // animate bar height with a random number
		r = Math.floor((Math.random() * 100) + 1);
		$(this).css('top',r + "%");
	});

	$(".nav a").click(function () { // switch panels and nav
		$("#email-select").addClass("hidden"); 

		if ($(this).data('panel') === "contact"){
			$("#contact-form").removeClass('hidden');
			$("#stocks").addClass('hidden');
		} else {
			$("#contact-form").addClass('hidden');
			$("#stocks").removeClass('hidden');
		}
		$(".nav li").removeClass('active');	
		$(this).parent().addClass('active');
	});

	$("#close-select").click(function () {
		$("#email-select").addClass("hidden"); // show email select box
	});

	$("#add-more").click(function () {
		$("#email-select").removeClass("hidden"); // hide email select box
	});

	$("#submit-form").click(function (){
		var object = []; // array to hold values
		var email = $('#email-form').val(); // Get user email
		var subject = $('#message-form').val(); // Get Subject
		var content = $('#content-form').val(); // Get Message
		var isValid = true; // Validate variable

		if(email != '' && validateEmail(email)){ // Check if Email is empty and Vaild
			$('#email-form').removeClass('error');
			object.push({"email":email});
		}
		else if (email === ""){
			$('#email-form').addClass('error');
			$('#field-error').show().html("Input your email");
			isValid = false;
		} 
		else{
			$('#email-form').addClass('error');
			$('#field-error').show().html("Email is Invalid");
			isValid = false;
		}

		if (subject != '') { // check if is empty
			$('#message-form').removeClass('error');
			object.push({"subject":subject});
		} else {
			$('#message-form').addClass('error');
			$('#field-error').show().html("Enter the subject");
			isValid = false;
		}

		if (content != '') { // check if is empty
			$('#content-form').removeClass('error');
			object.push({"content":content});
		} else {
			$('#content-form').addClass('error');
			$('#field-error').show().html("Enter the message");
			isValid = false;
		}

		$("#email-container span").each(function( index ) { // Add each added email address to object
			address = $( this ).text()
			object.push({"email":address});
		});

		if (isValid){ // if is Valid send AJAX
			$('#field-error').hide().html("");
			alert("Valid Form");
		// 	$.ajax({
		// 		type: "POST",
		// 		url: 'update.php',
		// 		data : {object:object},
		// 		success: function(data){
		// 			$('#field-error').removeClass('error').show().html(data);
		// 		},
		// 		error: function(data){
		// 			$('#field-error').addClass('error').show().html(data);
		// 		}
		//    	});
		}

	})

	// Check if element is empty
	function isEmpty( el ){
		return !$.trim(el.html())
	}

	// valiate email address
	function validateEmail(txtEmail){
	   var a = txtEmail;
	   var filter = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	    if(filter.test(a)){
	        return true;
	    }
	    else{
	        return false;
	    }
	}

});