Marketplace = {
    Common: {}
};

Marketplace.Common = {
    SetLan: function (lan) {
        Marketplace.Common.Cookie.ClearCookie("lang");
        Marketplace.Common.Cookie.SetCookie("lang", lan, 30);
        window.location.href = window.location.href;
    }
}

Marketplace.Common.Cookie = Marketplace.Common.Cookie || {};
Marketplace.Common.Cookie.SetCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    //document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/;domain=silkchain.io";
}
Marketplace.Common.Cookie.ClearCookie = function (name) {
    Marketplace.Common.Cookie.SetCookie(name, "", -1);
}

//json数据格式化
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}



function UploadOneFile(inupload, txtbox, showbox, typeid, rid) {
    $("#" + inupload).dmUploader({
        url: '/UEditor/UploadImageFile?typeid=' + typeid,
        dataType: 'json',
        //allowedTypes: 'image/*',
        onInit: function () {
            //$.danidemo.addLog('#demo-debug', 'default', 'Plugin initialized correctly');
        },
        onBeforeUpload: function (id) {
            //上传前
            $('#' + showbox).html("<img id=\"simg_" + id + "_" + rid + "\" src=\"/Content/images/Uploadloading.gif\" height=\"100\" />");
        },
        onNewFile: function (id, file) {
            //$.danidemo.addFile('#demo-files', id, file);
        },
        onComplete: function () {
            //$.danidemo.addLog('#demo-debug', 'default', 'All pending tranfers completed');
        },
        onUploadProgress: function (id, percent) {
            //上传中
            //var percentStr = percent + '%';
            //$.danidemo.updateFileProgress(id, percentStr);
        },
        onUploadSuccess: function (id, data) {
            //上传成功
            if (data.Status == 1) {
                $('#' + txtbox).val(data.FilePath2);
                $('#simg_' + id + "_" + rid).attr("src", data.FilePath);
            }
            else {
                alert(data.ErrorMessage);
            }
        },
        onUploadError: function (id, message) {
            /*$.danidemo.updateFileStatus(id, 'error', message);

            $.danidemo.addLog('#demo-debug', 'error', 'Failed to Upload file #' + id + ': ' + message);*/
        },
        onFileTypeError: function (file) {
            /*$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: must be an image');*/
        },
        onFileSizeError: function (file) {
            /*$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: size excess limit');*/
        },
        onFallbackMode: function (message) {
            /*$.danidemo.addLog('#demo-debug', 'info', 'Browser not supported(do something else here!): ' + message);*/
        }
    });
}

function checkAll(chkobj) {
    if ($(chkobj).attr("checked") || $(chkobj).attr("checked") == "checked") {
        $("input[name='chkIDs']").attr("checked", true);
    } else {
        $("input[name='chkIDs']").attr("checked", false);
    }
}

function checkOne() {
    var flag = true;
    jQuery("input[name='chkIDs']").each(function () {
        if (jQuery(this).attr("checked") || jQuery(this).attr("checked") == "checked") {
        } else {
            flag = false;
        }
    });
    if (flag) {
        $("#checkAll").attr("checked", true);
    } else {
        $("#checkAll").attr("checked", false);
    }
}

//数组操作
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function GetForm(node, ignoreHide) {
    var datas = this.datas = {};
    if (!node || ($.isArray(node) && node.length === 0)) {
        return {};
    }
    $("input" + (ignoreHide ? ':visible' : '') + ",select" + (ignoreHide ? ':visible' : '') + ",textarea" + (ignoreHide ? ':visible' : ''), $(node)).each(function (i, n) {
        var nodeName = n && n.nodeName;
        switch (nodeName) {
            case "INPUT":
                switch (n.type) {
                    case "checkbox":
                        if (!datas[$(n).attr("name")]) {
                            datas[$(n).attr("name")] = [];
                        }
                        if (n.checked) {
                            datas[$(n).attr("name")].push(n.value);
                        }
                        break;
                    case "radio":
                        if ($(n).attr("value") == "on") {
                            if (n.checked) {
                                datas[$(n).attr("name")] = 1;
                            } else {
                                datas[$(n).attr("name")] = 0;
                            }
                        } else {
                            if (n.checked) {
                                datas[$(n).attr("name")] = $(n).attr("value");
                            }
                        }
                        break;
                    default:
                        if ($(n).attr("autocomplete")) {
                            return;
                        }
                        datas[$(n).attr("name")] = $.trim($(n).val());
                }
                break;
            case "SELECT":
                $("option", n).each(function (j, o) {
                    if (o.selected) {
                        if ($(n).attr("name")) {
                            datas[$(n).attr("name")] = $.trim($(o).attr("value"));
                        }
                    }
                });
                break;
            case "TEXTAREA":
                datas[$(n).attr("name")] = $.trim($(n).val());
                break;
        }
    });
    if ("undefined" in datas) {
        delete datas["undefined"];
    }
    return datas;
}

var __pageData;
function jumpPostListData(formdata) { 
    __pageData = formdata;
}
function jumpPostList(pageurl) {
    var tempFromID = "js_From_pageData";
    var html = '<form action="' + pageurl + '" type="POST" id="' + tempFromID + '">';
    $.each(__pageData, function (i, field) {
        html += '<input type="hiden" name="' + field.name + '" value="' + (field.value?field.value:'') + '" />';
    });
    html += '</form>';
    var _$ = $('#js_domainProxy').get(0).contentWindow.$;
    _$(html).appendTo('body');
    _$('#' + tempFromID).submit();
}