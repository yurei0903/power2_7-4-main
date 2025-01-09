
hyokinanido = ["やさしい", "普通", "難しい"]
btn_lv=["easy","normal","hard"]
for(i=0;i<btn_lv.length;i++){
    const lvb = document.getElementById(btn_lv[i]);
        lvb.addEventListener("click",function (e) {
            var data = e.currentTarget.dataset['lv'];
            var simesu = document.getElementById("kokuti");
            simesu.innerHTML = '<div>今の難易度は「' + hyokinanido[data] + '」です</div>'
            localStorage.setItem('nanidodata', data);
        });
}
