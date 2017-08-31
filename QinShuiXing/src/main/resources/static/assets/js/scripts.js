jQuery(document).ready(function() {

	/*
	    Background slideshow
	*/
    $.backstretch([
        "assets/img/backgrounds/1.jpg", "assets/img/backgrounds/2.jpg", "assets/img/backgrounds/3.jpg"
    ], {
        duration: 3000,
        fade: 750
    });


	/*
	    Tooltips
	*/
	$('.links a').hover(function(){
		var index=$(this).index()
		color=$('.links a').eq(index).css("color")
		$('.links a').eq(index).css({color:"#0480BE"})
	},function(){
		var index=$(this).index()
		$('.links a').eq(index).css({color:color})
	})
	

	/*
	    Form validation
	*/
	//登录验证表单
	function vailForm1() {
		debugger;
		var form = $(".login form");
		// var a = checkCode($(".login #randCode").val());
        //
		// if(!checkCode($(".login #randCode").val())) {
		// 	return;
		// }

		var Data = "checkCode=" + $(".login #randCode").val();
		jQuery.ajax({
			url:"/kaptcha/ckeckCode",
			dataType: "json",
			type: "get",
			async: true,
			data: Data,
			success: function(data) {
				debugger;
				var status = data.errCode;
				if(status == 0) {
					$("#error").html("");
					if(!vailNickName($(".login #username").val())) return;
					if(!vailPwd($(".login #psw").val())) return;
					var data = {
						username : $(".login #username").val(),
						password : $(".login #psw").val()
					}

					jQuery.ajax({
						url:"user/verifyLogin",
						dataType: "",
						type: "get",
						async: true,
						data: data,
						success: function(data) {
							var status = data.errCode;
							if(status == 0) {
								$("#error").html("");
								window.location.href = "/applicationList";
							}else{
								$("#error").html(data.msg);
							}
						}
					});
				}else{
					$("#error").html(data.msg)
				}
			}
		});
	}

	$('.login button').click(function() {
		vailForm1()
	});
	//键盘控制
	document.onkeydown= function (event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e.keyCode ==13){ // enter 键要做的事情
			if(($(e.target).children().hasClass("reg"))||($(e.target).parents().hasClass("reg"))){
				vailForm();
			};
			if(($(e.target).children().hasClass("login"))||($(e.target).parents().hasClass("login"))){
				vailForm1();
			};
			if(($(e.target).children().hasClass("forgetpsw"))||($(e.target).parents().hasClass("forgetpsw"))){
				vailForm2();
			};
		}
	};




	//注册验证表单
	function vailForm() {
		var form = $(".reg form");
		if("" == $(".reg #randCode").val()){
			$("#error").html("验证码为空");
			return;
		}
		var Data = "checkCode=" + $(".reg #randCode").val();
		jQuery.ajax({
			url:"/kaptcha/ckeckCode",
			dataType: "json",
			type: "get",
			async: true,
			data: Data,
			success: function(data) {
				debugger;
				var status = data.errCode;
				if(status == 0) {
					$("#error").html("");
					if(!vailNickName($(".reg #username").val())) return;
					if(!vailPwd($(".reg #psw").val())) return;
					if(!vailConfirmPwd($(".reg #confirmPsw").val(),$(".reg #psw").val())) return;
					if(!vailrealName($(".reg #realName").val())) return;
					if(!vailPhone($(".reg #phoneNumber").val())) return;
					if(!vailEmail($(".reg #email").val())) return;
					if(!vailInvitationCode($(".reg #invitationCode").val())) return;
					if(checkNewUser()){
						gwfAlert("注册成功");
						setTimeout(function () {
                            window.location.href="/logIn";
                        },1000);
					}
				}else{
                    gwfAlert("注册失败");
					$("#error").html(data.msg)
				}
			}
		});


	}
	//注册提交表单
	$('.reg button').click(function() {
		debugger;
         vailForm()
	});
//注册页面的信息验证
	//验证用户名
	$(".reg #username").blur(function() {
		var nickName = $(".reg #username").val();
			vailNickName(nickName)
		})
		//验证密码
	$(".reg #psw").blur(function() {
		var password = $(".reg #psw").val();
			vailPwd(password)
		})
		//确认密码
	$(".reg #confirmPsw").blur(function() {
		var confirmPassword = $(".reg #confirmPsw").val();
		var password = $(".reg #psw").val();
			vailConfirmPwd(confirmPassword,password)
		})
		//验证姓名
	$(".reg #realName").blur(function() {
		var realName = $(".reg #realName").val();
			vailrealName(realName)
		})
		//验证手机号
	$(".reg #phoneNumber").blur(function() {
		var phone = $(".reg #phoneNumber").val();
			vailPhone(phone)
		})
		//验证邮箱
	$(".reg #email").blur(function() {
		var email = $(".reg #email").val();
			vailEmail(email)
		})
		//验证验证码
	$(".reg #randCode").blur(function() {
		var randCode = $(".reg #randCode").val();
			vailCode(randCode)
		})
		//验证邀请码
	$(".reg #invitationCode").blur(function() {
		var invitationCode = $(".reg #invitationCode").val();
		vailInvitationCode(invitationCode)
	})
	
	
//登录界面的验证
        //验证昵用户名	
	$(".login #username").blur(function() {
		var nickName = $(".login #username").val();
			vailNickName(nickName)
		})
		//验证密码
	$(".login #psw").blur(function() {
		var password = $(".login #psw").val();
			vailPwd(password)
		})
	

//忘记密码界面验证
        //验证昵用户名	
	$(".forgetpsw #username").blur(function() {
		var nickName = $(".forgetpsw #username").val();
			vailNickName(nickName)
		})
        //验证手机号
	$(".forgetpsw #phoneNumber").blur(function() {
		var phone = $(".forgetpsw #phoneNumber").val();
			vailPhone(phone)
		})
		//验证邮箱
	$(".forgetpsw #email").blur(function() {
		var email = $(".forgetpsw #email").val();
			vailEmail(email)
		})

//修改密码界面验证
        //验证用户名
	$(".changePsw #username").blur(function() {
		var nickName = $(".changePsw #username").val();
			vailNickName(nickName)
		})
		//验证密码
	$(".changePsw #originalpsw").blur(function() {
		var password = $(".changePsw #originalpsw").val();
			vailPwd(password)
		})
	    //验证新密码
	$(".changePsw #psw").blur(function() {
		var password = $(".changePsw #originalpsw").val();
		var newpsw = $(".changePsw #psw").val();
			vailNewPwd(password,newpsw)
		})
		//确认密码
	$(".changePsw #confirmPsw").blur(function() {
		var confirmPassword = $(".changePsw #confirmPsw").val();
		var newpsw = $(".changePsw #psw").val();
			vailConfirmPwd(confirmPassword,newpsw)
		})




	//验证昵称
	function vailNickName(nickName) {
		var flag = false;
		var message = "";
		var patrn = /^\d+$/;
		var length = getNickNameLength(nickName);
		if(nickName == '') {
			message = "用户名不能为空！";
		} else if(length < 4 || length > 16) {
			message = "用户名为4-16个字符！";
		}
		//		else if(checkNickNameIsExist(nickName)) {
		//			message = "该用户名已经存在，请重新输入！";
		//		} 
		else {
			flag = true;
		}
		if(!flag) {
			$("#error").html(message)
		} else {
			$("#error").html("")
		}
		return flag;
	}
	//计算昵称长度
	function getNickNameLength(nickName) {
		var len = 0;
		for(var i = 0; i < nickName.length; i++) {
			var a = nickName.charAt(i);　　　　　　
			//	函数格式：stringObj.match(rgExp) stringObj为字符串必选 rgExp为正则表达式必选项
			//	返回值：如果能匹配则返回结果数组，如果不能匹配返回null
			if(a.match(/[^\x00-\xff]/ig) != null) {
				len += 2;
			} else {
				len += 1;
			}
		}
		return len;
	}
	//验证昵称是否存在
	function checkNickNameIsExist(nickName) {
		var flag = false;
		$.ajax({
			url: "",
			data: {
				nickName: nickName
			},
			dataType: "json",
			type: "GET",
			async: false,
			success: function(data) {
				var status = data.status;
				if(status == "1") {
					flag = true;
				}
			}
		});
		return flag;
	}

	//验证密码
	function vailPwd(password) {
		var flag = false;
		var message = "";
		var patrn = /^\d+$/;
		if(password == '') {
			message = "密码不能为空！";
		} else if(password.length < 6 || password.length > 16) {
			message = "密码6-16位！";
		} else if(patrn.test(password)) {
			message = "密码不能全是数字！";
		} else {
			flag = true;
		}
		if(!flag) {
			$("#error").html(message)
		} else {
			$("#error").html("")
		}
		return flag;
	}
	//验证新密码
	function vailNewPwd(password,newpsw) {
		var flag = false;
		var message = "";
		var patrn = /^\d+$/;
		if(newpsw == '') {
			message = "密码不能为空！";
		} else if(newpsw.length < 6 || newpsw.length > 16) {
			message = "密码6-16位！";
		} else if(patrn.test(newpsw)) {
			message = "密码不能全是数字！";
		} else if(newpsw == password) {
			message = "与原密码输入一致，请重新输入！";
		} else {
			flag = true;
		}
		if(!flag) {
			$("#error").html(message)
		} else {
			$("#error").html("")
		}
		return flag;
	}
	//验证确认密码
	function vailConfirmPwd(confirmPassword,password) {
		var patrn = /^\d+$/;
		var flag = false;
		var message = "";
		if(confirmPassword == '') {
			message = "请输入确认密码！";
		} else if(confirmPassword != password) {
			message = "二次密码输入不一致，请重新输入！";
		} else if(patrn.test(password)) {
			message = "密码不能全是数字！";
		} else {
			flag = true;
		}
		if(!flag) {
			$("#error").html(message)
		} else {
			$("#error").html("")
		}
		return flag;
	}
	//验证姓名
	function vailrealName(realName) {
		var flag = false;
		var message = "";
		if(realName == '') {
			message = "姓名不能为空！";
		} else {
			flag = true;
		}
		if(!flag) {
			$("#error").html(message)
		} else {
			$("#error").html("")
		}
		return flag;
	}

	//验证手机号
	function vailPhone(phone) {
		var flag = false;
		var message = "";
		//var myreg = /^(((13[0-9]{1})|159|153)+\d{8})$/;
		var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
		if(phone == '') {
			message = "手机号码不能为空！";
		} else if(phone.length != 11) {
			message = "请输入有效的手机号码！";
		} else if(!myreg.test(phone)) {
			message = "请输入有效的手机号码！";
		}
		//		else if(checkPhoneIsExist(phone)) {
		//			message = "该手机号码已经被绑定！";
		//		} 
		else {
			flag = true;
		}
		if(!flag) {
			$("#error").html(message)
		} else {
			$("#error").html("")
		}
		return flag;
	}
	//验证手机号是否存在
	function checkPhoneIsExist(phone) {
		var flag = true;
		jQuery.ajax({
			url: "checkPhone?t=" + (new Date()).getTime(),
			data: {
				phone: phone
			},
			dataType: "json",
			type: "get",
			async: false,
			success: function(data) {
				var status = data.status;
				if(status == "0") {
					flag = false;
				}
			}
		});
		return flag;
	}
	//手机号码验证
//	function checktelephone(cellPhone) {
//		var RegCellPhone = /^([0-9]{11})?$/;
//		falg = cellPhone.search(RegCellPhone);
//		if(falg == -1) {
//			return false;
//		} else {
//			return true;
//		}
//	}

	//验证邮箱
	function vailEmail(email) {
		var flag = false;
		var message = "";
		var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
		if(email == '') {
			message = "邮箱不能为空！";
		} else if(!myreg.test(email)) {
			message = "请输入有效的邮箱地址！";
		}
		//		else if(checkEmailIsExist(email)) {
		//			message = "该邮箱地址已经被注册！";
		//		} 
		else {
			flag = true;
		}
		if(!flag) {
			$("#error").html(message)
		} else {
			$("#error").html("")
		}
		return flag;
	}
	//验证邮箱是否存在
	function checkEmailIsExist(email) {
		var flag = false;
		jQuery.ajax({
			url: "checkEmail?t=" + (new Date()).getTime(),
			data: {
				email: email
			},
			dataType: "json",
			type: "GET",
			async: false,
			success: function(data) {
				var status = data.status;
				if(status == "1") {
					flag = true;
				}
			}
		});
		return flag;
	}

	//验证验证码
	function vailCode(randCode) {
		var flag = false;
		var message = "";

		if(randCode == '') {
			message = "请输入验证码！";
			$("#error").html(message);
			return;
		}else {
			$("#error").html("");
			flag = true;
		}
		return flag;
	}
	//注册登录时验证用户信息
	function checkNewUser(){
		debugger;
		debugger;
		var flag = false;
		var nickName = $(".reg #username").val();
		var password = $(".reg #psw").val();
		var realName = $(".reg #realName").val();
		var phone = $(".reg #phoneNumber").val();
		var email = $(".reg #email").val();
		var invitationCode = $(".reg #invitationCode").val();
		var Data = "userName=" + nickName + "&password=" + password + "&realName=" + realName + "&mobile=" + phone + "&email=" + email + "&inviCode=" + invitationCode;
		$.ajax({
			url:"/user/register",
			dataType: "",
			type: "get",
			async: false,
			data: Data,
			success: function(data) {
				var status = data.errCode;
				if(status == 0) {
					$("#error").html("");
					flag = true;
				}else{
					$("#error").html(data.msg);
					flag = false;
				}
			}
		});
		return flag;
	}
	//检查随机验证码是否正确
	function checkCode(randCode) {
		debugger;
		var flag = false;
		var Data = "checkCode=" + randCode;
		jQuery.ajax({
			url:"/kaptcha/ckeckCode",
			dataType: "json",
			type: "get",
			async: true,
			data: Data,
			success: function(data) {
				debugger;
				var status = data.errCode;
				if(status == 0) {
					$("#error").html("")
					flag = true;
				}else{
					$("#error").html(data.msg)
					flag = false;
				}
			}
		});
		return flag;
	}
//      $.ajax({
//			url:"http://10.73.6.169:8080/kaptcha/getRandomCode",
//			dataType: "",
//			type: "GET",
//			async: false,
//			success: function(data) {
//				$(".yzm img").attr("src",data)
//			}
//		});
		
		
		
	//验证邀请码
	function vailInvitationCode(invitationCode) {
		var flag = false;
		var message = "";
		if(invitationCode == '') {
			message = "请输入邀请码！";
		}
		//		else if(!checkCode(invitationCode)) {
		//			message = "邀请码不正确！";
		//		}
		else {
			flag = true;
		}
		if(!flag) {
			$("#error").html(message)
		} else {
			$("#error").html("")
		}
		return flag;
	}

	//获取URL参数值
	function getParameter(param) {
		var query = window.location.search;
		var iLen = param.length;
		var iStart = query.indexOf(param);
		if(iStart == -1)
			return "";
		iStart += iLen + 1;
		var iEnd = query.indexOf("&", iStart);
		if(iEnd == -1)
			return query.substring(iStart);
		return query.substring(iStart, iEnd);
	}


	//注册提交表单
	$('.forgetpsw button').click(function() {
		vailForm2()
	});

	//忘记密码验证
	function vailForm2() {

		var randCode=$(".forgetpsw #randCode").val();
		if(randCode==""){
			$("#error").html("验证码为空");
			return;
		}

		var Data = "checkCode=" + $(".forgetpsw #randCode").val();
		jQuery.ajax({
			url:"/kaptcha/ckeckCode",
			dataType: "json",
			type: "get",
			async: true,
			data: Data,
			success: function(data) {
				debugger;
				var status = data.errCode;
				if(status == 0) {
					$("#error").html("");
					var form = $(".forgetpsw form");
					var nickName = $(".forgetpsw #username").val();
					var phone = $(".forgetpsw #phoneNumber").val();
					var email = $(".forgetpsw #email").val();
					var Data = "userName=" + nickName  + "&mobile=" + phone + "&email=" + email;
					$.ajax({
						url:"/user/resetPass",
						dataType: "json",
						type: "post",
						async: false,
						data: Data,
						success: function(data) {
							var status = data.errCode;
							if(status == 0) {
								alert(data.msg);
							}else{
								alert(data.msg);
							}
						}
					});
				}else{
					$("#error").html(data.msg)
				}
			}
		});



	}

});









	