{/* <div id="myDialog" style="display:none;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-color:white;">
    <h3>提示信息</h3>
    <p>这是一段自定义的提示信息！</p>
    <button onclick="closeDialog()">关闭窗口</button>
</div>
<button onclick="showDialog()">显示窗口</button> */}
function showDialog() {
  let dialog = document.getElementById("myDialog");
  dialog.style.display = "block";
}
showDialog();
function closeDialog() {
  let dialog = document.getElementById("myDialog");
  dialog.style.display = "none";
}