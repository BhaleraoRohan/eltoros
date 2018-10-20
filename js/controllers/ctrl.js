materialAdmin

	.controller('homeCtrl',function( $state, $scope,FrameworkService,$rootScope){
		
		$scope.data = JSON.parse(localStorage.getItem("UserData"))[0]; 
 
	//	console.info($scope.data);
		FrameworkService.getGenericGetCall('dash_reptr_AppointmentBarChart.php?HospitalID=' 
				+ $scope.data.HospitalID + "&DoctorID=" + $scope.data.UserID
				, function(response){  
					 
					if($scope.data.RoleID === "1"){
						$state.go('app.user');
					}
					/*else if($scope.data.RoleID === "2"){
						$state.go('app.user');
					}*/
					else if($scope.data.RoleID === "3"){
						$state.go('app.appointmentApproval');
					}
					else if($scope.data.RoleID === "4"){
						$state.go('app.investigation');
					}
	
					if($scope.data.RoleID === "2"){
						var chart = null;
						var dataPoints = [];
						var data = response.data; 
						
						if(chart === null ){
							$scope.reptrInit++;
							chart = new CanvasJS.Chart("chartContainer", {
								animationEnabled: true,
								exportEnabled: true,
								theme: "light2",
								title: {
									text: "Daily Appointments",
										titleFontSize: 14
								}, 
								axisX: {
									title: "Date",
									titleFontSize: 14,
									
								},
								axisY: {
									title: "Appointments",
									titleFontSize: 16,
									
								},
								data: [{
									type: "line", 
									dataPoints: dataPoints
								}]
							});
							
							for (var i = 0; i < data.length; i++) {
								dataPoints.push({
									x: new Date(data[i].date),
									y: parseInt(data[i].appT)
								});
							}
							chart.render(); 
						}
					} 
				 
				}
		        ,function(error){
		        	console.log(error);
		         	
		});	
		
		// Permissions
    	$scope.grant = {
            	Home : {
            		isVisible : false,
            		title:"Home"
            	},
            	Administrator:{
            		isVisible : false,
            		title:"Administrator"
            	},
            	Patient:{
            		isVisible : false,
            		title:"Patient"
            	},
            	Messaging:{
            		isVisible : false,
            		title:"Messaging_test"
            	},
            	Slot:{
            		isVisible : false,
            		title:"Time Management"
            	},
            	Appointments:{ 
                	isVisible : false,
                	title:"Messaging", 
            		sub:{
            			MakeAppointment:{
                    		isVisible : false,
                    		title:"Make Appointment"
                    	},
            			Approval:{
                    		isVisible : false,
                    		title:"Approval"
                    	},
            			MyAppointment:{
                    		isVisible : false,
                    		title:"My Appointment"
                    	},
            			MissedCallList:{
                    		isVisible : false,
                    		title:"Todays Missed Calls"
                    	}        			
            		}
            	},
            	Invoice:{
            		isVisible : false,
            		title:"Invoice"
            	},
            	Investigation:{
            		isVisible : false,
            		title:"Investigation"
            	}
            }; 
    	
    	
    	 
    	
            if($scope.data.RoleID === "1"){
            	$scope.grant = {
                    	Home : {
                    		isVisible : true,
                    		title:"Home"
                    	},
                    	Administrator:{
                    		isVisible : true,
                    		title:"Administrator"
                    	},
                    	Patient:{
                    		isVisible : true,
                    		title:"Patient"
                    	},
                    	Messaging:{
                    		isVisible : false,
                    		title:"Messaging"
                    	},
                    	Slot:{
                    		isVisible : false,
                    		title:"Time Management"
                    	},
                    	Appointments:{ 
                        	isVisible : false,
                        	title:"Appointments", 
                    		sub:{
                    			MakeAppointment:{
                            		isVisible : false,
                            		title:"Make Appointment"
                            	},
                    			Approval:{
                            		isVisible : false,
                            		title:"Approval"
                            	},
                    			MyAppointment:{
                            		isVisible : false,
                            		title:"My Appointment"
                            	},
                    			MissedCallList:{
                            		isVisible : false,
                            		title:"Todays Missed Calls"
                            	}        			
                    		}
                    	},
                    	Invoice:{
                    		isVisible : false,
                    		title:"Invoice"
                    	},
                    	Investigation:{
                    		isVisible : false,
                    		title:"Investigation"
                    	}
                    };
            }
            else if($scope.data.RoleID === "2"){
            	$scope.grant = {
                    	Home : {
                    		isVisible : true,
                    		title:"Home"
                    	},
                    	Administrator:{
                    		isVisible : false,
                    		title:"Administrator"
                    	},
                    	Patient:{
                    		isVisible : true,
                    		title:"Patient"
                    	},
                    	Messaging:{
                    		isVisible : true,
                    		title:"Messaging"
                    	},
                    	Slot:{
                    		isVisible : true,
                    		title:"Time Management"
                    	},
                    	Appointments:{ 
                        	isVisible : true,
                        	title:"Appointments", 
                    		sub:{
                    			MakeAppointment:{
                            		isVisible : true,
                            		title:"Make Appointment"
                            	},
                    			Approval:{
                            		isVisible : true,
                            		title:"Approval"
                            	},
                    			MyAppointment:{
                            		isVisible : true,
                            		title:"My Appointment"
                            	},
                    			MissedCallList:{
                            		isVisible : true,
                            		title:"Todays Missed Calls"
                            	}        			
                    		}
                    	},
                    	Invoice:{
                    		isVisible : true,
                    		title:"Invoice"
                    	},
                    	Investigation:{
                    		isVisible : true,
                    		title:"Investigation"
                    	}
                    };
            	
            }
    		else if($scope.data.RoleID === "3"){
    			$scope.grant = {
    		        	Home : {
    		        		isVisible : false,
    		        		title:"Home"
    		        	},
    		        	Administrator:{
    		        		isVisible : false,
    		        		title:"Administrator"
    		        	},
    		        	Patient:{
    		        		isVisible : true,
    		        		title:"Patient"
    		        	},
    		        	Messaging:{
    		        		isVisible : true,
    		        		title:"Messaging"
    		        	},
    	            	Slot:{
    	            		isVisible : false,
    	            		title:"Time Management"
    	            	},
    		        	Appointments:{ 
    		            	isVisible : true,
    		            	title:"Appointments", 
    		        		sub:{
    		        			MakeAppointment:{
    		                		isVisible : true,
    		                		title:"Make Appointment"
    		                	},
    		        			Approval:{
    		                		isVisible : true,
    		                		title:"Approval"
    		                	},
    		        			MyAppointment:{
    		                		isVisible : false,
    		                		title:"My Appointment"
    		                	},
    		        			MissedCallList:{
    		                		isVisible : false,
    		                		title:"Todays Missed Calls"
    		                	}        			
    		        		}
    		        	},
    		        	Invoice:{
    		        		isVisible : true,
    		        		title:"Invoice"
    		        	},
    		        	Investigation:{
    		        		isVisible : false,
    		        		title:"Investigation"
    		        	}
    		        };
    		}
    		else if($scope.data.RoleID === "4"){
    			$scope.grant = {
    		        	Home : {
    		        		isVisible : false,
    		        		title:"Home"
    		        	},
    		        	Administrator:{
    		        		isVisible : false,
    		        		title:"Administrator"
    		        	},
    		        	Patient:{
    		        		isVisible : false,
    		        		title:"Patient"
    		        	},
    		        	Messaging:{
    		        		isVisible : false,
    		        		title:"Messaging"
    		        	},
    	            	Slot:{
    	            		isVisible : false,
    	            		title:"Time Management"
    	            	},
    		        	Appointments:{ 
    		            	isVisible : false,
    		            	title:"Appointments", 
    		        		sub:{
    		        			MakeAppointment:{
    		                		isVisible : false,
    		                		title:"Make Appointment"
    		                	},
    		        			Approval:{
    		                		isVisible : false,
    		                		title:"Approval"
    		                	},
    		        			MyAppointment:{
    		                		isVisible : false,
    		                		title:"My Appointment"
    		                	},
    		        			MissedCallList:{
    		                		isVisible : false,
    		                		title:"Todays Missed Calls"
    		                	}        			
    		        		}
    		        	},
    		        	Invoice:{
    		        		isVisible : false,
    		        		title:"Invoice"
    		        	},
    		        	Investigation:{
    		        		isVisible : true,
    		        		title:"Investigation"
    		        	}
    		        };
    		}
            
//           //console.info($scope.grant);
		
		FrameworkService.getGenericGetCall('dash_reptr_AppointmentCount.php?HospitalID=' + $scope.data.HospitalID
				+ "&DoctorID=" + $scope.data.UserID
				, function(response){ 
					console.info(response);
					 $scope.app_cnt = response.data[0];
					 console.info($scope.dsh_AppointmentCount); 
				 
				}
		        ,function(error){
		        	console.log(error);
		});	
		
		FrameworkService.getGenericGetCall('rptr_RevunueByDoctor.php?HospitalID=' 
				+ $scope.data.HospitalID + "&DoctorID=" + $scope.data.UserID
				, function(response){ 
					console.info(response);
					 $scope.dsh = response.data[0];
					// console.info($scope.dsh_AppointmentCount); 
				 
				}
		        ,function(error){
		        	console.log(error);
		});	
		
		 
	})

	.controller('loginCtrl',function( $state, $scope,FrameworkService,$rootScope){
		 
		this.login = 1;
        this.register = 0;
        this.forgot = 0;
		
		$scope.params = {
				UserName :"",
				Password:"",
				usertype:"Superadmin"
		}
		 
		
		$scope.Authenticate = function(){ 
			//console.info($scope.params);		
			
			if($scope.params.UserName.length > 4 && $scope.params.Password.length >= 4){
			FrameworkService.getGenericPostCall('UserAuthentication.php',$scope.params
					, function(response){
						console.log(response); 			
						if(response !== "0"){
							localStorage.setItem("UserData", response);
							$rootScope.app.pageData = response;
							
							$state.go('home');	
						} 
						else{
							
							alert("Invalid Username or Password. Please try Again..."); 
						}
						
					}
			        ,function(error){
			        	console.log(error);
					});			
			}
			else{
				alert("Please enter valid username or password....");
			}
		}		
	})
		
	
	.controller('receptionistCtrl',function( $state, $scope, ngTableParams, tableService,FrameworkService){
			
		 $scope.UserData = JSON.parse(localStorage.getItem("UserData"));
		 $scope.RAppointmentList = [];
		 $scope.btnAddNew = function(num,doc){
				var asd = {				 
						 prevState : 'app.appointmentApproval',
						 MobileNumber : num,
						 DoctorID:doc,
						 regSource: 'Appointment'
					}
				  
				 var data = {
						 params : FrameworkService.getEncryptedString(asd)
				 }			 
				 $state.go('app.patientDetails', data); 
			}
			
		 getPatientListtoAppoint($scope,FrameworkService);
			
			$scope.btnAppoint = function(w){				
				$scope.params = {
						priority:'REGISTERED'  ,
				    	AppointmentID: w.AppointmentID,
				    	date:w.date ,
				    	HospitalID:w.HospitalID,
				    	DoctorID: w.DoctorID						
				}			
				
				//console.info($scope.params);				
				FrameworkService.getGenericPostCall('ChangePatientStatus.php', $scope.params
						, function(response){
							//console.log(response);
							alert("Registered Successfully ! ! ! ");
							location.reload();
							//getPatientListtoAppoint($scope,FrameworkService);
						}
				        ,function(error){
				        	console.log(error);				        	 
				});
			}
			
			
			function getPatientListtoAppoint($scope,FrameworkService){
				
				FrameworkService.getGenericGetCall('appointmentByStatus.php?HospitalID=' + $scope.UserData[0].HospitalID 
						, function(response){
						//	console.log(response);
								 
							$scope.RAppointmentList = response.data;
						//console.info($scope.RAppointmentList );
						}
				        ,function(error){
				        	console.log(error);
					});
			}		
			
			
			$scope.MakeAppointment = function(){

				//var url = $state.href('app.spcl', {parameter: "parameter"});
				var url = $state.href('app.make');
				window.open(url,'_blank');
				
			} 			
	})
	
	.controller('makeAppointmentCtrl',function( $state, $scope, FrameworkService){
		
		$scope.UserData = JSON.parse(localStorage.getItem("UserData"))[0];		
		
		$scope.params = {
				HospitalID : "",
				DoctorID : "",
				TimeSlot : "0",
				MobileNumber : "",
				Purpose:"NA",
				date : "",
				type:"0"
			};
		
		$scope.DoctorList =[];
		FrameworkService.getGenericGetCall('LOV_GetDoctorList.php?HospitalID=' + $scope.UserData.HospitalID
				, function(response){ 
			$scope.DoctorList = response.data;  
		}
		,function(error){
			console.log(error);
		});
		
		
		$scope.btnClose = function(){			
			$state.go('home');	
		}
		
		$scope.btnSubmit = function(){	
			
			$scope.params.HospitalID = $scope.UserData.HospitalID;
			var myDate = FrameworkService.formatDate($scope.params.date);
			$scope.params.date = myDate;
			
			//console.info($scope.params);
			
			/*FrameworkService.getGenericPostCall('GetAppointment.php', $scope.params
					, function(response){
						console.log(response);
						alert(response);								
						$state.go('app.appointmentApproval');
					}
			
			        ,function(error){
			        	console.log(error);
			});
			*/
			 		
		}
		
		 
	})
	
	

	.controller('patientCtrl',function( $state, $scope, ngTableParams, tableService,FrameworkService){
		
		$scope.UserData = JSON.parse(localStorage.getItem("UserData"));
		//console.info($scope.UserData );
		$scope.PatientList = [];		
		FrameworkService.getGenericGetCall('getPatientList.php?HospitalID=' 
					+ $scope.UserData[0].HospitalID	
					+ "&DoctorID=" +  $scope.UserData[0].UserID
				, function(response){
					//console.log("response : " + response);	
					$scope.PatientList = response.data;
					
					for(var i =0;i< $scope.PatientList.length;i++){
						
						$scope.PatientList[i].momentLastVisitDate = moment($scope.PatientList[i].LastVisitDate, "YYYYMMDD").fromNow();
						$scope.PatientList[i].momentRegDate = moment($scope.PatientList[i].CreatedOn, "YYYYMMDD").fromNow();
						
					}
					
					
					console.info($scope.PatientList);
				}
		        ,function(error){
		        	console.log(error);
			});	  

		  $scope.tableBasic = new ngTableParams({
	            page: 1,            // show first page
	            count: 10           // count per page  
	        }, {
	            total: $scope.PatientList.length, // length of data
	            getData: function ($defer, params) {
	                $defer.resolve($scope.PatientList.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	            }
	        })
		  
		  $scope.btnAddNew = function(){
				var asd = {				 
						 prevState : 'app.patient',
						 regSource: 'NewB' 
					}
				  
				 var data = {
						 params : FrameworkService.getEncryptedString(asd)
				 }			 
				 $state.go('app.patientDetails', data); 
			}
		   
		  $scope.ShowDetails = function(obj){
			  var asd = {				 
						 prevState : 'app.patient',
						 regSource: 'Details',
						 HospitalID: obj.HospitalID,
						 DoctorID: obj.DoctorID,
						 MobileNumber: obj.MobileNumber
					}
			  var data = {
						 params : FrameworkService.getEncryptedString(asd)
				 }	
			  $state.go('app.patientDetails',  data); 
		  }
		  
	})
	  
	.controller('patientDetailsCtrl',function( $state, $stateParams,$scope, ngTableParams, tableService,FrameworkService){
		//debugger;
		
			$scope.DoctorList = [];
			$scope.params = {
					DoctorID:"",
					FirstName:"",
					MiddleName:"",
					LastName:"",
					gender:"",
					Age:"",
					City:"",
					MobileNumber:"",
					Email:"",
					AdharNumber:"",
					PANNumber:"",
					isHavingReference:false,
					ReferenceDetails:"NA",
					Comment:"",
					defaultLanguage:""
			}	
			 
	
			$scope.UserData = JSON.parse(localStorage.getItem("UserData"))[0];
			$scope.PageMode = "New";
			if($stateParams && $stateParams.params){
	
				var data = LZString.decompressFromBase64($stateParams.params);
				 $scope.PageData = {};
				 
				 if(data){
				     localStorage.setItem("MyPatient",data); 
				     $scope.PageData = JSON.parse(data);
				 }
				 else{
				     $scope.PageData = JSON.parse(localStorage.getItem("MyPatient"));
				 }
				 
				 
				 	console.info($scope.PageData); 
					
					$scope.isMobileEditable = true;
				
					if($scope.PageData && $scope.PageData.regSource 
							&& $scope.PageData.regSource == 'NewB' || $scope.PageData.regSource == 'Appointment'){
						
						
						if($scope.PageData.regSource == 'Appointment'){
							$scope.isMobileEditable = false;
						}
						
						$scope.PageMode = "New";	
						$scope.params.HospitalID = $scope.UserData.HospitalID;
						$scope.params.DoctorID = $scope.PageData.DoctorID;
						$scope.params.MobileNumber= $scope.PageData.MobileNumber;
						FrameworkService.getGenericGetCall('LOV_GetDoctorList.php?HospitalID=' + $scope.UserData.HospitalID
								, function(response){
							console.log(response);
							var data = response.data;
							$scope.DoctorList = data; 
							//console.log($scope.DoctorList);	 
						}
						,function(error){
							console.log(error);
						});
					} 
					else{
						$scope.isMobileEditable = false;
						$scope.PageMode = "UPDATE";	
						$scope.params.DoctorID = $scope.PageData.DoctorID; 
						$scope.params.MobileNumber = $scope.PageData.MobileNumber;
						$scope.params.HospitalID = $scope.PageData.HospitalID;
	 
						FrameworkService.getGenericGetCall('getPatientDetails.php?HospitalID=' 
								 +  $scope.PageData.HospitalID
								 +  "&DoctorID=" + $scope.PageData.DoctorID
								 +  "&MobileNumber=" + $scope.PageData.MobileNumber
									, function(response){
			        					console.log(response); 
			        					$scope.params = response.data[0]; 
			        					 
			        					/*if($scope.params.Gender === 'M')
			        						$scope.params.Gender = "Male";
			        					else if($scope.params.Gender === 'F')
			        						$scope.params.Gender = "Female";*/
									}
							    ,function(error){
								console.log(error);
							}); 
					}	
					 
			}
			 
			$scope.btnSave = function(op){	
				
				$scope.params.op = op;
				console.info($scope.params);
				FrameworkService.getGenericPostCall('PatientRegistration.php', $scope.params
						, function(response){
							console.log(response);
								alert("Success ! ! ! ");
								$state.go('app.patient');
							
						}
				        ,function(error){
				        	console.log(error);
				});
			}
			
			$scope.btnBack = function(){
				 if($scope.PageData && $scope.PageData.prevState){
					 //console.log($scope.PageData.prevState);
					 $state.go($scope.PageData.prevState);
				 }
				 else{
					 $state.go('app.patient');
				 }
			 }
		
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	 
	
	
	.controller('treatmentCtrlV1',function( $state, $stateParams
			, $scope, ngTableParams, tableService,FrameworkService){
	    
	    $scope.UserData = JSON.parse(localStorage.getItem("UserData")); 
	    $scope.date = new Date();
		$scope.patientparams = {
				DoctorID:"",
				FirstName:"",
				MiddleName:"",
				LastName:"",
				gender:"",
				Age:"",
				City:"",
				MobileNumber:"",
				Email:"",
				AdharNumber:"",
				PANNumber:"",
				isHavingReference:false,
				ReferenceDetails:"NA",
				Diagnosis:"",
				Treatment:"",
				
				SPO2:"",
				Pulse:""
		}	
		
		$scope.params = {
				
				Height : "",
				Weight:"",
				BP:"",
				systolic:"",
				diastolic:"",
				Pulse:"",
				SPO2:"",
				Complaint:"", 
				Diagnosis:"",
				Examination:"",
				Nutrition:""	,
				NextVisitDate:""
		}
		
		$scope.ComplaintList = [{id: '1',name:'Test1'},{id: '2',name:'Test2'},{id: '3',name:'Test3'},{id: '4',name:'Test4'}];
		$scope.ExaminationList = [{id: '1',name:'c3'},{id: '2',name:'g2'}];
		$scope.DiagnosisList = [{id: '1',name:'c3'},{id: '2',name:'i2'}];
		$scope.NutritionList = [{id: '1',name:'c3'},{id: '2',name:'y2'}];
		$scope.crrDiagnos = ""; 
		 
		$scope.DoctorLOVList = []; 
		 FrameworkService.getGenericGetCall('lov.php?HospitalID=' 
		    		+ $scope.UserData[0].HospitalID + "&DoctorID=" + $scope.UserData[0].UserID
		    		
					, function(response){
				console.log(response);
				var data = response.data;
				//debugger;
				$scope.DoctorLOVList = data;  
			}
			,function(error){
				console.log(error);
		});
		
		 
		 $scope.lov= {
					"LOVType" :"",	
					"val":"",
					"isActive":true
				}
		 
		$scope.OpenModal = function(_LOVType){ 
			   $scope.lov.LOVType = _LOVType;
			   $('#LOVModal').modal('show');
		}
		  
		$scope.addLOV = function(){  
			   $scope.lov.HospitalID = $scope.UserData[0].HospitalID;
			   $scope.lov.DoctorID = $scope.UserData[0].UserID;
			   $scope.lov.op = "INSERT"; 
				
				FrameworkService.getGenericPostCall('lov.php', $scope.lov
						, function(response){
							console.log(response);
							if(parseInt(response) === 1){ 
								
								 FrameworkService.getGenericGetCall('lov.php?HospitalID=' 
								    		+ $scope.UserData[0].HospitalID + "&DoctorID=" + $scope.UserData[0].UserID
								    		
											, function(response){
										console.log(response);
										var data = response.data;
										$scope.DoctorLOVList = data;  
										$scope.lov.val = "";
										$('#LOVModal').modal('hide');
									}
									,function(error){
										console.log(error);
								});
								
							}
							else{
								alert("Falied to change ! ! ! ");
							}					
							
						}
				        ,function(error){
				        	console.log(error); 
				});	
			
		}
		
		 
		$scope.onComplaintSelect = function(){   
			//console.info($scope.params);
			var appendStr = $( "#sel_Complaint option:selected" ).text();
			if(appendStr.length > 0){
			 	if($scope.params.Complaint.length > 0){
			 		$scope.params.Complaint = $scope.params.Complaint + ", ";
			 	}
				$scope.params.Complaint = $scope.params.Complaint.concat(appendStr);
			}
		}
		 
		$scope.onExaminationSelect = function(){   
			//console.info($scope.params);
			var appendStr = $( "#sel_Examination option:selected" ).text();
			if(appendStr.length > 0){
			 	if($scope.params.Examination.length > 0){
			 		$scope.params.Examination = $scope.params.Examination + ", ";
			 	}
				$scope.params.Examination = $scope.params.Examination.concat(appendStr);
			}
		}
		 
		$scope.onNutritionSelect = function(){   
			//console.info($scope.params);
			var appendStr = $( "#sel_Nutrition option:selected" ).text();
			if(appendStr.length > 0){
			 	if($scope.params.Nutrition.length > 0){
			 		$scope.params.Nutrition = $scope.params.Nutrition + ", ";
			 	}
				$scope.params.Nutrition = $scope.params.Nutrition.concat(appendStr);
			}
		}
		 
		$scope.onDiagnosisSelect = function(){   
			//console.info($scope.params);
			var appendStr = $( "#sel_Diagnosis option:selected" ).text();
			if(appendStr.length > 0){
			 	if($scope.params.Diagnosis.length > 0){
			 		$scope.params.Diagnosis = $scope.params.Diagnosis + ", ";
			 	}
				$scope.params.Diagnosis = $scope.params.Diagnosis.concat(appendStr);
			}
		}
		
		if($stateParams && $stateParams.params){
			//debugger;
			// console.log(FrameworkService.getDecryptedString($stateParams.params))
			
			
			 
			 var data = LZString.decompressFromBase64($stateParams.params);
			 $scope.PageData = {};
			 
			 if(data){
			     localStorage.setItem("PatientDetails",data); 
			     $scope.PageData = JSON.parse(data);
			 }
			 else{
			     $scope.PageData = JSON.parse(localStorage.getItem("PatientDetails"));
			 }
			 

			 $scope.btnBack = function(){
				 $scope.passparams = {
							priority:'COMPLETE'  ,
					    	AppointmentID: $scope.params.AppointmentID,
					    	date:$scope.params.AppointmentDate ,
					    	HospitalID: $scope.params.HospitalID,
					    	DoctorID: $scope.params.DoctorID					
					}
					
					
					//console.info($scope.passparams);
					
					FrameworkService.getGenericPostCall('ChangePatientStatus.php', $scope.passparams
							, function(response){
								console.log(response);
								if(response === "1"){

									$state.go('app.appointmentList');
								}
								else{
									alert("Falied to change ! ! ! ");
								}					
								
							}
					        ,function(error){
					        	console.log(error);
					        	 
					});	
				 
			 }
			 	
			 $scope.isAlreadyTreated =true;
			 
			 
			 
			 if($scope.PageData){ 
			     console.info($scope.PageData);
			     
			     FrameworkService.getGenericGetCall('ins_TreatmentDetails.php?HospitalID=' 
				    		+ $scope.PageData.HospitalID
				    		+ "&DoctorID=" + $scope.PageData.DoctorID
				    		+ "&AppointmentID=" + $scope.PageData.AppointmentID
				    		+ "&MobileNumber=" + $scope.PageData.MobileNumber
							, function(response){ 
						var data = response.data;
						$scope.params = data[0];
						 
						
						if($scope.params === null || $scope.params === undefined)
						{
							$scope.params = {
									
									Height : "",
									Weight:"",
									BP:"",
									systolic:"",
									diastolic:"",
									Pulse:"",
									SPO2:"",
									Complaint:"", 
									Diagnosis:"",
									Examination:"",
									Nutrition:""	,
									NextVisitDate:""
							}
							$scope.isAlreadyTreated =false;
						}
						else{
							$scope.params.Complaint = data[0].ComplaintDetails; 
							$scope.params.Diagnosis = data[0].DiagnosisDetails;
							$scope.params.Examination = data[0].ExaminationDetails;
							$scope.params.Nutrition = data[0].NutritionDetails;
							$scope.params.Weight = data[0].weight;
							
							$scope.isAlreadyTreated =true;
						}
						 
						
						
					}
					,function(error){
						console.log(error);
				});
			     
			     

					$scope.params.HospitalID = $scope.PageData.HospitalID;
					$scope.params.DoctorID = $scope.PageData.DoctorID;
					$scope.params.MobileNumber = $scope.PageData.MobileNumber;
					$scope.params.AppointmentID = $scope.PageData.AppointmentID;  
					$scope.params.AppointmentDate = $scope.PageData.date;
			     
			     
			     
			     
			     
			     
			     
			     
			     
			     
			     
			      
			     $scope.btnCompleteAndNext = function(pr_in){   
			    	 
			    	 $scope.passparams = {
								priority:pr_in,
						    	AppointmentID: $scope.crrAppointmentID,
						    	date:$scope.AppointmentDate ,
						    	HospitalID: $scope.HospitalID,
						    	DoctorID: $scope.DoctorID					
						}
						
						
						//console.info($scope.passparams);
						
						FrameworkService.getGenericPostCall('ChangePatientStatus.php', $scope.passparams
								, function(response){
									console.log(response);
									if(response === "1"){
										 
									}
									else{
										alert("Falied to change ! ! ! ");
									}					
									
								}
						        ,function(error){
						        	console.log(error);
						        	 
						});	
			    	 
			    	  
			    	 
			    	 if($scope.PageData.next_Appointments.length-1 === parseInt($scope.crrAppointmentID)){
			    		 $state.go('app.appointmentList'); 
			    	 }
			    	 
			    	 var asdasd = $scope.PageData.next_Appointments;
			    	 var asdasdc = $scope.crrAppointmentID;
			    	 
			    	 $scope.crrAppointmentID = parseInt($scope.crrAppointmentID)+1;
			    	 
			    	 $scope.PageData.next_MobileNumber = $scope.PageData.next_Appointments[$scope.crrAppointmentID];
						
			    	 
			    	 $scope.passparams = {
								priority:'PROCESS'  ,
						    	AppointmentID: $scope.crrAppointmentID,
						    	date:$scope.AppointmentDate ,
						    	HospitalID: $scope.HospitalID,
						    	DoctorID: $scope.DoctorID					
						}
						
						
						//console.info($scope.passparams);
						setTimeout(function(){
							FrameworkService.getGenericPostCall('ChangePatientStatus.php', $scope.passparams
									, function(response){
										console.log(response);
										if(response === "1"){ 
										}
										else{
											alert("Falied to change ! ! ! ");
										}					
										
									}
							        ,function(error){
							        	console.log(error); 
							});
						},3000);
			    	 
			    	 
			    	  FrameworkService.getGenericGetCall('getPatientDetails.php?HospitalID=' 
								 +  $scope.PageData.HospitalID
								 +  "&DoctorID=" + $scope.PageData.DoctorID
								 +  "&MobileNumber=" + $scope.PageData.next_MobileNumber
									, function(response){
			        					console.log(response); 
			        					$scope.patientparams = response.data[0];
								
									}
							    ,function(error){
								console.log(error);
							});
			    	  
			    	  FrameworkService.getGenericGetCall('get_patientHistory.php?HospitalID=' 
								 +  $scope.PageData.HospitalID
								 +  "&DoctorID=" + $scope.PageData.DoctorID
								 +  "&MobileNumber=" + $scope.PageData.next_MobileNumber
									, function(response){ 	 
								$scope.PatientHistory = response.data;

								console.info($scope.PatientHistory);
							}
							,function(error){
								console.log(error);
							});
			    	 
						
					}
			     
			     
			     $scope.crrAppointmentID = $scope.PageData.AppointmentID;
			     $scope.AppointmentDate = $scope.PageData.date;
			     $scope.HospitalID = $scope.PageData.HospitalID;
			     $scope.DoctorID = $scope.PageData.DoctorID;
			      FrameworkService.getGenericGetCall('getPatientDetails.php?HospitalID=' 
					 +  $scope.PageData.HospitalID
					 +  "&DoctorID=" + $scope.PageData.DoctorID
					 +  "&MobileNumber=" + $scope.PageData.MobileNumber
						, function(response){
        					console.log(response); 
        					$scope.patientparams = response.data[0];
					
						}
				    ,function(error){
					console.log(error);
				});
				
				FrameworkService.getGenericGetCall('get_patientHistory.php?HospitalID=' 
					 +  $scope.PageData.HospitalID
					 +  "&DoctorID=" + $scope.PageData.DoctorID
					 +  "&MobileNumber=" + $scope.PageData.MobileNumber
						, function(response){ 	 
					$scope.PatientHistory = response.data;

					console.info($scope.PatientHistory);
				}
				,function(error){
					console.log(error);
				});
				
				 
			$scope.btnSubmit = function(){ 
			$scope.params.HospitalID = $scope.PageData.HospitalID;
			$scope.params.DoctorID = $scope.PageData.DoctorID;
			$scope.params.MobileNumber = $scope.PageData.MobileNumber;
			$scope.params.AppointmentID = $scope.PageData.AppointmentID;  
			$scope.params.AppointmentDate = $scope.PageData.date;
			
			console.info($scope.params);  
			
			//$scope.params.BP = $scope.params.BPH + " - " + $scope.params.BPL;
			
			FrameworkService.getGenericPostCall('ins_TreatmentDetails.php',$scope.params
						, function(response){
							console.log(response);
							 
							 $scope.passparams = {
										priority:'COMPLETE'  ,
								    	AppointmentID: $scope.params.AppointmentID,
								    	date:$scope.params.AppointmentDate ,
								    	HospitalID: $scope.params.HospitalID,
								    	DoctorID: $scope.params.DoctorID					
								}
								
								
								//console.info($scope.passparams);
								
								FrameworkService.getGenericPostCall('ChangePatientStatus.php', $scope.passparams
										, function(response){
											console.log(response);
											if(response === "1"){
												
												alert("Changed Successfully ! ! ! ");
												$state.go('app.appointmentList');
											}
											else{
												alert("Falied to change ! ! ! ");
											}					
											
										}
								        ,function(error){
								        	console.log(error);
								        	 
								});	
							  
							 
						}
				        ,function(error){
				        	console.log(error);
					});	
			
			
			//------------------------------------------
						
			}   
		  }			  
			 
			 
			 
			 
			//-------------------------------------- Investigation Handling
				
			 	$scope.Inv = {
			 		"HospitalID":$scope.PageData.HospitalID,
			 		"DoctorID":$scope.PageData.DoctorID,
			 		"PatientID":$scope.PageData.MobileNumber,
			 		"inv_type" : "",
			 		"InvestigationName":"",
			 		"comments":"NA"
			 	}
			 	 
			 
				$scope.isRequestedInvestigation= false;
				$scope.InvestigationList = [];
				$scope.patientInvList = [];
				$scope.patientInvList_disp = [];
				$scope.invname = "";
				
				
				$scope.btnInvestigation = function(){ 
					FrameworkService.getGenericGetCall('getInvestigationList.php?HospitalID=' 
							 +  $scope.PageData.HospitalID
							 +  "&DoctorID=" + $scope.PageData.DoctorID 
								, function(response){ 	 
							$scope.InvestigationList = response.data;
							
							for(var i=0;i< $scope.InvestigationList.length;i++){	
								
								var obj = {
									TestName: $scope.InvestigationList[i].TestName,
									TestType:$scope.InvestigationList[i].testType
								}
								
								$scope.patientInvList_disp[$scope.InvestigationList[i].TestID] 
											= obj;
								
							}
							
							//console.info($scope.InvestigationList);
							console.info($scope.patientInvList_disp);
							$scope.isRequestedInvestigation= true;
					}
					,function(error){
							console.log(error);
					}); 
				}
			
			
				
			$scope.btnBackIn = function(){
				$scope.isRequestedInvestigation= false;
			}
			
			$scope.btnInvestigationAppointment = function(){
				//debugger;
				var senderObj = $scope.Inv;
				
				try{
					
					for(var i=0;i< $scope.patientInvList.length;i++){
						var crrObj = $scope.patientInvList[i];
						senderObj.TestID =  crrObj.TestID; 
						senderObj.inv_type = crrObj.TestType;
						senderObj.InvestigationName = crrObj.TestName;
						senderObj.op = "INSERT";
						
						FrameworkService.getGenericPostCall('InvestigationRegister.php', senderObj
								, function(response){
									console.log(response);
									//$scope.btnCompleteAndNext("INVESTIGATION");
									
									$scope.passparams = {
											priority:"INVESTIGATION",
									    	AppointmentID: $scope.crrAppointmentID,
									    	date:$scope.AppointmentDate ,
									    	HospitalID: $scope.HospitalID,
									    	DoctorID: $scope.DoctorID					
									}
									 
									//console.info($scope.passparams);
									
									FrameworkService.getGenericPostCall('ChangePatientStatus.php', $scope.passparams
											, function(response){
												console.log(response);
												if(response === "1"){
													$state.go('app.appointmentList');
												}
												else{
													alert("Falied to change ! ! ! ");
												}																	
											}
									        ,function(error){
									        	console.log(error);
									        });
									      
								}
						        ,function(error){
						        	console.log(error); 
						});	 
					}
				}
				catch(err){
					 alert("ALERT !!! (Copy this error) ERRORCODE : 945623, Contact to your administrator about this error : " + err);
					 FrameworkService.getGenericGetCall('InvestigationRegister.php?HospitalID=' + $scope.UserData[0].HospitalID
					    		+"&DoctorID=" + $scope.PageData.DoctorID
					    		+"&PatientID=" + $scope.PageData.MobileNumber
								, function(response){
							console.log(response);
							alert("Investigation for patient "
									+ $scope.PageData.MobileNumber + " has been successfully recovered.");
							//console.log($scope.DoctorList);	 
						}
						,function(error){
							console.log(error);
					});			
				}
				finally {}
				
			}
			  
			$scope.btnPatientInvList = function(){ 
				//alert($scope.invname); 
				if($scope.patientInvList.length > 0){
					var count = 0;			
					for(var i=0;i< $scope.patientInvList.length;i++){
						var crr = $scope.patientInvList[i];
						if(crr.TestID === $scope.invname){
							count++;
							break;
						}			
					}
					
					if(count === 0){
						var obj = {
								TestID:$scope.invname,
								TestName: $scope.patientInvList_disp[$scope.invname].TestName,
								TestType: $scope.patientInvList_disp[$scope.invname].TestType								
						}
						
						$scope.patientInvList.push(obj);
						console.info($scope.patientInvList);
					}
					else{
						alert("You have already added.");
					}
				}
				else{
					var obj = {
							TestID:$scope.invname,
							TestName: $scope.patientInvList_disp[$scope.invname].TestName,	
							TestType: $scope.patientInvList_disp[$scope.invname].TestType								
					}					
					$scope.patientInvList.push(obj);
					console.info($scope.patientInvList);
				}
				
			}
			
			
			function ChangePatientStatus (priority_in,params){	  
			
			FrameworkService.getGenericPostCall('ChangePatientStatus.php', params
					, function(response){
						console.log(response);
						if(response === "1"){
							
							alert("Changed Successfully ! ! ! "); 
						}
						else{
							alert("Falied to change ! ! ! ");
						}					
						
					}
			        ,function(error){
			        	console.log(error);
			        	 
			});					 
		   }
			 
		} 
	})
	
	
	
	
	.controller('investigationMasterCtrl',function( $state, $scope, ngTableParams, tableService,$filter, $sce,FrameworkService){         
		

	    $scope.UserData = JSON.parse(localStorage.getItem("UserData")) 
		$scope.MasterList = [];
	    $scope.DoctorList = [];
	    $scope.pageScope = "list";
	    getList();
		
	    
	    FrameworkService.getGenericGetCall('LOV_GetDoctorList.php?HospitalID=' 
	    		+ $scope.UserData[0].HospitalID
				, function(response){
			console.log(response);
			var data = response.data;
			$scope.DoctorList = data; 
			//console.log($scope.DoctorList);	 
		}
		,function(error){
			console.log(error);
		});
	    
		function getList(){
			
			FrameworkService.getGenericGetCall('getInvestigationMasterList.php?HospitalID=' 
					 +  $scope.UserData[0].HospitalID 
						, function(response){ 	 
					$scope.MasterList = response.data;

					console.info($scope.MasterList);
				}
				,function(error){
					console.log(error);
				});
		}
	    
	    
	    
		
	    
		$scope.newAssetParam = {
				TestType:"",
				TestName:"",
				TestParams:[],
				price:0,
				isActive:1
		}
		 
		$scope.ReadingList = [];
		$scope.AddReading = function (){ 
			if($('#reading').val().length <= 2) {
				alert("Please enter details (Atleast 2 character long.)");
				return;
			}
			
			var obj = {
					key:$('#reading').val(),
					value:0,
					isActive:true
			}
			
			$scope.newAssetParam.TestParams.push(obj);
			$('#reading').val('');
		}
		
		
		$scope.btnAddNew = function(){
			$scope.pageScope='new';
		}
		
		$scope.btnAddNew_call = function(){
			 
			
			$scope.newAssetParam.TestParams = JSON.stringify( $scope.newAssetParam.TestParams, function( key, value ) {
			    if( key === "$$hashKey" ) {
			        return undefined;
			    }

			    return value;
			});
			
			$scope.newAssetParam.TestParams = $scope.newAssetParam.TestParams.replace(/"/g, '\'');
			//$scope.newAssetParam.TestParams = JSON.stringify($scope.newAssetParam.TestParams);
			$scope.newAssetParam.HospitalID =  $scope.UserData[0].HospitalID; 
			
			console.info($scope.newAssetParam);
			
		 	FrameworkService.getGenericPostCall('investigationMasterRegister.php', $scope.newAssetParam
					, function(response){
				 		$scope.newAssetParam = {
				 				TestType:"",
				 				TestName:"",
				 				TestParams:[],
				 				price:0,
				 				isActive:1
				 		}
				 		getList();	
						console.log(response);
					 					
						
					}
			        ,function(error){
			        	console.log(error);
			        	 
			});	
			
			
		}
		
		$scope.btnAddNew_cancel = function(){
			$scope.pageScope='list';
		}
		
		 
		
		 
	})
	 
	
	.controller('invoiceCtrl',function( $state, $scope, ngTableParams, tableService,$filter, $sce,FrameworkService){         
		 
	    $scope.UserData = JSON.parse(localStorage.getItem("UserData")) ;
	    
	    $scope.invoiceList=[];
	    getAppointmentList($scope,FrameworkService);
	    
	    
	    
	    $scope.rowClick = function(obj){
	    	obj.prevState = 'app.invoice_v';
	    	var asd = obj;
	    	
		  var data = {
					 params : FrameworkService.getEncryptedString(asd)
			 }	
		   console.info(asd);
	    	
	    	 $state.go('app.iPrint',data); 
	    }
	    
	    
	    
		 function getAppointmentList($scope,FrameworkService){
			 	FrameworkService.getGenericGetCall('getAppointmentList.php?HospitalID=' 
			 			+ $scope.UserData[0].HospitalID 
			 			+ '&DoctorID=' + $scope.UserData[0].UserID 
			 			+ '&pr=L006'
			 			, function(response){
			 	  			$scope.invoiceList = response.data; 

			 	  			console.info($scope.invoiceList); 
			 	  			
			 			}
			 	        ,function(error){
			 	        	console.log(error);
			 	});
			 } 	
	    
	    
	})
	
	.controller('invoiceDetailsCtrl',function( $state,$stateParams, $scope, ngTableParams, tableService,$filter, $sce,FrameworkService){         
	
		 $scope.UserData = JSON.parse(localStorage.getItem("UserData")) ;
		  
		 
		 if($stateParams && $stateParams.params){
			 var data =  LZString.decompressFromBase64($stateParams.params);
			 //console.log(data);
			 //console.info(data);
			 $scope.PageData = {}; 
			 if(data){
			     localStorage.setItem("InvoiceDetails",data); 
			     $scope.PageData = JSON.parse(data);
			 }
			 else{
			     $scope.PageData = JSON.parse(localStorage.getItem("InvoiceDetails"));
			 }
			  
			 console.info($scope.PageData);
			  
			 $scope.InvoiceDetails = {};
			 FrameworkService.getGenericGetCall('Invoice.php?HospitalID=' 
			 			+ $scope.PageData.HospitalID 
			 			+ '&MobileNumber=' + $scope.PageData.MobileNumber  
			 			, function(response){
			 	  			var data =  response.data;
			 	  			
			 	  			$scope.InvoiceDetails.ConsultationFees = data[0].ConsultationFees;
			 	  			$scope.InvoiceDetails.ComeFrom = data[0].ComeFrom;
			 	  			$scope.InvoiceDetails.Age = data[0].Age;
			 	  			$scope.InvoiceDetails.MobileNumber = data[0].MobileNumber;
			 	  			$scope.InvoiceDetails.date = data[0].date;
			 	  			$scope.InvoiceDetails.AppointmentID = data[0].AppointmentID;
			 	  			$scope.InvoiceDetails.TimeSlot = data[0].TimeSlot;
			 	  			$scope.InvoiceDetails.AppointmentType = data[0].AppointmentType;
			 	  			$scope.InvoiceDetails.PatientName = data[0].PatientName;
			 	  			
			 	  			var BillAmount = 0;
			 	  			for(var i=0;i<data.length;i++){
			 	  				var currObj = data[i];
			 	  				BillAmount+= parseInt(currObj.TestPrice);
			 	  				
			 	  			}
			 	  			BillAmount+= parseInt($scope.InvoiceDetails.ConsultationFees);

			 	  			$scope.InvoiceDetails.BillAmount = BillAmount;
			 	  			 
			 	  			
			 	  			$scope.InvoiceDetails.Particulars = data;
			 	  			console.info($scope.InvoiceDetails); 
			 	  			
			 			}
			 	        ,function(error){
			 	        	console.log(error);
			 	});
			 
		 }
		 
		  
		
	})
	
	
	
	.controller('smsCtrl',function( $state, $scope, ngTableParams, tableService,$filter, $sce,FrameworkService){         

	    $scope.UserData = JSON.parse(localStorage.getItem("UserData")); 
	    
	    $scope.templateList = [];
	    $scope.PageType = "list";
	    getList();
	    function getList(){
		    FrameworkService.getGenericGetCall('smsRegister.php?HospitalID=' 
		    		+ $scope.UserData[0].HospitalID + "&DoctorID=" + $scope.UserData[0].UserID
					, function(response){
				console.log(response);
				var data = response.data;
				$scope.templateList = data;  	 
			}
			,function(error){
				console.log(error);
			});
	    }
	    
	    $scope.params = {
	    		type:"",
	    		message:"__QUEUEID__",
	    		language:"",
	    		isActive:"true"
	    }
	     
	    $scope.RowClick = function(w){
		    $scope.PageType = "UPDATE";	
		    $scope.PageType = "new";  
		    $scope.op = "UPDATE";
		    $scope.params = w;
	    }
	    
	    $scope.btnAddNew = function(){
		    $scope.PageType = "new";	  
		    $scope.op = "INSERT";
	    }

	    $scope.btnCancel = function(){
		    $scope.PageType = "list";		    	
		    $scope.params = {
		    		type:"",
		    		message:"",
		    		language:"",
		    		isActive:"true"
		    }
	    }
	    
	    $scope.btnCreate= function(){
	    	
	    	$scope.params.HospitalID = $scope.UserData[0].HospitalID;
	    	$scope.params.DoctorID = $scope.UserData[0].UserID;
	    	$scope.params.op = $scope.op;
	    	
	    	//console.info($scope.params);
	    	
	    	var string = $scope.params.message;
                expr = /__QUEUEID__/;
	    	
	    	if(string.match(expr)){
    	    	FrameworkService.getGenericPostCall('smsRegister.php', $scope.params
    					, function(response){
    						//console.log(response); 
    						getList();
    					    $scope.PageType = "list";	
    						
    					}
    			        ,function(error){
    			        	console.log(error); 
    			});
	    	}
	    	else{
	    	    alert("Replacement string is missing. [__QUEUEID__]");
	    	}
	    	
	    }
	    
		
		
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.controller('testCtrl',function( $state, $scope, ngTableParams, tableService,$filter, $sce,FrameworkService){         
		
		 $scope.rowClick = function(ID){	
			 var asd = {					 
					 SpecificID : ID,
					 prevState : 'app.test'
				}
			  
			 var data = {
					 params : FrameworkService.getEncryptedString(asd)
			 }			 
			 $state.go('app.testDetails', data);
		 }
		 
		 
		 $scope.listdata = [1,2,3,4,5,6,7,8,9];
	 
		 
		
		$scope.PData = JSON.parse(localStorage.getItem("UserData"));
		$scope.DoctorList = [];
		
		 
	})
	
	.controller('testDetailsV1Ctrl',function( $state, $scope, ngTableParams, tableService,$filter, $sce,FrameworkService){         
	
		alert();
		
	})
	 
	             

	
	