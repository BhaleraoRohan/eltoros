materialAdmin
 
.controller('appointmentV1Ctrl',function( $state, $scope, ngTableParams, tableService,$filter, $sce,FrameworkService){		
	  
	 
	
	 $scope.list_Regular = [];
	 $scope.list_Emergency = [];
	 $scope.list_Scheduled = [];
	 $scope.pageMode="list";
	 $scope.UserData = FrameworkService.getLocalStorage();
	 
	 console.info($scope.UserData);
	 
	 getAppointmentList($scope,FrameworkService);
	  
	 $scope.rowClick = function(req,obj){
 
		 $scope.nextObj = [];
		 for(var i=0;i< $scope.AppointmentList.length;i++){
			 $scope.nextObj[$scope.AppointmentList[i].AppointmentID] = $scope.AppointmentList[i].MobileNumber; 
		 }
		  
		 $scope.params = {					 
				 priority:req,
				 AppointmentID:  obj.AppointmentID,
				 date: obj.date ,
				 HospitalID: obj.HospitalID,
				 DoctorID:  obj.DoctorID,
				 MobileNumber :obj.MobileNumber,
				 next_Appointments:$scope.nextObj
			}

		 //console.info(obj.AppointmentID);
		// console.info(obj.MobileNumber);
	 

		 $scope.passparams = {
					priority:'PROCESS'  ,
					 AppointmentID:  obj.AppointmentID,
					 date: obj.date ,
					 HospitalID: obj.HospitalID,
					 DoctorID:  obj.DoctorID,				
			}
		 
		 FrameworkService.getGenericPostCall('ChangePatientStatus.php', $scope.passparams
					, function(response){ 
			 
						console.log(response); 
						if(response === "1"){

							 var data = {
									 params : FrameworkService.getEncryptedString($scope.params)
							 }			 
							 $state.go('app.treatment', data, {reloadOnSearch: false});
						}
						else{
							alert("Error Occurred ! ! ! ");
						}					
						
					}
			        ,function(error){
			        	console.log(error);
			        	 
			});	

		 
	 }
	 
	 $scope.date = new Date();
	 
	 $scope.atype = "Regular";
	 function getAppointmentList($scope,FrameworkService){
	 	FrameworkService.getGenericGetCall('getAppointmentList.php?HospitalID=' + $scope.UserData[0].HospitalID + '&DoctorID=' + $scope.UserData[0].UserID 
	 			, function(response){
	 	  			$scope.AppointmentList = response.data; 

	 	  			console.info($scope.AppointmentList);
	 	  			 
	 	  			var SlotNumber = 1;
	 	  			var SlotAllotedPatientCount = 0;
	 	  			for(var i=0;i< response.data.length;i++){
	 	  				var w = response.data[i]; 
	 	  				 
	 	  				if(w.Priority === 'PROCESS'){
	 	  					response.data[i].color = "#FFF59D";
	 	  				}
	 	  				else if(w.Priority === 'COMPLETE'){
	 	  					response.data[i].color = "#DCEDC8";
	 	  				} 
	 	  				else  {
	 	  					response.data[i].color = "#FAFAFA";
	 	  				} 
	 	  				 
	 	  				if(w.AppointmentType === 'Regular'){
	 	  					$scope.list_Regular.push(w);
	 	  				}
	 	  				else if(w.AppointmentType === 'Emergency'){
	 	  					$scope.list_Emergency.push(w);
	 	  				}
	 	  				else if(w.AppointmentType === 'Scheduled'){
	 	  					$scope.list_Scheduled.push(w);
	 	  				}
	 	  				
	 	  				SlotAllotedPatientCount++;
	 	  				
	 	  				if(SlotAllotedPatientCount === 5){
	 	  					SlotNumber++;
	 	  					SlotAllotedPatientCount = 0;
	 	  				}
	 	  				
	 	  				response.data[i].SlotNumber = SlotNumber; 
 
	 	  			}
	 	  			
	 			}
	 	        ,function(error){
	 	        	console.log(error);
	 	});
	 }
	 
	 $scope.TodaysSlot = [];
	 $scope.SlotTitle="";
	 FrameworkService.getGenericGetCall('DoctorsSlotWiseAvailablity.php?HospitalID=' 
			 + $scope.UserData[0].HospitalID + '&DoctorID=1' 
			 //+ $scope.UserData[0].UserID 
			 +"&category=specific"  
	 			, function(response){
	 	  			$scope.TodaysSlot = response.data; 
	 	  			
	 	  			for(var i=0;i< $scope.TodaysSlot.length;i++){
	 	  				
	 	  				if($scope.TodaysSlot[i].IsActive === "true")
	 	  					$scope.TodaysSlot[i].IsActive = true;
	 	  				else
	 	  					$scope.TodaysSlot[i].IsActive = false; 	  
	 	  				
	 	  				if(i==0){
	 	  					$scope.SlotTitle = $scope.TodaysSlot[i].day;
	 	  				}
	 	  				
	 	  			} 
	 	  			//console.info($scope.TodaysSlot);	 	  			 
	 			}
	 	        ,function(error){
	 	        	console.log(error);
	 	});
	 
	 
	 $scope.ChangeSlotStatus = function(slot,isActive){ 
		  
		 if(isActive === true)
			 _isActive = 1;
		 else if(isActive === false)
			 _isActive = 0;
			  
		 FrameworkService.getGenericGetCall('changeSlotStatus.php?HospitalID=' 
				 + $scope.UserData[0].HospitalID + '&DoctorID=1' 
				 //+ $scope.UserData[0].UserID 		
				 + '&slot='+ slot + '&isActive=' + _isActive + '&day=' + $scope.SlotTitle
		 			, function(response){ 
		 	  			    				
		 	  			 console.info(response);
		 	  			//console.info($scope.TodaysSlot);	 	  			 
		 			}
		 	        ,function(error){
		 	        	console.log(error);
		 	});
		  
		 
	 }
	 
	 
	 
	 
	 $scope.msg={
			 MCause : "Type0",
			 PCategory : "Type0" ,
			 NumOfPatients: "1",
			 text:""
	 }
	 
	 $scope.btnShowMessage = function(){		 
		 $scope.pageMode="sendMessage";	 
	 }
	 
	 $scope.btnSendMessage = function(){ 
		 var cnt =0;
		 for(var i=0;i< $scope.AppointmentList.length;i++){
			 var w = $scope.AppointmentList[i];
			 
			 if(w.Priority != 'Complete' && cnt <= $scope.msg.NumOfPatients){
				 cnt++;
				 $scope.msg.MobileNumber = w.MobileNumber;
				 
				 FrameworkService.getGenericPostCall('SendMessage.php', $scope.msg
							, function(response){
								console.log(response);

								
								$scope.pageMode="list";
							}
					
					        ,function(error){
					        	console.log(error);
					});
			 }
		 }
		 
		 $scope.msg={
				 MCause : "Type0",
				 PCategory : "Type0" ,
				 NumOfPatients: "Type5",
				 text:""
		 }
		 
	 }
	 
	 $scope.btnCancel = function(){		 
		 $scope.pageMode="list";	 
	 }
	 
})







.controller('makeAppointmentCtrl',function( $state, $scope, FrameworkService){
	 
	$scope.UserData = JSON.parse(localStorage.getItem("UserData"));		
	
	$scope.params = {
			HospitalID : "",
			UserID : "",
			TimeSlot : "0",
			MobileNumber : "",
			Purpose:"NA",
			date : "",
			AppointmentType:"0"
		};
	
	$scope.DoctorList =[];
	$scope.inactiveDocs = [];
	FrameworkService.getGenericGetCall('LOV_GetDoctorList.php?HospitalID=' + $scope.UserData[0].HospitalID
			, function(response){ 
		 
		$scope.DoctorList = response.data;
		 
		for(var i=0; i < $scope.DoctorList.length;i++){		 
			if($scope.DoctorList[i].isTodayWorkingDay=="N")
				$scope.inactiveDocs.push($scope.DoctorList[i].name)
		}
		 
		console.info($scope.DoctorList );
	}
	,function(error){
		console.log(error);
	});
	
	
	$scope.btnClose = function(){			
		$state.go('home');	
	}
	
	$scope.btnSubmit = function(){	
		
		$scope.params.HospitalID = $scope.UserData[0].HospitalID;
		$scope.params.DoctorID = $scope.params.UserID;
		var myDate = FrameworkService.formatDate($scope.params.date);
		$scope.params.date = myDate;
		
		console.info($scope.params);
		
		FrameworkService.getGenericPostCall('GetAppointment.php', $scope.params
				, function(response){
					console.log(response);
					alert(response);								
					$state.go('app.appointmentApproval');
				}
		
		        ,function(error){
		        	console.log(error);
		});
		
		 		
	}
	 
})



.controller('missedCallCtrl',function( $state, $scope, FrameworkService){

	$scope.UserData = JSON.parse(localStorage.getItem("UserData"));		
	
	FrameworkService.getGenericGetCall('getAppointmentList.php?HospitalID=' 
			+ $scope.UserData[0].HospitalID + '&DoctorID=' + $scope.UserData[0].UserID + '&pr=L004'
 			, function(response){
 	  			$scope.MissedCallList = response.data; 

                for(var i =0;i< $scope.MissedCallList.length;i++){
						$scope.MissedCallList[i].momentEntryDateTime_bind = moment($scope.MissedCallList[i].EntryDateTime_bind, "YYYYMMDD").fromNow(); 
				}

 	  			console.info($scope.MissedCallList);
 	  			  
 			}
 	        ,function(error){
 	        	console.log(error);
 	});

})

