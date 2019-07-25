<?php
        header('Access-Control-Allow-Origin:*'); 
        header("conten-type:text/html;charset=utf8;");

        $name=@$_REQUEST["name"];
        $pw=@$_REQUEST["pw"];
        $type=@$_REQUEST["type"];
        $tocken = @$_COOKIE["TOCKEN"];

        if($type==="tocken"){
            if($tocken){
                die(resPrint("10","pass","",$tocken) );
            }else {
                die(resPrint("0","error","",""));
            }
        }
        // if($type!=="vail"){
        //    if (!$name || !$pw || !$type) {
        //           die(resPrint(0, "error", "不能提交空的表单给我哦！！", ""));
        //    }
        // }else { }
           if (!$name|| !$type) {
               die(resPrint(0, "error", "不能提交空的表单给我哦！！", ""));
           }
        
// die("$name $pw $type");
/**
 * 
 * 接口定义：
 *   statusCode     status      msg     
 *      0           error       表单空 tocken 空
 *      1           pass        ID   验证存在  
 *      2           error       ID   验证不存在
 *      3           pass        ID-PW 验证通过
 *      4           error       ID-PW 验证失败 ID通过
 *      10          error       登录 验证失败
 *      11          pass        登录 验证通过
 *      20          error       注册 失败 数据库写入错误
 *      21          pass        注册 成功 
 *      22          error       注册 失败  用户名存在
 *      30          error       密码修改 失败 数据库写入错误  
 *      31          pass        密码修改 成功
 *      32          error       密码修改 失败  用户名不存在   
 *  */

       
        switch($type){
            case "login":
                login($name, $pw);
            break;
            case "register":
                register($name, $pw);
            break;
            case "updata":
                 updata($name, $pw);
            break;
            case "vail":
                vail($name, $pw);
            break;
            default:
                 vail($name, $pw);
            break;
        }


    
    
     
    function vail($name, $pw){
            $servername = "localhost";
            $username = "root";
            $password = "root";
            $dbName = "testzm";

            // 创建连接
            $conn = mysqli_connect($servername, $username, $password, $dbName);
            // 检测连接
            if (!$conn) {
                die("Connection failed: " . mysqli_connect_error());
            }
        
            if(!$pw){
                $sql_select = "SELECT * FROM userlist WHERE userName='$name'";
            
                $result = mysqli_query($conn, $sql_select);
                if (mysqli_num_rows($result) > 0) {
                    resPrint(1, "pass", " 我的心里住了-你的名字：" . $name . " ，我与你心意相通！", "");
                } else {
                    resPrint(2, "error", "从今若许闲乘月，拄杖无时夜叩门 ，您要不注册下看看？", "");
                }
            }else {
                $sql_select = "SELECT * FROM userlist WHERE userName='$name' and passWord='$pw'";
                $result = mysqli_query($conn, $sql_select);
                if (mysqli_num_rows($result) > 0) {
                    resPrint(3, "pass", "入我相思门，知我相思苦", "");
                } else {
                    resPrint(4, "error", "验证失败，离开这里吧，骚年，这里不属于你！", "");
                }
    }
   

    
    mysqli_close($conn);

    }


     function login ($name,$pw){
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbName="testzm" ;
    
        // 创建连接
        $conn = mysqli_connect($servername, $username, $password,$dbName);
        // 检测连接
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql_select="SELECT * FROM userlist WHERE userName='$name' and passWord='$pw'";
        $result=mysqli_query($conn,$sql_select);
        if(mysqli_num_rows($result)>0){

            while($row=mysqli_fetch_assoc($result)){
                $tocken = array( "name" => $row["userName"] , "pw" => $row["passWord"]);
                setcookie("TOCKEN",json_encode($tocken),time()+3600 * 24);
                resPrint(11,"pass"," 尊敬的". $row["userName"]." ，欢迎您来到这里，~~弹出！ 记住您的登录ID 为:".$row["id"],
                json_encode(array(
                    "name" => $row["userName"],
                    "id" => "$name",
                    "pw"=>"$pw"
                ))
            );
                break;
            }
        }
        else{
            resPrint(10,"error", "验证失败，离开这里吧，骚年，这里不属于你！","");
        }
        mysqli_close($conn);
     }

     function register ($name,$pw){
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbName="testzm" ;
    
          // 创建连接
        $conn = mysqli_connect($servername, $username, $password,$dbName);
        // 检测连接
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql_select="SELECT * FROM userlist WHERE userName='$name'";
        $result=mysqli_query($conn,$sql_select);
        if(mysqli_num_rows($result)>0){
            resPrint(22,"error"," 你想和谁心灵相通？名字：". $name." ，已经被使用！ 请您换个更酷的名字吧！","");
        }
        else{
            $sql_insert=" INSERT INTO userlist(userName ,passWord)  VALUES('$name','$pw')";
            if(mysqli_query($conn,$sql_insert)){
                resPrint(21,"pass","注册成功 ，请稍等...正在离开荒芜人烟的星球!","");
            }else{
                resPrint(20,"error","注册错误:".mysqli_error($conn),"");
            }
        }
        mysqli_close($conn);
     }
     function updata ($name,$pw){
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbName="testzm" ;
    
            // 创建连接
            $conn = mysqli_connect($servername, $username, $password,$dbName);
            // 检测连接
            if (!$conn) {
                die("Connection failed: " . mysqli_connect_error());
            }
            $sql_select="SELECT * FROM userlist WHERE userName='$name'";
            $result=mysqli_query($conn,$sql_select);
            if(mysqli_num_rows($result)>0){
                $sql_update="UPDATE userlist SET passWord='$pw' WHERE userName='$name' ";
                if(mysqli_query($conn,$sql_update)){
                    resPrint(31,"pass","密码修改成功 ，请稍等...正在离开荒芜人烟的星球!","");
                }else{
                    resPrint(30,"error","密码修改错误:".mysqli_error($conn),"");
                }

            }
            else{
                resPrint(32,"error"," 用户名". $name." ，不存在！ 您是不是想修改别人的账户啊？ 那可不中！","");
            }
            mysqli_close($conn);
     }


     function resPrint($staCode,$sta,$tip,$name){
         echo json_encode (array(
            "status"=>"$sta",
            "statusCode"=>"$staCode",
            "msg"  =>"$tip",
            "name"=>"$name"
         ));
     }


   
    ?>
