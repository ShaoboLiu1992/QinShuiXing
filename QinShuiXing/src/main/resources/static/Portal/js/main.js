
var myindex = 0;

$(function () {
    new Vue({
        el: "#app",
        data: {
            msg: "",
            bool: "",
            url:"强耀生物",
            urlindex:"0",
            urlList:{"0":"强耀生物","1":"ExPASy",'2':"INNOVAGEN"}
        },
        watch:{
            msg:function(mymsg){
                if(this.msg==""){
                    $(".msgbox").html("");
                    $("textarea").hide();
                }
            }
        },
        methods: {
            search: function() {

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
                            $(".msgbox").html("");
                            $("textarea").text("");
                            for(var i =0;i<data.length;i++){
                                $(".msgbox").append('<div class="form-group col-lg-10"><input class="form-control" value="'+data[i]+'" /></div>');
                            }
                            $("textarea").show().text(data.join(","))

                        },
                        error: function(){

                        }
                    });
                }else{
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
})




