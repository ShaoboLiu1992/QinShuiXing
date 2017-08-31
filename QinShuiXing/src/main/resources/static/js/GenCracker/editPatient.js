
// $('input[name="clientlymphnodemetastasis"]').eq(0).attr("checked",true);

// TypeChange
clientsampleTypeChange()
// Initialize Date Picker
$('.datepicker').datepicker();
    // clinicalInfo动态显示和去掉检测项目
    var newLine = $(".clinicalinfo").html();
    $(".addclinicalinfoline").click(function(){
        $(".clinicalinfo").append(newLine);
        $('#clientsampletypecontent1 .datepicker').datepicker()
    });

    $(".removeclinicalinfoline").click(function(){
        if($(".clinicalinfo .row").length>1){
            $(".clinicalinfo .row:last").remove();
        }
    });
// clinicalInfo1动态显示和去掉检测项目
    var newLine1 = $(".clinicalinfo1").html();
    $(".addclinicalinfoline1").click(function(){
        $(".clinicalinfo1").append(newLine1);
        $('#clientsampletypecontent1 .datepicker').datepicker();
    });

    $(".removeclinicalinfoline1").click(function(){
        if($(".clinicalinfo1 .row").length>1){
            $(".clinicalinfo1 .row:last").remove();
        }
    });

// clinicalInfo3动态显示和去掉检测项目
    var newLine3 = $(".clinicalinfo3").html();
    $(".addclinicalinfoline3").click(function(){
        $(".clinicalinfo3").append(newLine3);
        $('#clientsampletypecontent2 .datepicker').datepicker();
    });

    $(".removeclinicalinfoline3").click(function(){
        if($(".clinicalinfo3 .row").length>1){
            $(".clinicalinfo3 .row:last").remove();
        }
    });
// clinicalInfo4动态显示和去掉检测项目
    var newLine4 = $(".clinicalinfo4").html();
    $(".addclinicalinfoline4").click(function(){
        $(".clinicalinfo4").append(newLine4);
        $('#clientsampletypecontent3 .datepicker').datepicker();
    });

    $(".removeclinicalinfoline4").click(function(){
        if($(".clinicalinfo4 .row").length>1){
            $(".clinicalinfo4 .row:last").remove();
        }
    });
// clinicalInfo5动态显示和去掉检测项目
    var newLine5 = $(".clinicalinfo5").html();
    $(".addclinicalinfoline5").click(function(){
        $(".clinicalinfo5").append(newLine5);
        $('#clientsampletypecontent3 .datepicker').datepicker();
    });

    $(".removeclinicalinfoline5").click(function(){
        if($(".clinicalinfo5 .row").length>1){
            $(".clinicalinfo5 .row:last").remove();
        }
    });

    $(function(){
        debugger;
    var clientoperatedate = $("#clientoperatedate").val();
    var clientoperatetype = $("#clientoperatetype").val();
    var clientoperatedateList = clientoperatedate.split("@");
    var clientoperatetypeList = clientoperatetype.split("@");
    var clientotheroperatedateandpart = $("#clientotheroperatedateandpart").val();
    var clientotheroperatedate = clientotheroperatedateandpart.split(";^_^;")[0];
    var clientotheroperatepart = clientotheroperatedateandpart.split(";^_^;")[1];
    var clientotheroperatedateList = clientotheroperatedate.split("@");
    var clientotheroperatepartList = clientotheroperatepart.split("@");
    console.log(clientoperatedate);
    console.log(clientoperatetype);
//手术样本
    debugger
    console.log($("#clientsampletype").val())
    if($("#clientsampletype").val()=="1"){
        //先添加输入框
        for(var i=1; i<clientoperatetypeList.length; i++){
            $(".clinicalinfo4").append(newLine4);
            $('#clientsampletypecontent3 .datepicker').datepicker();
        }
        //接着往输入框里填初始值
        $(".clinicalinfo4 input:even").each(function(index, obj){
            $(obj).val(clientoperatedateList[index]);
        });
        $(".clinicalinfo4 input:odd").each(function(index, obj){
            $(obj).val(clientoperatetypeList[index]);
        });
        //other
        for(var i=1; i<clientotheroperatedateList.length; i++){
            $(".clinicalinfo5").append(newLine5);
            $('#clientsampletypecontent3 .datepicker').datepicker()
        }
        //接着往输入框里填初始值
        $(".clinicalinfo5 input:even").each(function(index, obj){
            $(obj).val(clientotheroperatedateList[index]);
        });
        $(".clinicalinfo5 input:odd").each(function(index, obj){
            $(obj).val(clientotheroperatepartList[index]);
        });
    }else if($("#clientsampletype").val()=="2"){//穿刺样本
        //先添加输入框
        for(var i=1; i<clientoperatetypeList.length; i++){
            $(".clinicalinfo").append(newLine);
            $('#clientsampletypecontent1 .datepicker').datepicker();
        }
        //接着往输入框里填初始值
        $(".clinicalinfo input:even").each(function(index, obj){
            $(obj).val(clientoperatedateList[index]);
        });
        $(".clinicalinfo input:odd").each(function(index, obj){
            $(obj).val(clientoperatetypeList[index]);
        });
        //other
        for(var i=1; i<clientotheroperatedateList.length; i++){
            $(".clinicalinfo1").append(newLine1);
            $('#clientsampletypecontent1 .datepicker').datepicker();
        }
        //接着往输入框里填初始值
        $(".clinicalinfo1 input:even").each(function(index, obj){
            $(obj).val(clientotheroperatedateList[index]);
        });
        $(".clinicalinfo1 input:odd").each(function(index, obj){
            $(obj).val(clientotheroperatepartList[index]);
        });
    }else if($("#clientsampletype").val()=="3"){//石蜡样本
        for(var i=1; i<clientotheroperatedateList.length; i++){
            $(".clinicalinfo3").append(newLine3);
            $('#clientsampletypecontent2 .datepicker').datepicker()
        }
        //接着往输入框里填初始值
        $(".clinicalinfo3 input:even").each(function(index, obj){
            $(obj).val(clientotheroperatedateList[index]);
        });
        $(".clinicalinfo3 input:odd").each(function(index, obj){
            $(obj).val(clientotheroperatepartList[index]);
        });
    }else{

    }

    });


//clientisoperatedorheroperate的style
$(".clientisoperatedorheroperate").css("display","none");
if($("input[name='clientisoperatedorheroperate']:checked").val()==1){
    $(".clientisoperatedorheroperate").css("display","block")
}else {
    $(".clientisoperatedorheroperate").css("display","none")
}
$('input[name="clientisoperatedorheroperate"]').change(function() {
    if($("input[name='clientisoperatedorheroperate']:checked").val()==1){
        $(".clientisoperatedorheroperate").css("display","block")
    }else {
        $(".clientisoperatedorheroperate").css("display","none")
    }
});
$('input[name="clientisradiotherapy"]').change(function() {
    if($("input[name='clientisradiotherapy']:checked").val()==1){
        $(".clientisradiotherapy").css("display","block")
    }else {
        $(".clientisradiotherapy").css("display","none")
    }
});
$('input[name="clientischemotherapy"]').change(function() {
    if($("input[name='clientischemotherapy']:checked").val()==1){
        $(".clientischemotherapy").css("display","block")
    }else {
        $(".clientischemotherapy").css("display","none")
    }
});
// 根据样本类型显示不同选项
function clientsampleTypeChange() {
    var oSampleType = $("#clientsampletype")[0];
    if (oSampleType.value == "1") {
        $("#clientsampletypecontent3").css("display","block").find("input").removeAttr("disabled");
        $("#clientsampletypecontent1").css("display","none").find("input").attr("disabled",true);
        $("#clientsampletypecontent2").css("display","none").find("input").attr("disabled",true);
        $("#clientsampletypecontent4").css("display","none").find("input").attr("disabled",true);
        $(".clientisoperatedorheroperate").css("display","none").find("input").removeAttr("disabled");
        $(".CLIENTISOPERATEDORHEROPERATE").find("input").removeAttr("disabled");
        $("#clientparaffinsource").removeAttr("name");
    } else if (oSampleType.value == "2") {
        $("#clientsampletypecontent1").css("display","block").find("input").removeAttr("disabled");
        $("#clientsampletypecontent2").css("display","none").find("input").attr("disabled",true);
        $("#clientsampletypecontent3").css("display","none").find("input").attr("disabled",true);
        $("#clientsampletypecontent4").css("display","none").find("input").attr("disabled",true);
        $(".clientisoperatedorheroperate").css("display","none").find("input").removeAttr("disabled");
        $("#clientparaffinsource").removeAttr("name");
    } else if (oSampleType.value == "3") {
        $("#clientsampletypecontent2").css("display","block").find("input").removeAttr("disabled");
        $("#clientsampletypecontent1").css("display","none").find("input").attr("disabled",true);
        $("#clientsampletypecontent3").css("display","none").find("input").attr("disabled",true);
        $("#clientsampletypecontent4").css("display","none").find("input").attr("disabled",true);
        $(".clientisoperatedorheroperate").css("display","none").find("input").removeAttr("disabled");
        $("#clientparaffinsource").attr("name","clientparaffinsource");
    } else{
        $("#clientsampletypecontent4").css("display","block").find("input").removeAttr("disabled");
        $("#clientsampletypecontent1").css("display","none").find("input").attr("disabled",true);
        $("#clientsampletypecontent2").css("display","none").find("input").attr("disabled",true);
        $("#clientsampletypecontent3").css("display","none").find("input").attr("disabled",true);
        $("#clientparaffinsource").removeAttr("name");
    }
}
$("#clientsampletype").change(function () {
    clientsampleTypeChange()
})
//按下"提交"按钮后，将表单中的数据提交
$("#btn-modelSubmit").click(function(){
    var oSampleType = $("#clientsampletype")[0];
    var clientOperateDateList = [];
    var clientOperateTypeList = [];
    var clientOtherOperateDateList = [];
    var clientOtherOperatePartList = [];
    var clientOperateDate = "";
    var clientOperateType = "";
    var clientOtherOperateDate = "";
    var clientOtherOperatePart = "";
    var clientOtherOperateDateAndPart = "";
    if (oSampleType.value == "1") {
        $(".clinicalinfo4 > div > div > input:even").each(function(index, obj){
            clientOperateDateList.push($(obj).val());
        });
        $(".clinicalinfo4 > div > div > input:odd").each(function(index, obj){
            clientOperateTypeList.push($(obj).val());
        });
        $(".clinicalinfo5 > div > div > input:even").each(function(index, obj){
            clientOtherOperateDateList.push($(obj).val());
        });
        $(".clinicalinfo5 > div > div > input:odd").each(function(index, obj){
            clientOtherOperatePartList.push($(obj).val());
        });
        clientOperateDate = clientOperateDateList.join("@");
        clientOperateType = clientOperateTypeList.join("@");
        clientOtherOperateDate = clientOtherOperateDateList.join("@");
        clientOtherOperatePart = clientOtherOperatePartList.join("@");
        clientOtherOperateDateAndPart = clientOtherOperateDate + ";^_^;" + clientOtherOperatePart;
    } else if (oSampleType.value == "2") {
        $(".clinicalinfo > div > div > input:even").each(function(index, obj){
            clientOperateDateList.push($(obj).val());
        });
        $(".clinicalinfo > div > div > input:odd").each(function(index, obj){
            clientOperateTypeList.push($(obj).val());
        });
        $(".clinicalinfo1 > div > div > input:even").each(function(index, obj){
            clientOtherOperateDateList.push($(obj).val());
        });
        $(".clinicalinfo1 > div > div > input:odd").each(function(index, obj){
            clientOtherOperatePartList.push($(obj).val());
        });
        clientOperateDate = clientOperateDateList.join("@");
        clientOperateType = clientOperateTypeList.join("@");
        clientOtherOperateDate = clientOtherOperateDateList.join("@");
        clientOtherOperatePart = clientOtherOperatePartList.join("@");
        clientOtherOperateDateAndPart = clientOtherOperateDate + ";^_^;" + clientOtherOperatePart;
    } else if (oSampleType.value == "3") {
        $(".clinicalinfo3 > div > div > input:even").each(function(index, obj){
            clientOtherOperateDateList.push($(obj).val());
        });
        $(".clinicalinfo3 > div > div > input:odd").each(function(index, obj){
            clientOtherOperatePartList.push($(obj).val());
        });
        clientOtherOperateDate = clientOtherOperateDateList.join("@");
        clientOtherOperatePart = clientOtherOperatePartList.join("@");
        clientOtherOperateDateAndPart = clientOtherOperateDate + ";^_^;" + clientOtherOperatePart;
    } else{

    }
    $("#clientoperatedate").val(clientOperateDate);
    $("#clientoperatetype").val(clientOperateType);
    $("#clientotheroperatedateandpart").val(clientOtherOperateDateAndPart);
//        console.log(clientOperateDate);
//        console.log(clientOperateType);
//        console.log(clientOtherOperateDateList);
//        console.log(clientOtherOperatePartList);
//        console.log(clientOtherOperateDateAndPart);
});
$("#btn-modelSubmit").click(function(){
    $.confirm({
        title: "提示",
        content: "确认执行此项操作？",
        buttons: {
            '确认': {
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function () {
                    if(!$("#clientname").val()){
                        gwfAlert("请填写姓名",false);return
                    }if(!$("#clientno").val()){
                        gwfAlert("请填写受检者编号",false);return
                    }else{
                        $("#btn-patientSubmit").click();
                    }

                }
            },
            '取消': {
                action: ""
            }
        }
    });
});

//ajaxForm提交
$('#patientForm').ajaxForm(function (callback) {
    debugger
    if (callback.errCode == 0) {
        gwfAlert("添加成功");
        setTimeout(function () {
            location.href = "/patientAdmin";
        }, 1000);
    } else {
        gwfAlert(callback.msg, false);
    }

});


