
function toggle() {
    var element = document.getElementById("menuList");
    
      if (element) {
        var display = element.style.display;
    
        if (display == "none") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
      }
    }