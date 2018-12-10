function myfunction()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if ( xhttp.readyState == 4 && xhttp.status == 200){
            var res = JSON.parse(xhttp.responseText);
            var content = document.getElementById("msg-list");
            console.log(xhttp.responseText);
            for (let i = 0;i < res.length;i++){
                $a = (res[i])[0];
                $b = (res[i])[1];
                $c = (res[i])[2];
                $d = (res[i])[3];
                var con = document.createElement("li");
                con.id = $c;
                con.class = "Square";
                con.innerHTML ='<div class="username">' + $a + ':' + '</div>' + '<br>' + '<div class="content">' + $b + '</div>' + '<br>' + '<div class="time">' + $d + '</div>' + '<footer><button type="button" class="button1" onclick="modify(' + $c +')"> 修改 </button><button type="button" class="button2" onclick="Delete(' + $c +')"> 删除 </button></footer>' + '<br>';
                content.insertBefore(con,content.childNodes[0]);}         
        }
}
    xhttp.open("get","./MB.php");
    xhttp.send();
}

window.onload=myfunction;


function tosend(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if ( xhttp.readyState == 4 && xhttp.status == 200){
            console.log(xhttp.responseText);
            var res = JSON.parse(xhttp.responseText);
            if(res.errcode == 2){
                var judge = confirm(res.errmsg+"是否立即前往登录？")
                if(judge == true){
                    window.location.href="Login.html";
                }
            }else{
                if(res.errcode == 1){
                    alert(res.errmsg);
                }else{
                var content = document.getElementById("msg-list");
                var con = document.createElement("li");
                con.id = res.data.id;
                con.class = "Square";
                con.innerHTML = '<div class="username">' + res.data.user + ':' + '</div>' + '<br>' + '<div class="content">' + res.data.msg + '</div>' + '<br>' + '<div class="time">' + res.data.time + '</div>' + '<footer><button type="button" class="button1"' + 'onclick="modify(' + res.data.id +')"> 修改 </button><button type="button" class="button2" onclick="Delete(' + res.data.id +')"> 删除 </button></footer>'+ '<br>';
                content.insertBefore(con,content.childNodes[0]);            
            }           
            }
        }
    }
    var msg = document.getElementById("msg").value;

    xhttp.open("POST","./MB.php");
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    var arr = {msg};
    JSON.stringify(arr);
    xhttp.send("msg=" + msg)
}
function modify(data){
    var pid = data;
    console.log(pid);
    var content = prompt("请输入新的留言");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if ( xhttp.readyState == 4 && xhttp.status == 200){
            var res = JSON.parse(xhttp.responseText);
            if(res.errcode == 1){
                var judge = confirm(res.errmsg+"是否立即前往登录？")
                if(judge == true){
                    window.location.href="Login.html";
                }
            }else{
                if(res.errcode == 2){
                    alert(res.errmsg);
                }else{
                    document.getElementById(pid).innerHTML = '<div class="username">' + res.data.user + ':' + '</div>' + '<br>' + '<div class="content">' + res.data.msg + '</div>' + '<br>' + '<div class="time">' + res.data.time + '</div>' + '<footer><button type="button" class="button1" ' + 'onclick="modify(' + pid + ')"> 修改 </button><button type="button" class="button2" onclick="Delete(' + pid + ')"> 删除 </button></footer>'+ '<br>';
                }
            }
        }
    }
    xhttp.open("POST","./MBmodify.php");
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    var arr = {content,pid};
    JSON.stringify(arr);
    xhttp.send("content=" + content + "&pid=" + pid);
}

function Delete(data){
    var pid = data;
    var mymessage = confirm("确定要删除此留言？");
    if(mymessage == true){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
        if ( xhttp.readyState == 4 && xhttp.status == 200){
            var res = JSON.parse(xhttp.responseText);
            if(res.errcode!=0){
                var judge = confirm(res.errmsg+"是否立即前往登录？")
                if(judge == true){
                    window.location.href="Login.html";
                }
            }else{
                alert(res.errmsg);
                var p = document.getElementById("msg-list");
                var c = document.getElementById(pid);
                p.removeChild(c);
            }
        }
    }
    xhttp.open("POST","./MBDelete.php");
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    var arr = {pid};
    JSON.stringify(arr);
    xhttp.send("pid=" + pid);
    }
}

function cancel(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
    if ( xhttp.readyState == 4 && xhttp.status == 200){
        console.log(xhttp.responseText);
        var res = JSON.parse(xhttp.responseText);
        if(res.errcode==0){
            alert("注销成功");
            window.location.href="Login.html";
        }
    }}
    
    xhttp.open("POST","./left.php");
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send();
}
