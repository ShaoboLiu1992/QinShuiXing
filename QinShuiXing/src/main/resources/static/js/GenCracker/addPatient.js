$(document).ready(function () {
    var ConsentFile=false;
    var minMissionValue = 0;
    var maxMissionValue = 90;
    $("#inputMissionValue").on("keyup", function() {
        var val = Math.abs(parseInt(this.value, 10) || minMissionValue);
        this.value = val > maxMissionValue ? maxMissionValue : val;
    });

    // TypeChange
    sampleTypeChange();
    geneticDiseaseChange();
    inspectionItemChange();

    // change time to now
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var strTime = year + "-" + month + "-" + day;

    var divTakeTime = document.getElementById("dpTakeDate");
    divTakeTime.setAttribute("data-date", strTime);
    var divReceiveTime = document.getElementById("dpReceiveDate");
    divReceiveTime.setAttribute("data-date", strTime);

    var inputTakeTime = document.getElementById("inputTakeDate");
    inputTakeTime.setAttribute("value", strTime);
    var inputReceiveTime = document.getElementById("inputReceiveDate");
    inputReceiveTime.setAttribute("value", strTime);
    // Initialize Date Picker
    $('#dpBirthDate').datepicker();
    $('#dpTakeDate').datepicker();
    $('#dpReceiveDate').datepicker();
    $('#dpReceiveDate1').datepicker();

    // Initialize file upload
    $('#ConsentFile').fileinput({
        showCaption: false,
        showUpload: false,
        showPreview : false, //是否显示预览
        fileActionSettings:{
            showZoom:false,
            showUpload:false,
            showDrag:false,
        }
    });
    $('#ClinicalReportFile').fileinput({showCaption: false});
    $('#FamilyTreeFile').fileinput({showCaption: false});
    $('#ConsentFile').on('change', function(event) {
        ConsentFile=true;
    });
    $('#ConsentFile').on('filecleared', function(event) {
        ConsentFile=false;
    });

    // jquery form: pack normal data and file
    // bind 'patientForm' and provide a simple callback function
    $("#btn-modelSubmit").click(function(){
        $.confirm({
            title: "提示",
            content: "确认执行此项操作？",
            buttons: {
                '确认': {
                    btnClass: 'btn-primary',
                    keys: ['enter'],
                    action: function () {
                        if(!$("#patientName").val()){
                            gwfAlert("请填写姓名",false);return
                        }if(!$("#patientID").val()){
                            gwfAlert("请填写受检者编号",false);return
                        }if(!$("#patientBirthDate").val()){
                            gwfAlert("请填写出生日期",false);return
                        }if(!$("#departmentName").val()){
                            gwfAlert("请填写送检单位",false);return
                        }if(!$("#departmentDoctor").val()){
                            gwfAlert("请填写送检医师",false);return
                        }if(!$("#departmentPhone").val()){
                            gwfAlert("请填写联系电话",false);return
                        }if(!$("#deadDate").val()){
                            gwfAlert("请填写截止日期",false);return
                        }if($("#sampleType")[0].value == "全血"){
                            if(!$("#SampleID").val()){
                                gwfAlert("请填写样本编号",false);return
                            }if(!$("#sampleMeasure").val()){
                                gwfAlert("请填写样本量",false);return
                            }
                        }if($("#sampleType")[0].value == "DNA"){
                            if(!$("#SampleID").val()){
                                gwfAlert("请填写样本编号",false);return
                            }if(!$("#sampleSource").val()){
                                gwfAlert("请填写样来源",false);return
                            }if(!$("#concentration").val()){
                                gwfAlert("请填写样本浓度",false);return
                            }if(!$("#volume").val()){
                                gwfAlert("请填写样本体积",false);return
                            }
                        }if($("#sampleType")[0].value == "其他"){
                            if(!$("#sampleSource").val()){
                                gwfAlert("请填写样来源",false);return
                            }if(!$("#sampleOther").val()){
                                gwfAlert("请填写样类型",false);return
                            }
                        }if(!ConsentFile){
                                gwfAlert("请上传知情同意书",false);return
                        }else {
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
    $('#patientForm').ajaxForm(function (callback) {
        if (callback.errCode == 0) {
            gwfAlert("添加成功");
            setTimeout(function () {
                location.href = "/patientAdmin";
            }, 1000);
        } else {
            gwfAlert(callback.msg, false);
        }

    });

});

// 根据样本类型显示不同选项，用jQuery重写了下
function sampleTypeChange() {
    var oSampleType = $("#sampleType")[0];
    var oSampleContent = $("#sampleTypeContent")[0].children;
    if (oSampleType.value == "全血") {
        oSampleContent[0].style.display = "inline";
        oSampleContent[1].style.display = "none";
        oSampleContent[2].style.display = "inline";
        oSampleContent[3].style.display = "none";
        oSampleContent[4].style.display = "none";
        oSampleContent[5].style.display = "inline";
    } else if (oSampleType.value == "DNA") {
        oSampleContent[0].style.display = "inline";
        oSampleContent[1].style.display = "inline";
        oSampleContent[2].style.display = "inline";
        oSampleContent[3].style.display = "inline";
        oSampleContent[4].style.display = "none";
        oSampleContent[5].style.display = "none";
    } else {
        oSampleContent[0].style.display = "none";
        oSampleContent[1].style.display = "inline";
        oSampleContent[2].style.display = "none";
        oSampleContent[3].style.display = "none";
        oSampleContent[4].style.display = "inline";
        oSampleContent[5].style.display = "none";
    }
}

// 根据遗传病信息显示不同选项
function geneticDiseaseChange() {
    var geneticDiseaseType = $("#geneticDisease")[0];
    var geneticDiseaseContent = $("#geneticDiseaseInfo")[0].children;
    if (geneticDiseaseType.value == "有家族遗传病史") {
        geneticDiseaseContent[0].style.display = "inline";
    } else {
        geneticDiseaseContent[0].style.display = "none";
    }
}

// 根据检测项目信息显示不同选项
function inspectionItemChange() {
    var inspectionItemType = $("#inspectionItem")[0];
    var inspectionItemContent = $("#inspectionItemInfo")[0].children;
    if (inspectionItemType.value == "其他项目") {
        inspectionItemContent[0].style.display = "inline";
    } else {
        inspectionItemContent[0].style.display = "none";
    }
}

// 动态显示和去掉检测项目
var newLine = $("#clinicalInfo").html();

$("#addClinicalInfoLine").click(function(){
    $("#clinicalInfo").append(newLine);
});

$("#removeClinicalInfoLine").click(function(){
    if($("#clinicalInfo .row").length>1){
        $("#clinicalInfo .row:last").remove();
    }
});

//按下“清空”按钮， 清空所有输入框的值
$('#btn-formReset').click(function () {
    $("input[type='text']").val(null);
});

//按下"保存"按钮后，将表单中的值保存到cookie中，以免丢失
$('#btn-saveInfo').click(function () {
    $.each($("input"), function (n, element) {
        $.cookie(element.id, element.value);
        // console.log(n + " " + element.id + " " + element.value);
    });
});

//按下"提交"按钮后，将表单中的数据提交
$("#btn-patientSubmit").click(function(){
    var i;
    var clinicalSymptomList = [];
    var clinicalInspectionList = [];
    var clinicalSymptom = "";
    var clinicalInspection = "";

    $("#clinicalInfo > div > div > input:odd").each(function(index, obj){
        clinicalSymptomList.push($(obj).val());
    });
    $("#clinicalInfo > div > div > input:even").each(function(index, obj){
        clinicalInspectionList.push($(obj).val());
    });
    // console.log(clinicalSymptomList);
    // console.log(clinicalInspectionList);

    for (i=0; i<clinicalSymptomList.length-1; i++) {
        var strSympt = clinicalSymptomList[i];
        if (strSympt.replace(/(^\s*)|(\s*$)/g, "").length != 0)
            clinicalSymptom += strSympt + ";^_^;";
    }
    clinicalSymptom+=clinicalSymptomList[i];
    for (i=0; i<clinicalInspectionList.length-1; i++) {
        var strInspect = clinicalInspectionList[i];
        if (strInspect.replace(/(^\s*)|(\s*$)/g, "").length != 0)
        clinicalInspection += strInspect + ";^_^;";
    }
    clinicalInspection+=clinicalInspectionList[i];
    $("#clinicalSymptom").val(clinicalSymptom);
    $("#clinicalInspection").val(clinicalInspection);
    // console.log(clinicalSymptom);
    // console.log(clinicalInspection);
});

//从cookie中读取保存的值
//TODO


