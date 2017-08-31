jQuery(document).ready(function() {




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
$("#addUser").on("click",function () {
	$(".reg").css("display","block");
	console.log($(".reg #identity").val())
})

    $(".glyphicon-remove").on("click",function () {
        $(".reg input").val("");
        $("#error").html("");
        $(".reg").css("display","none")
    })

	//注册验证表单
	function vailForm() {
		var form = $(".reg form");
        $("#error").html("");
        if(!vailNickName($(".reg #username").val())) return;
        if(!vailPwd($(".reg #psw").val())) return;
        if(!vailConfirmPwd($(".reg #confirmPsw").val(),$(".reg #psw").val())) return;
        if(!vailrealName($(".reg #realName").val())) return;
        if(!vailPhone($(".reg #phoneNumber").val())) return;
        if(!vailEmail($(".reg #email").val())) return;
        if(checkNewUser()){
            gwfAlert("注册成功");
            $(".reg input").val("");
            $("#error").html("");
            $(".reg").css("display","none");
            refresh();
        }


	}
	//注册提交表单
	$('.reg button').click(function() {
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
			type: "GET",
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

	//注册登录时验证用户信息
	function checkNewUser(){
		var flag = false;
		var nickName = $(".reg #username").val();
		var password = $(".reg #psw").val();
		var realName = $(".reg #realName").val();
		var phone = $(".reg #phoneNumber").val();
		var email = $(".reg #email").val();
		var identity = $(".reg #identity").val();
		var Data = "userName=" + nickName + "&password=" + password + "&realName=" + realName + "&mobile=" + phone + "&email=" + email+ "&identity=" + identity ;
		$.ajax({
			url:"/user/registerByAdmin",
			dataType: "",
			type: "post",
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





});









	