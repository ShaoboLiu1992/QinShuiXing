/**
 * Created by PorridgeEater on 11/27/16.
 */
$(document).ready(function () {
    var error = $('#error').text();
    switch(error) {
        case "IdentityError":
            gwfAlert("身份权限不足");
            setTimeout(function () {
                location.href = "/patientAdmin";
            },1000);
            break;
        case "noClientNo":
            gwfAlert("未选择受检者");
            setTimeout(function () {
                location.href = "/patientAdmin";
            },1000);
            break;
        case "SessionOutOfTime":
            gwfAlert("登录凭证过期");
            setTimeout(function () {
                location.href = "/logIn";
            },1000);
            break;
        case "outOfRange":
            gwfAlert("未到此流程");
            setTimeout(function () {
                location.href = "/patientAdmin";
            },1000);
            break;
        case "isComplete":
            gwfAlert("无权限操作已完结报告");
            setTimeout(function () {
                location.href = "/patientAdmin";
            },1000);
            break;
        default:
            gwfAlert(error);
            setTimeout(function () {
                location.href = "/patientAdmin";
            },1000);
            break;
    }
});