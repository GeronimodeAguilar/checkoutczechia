      window.onload = function() {
          let mainelement = document.createElement("script");
          let sideelement = document.createElement("script");
          let ternaryelement = document.createElement("script");
          mainelement.src = "../scripts/before/main.js";
          sideelement.src = "../scripts/before/secondary.js";
          ternaryelement.src = "../scripts/before/ternary.js";
          document.body.appendChild(mainelement);
          mainelement.after(sideelement);
          sideelement.after(ternaryelement);
          loaderbox.hidden = true;   
};  
