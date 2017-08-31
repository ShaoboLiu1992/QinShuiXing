var trContent1 = $(".bloodSampleDemo").html();
var trContent2 = $(".tumorSampleDemo").html();
var sampleTubeNo='';
$(function () {
    $("[data-toggle='tooltip']").tooltip();
});

$("#sampleUpload").click(function () {
    $(".modleBg").css("display","block");
    $("#addSample").css("display","block");
});
$("#sampleEdit").click(function () {
    $(".modleBg").css("display","block");
    $("#editSample").css("display","block");
    refreshBloodSampleTable();
    refreshTumorSampleTable();
});
$(".glyphicon-remove").click(function () {
    $(".modleBg").css("display","none");
    $("#editSample").css("display","none");
    $("#addSample").css("display","none");
    $(".bloodSampleDemo tr").remove();
    $(".bloodSampleDemo").append(trContent1);
    $(".tumorSampleDemo tr").remove();
    $(".tumorSampleDemo").append(trContent2);
});

$(".addBloodSampleInfo").click(function () {
    $(".bloodSampleDemo").append(trContent1);
});
$(".addTumorSampleInfo").click(function () {
    $(".tumorSampleDemo").append(trContent2);
});

$(".bloodSampleDemo").on("click",".saveBloodSample",function () {
    var bloodSampleList = [];
    var thisbutton = $(this);
    $(this).parent().siblings().each(function (index,obj) {
        bloodSampleList.push($(obj).children().val());
    })
    $.ajax({
        type : "POST",
        url : "/sample/addSample?t="+Math.random(),
        data : {
            "sampletype" : "1",
            "sampletubeno" : bloodSampleList[0],
            "sampletesttube" : bloodSampleList[1],
            "sampletubecount" : bloodSampleList[2],
            "sampledirections" : bloodSampleList[3]
        },
        cache:false,
        dataType:'json',
        success:function(data) {
            if(data.errCode==0){
                gwfAlert(data.msg);
                $(thisbutton).attr("disabled","disabled").removeClass("btn-success").addClass("btn-danger").html("已保存");
            }else if(data.errCode==10000){
                window.location.href ="/logIn"
            }else {
                gwfAlert(data.msg, false)
            }
        },
        error : function() {
        }
    });
})
$(".tumorSampleDemo").on("click",".saveTumorSample",function () {
    var tumorSampleList = [];
    var thisbutton = $(this);
    $(this).parent().siblings().each(function (index,obj) {
        tumorSampleList.push($(obj).children().val());
    })
    $.ajax({
        type : "POST",
        url : "/sample/addSample?t="+Math.random(),
        data : {
            "sampletype" : "2",
            "sampleoperationtype" : tumorSampleList[0],
            "sampletubeno" : tumorSampleList[1],
            "sampletubecount" : tumorSampleList[2],
            "sampledirections" : tumorSampleList[3]
        },
        cache:false,
        dataType:'json',
        success:function(data) {
            if(data.errCode==0){
                gwfAlert(data.msg);
                $(thisbutton).attr("disabled","disabled").removeClass("btn-success").addClass("btn-danger").html("已保存");
            }else if(data.errCode==10000){
                window.location.href ="/logIn";
            }else {
                gwfAlert(data.msg, false);
            }
        },
        error : function() {
        }
    });

});
addBloodSampleTable();
addTumorSampleTable();
function addBloodSampleTable() {
    $("#bloodSampleTable").bootstrapTable({
        columns: [{
            field: 'sampleTubeNo',
            title: '样本编号',
            class: 'text-center',
            width: 100,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '" />'
                }
            }
        }, {
            field: 'sampleTestTube',
            title: '试管类型',
            class: 'text-center',
            width: 120,
            formatter:function(val,row,index){
                return '<select class="form-control"><option value="1" '+ select(val, 1) +'>EDTA 2ml</option><option value="2" '+ select(val, 2) +'>EDTA 6ml</option><option value="3" '+ select(val, 3) +'>EDTA 10ml</option><option value="4" '+ select(val, 4) +'>streck 10ml</option><option value="5" '+ select(val, 5) +'>其他</option></select>'
            }
        }, {
            field: 'sampleTubeCount',
            title: '全血量',
            class: 'text-center',
            width: 90,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '" />'
                }
            }
        }, {
            field: 'sampleProcessedCount',
            title: '血浆量',
            class: 'text-center',
            width: 90,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '" />'
                }
            }
        },{
            field: 'sampleTransportCondition',
            title: '运输条件',
            class: 'text-center',
            width: 90,
            formatter:function(val,row,index){
                return '<select class="form-control"><option value="1" '+ select(val, 1) +'>液氮</option><option value="2" '+ select(val, 2) +'>常温</option><option value="3" '+ select(val, 3) +'>4摄氏度</option><option value="4" '+ select(val, 4) +'>干冰</option></select>'
            }
        }, {
            field: 'sampleSaveCondition',
            title: '存储条件',
            class: 'text-center',
            width: 90,
            formatter:function(val,row,index){
                return '<select class="form-control"><option value="1" '+ select(val, 1) +'>常温</option><option value="2" '+ select(val, 2) +'>4摄氏度</option><option value="3" '+ select(val, 3) +'>-20摄氏度</option><option value="4" '+ select(val, 4) +'>-80摄氏度</option><option value="5" '+ select(val, 5) +'>液氮</option></select>'
            }
        }, {
            field: 'sampleSaveLocation',
            title: '存储位置',
            class: 'text-center',
            width: 90,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '" />'
                }
            }
        },  {
            field: 'sampleChecked',
            title: '是否使用过',
            class: 'text-center',
            width: 90,
            formatter:function(val,row,index){
                if(val == 0){
                    return '<input type="text" class="form-control" value="否" readonly="readonly" />'
                }else {
                    return '<input type="text" class="form-control" value="是" readonly="readonly" />'
                }
            }
        },  {
            field: 'sampleIsLasteCount',
            title: '剩余量',
            class: 'text-center',
            width: 90,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '" />'
                }
            }
        }, {
            field: 'sampleIsLaste',
            title: '是否有剩余',
            class: 'text-center',
            width: 80,
            formatter:function(val,row,index){
                return '<select class="form-control"><option value="0" '+ select(val, 0) +'>是</option><option value="1" '+ select(val, 1) +'>否</option></select>'
            }
        },{
            field: 'sampleDirections',
            title: '样本说明',
            class: 'text-center',
            width: 210,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '"  title="' + val + '" />'
                }
            }
        }, {
            field: 'sampleCreateDate',
            title: '创建时间',
            class: 'text-center',
            width: 100,
            formatter:function(val,row,index){
                if(val == null){
                    return '-';
                }
                return new Date(val).format("yyyy-MM-dd hh:mm:ss");
            }
        }, {
            title: '操作',
            class: 'text-center',
            width: 220,
            formatter:function(val,row){
                return '<a class="btn btn-success btn-sm" onclick="saveBloodSample(\''+row.sampleUUID+'\',this)">保存</a><a class="btn btn-warning btn-sm" style="margin-left: 4px" onclick="addSampleProcessing(\''+row.sampleTubeNo+'\',\''+row.sampleUUID+'\')">新增</a><a class="btn btn-info btn-sm" style="margin-left: 4px" onclick="viewSample(\''+row.sampleTubeNo+'\',\''+row.sampleUUID+'\')">查看</a><a  class="btn btn-danger btn-sm" style="margin-left: 4px" onclick="deleteSample(\''+ row.sampleUUID + '\',\'1\')">删除</a>';
            },

        }],
        formatLoadingMessage: function() {
            return "正在查询请稍后..."
        },
        formatNoMatches: function() {
            return "查询无结果"
        },
        onLoadSuccess: function(data){  //加载成功时执行
            if(data.errCode == 10001){
                gwfAlert("认证超时");
                setTimeout(function () {
                    window.location.href = "/logIn";
                },1000);
            }
        },
        url: "/sample/getSampleList?t=" + Math.random(),
        pagination: true,
        pageList: [5, 10, 15],
        uniqueId: "id",
        dataField: "rows",
        sortable: true,
        showColumns: false, // 开启自定义列显示功能
        showRefresh: false, // 开启刷新功能
        minimumCountColumns: 2,// 设置最少显示列个数
        striped: true,
        //是否显示行间隔色
        sidePagination: "server", //服务端分页
        queryParams: function queryParams(params) {
            var temp = {
                page: parseInt(params.offset / params.limit) + 1,
                pageSize: params.limit,
                type: "1"
            };
            return temp;
        },onLoadSuccess: function(data){  //加载成功时执行
            if(data.errCode == 10000){
                gwfAlert("认证超时", false);
                setTimeout(function () {
                    window.location.href = "/logIn";
                },1000);
            }
        },
        pageSize: 5,
        pageNumber: 1,
        paginationFirstText: "首页",
        paginationPreText: "上一页",
        paginationNextText: "下一页",
        paginationLastText: "最后一页"
    });
}

function addTumorSampleTable() {
    $("#tumorSampleTable").bootstrapTable({
        columns: [{
            field: 'sampleTubeNo',
            title: '样本编号',
            class: 'text-center',
            width: 100,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '" />'
                }
            }
        },{
            field: 'sampleOperationType',
            title: '样本来源',
            class: 'text-center',
            width: 100,
            formatter:function(val,row,index){
                return '<select class="form-control"><option value="1" '+ select(val, 1) +'>手术</option><option value="2" '+ select(val, 2) +'>穿刺</option><option value="3" '+ select(val, 3) +'>石蜡</option><option value="4" '+ select(val, 4) +'>其他</option></select>'
            }
        },{
            field: 'sampleTransportCondition',
            title: '运输条件',
            class: 'text-center',
            width: 100,
            formatter:function(val,row,index){
                return '<select class="form-control"><option value="1" '+ select(val, 1) +'>液氮</option><option value="2" '+ select(val, 2) +'>常温</option><option value="3" '+ select(val, 3) +'>4摄氏度</option><option value="4" '+ select(val, 4) +'>干冰</option></select>'
            }
        }, {
            field: 'sampleSaveCondition',
            title: '存储条件',
            class: 'text-center',
            width: 100,
            formatter:function(val,row,index){
                return '<select class="form-control"><option value="1" '+ select(val, 1) +'>常温</option><option value="2" '+ select(val, 2) +'>4摄氏度</option><option value="3" '+ select(val, 3) +'>-20摄氏度</option><option value="4" '+ select(val, 4) +'>-80摄氏度</option><option value="5" '+ select(val, 5) +'>液氮</option></select>'
            }
        },  {
            field: 'sampleSaveLocation',
            title: '存储位置',
            class: 'text-center',
            width: 90,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '" />'
                }
            }
        }, {
            field: 'sampleChecked',
            title: '样本是否使用过',
            class: 'text-center',
            width: 50,
            formatter:function(val,row,index){
                if(val == 0){
                    return '<input type="text" class="form-control" value="否" readonly="readonly" />'
                }else {
                    return '<input type="text" class="form-control" value="是" readonly="readonly" />'
                }
            }
        },  {
            field: 'sampleTubeCount',
            title: '样本初始量',
            class: 'text-center',
            width: 100,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '" />'
                }
            }
        }, {
            field: 'sampleIsLasteCount',
            title: '样本剩余量',
            class: 'text-center',
            width: 100,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '" />'
                }
            }
        }, {
            field: 'sampleIsLaste',
            title: '是否有剩余',
            class: 'text-center',
            width: 50,
            formatter:function(val,row,index){
                return '<select class="form-control"><option value="0" '+ select(val, 0) +'>是</option><option value="1" '+ select(val, 1) +'>否</option></select>'
            }
        },{
            field: 'sampleDirections',
            title: '样本说明',
            class: 'text-center',
            width: 250,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" />'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '"  title="' + val + '" />'
                }
            }
        }, {
            field: 'sampleCreateDate',
            title: '创建时间',
            class: 'text-center',
            width: 100,
            formatter:function(val,row,index){
                if(val == null){
                    return '-';
                }
                return new Date(val).format("yyyy-MM-dd hh:mm:ss");
            }
        }, {
            title: '操作',
            class: 'text-center',
            width: 220,
            formatter:function(val,row){
                return '<a class="btn btn-success btn-sm" onclick="saveTumorSample(\''+row.sampleUUID+'\',this)">保存</a><a class="btn btn-warning btn-sm" style="margin-left: 4px" onclick="addSampleProcessing(\''+row.sampleTubeNo+'\',\''+row.sampleUUID+'\')">新增</a><a class="btn btn-info btn-sm" style="margin-left: 4px" onclick="viewSample(\''+row.sampleTubeNo+'\',\''+row.sampleUUID+'\')">查看</a><a  class="btn btn-danger btn-sm" style="margin-left: 4px" onclick="deleteSample(\''+ row.sampleUUID + '\',\'2\')">删除</a>';
            },

        }],
        formatLoadingMessage: function() {
            return "正在查询请稍后..."
        },
        formatNoMatches: function() {
            return "查询无结果"
        },
        onLoadSuccess: function(data){  //加载成功时执行
            if(data.errCode == 10001){
                gwfAlert("认证超时");
                setTimeout(function () {
                    window.location.href = "/logIn";
                },1000);
            }
        },
        url: "/sample/getSampleList?t=" + Math.random(),
        pagination: true,
        pageList: [5, 10, 15],
        uniqueId: "id",
        dataField: "rows",
        sortable: true,
        showColumns: false, // 开启自定义列显示功能
        showRefresh: false, // 开启刷新功能
        minimumCountColumns: 2,// 设置最少显示列个数
        striped: true,
        //是否显示行间隔色
        sidePagination: "server", //服务端分页
        queryParams: function queryParams(params) {
            var temp = {
                page: parseInt(params.offset / params.limit) + 1,
                pageSize: params.limit,
                type: "2"
            };
            return temp;
        },onLoadSuccess: function(data){  //加载成功时执行
            if(data.errCode == 10000){
                gwfAlert("认证超时", false);
                setTimeout(function () {
                    window.location.href = "/logIn";
                },1000);
            }
        },
        pageSize: 5,
        pageNumber: 1,
        paginationFirstText: "首页",
        paginationPreText: "上一页",
        paginationNextText: "下一页",
        paginationLastText: "最后一页"
    });
}

function refreshBloodSampleTable() {
    $("#bloodSampleTable").bootstrapTable('destroy');
    addBloodSampleTable();
}

function refreshTumorSampleTable() {
    $("#tumorSampleTable").bootstrapTable('destroy');
    addTumorSampleTable();
}
function select(val,value) {
    if(val==value){
        return 'selected="selected"';
    }else {
        return;
    }
}
function saveBloodSample(sampleUUID,val) {
    var SampleList = [];
    $(val).parent().siblings().each(function (index,obj) {
        if(index!=7&&index!=11){
            SampleList.push($(obj).children().val())
        }
    })
    $.ajax({
        type : "POST",
        url : "/sample/updateSampleInfo?t="+Math.random(),
        data : {
            "sampleuuid": sampleUUID,
            "sampletubeno": SampleList[0],
            "sampletesttube": SampleList[1],
            "sampletubecount": SampleList[2],
            "sampleprocessedcount": SampleList[3],
            "sampletransportcondition" : SampleList[4],
            "samplesavecondition" : SampleList[5],
            "samplesavelocation" : SampleList[6],
            "sampleislastecount" : SampleList[7],
            "sampleislaste" : SampleList[8],
            "sampledirections" : SampleList[9],
        },
        cache:false,
        dataType:'json',
        success:function(data) {
            if(data.errCode==0){
                gwfAlert(data.msg);
                $(val).removeClass("btn-success").addClass("btn-warning");
            }else if(data.errCode==10000){
                window.location.href ="/logIn";
            }else {
                gwfAlert(data.msg, false);
            }
        },
        error : function() {
        }
    });
}

function saveTumorSample(sampleUUID,val) {
    var SampleList = [];
    $(val).parent().siblings().each(function (index,obj) {
        if(index!=5&&index!=10){
            SampleList.push($(obj).children().val())
        }
    })
    $.ajax({
        type : "POST",
        url : "/sample/updateSampleInfo?t="+Math.random(),
        data : {
            "sampleuuid": sampleUUID,
            "sampletubeno": SampleList[0],
            "sampleoperationtype" : SampleList[1],
            "sampletransportcondition" : SampleList[2],
            "samplesavecondition" : SampleList[3],
            "samplesavelocation" : SampleList[4],
            "sampletubecount" : SampleList[5],
            "sampleislastecount" : SampleList[6],
            "sampleislaste" : SampleList[7],
            "sampledirections" : SampleList[8],

        },
        cache:false,
        dataType:'json',
        success:function(data) {
            if(data.errCode==0){
                gwfAlert(data.msg);
                $(val).removeClass("btn-success").addClass("btn-warning");
            }else if(data.errCode==10000){
                window.location.href ="/logIn";
            }else {
                gwfAlert(data.msg, false);
            }
        },
        error : function() {
        }
    });
}
var trContent3 = $(".sampleProcessingDemo").html();
var sampleTubeNo;
function addSampleProcessing(id,sampleUUID) {
    sampleTubeNo=id;
    $(".sampleTubeNo").val(id);
    $(".sampleUUID").val(sampleUUID);
    $("#addSampleProcessing").css("display","block");
    $('#addSampleProcessing .datetimepicker').datetimepicker();
    $('#SampleProContent .datetimepicker').datetimepicker();
}
$(".glyphicon-remove-sign").click(function () {
    $("#addSampleProcessing").css("display","none");
    $(".sampleProcessingDemo tr").remove();
    $(".sampleProcessingDemo").append(trContent3);
});

$(".addSampleProcessingInfo").click(function () {
    $(".sampleProcessingDemo").append(trContent3);
    $(".sampleTubeNo").val(sampleTubeNo);
    $('#addSampleProcessing .datetimepicker').datetimepicker();
    $('#addSampleProcessing .datetimepicker').datetimepicker();
    $('#SampleProContent .datetimepicker').datetimepicker();
    $('#SampleProContent .datetimepicker').datetimepicker();
});
$(".sampleProcessingDemo").on("click",".saveSampleProcessing",function () {

    var sampleProcessingList = [];
    var thisbutton = $(this);
    var sampleUUID = $(".sampleUUID").val();
    $(this).parent().siblings().each(function (index,obj) {
        sampleProcessingList.push($(obj).children().val());
    })
    $.confirm({
        title: "提示",
        content: "确认执行此项操作？",
        buttons: {
            '确认': {
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function () {
                    $.ajax({
                        type : "POST",
                        url : "/sample/addLabRecordsInfo?t="+Math.random(),
                        data : {
                            "samuuid" : sampleUUID,
                            "labdosage" : sampleProcessingList[1],
                            "lablasted" : sampleProcessingList[2],
                            "sampleIsLaste" : sampleProcessingList[3],
                            "labused" :sampleProcessingList[4],
                            "labcontent" : sampleProcessingList[5],
                            "labuseddate" : sampleProcessingList[6]
                        },
                        cache:false,
                        dataType:'json',
                        success:function(data) {
                            debugger
                            if(data.errCode==0){
                                gwfAlert(data.msg);
                                refreshBloodSampleTable();
                                refreshTumorSampleTable();
                                $(thisbutton).attr("disabled","disabled").removeClass("btn-success").addClass("btn-danger").html("已保存");
                            }else if(data.errCode==10000){
                                window.location.href ="/logIn";
                            }else {
                                gwfAlert(data.msg, false);
                            }
                        },
                        error : function() {
                        }
                    });
                }
            },
            '取消': {
                action: ""
            }
        }
    });
});
function SampleProContentTable(sampleTubeNo,id) {
    $("#SampleProContentTable").bootstrapTable({
        columns: [{
            title: '样本编号',
            class: 'text-center',
            formatter:function(val,row,index){
                return '<input type="text" class="form-control" value="' + sampleTubeNo + '"  readonly="readonly"/>'
            }
        },{
            field: 'labDosage',
            title: '样本用量',
            class: 'text-center',
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" readonly="readonly"/>'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '"  readonly="readonly"/>'
                }
            }
        },{
            field: 'labLasted',
            title: '样本剩余量',
            class: 'text-center',
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" readonly="readonly"/>'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '"  readonly="readonly"/>'
                }
            }
        }, {
            field: 'labUsed',
            title: '样本用途',
            class: 'text-center',
            width:150,
            formatter:function(val,row,index){
                if(val == 1){
                    return '<input type="text" class="form-control" value="RNA 测序" readonly="readonly"/>'
                }else if(val == 2){
                    return '<input type="text" class="form-control" value="DNA WES测序"  readonly="readonly"/>'
                }else if(val == 3){
                    return '<input type="text" class="form-control" value="质谱"  readonly="readonly"/>'
                }else{
                    return '<input type="text" class="form-control" value="核酸验证"  readonly="readonly"/>'
                }
            }
        },{
            field: 'labContent',
            title: '样本使用说明',
            class: 'text-center',
            width:300,
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" readonly="readonly"/>'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '"  readonly="readonly"  data-toggle="tooltip"  title="' + val + '"  />'
                }
            }
        },  {
            field: 'labCreateUser',
            title: '记录人',
            class: 'text-center',
            formatter:function(val,row,index){
                if(val == undefined){
                    return '<input type="text" class="form-control" value="" readonly="readonly"/>'
                }else {
                    return '<input type="text" class="form-control" value="' + val + '"  readonly="readonly"/>'
                }
            }
        }, {
            field: 'labUsedDate',
            title: '样本取用时间',
            class: 'text-center',
            width: 100,
        }, {
            field: 'labCreateDate',
            title: '创建时间',
            class: 'text-center',
            width: 100,
            formatter:function(val,row,index){
                if(val == null){
                    return '-';
                }
                return new Date(val).format("yyyy-MM-dd hh:mm:ss");
            }
        }],
        formatLoadingMessage: function() {
            return "正在查询请稍后..."
        },
        formatNoMatches: function() {
            return "查询无结果"
        },
        onLoadSuccess: function(data){  //加载成功时执行
            if(data.errCode == 10001){
                gwfAlert("认证超时");
                setTimeout(function () {
                    window.location.href = "/logIn";
                },1000);
            }
        },
        url: "/sample/getSampleUseRecordingsList?t=" + Math.random(),
        pagination: true,
        pageList: [5, 10, 15],
        uniqueId: "id",
        dataField: "rows",
        sortable: true,
        showColumns: false, // 开启自定义列显示功能
        showRefresh: false, // 开启刷新功能
        minimumCountColumns: 2,// 设置最少显示列个数
        striped: true,
        //是否显示行间隔色
        sidePagination: "server", //服务端分页
        queryParams: function queryParams(params) {
            var temp = {
                page: parseInt(params.offset / params.limit) + 1,
                pageSize: params.limit,
                sampleUUID: id
            };
            return temp;
        },
        onLoadSuccess: function(data){  //加载成功时执行
            if(data.errCode == 10000){
                gwfAlert("认证超时", false);
                setTimeout(function () {
                    window.location.href = "/logIn";
                },1000);
            }
        },
        pageSize: 5,
        pageNumber: 1,
        paginationFirstText: "首页",
        paginationPreText: "上一页",
        paginationNextText: "下一页",
        paginationLastText: "最后一页"
    });
}
$('.datetimepicker').datetimepicker();
function viewSample(sampleTubeNo,id) {
    $("#SampleProContentTable").bootstrapTable('destroy');
    SampleProContentTable(sampleTubeNo,id);
    $("[data-toggle='tooltip']").tooltip();
    $("#SampleProContent").css("display","block");

}
$(".glyphicon-remove-sign").click(function () {
    $("#SampleProContent").css("display","none");
});
function deleteSample(val, vall) {
    $.confirm({
        title: "提示",
        content: "确认执行此项操作？",
        buttons: {
            '确认': {
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function () {
                    $.ajax({
                        url: '/sample/deleteSampleInfo',
                        dataType: 'json',
                        data: {'sampleUUID':val},
                        type: 'POST',
                        success: function(data){
                            if(data.errCode == 0){
                                gwfAlert("删除成功");
                                if(vall == 1){
                                    refreshBloodSampleTable();
                                }else if(vall == 2){
                                    refreshTumorSampleTable();
                                }
                            }else {
                                gwfAlert(data.msg, false);
                            }
                        },
                        error: function(data){
                            gwfAlert("删除失败", false);
                        }
                    });
                }
            },
            '取消': {
                action: ""
            }
        }
    });

}