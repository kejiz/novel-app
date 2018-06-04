(() => {
    let fnObj = {
        left: () => {
        },
        right: () => {
        }
    };

    window.addFn = (doc, target, fn, ok) => {
        fnObj[target] = fn;
        if (ok) {
            create(doc);
        }
    };
    function create(id) {
        let ele = document.body;
        const ctrl = 80;   //控制滑动长度  触发滑动完成回调
        let beginX, beginY, endX, endY, swipeLeft, swipeRight;
        ele.addEventListener('touchstart', function (event) {
            event.stopPropagation();
            event.preventDefault();
            beginX = event.targetTouches[0].screenX;
            beginY = event.targetTouches[0].screenY;
            swipeLeft = false, swipeRight = false;
        });

        ele.addEventListener('touchmove', function (event) {
            event.stopPropagation();
            event.preventDefault();
            endX = event.targetTouches[0].screenX;
            endY = event.targetTouches[0].screenY;
            if (Math.abs(endX - beginX) - Math.abs(endY - beginY) > 0) {
                if (Math.abs(endX - beginX) > ctrl) {
                    if (endX - beginX > 0) {
                        swipeRight = true;
                        swipeLeft = false;
                    }
                    else {
                        swipeLeft = true;
                        swipeRight = false;
                    }
                }
            }
        });
        ele.addEventListener('touchend', function (event) {
            event.stopPropagation();
            event.preventDefault();
            if()
            if (Math.abs(endX - beginX) - Math.abs(endY - beginY) > 0) {
                event.stopPropagation();
                event.preventDefault();
                if (swipeRight) {
                    swipeRight = !swipeRight;
                    fnObj.right();
                }
                if (swipeLeft) {
                    swipeLeft = !swipeLeft;
                    fnObj.left();
                }
            }
        })
    }

})();