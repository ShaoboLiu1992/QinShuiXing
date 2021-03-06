
var myindex = 0;

var bool = true;
var mydata;
$(function () {
    $('#switch').bootstrapSwitch();
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var opts = {
        lines: 13, // 花瓣数目
        length: 20, // 花瓣长度
        width: 10, // 花瓣宽度
        radius: 30, // 花瓣距中心半径
        corners: 1, // 花瓣圆滑度 (0-1)
        rotate: 0, // 花瓣旋转角度
        direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
        color: '#5882FA', // 花瓣颜色
        speed: 1, // 花瓣旋转速度
        trail: 60, // 花瓣旋转时的拖影(百分比)
        shadow: false, // 花瓣是否显示阴影
        hwaccel: false, //spinner 是否启用硬件加速及高速旋转
        className: 'spinner', // spinner css 样式名称
        zIndex: 2e9, // spinner的z轴 (默认是2000000000)
        top:  windowHeight*0.32+"px", // spinner 相对父容器Top定位 单位 px
        left: windowWidth*0.5+"px"// spinner 相对父容器Left定位 单位 px
    };
    var target = $("#firstDiv").get(0);
    var spinner = new Spinner(opts);
    spinner.spin(target);

    new Vue({
        el: "#app",
        data: {
            msg: "",
            mssg: "",
            bool: "",
            url:"强耀生物",
            urlindex:"0",
            urlList:{"0":"强耀生物","1":"ExPASy",'2':"INNOVAGEN","3":"ToxinPred", "4":"SATPBD", "5":"ToxinPred-Batch"}
        },
        watch:{
            msg:function(mymsg){
                if(this.msg==""){
                    $(".msgbox").html("");
                    $("textarea").hide();
                }
            },
            mssg:function(mymsg){
                if(this.mssg==""){
                    $(".mssgbox").html("");
                    $("textarea").hide();
                }
            }
        },
        methods: {
            search: function() {
                if(bool){
                    bool = !bool;
                    $("#firstDiv").show();
                    var str = [];
                    $(".value").each(function(index, obj) {
                        str.push($(obj).val());
                    });
                    var urlindex=this.urlindex;
                    if(str.length>0){
                        $(".msg").val(str.join(','));
                        $.ajax({
                            cache: false,
                            type: 'GET',
                            url: "/getQinShuiXing",
                            data:{
                                params:str.join(','),
                                type:urlindex
                            },
                            dataType: "json",
                            success: function(data) {
                                bool = !bool;
                                $(".msgbox").html("");
                                $("textarea").text("");
                                var arr = [];
                                var arr1 = [];
                                urlindex = parseInt(urlindex);
                                switch (urlindex){
                                    case 2:
                                        for(var i =0;i<data.length;i++){
                                            $(".msgbox").append('<div class="form-group col-lg-10" style="padding: 0;;margin-bottom: 14px"><div class="col-lg-4" style="padding: 0"><input class="form-control" value="'+data[i].data+'" /></div><div class="col-lg-4" style="padding: 0"><input class="form-control" value="'+data[i].pI+'" /></div><div class="col-lg-4"><a class="btn btn-warning view" onclick="viewpic(\''+data[i].imgUrl+'\',this)">Hydropathy</a></div></div>');
                                            arr.push(data[i].data);
                                            arr1.push(data[i].pI);
                                        }
                                        $("textarea").eq(1).show().text(arr1.join(","));
                                        break;
                                    case 3:
                                        for(var i =0;i<data.length;i++){
                                            $(".msgbox").append('<div class="form-group col-lg-10" style="padding: 0;margin-bottom: 14px"><div class="col-lg-4" style="padding: 0"><input class="form-control" value="'+data[i].data+'" /></div><div class="col-lg-4" style="padding: 0"><input class="form-control" value="'+data[i].pI+'" /></div><div class="col-lg-4"><a class="btn btn-warning view" onclick="viewpic(\''+data[i].imgUrl+'\',this)">Hydropathy</a></div></div>');
                                            arr.push(data[i].data);
                                            arr1.push(data[i].pI);
                                        }
                                        $("textarea").eq(1).show().text(arr1.join(","));
                                        break;
                                    case 4:
                                        mydata = data;
                                        for(var i =0;i<data.length;i++){
                                            if(data[i].data==""){
                                                $(".msgbox").append('<div class="form-group col-lg-8" style="padding: 0;margin-bottom: 14px"><div class="col-lg-6" style="padding: 0"><input class="form-control" /></div><div class="col-lg-6"><a class="btn btn-warning view" onclick="viewTable(\''+i+'\',this)">Hydropathy</a></div></div>');
                                            }else {
                                                $(".msgbox").append('<div class="form-group col-lg-8" style="padding: 0;margin-bottom: 14px"><div class="col-lg-6" style="padding: 0"><input class="form-control" /></div><div class="col-lg-6"><a class="btn btn-danger view" onclick="viewTable(\''+i+'\',this)">Hydropathy</a></div></div>');
                                            }
                                        }
                                        break;
                                    case 5:
                                        mydata = data;
                                        for(var i =0;i<data.length;i++){
                                            if(data[i].data==""){
                                                $(".msgbox").append('<div class="form-group col-lg-8" style="padding: 0;margin-bottom: 14px"><div class="col-lg-6" style="padding: 0"><input class="form-control" /></div><div class="col-lg-6"><a class="btn btn-warning view" onclick="viewTable(\''+i+'\',this)">Hydropathy</a></div></div>');
                                            }else {
                                                $(".msgbox").append('<div class="form-group col-lg-8" style="padding: 0;margin-bottom: 14px"><div class="col-lg-6" style="padding: 0"><input class="form-control" /></div><div class="col-lg-6"><a class="btn btn-danger view" onclick="viewTable(\''+i+'\',this)">Hydropathy</a></div></div>');
                                            }
                                        }
                                        break;
                                    default:
                                        for(var i =0;i<data.length;i++){
                                            $(".msgbox").append('<div class="form-group col-lg-8" style="padding: 0;margin-bottom: 14px"><div class="col-lg-6" style="padding: 0"><input class="form-control" value="'+data[i].data+'" /></div></div>');
                                            arr.push(data[i].data);
                                        }
                                        break;
                                }
                                $("textarea").eq(0).show().text(arr.join(","));
                                $("#firstDiv").hide();
                            },
                            error: function(){
                                $("#firstDiv").hide();
                            }
                        });
                    }else{
                    }
                }
            },
            searchMssg:function () {
                $("#firstDiv").show();
                $(".mssgbox").html("");
                var str = [];
                $(".value").each(function(index, obj) {
                    str.push($(obj).val());
                });
                if(str.length>0){
                    $(".mssg").val(str.join(','));
                    $.ajax({
                        cache: false,
                        type: 'GET',
                        url: "/getGeneExpression",
                        data:{
                            params:str.join(','),
                        },
                        dataType: "json",
                        success: function(data) {
                            var list =data.data;
                            for(var i =0;i<list.length;i++){
                                if(list[i]==null){
                             $(".mssgbox").append('<div class="form-group col-lg-10" style="padding: 0"><div class="col-lg-4"><a class="btn btn-danger">鏃犳暟鎹®</a></div></div>');
                                    }else {
                                    $(".mssgbox").append('<div class="form-group col-lg-10" style="padding: 0"><div class="col-lg-4"><a  class="btn btn-warning margin-right-10" style="'+(list[i].gene==undefined?"display:none":"display:block")+'"  onclick="viewmssgpic(\''+list[i].gene+'\',\''+list[i].title+'\');" >gene</a></div><div class="col-lg-4"><a class="btn btn-warning" style="'+(list[i].protein==undefined?"display:none":"display:block")+'"  onclick="viewmssgpic(\''+list[i].protein+'\',\''+list[i].title+'\')" >protein</a></div></div>');
                                }
                            } $("#firstDiv").hide();

                        },
                        error: function(){
                            $("#firstDiv").hide();
                        }
                    });
                }
            }
        },
        computed: {
            // 计算属性的 getter
            reversedMessage: function() {
                // `this` 指向 vm 实例
                if(this.msg == "") {
                    this.bool == false
                } else {
                    return this.msg.split(",")
                }
            },
            // 计算属性的 getter
            reversedMssg: function() {
                // `this` 指向 vm 实例
                if(this.mssg == "") {
                    this.bool == false
                } else {
                    return this.mssg.split(",")
                }
            }
        }
    })

        $(".shuoming img").click(function () {
            if(myindex==0){
                $(".shuoming").stop().animate({left:'10px'});
                myindex=1;
            }else {
                $(".shuoming").stop().animate({left:'-400px'});
                myindex=0;
            }

        })

    $(document).keypress(function(e) { var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode; if (eCode == 13){
        $(".search").click()
        }})

    $(".typechuange button").eq(0).click(function () {
        $(".msgboxs").show();
        $(".mssgboxs").hide();
        $(".rowmsg").show();
        $(".rowmssg").hide();
        $(".msgbox").html("");
        $("textarea").text("");
        $(this).addClass("btn-primary").removeClass("btn-default");
        $(this).siblings().addClass("btn-default").removeClass("btn-primary");
    })
    $(".typechuange button").eq(1).click(function () {
        $(".mssgboxs").show();
        $(".msgboxs").hide();
        $(".rowmssg").show();
        $(".rowmsg").hide();
        $(".msgbox").html("");
        $("textarea").text("");
        $(this).addClass("btn-primary").removeClass("btn-default");
        $(this).siblings().addClass("btn-default").removeClass("btn-primary");
    })

})


function viewpic(url,el) {
    $(".view").css("color","#fff");
    $(el).css("color","blue");
    $.dialog({
        columnClass: 'col-md-8 col-md-offset-2',
        title: 'Hydropathy',
        content: '<div style="text-align: center"></div><img style="width: 100%" src="'+ (url==undefined?"javascript:void(0)":"/viewFile?fileUrl="+url) +'" /><div class="legend"> <ul> <li>Acidic：<span style="background:#ffcocb "></span></li>' +
        ' <li>Aromatic：<span style="background:#97fb98 "></span></li> <li>Basic：<span style="background: #00bfff"></span></li>' +
        ' <li>Aliphatic：<span style="background: #c8c8c8"></span></li> <li>polar：<span style="background: #006000"></span></li>' +
        ' <li>Cysteine：<span style="background: #ffff00"></span></li> </ul> </div></div>',
    });
}

    function viewmssgpic(url,title) {
        $.dialog({
                columnClass: 'col-md-8 col-md-offset-2',
                  title: title,
           content: '<div style="text-align: center"><img style="width: 100%" src="'+ (url==undefined?"javascript:void(0)":"/viewFile2?fileUrl="+url) +'" /></div>',
    });
    }

function viewTable(index,el) {
    $(".view").css("color","#fff");
    $(el).css("color","blue");
    $.dialog({
        columnClass: 'col-lg-12',
        title: '',
        content:mydata[index].data ,
    });
}




