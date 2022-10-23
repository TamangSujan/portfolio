function createTextFile(){
    var data = document.getElementById("text").value
    const filename = document.getElementById("filename").value
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    link.setAttribute('download', filename);
    link.click();
}
