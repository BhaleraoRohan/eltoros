materialAdmin

.controller('slotManagerCtrl',function( $state, $scope,FrameworkService,$rootScope){


	 $scope.UserData = FrameworkService.getLocalStorage();
	 
	 $scope.TodaysSlot = [];
	 $scope.SlotTitle="";
	 FrameworkService.getGenericGetCall('DoctorsSlotWiseAvailablity.php?HospitalID=' 
			 + $scope.UserData[0].HospitalID + '&DoctorID=1' 
			 //+ $scope.UserData[0].UserID 
			 +"&category=all"  
	 			, function(response){
	 	  			$scope.TodaysSlot = response.data; 
	 	  			
	 	  			$scope.Sunday = [];
	 	  			$scope.Monday = [];
	 	  			$scope.Tuesday = [];
	 	  			$scope.Wednesday = [];
	 	  			$scope.Thursday = [];
	 	  			$scope.Friday = [];
	 	  			$scope.Saturday = [];
	 	  			
	 	  			for(var i=0;i< $scope.TodaysSlot.length;i++){
	 	  				
	 	  				if($scope.TodaysSlot[i].IsActive === "true")
	 	  					$scope.TodaysSlot[i].IsActive = true;
	 	  				else
	 	  					$scope.TodaysSlot[i].IsActive = false; 	  
	 	  				
	 	  				
	 	  				
	 	  				// ----------------------------
	 	  				if($scope.TodaysSlot[i].day === 'Sunday'){
	 		 	  			$scope.Sunday.push($scope.TodaysSlot[i]);
	 	  					 
	 	  				}
	 	  				else if($scope.TodaysSlot[i].day === 'Monday'){
	 		 	  			$scope.Monday.push($scope.TodaysSlot[i]);
	 	  					 
	 	  				}
	 	  				else if($scope.TodaysSlot[i].day === 'Tuesday'){
	 		 	  			$scope.Tuesday.push($scope.TodaysSlot[i]);
	 	  					 
	 	  				}
	 	  				else if($scope.TodaysSlot[i].day === 'Wednesday'){
	 		 	  			$scope.Wednesday.push($scope.TodaysSlot[i]);
	 	  					 
	 	  				}
	 	  				else if($scope.TodaysSlot[i].day === 'Thursday'){
	 		 	  			$scope.Thursday.push($scope.TodaysSlot[i]);
	 	  					 
	 	  				}
	 	  				else if($scope.TodaysSlot[i].day === 'Friday'){
	 		 	  			$scope.Friday.push($scope.TodaysSlot[i]);
	 	  					 
	 	  				}
	 	  				else if($scope.TodaysSlot[i].day === 'Saturday'){
	 		 	  			$scope.Saturday.push($scope.TodaysSlot[i]);
	 	  					 
	 	  				}
	 	  					
	 	  				
	 	  			} 
	 	  			//console.info($scope.TodaysSlot);	 	  			 
	 			}
	 	        ,function(error){
	 	        	console.log(error);
	 	});
	
	
	
	 $scope.ChangeSlotStatus = function(slot,isActive,day){ 
		  
		 if(isActive === true)
			 _isActive = 1;
		 else if(isActive === false)
			 _isActive = 0;
			  
		 FrameworkService.getGenericGetCall('changeSlotStatus.php?HospitalID=' 
				 + $scope.UserData[0].HospitalID + '&DoctorID=1' 
				 //+ $scope.UserData[0].UserID 		
				 + '&slot='+ slot + '&isActive=' + _isActive + '&day=' + day
		 			, function(response){ 
		 	  			    				
		 	  			 console.info(response);
		 	  			//console.info($scope.TodaysSlot);	 	  			 
		 			}
		 	        ,function(error){
		 	        	console.log(error);
		 	});
		  
		 
	 }
	
	
	
	
	
	// Slot Management  

	//Active or de-active day checking
	$scope.onDayStatusChange = function(slot){

		if(slot === 'isSunday'){

			if($scope.params.isSunday_O === true){ 
			}
			else{ 
				$scope.params.isSunday_1 = false;
				$scope.params.isSunday_2 = false;
				$scope.params.isSunday_3 = false;
				$scope.params.isSunday_4 = false;
				$scope.params.isSunday_5 = false;
				$scope.params.isSunday_6 = false;
				$scope.params.isSunday_7 = false;
				$scope.params.isSunday_8 = false;
				$scope.params.isSunday_9 = false;
				$scope.params.isSunday_10 = false;
				$scope.params.isSunday_11 = false;
				$scope.params.isSunday_12 = false;
				$scope.params.isSunday_13 = false;
				$scope.params.isSunday_14 = false;
				$scope.params.isSunday_15 = false;
				$scope.params.isSunday_16 = false; 
			} 		
		}

		else if(slot === 'isMonday'){

			if($scope.params.isMonday_O === true){ 
			}
			else{ 
				$scope.params.isMonday_1 = false;
				$scope.params.isMonday_2 = false;
				$scope.params.isMonday_3 = false;
				$scope.params.isMonday_4 = false;
				$scope.params.isMonday_5 = false;
				$scope.params.isMonday_6 = false;
				$scope.params.isMonday_7 = false;
				$scope.params.isMonday_8 = false;
				$scope.params.isMonday_9 = false;
				$scope.params.isMonday_10 = false;
				$scope.params.isMonday_11 = false;
				$scope.params.isMonday_12 = false;
				$scope.params.isMonday_13 = false;
				$scope.params.isMonday_14 = false;
				$scope.params.isMonday_15 = false;
				$scope.params.isMonday_16 = false; 
			} 		
		}

		else if(slot === 'isTuesday'){

			if($scope.params.isTuesday_O === true){ 
			}
			else{ 
				$scope.params.isTuesday_1 = false;
				$scope.params.isTuesday_2 = false;
				$scope.params.isTuesday_3 = false;
				$scope.params.isTuesday_4 = false;
				$scope.params.isTuesday_5 = false;
				$scope.params.isTuesday_6 = false;
				$scope.params.isTuesday_7 = false;
				$scope.params.isTuesday_8 = false;
				$scope.params.isTuesday_9 = false;
				$scope.params.isTuesday_10 = false;
				$scope.params.isTuesday_11 = false;
				$scope.params.isTuesday_12 = false;
				$scope.params.isTuesday_13 = false;
				$scope.params.isTuesday_14 = false;
				$scope.params.isTuesday_15 = false;
				$scope.params.isTuesday_16 = false;  
			} 		
		}

		else if(slot === 'isWednesday'){

			if($scope.params.isWednesday_O === true){ 
			}
			else{ 
				$scope.params.isWednesday_1 = false;
				$scope.params.isWednesday_2 = false;
				$scope.params.isWednesday_3 = false;
				$scope.params.isWednesday_4 = false;
				$scope.params.isWednesday_5 = false;
				$scope.params.isWednesday_6 = false;
				$scope.params.isWednesday_7 = false;
				$scope.params.isWednesday_8 = false;
				$scope.params.isWednesday_9 = false;
				$scope.params.isWednesday_10 = false;
				$scope.params.isWednesday_11 = false;
				$scope.params.isWednesday_12 = false;
				$scope.params.isWednesday_13 = false;
				$scope.params.isWednesday_14 = false;
				$scope.params.isWednesday_15 = false;
				$scope.params.isWednesday_16 = false;  
			} 		
		}

		else if(slot === 'isThursday'){

			if($scope.params.isThursday_O === true){ 
			}
			else{ 
				$scope.params.isThursday_1 = false;
				$scope.params.isThursday_2 = false;
				$scope.params.isThursday_3 = false;
				$scope.params.isThursday_4 = false;
				$scope.params.isThursday_5 = false;
				$scope.params.isThursday_6 = false;
				$scope.params.isThursday_7 = false;
				$scope.params.isThursday_8 = false;
				$scope.params.isThursday_9 = false;
				$scope.params.isThursday_10 = false;
				$scope.params.isThursday_11 = false;
				$scope.params.isThursday_12 = false;
				$scope.params.isThursday_13 = false;
				$scope.params.isThursday_14 = false;
				$scope.params.isThursday_15 = false;
				$scope.params.isThursday_16 = false;  
			} 		
		}

		else if(slot === 'isFriday'){

			if($scope.params.isFriday_O === true){ 
			}
			else{ 
				$scope.params.isFriday_1 = false;
				$scope.params.isFriday_2 = false;
				$scope.params.isFriday_3 = false;
				$scope.params.isFriday_4 = false;
				$scope.params.isFriday_5 = false;
				$scope.params.isFriday_6 = false;
				$scope.params.isFriday_7 = false;
				$scope.params.isFriday_8 = false;
				$scope.params.isFriday_9 = false;
				$scope.params.isFriday_10 = false;
				$scope.params.isFriday_11 = false;
				$scope.params.isFriday_12 = false;
				$scope.params.isFriday_13 = false;
				$scope.params.isFriday_14 = false;
				$scope.params.isFriday_15 = false;
				$scope.params.isFriday_16 = false; 
			} 		
		}

		else if(slot === 'isSaturday'){

			if($scope.params.isSaturday_O === true){ 
			}
			else{ 
				$scope.params.isSaturday_1 = false;
				$scope.params.isSaturday_2 = false;
				$scope.params.isSaturday_3 = false;
				$scope.params.isSaturday_4 = false;
				$scope.params.isSaturday_5 = false;
				$scope.params.isSaturday_6 = false;
				$scope.params.isSaturday_7 = false;
				$scope.params.isSaturday_8 = false;
				$scope.params.isSaturday_9 = false;
				$scope.params.isSaturday_10 = false;
				$scope.params.isSaturday_11 = false;
				$scope.params.isSaturday_12 = false;
				$scope.params.isSaturday_13 = false;
				$scope.params.isSaturday_14 = false;
				$scope.params.isSaturday_15 = false;
				$scope.params.isSaturday_16 = false; 
			} 		
		}
		else{
			alert(slot);
		}

		// End of function
	}


	//Select all day for particular slot


	$scope.SelectAllSlots = function(slotNumber){ 

		if(slotNumber === 1){
			if($scope.params.SelectAll_1 === true){ 
				$scope.params.isSunday_1 = true;
				$scope.params.isMonday_1 = true;
				$scope.params.isTuesday_1 = true;
				$scope.params.isWednesday_1 = true;
				$scope.params.isThursday_1 = true;
				$scope.params.isFriday_1 = true;
				$scope.params.isSaturday_1 = true;  
			}
			else{
				$scope.params.isSunday_1 = false;
				$scope.params.isMonday_1 = false;
				$scope.params.isTuesday_1 = false;
				$scope.params.isWednesday_1 = false;
				$scope.params.isThursday_1 = false;
				$scope.params.isFriday_1 = false;
				$scope.params.isSaturday_1 = false; 
				$scope.params.isThursday_1 = false; 
			}
		}

		else if(slotNumber === 2){
			if($scope.params.SelectAll_2 === true){ 
				$scope.params.isSunday_2 = true;
				$scope.params.isMonday_2 = true;
				$scope.params.isTuesday_2 = true;
				$scope.params.isWednesday_2 = true;
				$scope.params.isThursday_2 = true;
				$scope.params.isFriday_2 = true;
				$scope.params.isSaturday_2 = true;  
			}
			else{
				$scope.params.isSunday_2 = false;
				$scope.params.isMonday_2 = false;
				$scope.params.isTuesday_2 = false;
				$scope.params.isWednesday_2 = false;
				$scope.params.isThursday_2 = false;
				$scope.params.isFriday_2 = false;
				$scope.params.isSaturday_2 = false; 
				$scope.params.isThursday_2 = false; 
			}
		}

		else if(slotNumber === 3){
			if($scope.params.SelectAll_3 === true){ 
				$scope.params.isSunday_3 = true;
				$scope.params.isMonday_3 = true;
				$scope.params.isTuesday_3 = true;
				$scope.params.isWednesday_3 = true;
				$scope.params.isThursday_3 = true;
				$scope.params.isFriday_3 = true;
				$scope.params.isSaturday_3 = true;  
			}
			else{
				$scope.params.isSunday_3 = false;
				$scope.params.isMonday_3 = false;
				$scope.params.isTuesday_3 = false;
				$scope.params.isWednesday_3 = false;
				$scope.params.isThursday_3 = false;
				$scope.params.isFriday_3 = false;
				$scope.params.isSaturday_3 = false; 
				$scope.params.isThursday_3 = false; 
			} 
		}


		else if(slotNumber === 4){
			if($scope.params.SelectAll_4 === true){ 
				$scope.params.isSunday_4 = true;
				$scope.params.isMonday_4 = true;
				$scope.params.isTuesday_4 = true;
				$scope.params.isWednesday_4 = true;
				$scope.params.isThursday_4 = true;
				$scope.params.isFriday_4 = true;
				$scope.params.isSaturday_4 = true;  
			}
			else{
				$scope.params.isSunday_4 = false;
				$scope.params.isMonday_4 = false;
				$scope.params.isTuesday_4 = false;
				$scope.params.isWednesday_4 = false;
				$scope.params.isThursday_4 = false;
				$scope.params.isFriday_4 = false;
				$scope.params.isSaturday_4 = false; 
				$scope.params.isThursday_4 = false; 
			}
		}

		else if(slotNumber === 5){
			if($scope.params.SelectAll_5 === true){ 
				$scope.params.isSunday_5 = true;
				$scope.params.isMonday_5 = true;
				$scope.params.isTuesday_5 = true;
				$scope.params.isWednesday_5 = true;
				$scope.params.isThursday_5 = true;
				$scope.params.isFriday_5 = true;
				$scope.params.isSaturday_5 = true;  
			}
			else{
				$scope.params.isSunday_5 = false;
				$scope.params.isMonday_5 = false;
				$scope.params.isTuesday_5 = false;
				$scope.params.isWednesday_5 = false;
				$scope.params.isThursday_5 = false;
				$scope.params.isFriday_5 = false;
				$scope.params.isSaturday_5 = false; 
				$scope.params.isThursday_5 = false; 
			}
		}

		else if(slotNumber === 6){
			if($scope.params.SelectAll_6 === true){ 
				$scope.params.isSunday_6 = true;
				$scope.params.isMonday_6 = true;
				$scope.params.isTuesday_6 = true;
				$scope.params.isWednesday_6 = true;
				$scope.params.isThursday_6 = true;
				$scope.params.isFriday_6 = true;
				$scope.params.isSaturday_6 = true;  
			}
			else{
				$scope.params.isSunday_6 = false;
				$scope.params.isMonday_6 = false;
				$scope.params.isTuesday_6 = false;
				$scope.params.isWednesday_6 = false;
				$scope.params.isThursday_6 = false;
				$scope.params.isFriday_6 = false;
				$scope.params.isSaturday_6 = false; 
				$scope.params.isThursday_6 = false; 
			}
		}
		else if(slotNumber === 7){
			if($scope.params.SelectAll_7 === true){ 
				$scope.params.isSunday_7 = true;
				$scope.params.isMonday_7 = true;
				$scope.params.isTuesday_7 = true;
				$scope.params.isWednesday_7 = true;
				$scope.params.isThursday_7 = true;
				$scope.params.isFriday_7 = true;
				$scope.params.isSaturday_7 = true;  
			}
			else{
				$scope.params.isSunday_7 = false;
				$scope.params.isMonday_7 = false;
				$scope.params.isTuesday_7 = false;
				$scope.params.isWednesday_7 = false;
				$scope.params.isThursday_7 = false;
				$scope.params.isFriday_7 = false;
				$scope.params.isSaturday_7 = false; 
				$scope.params.isThursday_7 = false; 
			}
		}

		else if(slotNumber === 8){
			if($scope.params.SelectAll_8 === true){ 
				$scope.params.isSunday_8 = true;
				$scope.params.isMonday_8 = true;
				$scope.params.isTuesday_8 = true;
				$scope.params.isWednesday_8 = true;
				$scope.params.isThursday_8 = true;
				$scope.params.isFriday_8 = true;
				$scope.params.isSaturday_8 = true;  
			}
			else{
				$scope.params.isSunday_8 = false;
				$scope.params.isMonday_8 = false;
				$scope.params.isTuesday_8 = false;
				$scope.params.isWednesday_8 = false;
				$scope.params.isThursday_8 = false;
				$scope.params.isFriday_8 = false;
				$scope.params.isSaturday_8 = false; 
				$scope.params.isThursday_8 = false; 
			}
		}
		else if(slotNumber === 9){
			if($scope.params.SelectAll_9 === true){ 
				$scope.params.isSunday_9 = true;
				$scope.params.isMonday_9 = true;
				$scope.params.isTuesday_9 = true;
				$scope.params.isWednesday_9 = true;
				$scope.params.isThursday_9 = true;
				$scope.params.isFriday_9 = true;
				$scope.params.isSaturday_9 = true;  
			}
			else{
				$scope.params.isSunday_9 = false;
				$scope.params.isMonday_9 = false;
				$scope.params.isTuesday_9 = false;
				$scope.params.isWednesday_9 = false;
				$scope.params.isThursday_9 = false;
				$scope.params.isFriday_9 = false;
				$scope.params.isSaturday_9 = false; 
				$scope.params.isThursday_9 = false; 
			}
		}

		else if(slotNumber === 10){
			if($scope.params.SelectAll_10 === true){ 
				$scope.params.isSunday_10 = true;
				$scope.params.isMonday_10 = true;
				$scope.params.isTuesday_10 = true;
				$scope.params.isWednesday_10 = true;
				$scope.params.isThursday_10 = true;
				$scope.params.isFriday_10 = true;
				$scope.params.isSaturday_10 = true;  
			}
			else{
				$scope.params.isSunday_10 = false;
				$scope.params.isMonday_10 = false;
				$scope.params.isTuesday_10 = false;
				$scope.params.isWednesday_10 = false;
				$scope.params.isThursday_10 = false;
				$scope.params.isFriday_10 = false;
				$scope.params.isSaturday_10 = false; 
				$scope.params.isThursday_10 = false; 
			}
		}

		if(slotNumber === 11){
			if($scope.params.SelectAll_11 === true){ 
				$scope.params.isSunday_11 = true;
				$scope.params.isMonday_11 = true;
				$scope.params.isTuesday_11 = true;
				$scope.params.isWednesday_11 = true;
				$scope.params.isThursday_11 = true;
				$scope.params.isFriday_11 = true;
				$scope.params.isSaturday_11 = true;  
			}
			else{
				$scope.params.isSunday_11 = false;
				$scope.params.isMonday_11 = false;
				$scope.params.isTuesday_11 = false;
				$scope.params.isWednesday_11 = false;
				$scope.params.isThursday_11 = false;
				$scope.params.isFriday_11 = false;
				$scope.params.isSaturday_11 = false; 
				$scope.params.isThursday_11 = false; 
			}
		}
		else if(slotNumber === 12){
			if($scope.params.SelectAll_12 === true){ 
				$scope.params.isSunday_12 = true;
				$scope.params.isMonday_12 = true;
				$scope.params.isTuesday_12 = true;
				$scope.params.isWednesday_12 = true;
				$scope.params.isThursday_12 = true;
				$scope.params.isFriday_12 = true;
				$scope.params.isSaturday_12 = true;  
			}
			else{
				$scope.params.isSunday_12 = false;
				$scope.params.isMonday_12 = false;
				$scope.params.isTuesday_12 = false;
				$scope.params.isWednesday_12 = false;
				$scope.params.isThursday_12 = false;
				$scope.params.isFriday_12 = false;
				$scope.params.isSaturday_12 = false; 
				$scope.params.isThursday_12 = false; 
			}
		}
		else if(slotNumber === 13){
			if($scope.params.SelectAll_13 === true){ 
				$scope.params.isSunday_13 = true;
				$scope.params.isMonday_13 = true;
				$scope.params.isTuesday_13 = true;
				$scope.params.isWednesday_13 = true;
				$scope.params.isThursday_13 = true;
				$scope.params.isFriday_13 = true;
				$scope.params.isSaturday_13 = true;  
			}
			else{
				$scope.params.isSunday_13 = false;
				$scope.params.isMonday_13 = false;
				$scope.params.isTuesday_13 = false;
				$scope.params.isWednesday_13 = false;
				$scope.params.isThursday_13 = false;
				$scope.params.isFriday_13 = false;
				$scope.params.isSaturday_13 = false; 
				$scope.params.isThursday_13 = false; 
			}
		}

		else if(slotNumber === 14){
			if($scope.params.SelectAll_14 === true){ 
				$scope.params.isSunday_14 = true;
				$scope.params.isMonday_14 = true;
				$scope.params.isTuesday_14 = true;
				$scope.params.isWednesday_14 = true;
				$scope.params.isThursday_14 = true;
				$scope.params.isFriday_14 = true;
				$scope.params.isSaturday_14 = true;  
			}
			else{
				$scope.params.isSunday_14 = false;
				$scope.params.isMonday_14 = false;
				$scope.params.isTuesday_14 = false;
				$scope.params.isWednesday_14 = false;
				$scope.params.isThursday_14 = false;
				$scope.params.isFriday_14 = false;
				$scope.params.isSaturday_14 = false; 
				$scope.params.isThursday_14 = false; 
			}
		}

		else if(slotNumber === 15){
			if($scope.params.SelectAll_15 === true){ 
				$scope.params.isSunday_15 = true;
				$scope.params.isMonday_15 = true;
				$scope.params.isTuesday_15 = true;
				$scope.params.isWednesday_15 = true;
				$scope.params.isThursday_15 = true;
				$scope.params.isFriday_15 = true;
				$scope.params.isSaturday_15 = true;  
			}
			else{
				$scope.params.isSunday_15 = false;
				$scope.params.isMonday_15 = false;
				$scope.params.isTuesday_15 = false;
				$scope.params.isWednesday_15 = false;
				$scope.params.isThursday_15 = false;
				$scope.params.isFriday_15 = false;
				$scope.params.isSaturday_15 = false; 
				$scope.params.isThursday_15 = false; 
			}
		}

		else if(slotNumber === 16){
			if($scope.params.SelectAll_16 === true){ 
				$scope.params.isSunday_16 = true;
				$scope.params.isMonday_16 = true;
				$scope.params.isTuesday_16 = true;
				$scope.params.isWednesday_16 = true;
				$scope.params.isThursday_16 = true;
				$scope.params.isFriday_16 = true;
				$scope.params.isSaturday_16 = true;  
			}
			else{
				$scope.params.isSunday_16 = false;
				$scope.params.isMonday_16 = false;
				$scope.params.isTuesday_16 = false;
				$scope.params.isWednesday_16 = false;
				$scope.params.isThursday_16 = false;
				$scope.params.isFriday_16 = false;
				$scope.params.isSaturday_16 = false; 
				$scope.params.isThursday_16 = false; 
			}
		}

	}

	
	
})