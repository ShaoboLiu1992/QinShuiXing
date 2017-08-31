/**
 * Created by Administrator on 2017/3/22.
 */
function gwfAlert(val,type){
    // $(document.body).append('<div>'+val+'</div>').addClass("gwfAlert").stop().animate({top: '20px'}, "slow").delay(2000).animate({top: '-110px'}, "slow");
    if(type==false){
        $(".gwfAlert").html(val).css("background","#cc2424");
        $(".gwfAlert").stop().animate({top: '20px',opacity:0.9}, "slow").delay(2000).animate({top: '-110px',opacity:0}, "slow");
    }else {
        $(".gwfAlert").html(val).css("background","#00a651");
        $(".gwfAlert").stop().animate({top: '20px',opacity:0.9}, "slow").delay(2000).animate({top: '-110px',opacity:0}, "slow");
    }

}
