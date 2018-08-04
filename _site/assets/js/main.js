window.onload = function () {

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

  // safari mobile utils
  var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (isSafari && iOS) {
    document.getElementById('first_project').style.height = window.innerHeight - 44 + 'px';
  } 
  else if(isSafari) {
  }
};

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// text width calcuation function
String.prototype.visualLength = function()
{
  var ruler = document.getElementById('ruler');
  ruler.innerHTML = this;
  return ruler.offsetWidth;
}