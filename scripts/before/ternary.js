        let slideCount = document.querySelectorAll('.background-slide').length;
        let slideWidth = document.querySelector('.background-slider').clientWidth;
        let slideHeight = document.querySelector(".background-slider").clientHeight;
        let tiltedSlideText = document.querySelectorAll('.tilted-text');
        let sliderUlWidth = slideCount * slideWidth;
        document.querySelectorAll('.background-slider')[0].style.cssText = "width:" + sliderUlWidth + "px";
        for (let i = 0; i < slideCount; i++) {
          let backgroundWidth = document.querySelector('.background-slider').clientWidth;
          document.querySelectorAll('.background-slide')[i].style.cssText = "width:" + slideWidth + "px;height:" + slideHeight + "px";
          document.querySelectorAll('.tilted-text')[i].style.cssText = `font-size: ${(slideWidth / 7)}px; color: hsla(211, 76%, 28%,1);
          background-color: hsla(211, 76%, 28%,0.01);`;
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