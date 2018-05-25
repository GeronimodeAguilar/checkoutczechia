          let slideCount = document.querySelectorAll('.background-slider .slide-item').length;
        let slideWidth = document.querySelectorAll('.slider-outer')[0].clientWidth;
        let slideHeight = document.querySelectorAll(".slider-outer")[0].clientHeight;
      
        let sliderUlWidth = slideCount * slideWidth;
        document.querySelectorAll('.background-slider')[0].style.cssText = "width:" + sliderUlWidth + "px";
      
        for (let i = 0; i < slideCount; i++) {
          document.querySelectorAll('.slide-item')[i].style.cssText = "width:" + slideWidth + "px;height:" + slideHeight + "px";
        }
      
        setInterval(function() {
          moveRight();
        }, 3000);
        let counter = 1;
      
        function moveRight() {
          let slideNum = counter++
            if (slideNum < slideCount) {
              let transformSize = slideWidth * slideNum;
              document.querySelectorAll('.background-slider')[0].style.cssText = 
                "width:" + sliderUlWidth + "px; -webkit-transition:all 800ms ease; -webkit-transform:translate3d(-" + transformSize + "px, 0px, 0px);-moz-transition:all 800ms ease; -moz-transform:translate3d(-" + transformSize + "px, 0px, 0px);-o-transition:all 800ms ease; -o-transform:translate3d(-" + transformSize + "px, 0px, 0px);transition:all 800ms ease; transform:translate3d(-" + transformSize + "px, 0px, 0px)";
      
            } else {
              counter = 1;
              document.querySelectorAll('.background-slider')[0].style.cssText = "width:" + sliderUlWidth + "px;-webkit-transition:all 800ms ease; -webkit-transform:translate3d(0px, 0px, 0px);-moz-transition:all 800ms ease; -moz-transform:translate3d(0px, 0px, 0px);-o-transition:all 800ms ease; -o-transform:translate3d(0px, 0px, 0px);transition:all 800ms ease; transform:translate3d(0px, 0px, 0px)";
            }
      
        }