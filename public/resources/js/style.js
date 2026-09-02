
/* contest-N1 */
(function() {
  $(function() {
    $(".contest-N1[id=\'IvMte69CW4\']").each(function() {
      const $block = $(this);
      let isMobileMenuInitialized = false;
      let isDesktopMenuInitialized = false;
      // 모바일 메뉴 초기화
      function initMobileMenu() {
        if (isMobileMenuInitialized) return;
        const $btnMomenu = $block.find(".btn-momenu");
        $btnMomenu.off("click").on("click", function() {
          if ($block.hasClass("block-active")) {
            $block.removeClass("block-active");
          } else {
            $block.addClass("block-active");
          }
          $block.find(".header-gnbitem").removeClass("item-active");
          $block.find(".header-sublist").removeAttr("style");
        });
        // header-gnbitem 클릭 이벤트
        $block.find(".header-gnbitem").each(function() {
          const $this = $(this);
          const $thisLink = $this.find(".header-gnblink");
          const $sublist = $this.find(".header-sublist");
          if ($sublist.length) {
            $thisLink.off("click").on("click", function(event) {
              event.preventDefault();
              const $clickedItem = $(this).parents(".header-gnbitem");
              if (!$clickedItem.hasClass("item-active")) {
                $block.find(".header-gnbitem").removeClass("item-active");
                $block.find(".header-sublist").stop().slideUp(300);
              }
              $clickedItem.toggleClass("item-active");
              $sublist.stop().slideToggle(300);
            });
          }
        });
        isMobileMenuInitialized = true;
      }
      // 데스크탑 메뉴 초기화
      function initDesktopMenu() {
        if (isDesktopMenuInitialized) return;
        $block.find(".header-gnbitem").each(function() {
          const $this = $(this);
          const $thisLink = $this.find(".header-gnblink");
          $thisLink.off("click");
        });
        isDesktopMenuInitialized = true;
      }
      // 해상도에 따른 메뉴 처리
      function handleResize() {
        if (window.innerWidth <= 992) {
          if (!isMobileMenuInitialized) {
            initMobileMenu();
          }
          isDesktopMenuInitialized = false;
        } else {
          if (!isDesktopMenuInitialized) {
            initDesktopMenu();
          }
          isMobileMenuInitialized = false;
        }
      }
      // 스크롤 시 메뉴 처리
      function handleScroll() {
        const $headerTop = $block.find(".header-top");
        if ($headerTop.length) {
          $block.addClass("top-menu-active");
        }
        if ($(window).scrollTop() === 0) {
          $block.addClass("header-top-active");
        }
        $(window).scroll(function() {
          if ($(window).scrollTop() > 0) {
            $block.removeClass("header-top-active");
          } else {
            $block.addClass("header-top-active");
          }
        });
      }
      handleScroll();
      // 전체 메뉴 열기/닫기 처리
      function handleFullMenu() {
        $block.find(".btn-allmenu").on("click", function() {
          $block.find(".header-fullmenu").addClass("fullmenu-active");
        });
        $block.find(".fullmenu-close").on("click", function() {
          $block.find(".header-fullmenu").removeClass("fullmenu-active");
        });
        $block.find(".fullmenu-gnbitem").each(function() {
          const $this = $(this);
          $this.on("mouseover", function() {
            if (window.innerWidth > 992) {
              $this.find(".fullmenu-gnblink").addClass("on");
            }
          });
          $this.on("mouseout", function() {
            if (window.innerWidth > 992) {
              $this.find(".fullmenu-gnblink").removeClass("on");
            }
          });
        });
      }
      handleFullMenu();
      // 리사이즈 시마다 메뉴 동작 초기화
      $(window).on("resize", function() {
        handleResize();
      });
      handleResize();
    });
  });
})();

/* contest-N10 */
(function() {
  $(function() {
    $(".contest-N10[id=\'WimTe69D5H\']").each(function() {
      const $block = $(this);
      const wrapEl = $block.find(".text-wrap").get(0);
      const textEl = $block.find(".text-wrap span").get(0);
      let gsapTween = null;

      function setupRolling() {
        // 기존 복제 제거
        while (wrapEl.children.length > 1) {
          wrapEl.removeChild(wrapEl.lastChild);
        }
        // 텍스트 복제
        // 고정 30벌은 화면을 채우고도 한참 남아, 8개짜리 목록에서는 폭이
        // 6만px을 넘고 브라우저가 이 레이어를 합성하지 못해 움직임이 끊긴다.
        // 그리고 xPercent: -50은 전체 폭의 절반을 미는 값이라, 총 벌 수가
        // 홀수면 한 바퀴마다 이음매가 눈에 띈다. 화면을 세 번 덮을 만큼만,
        // 짝수로 맞춰 복제한다.
        const unitWidth = textEl.getBoundingClientRect().width;
        const viewWidth = wrapEl.parentElement.clientWidth;
        const needed = unitWidth > 0 ? Math.ceil((viewWidth * 3) / unitWidth) : 30;
        const copyCount = Math.max(2, needed + (needed % 2));
        for (let i = 1; i < copyCount; i++) {
          wrapEl.appendChild(textEl.cloneNode(true));
        }
        // gsap 애니메이션 제거
        if (gsapTween) gsapTween.kill();
        // requestAnimationFrame으로 렌더 후 실행 보장
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const totalWidth = wrapEl.scrollWidth;
            if (totalWidth === 0) {
              // fallback으로 setTimeout
              setTimeout(setupRolling, 200);
              return;
            }
            const baseSpeed = 1000;
            const baseDuration = 10;
            const duration = Math.max(
              (totalWidth / baseSpeed) * baseDuration,
              3
            );
            gsapTween = gsap.to(wrapEl, {
              xPercent: -50,
              duration: duration,
              ease: "none",
              repeat: -1,
            });
          });
        });
      }
      setupRolling(); // 첫 실행
      // 내용 변경 감지
      let debounceTimer = null;
      const observer = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(setupRolling, 500);
      });
      observer.observe(textEl, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    });
  });
})();

/* contest-N4 */
(function() {
  $(function() {
    $(".contest-N4[id=\'NDMTE69DHM\']").each(function() {
      const $block = $(this);
      const $footer = $(".footer-container").length ?
        $(".footer-container").parent() :
        $(".th-layout-footer").length ?
        $(".th-layout-footer") :
        $("footer");
      // position 업데이트 함수
      function updatePosition() {
        const scrollPosition = $(window).scrollTop();
        const windowHeight = $(window).height();
        const footerOffset = $footer.offset().top;
        const stopPosition = footerOffset - windowHeight;
        if (scrollPosition > stopPosition) {
          $block.css({
            position: "absolute",
            bottom: $footer.outerHeight() + 20 + "px",
          });
        } else {
          $block.css({
            position: "fixed",
            bottom: "20px",
          });
        }
      }
      // scroll과 resize 이벤트 바인딩
      $(window).on("scroll resize", updatePosition);
      // 초기 위치 설정
      updatePosition();
    });
  });
})();

/* contest-N7 */
(function() {
  $(function() {
    $(".contest-N7[id=\'fPMtE69e1t\']").each(function() {
      const $block = $(this);
      const mm = gsap.matchMedia();
      // 미디어 쿼리를 사용하여 특정 화면 너비 이상에서만 실행
      mm.add("(min-width: 993px)", () => {
        const $items = $block.find(".list li");
        // 스크롤 위치의 단계 하나만 활성화. -1이면 전부 해제.
        const focus = (i) => {
          $items.removeClass("active");
          if (i >= 0) $items.eq(i).addClass("active");
        };
        $items.each(function(i) {
          // 텍스트 애니메이션
          gsap.timeline({
            scrollTrigger: {
              trigger: this,
              start: "0% 50%",
              end: "0% 30%",
              onEnter: () => { focus(i); },
              onEnterBack: () => { focus(i); },
              onLeaveBack: () => { focus(i - 1); },
            }
          });
        });
      });
    });
  });
})();
