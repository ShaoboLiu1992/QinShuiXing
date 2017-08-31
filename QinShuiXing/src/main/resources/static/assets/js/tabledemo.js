var list1=[];
var list2=[];
var list3=[];
var list4=[];
var list5=[];

var values1 = "exonic--exonic;splicing--ncRNA_exonic;splicing--splicing";
var values2 = "nonsynonymous--nonsynonymous SNV--frameshift insertion--frameshift deletion--stopgain--stoploss--unknown--.";
var values3 = "";
var values4 = "";
var values5 = "";

function refresh() {
    list1=$(".selectpicker").eq(0).val();
    list2=$(".selectpicker").eq(1).val();
    list3=$(".selectpicker").eq(2).val();
    list4=$(".selectpicker").eq(3).val();
    list5=$(".selectpicker").eq(4).val();
    if(list1==null){
        list1=[];
    }if(list2==null){
        list2=[];
    }if(list3==null){
        list3=[];
    }if(list4==null){
        list4=[];
    }if(list5==null){
        list5=[];
    }
    values1 = list1.join("--");
    values2 = list2.join("--");
    values3 = list3.join("--");
    values4 =  list4.join("--");
    values5 = list5.join("--");

    $("#preSign-doc-list").bootstrapTable('destroy');
    addTable();
}

function getStringLength(src) {
    return "<span style='display:block;width: 200px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;' title='" + src + "'>" + src + "</span>";
}

function getCLINSIG() {
    var data = {
        clientNo : clientNoNO,
        key : "CLINSIG"
    }
    $.ajax({
        url: "/getALLTypes",
        data: data,
        dataType: "json",
        type: "post",
        async: false,
        success: function(data) {
            for(var index in data.data){

                   $("#usertypeS3").append("<option value='"+data.data[index]+"' class='special'>"+data.data[index]+"</option>");
            }
        }
    });
}



