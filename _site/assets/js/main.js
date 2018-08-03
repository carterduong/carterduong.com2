main();

function main() {
  const canvas = document.querySelector("#glCanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = function () {

  var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (isSafari && iOS) {
    document.getElementById('first_project').style.height = window.innerHeight - 44 + 'px';
  } 
  else if(isSafari) {
  }


  // add indent
  var s = "⟡&nbsp;";
  var len = s.visualLength();
  var d = document.getElementsByClassName("description");
  d[0].style.textIndent = len + 'px';

  var s = "→&nbsp;";
  var len = s.visualLength();
  var d = document.getElementsByClassName("description");
  for (var i = 1; i < d.length; i++) {
    d[i].style.textIndent = len + 'px';
  }

};

function $(id)
{
  return document.getElementById(id);
}

String.prototype.visualLength = function()
{
  var ruler = $("ruler");
  ruler.innerHTML = this;
  return ruler.offsetWidth;
}