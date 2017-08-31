package gene.vo;


/**
 * 类名：BaseResultVo.java <br/>
 * 功能说明：TODO <br/>
 * 修改历史： <br/>
 * 1.[2016年10月9日下午5:24:24]创建类 by Administrator
 */
public class BaseResultVo {
    private int errCode;
    private String msg;

    /**
     * BaseResponse构造方法
     */
    public BaseResultVo() {
        this.setErrCode(0);
        this.setMsg("");
    }

    public BaseResultVo(int errCode, String msg) {
        this.setErrCode(errCode);
        this.setMsg(msg);
    }
    /**
     * 功能说明：获取错误码
     *
     * @return <br/>
     * 修改历史：<br/>
     * 1.[2015年5月17日下午4:33:34] 创建方法 by jsh
     */
    public final int getErrCode() {
        return this.errCode;
    }

    public final void setErrCode(final int newErrCode) {
        this.errCode = newErrCode;
    }

    public final String getMsg() {
        return this.msg;
    }

    public final void setMsg(final String newMsg) {
        this.msg = newMsg;
    }
}
