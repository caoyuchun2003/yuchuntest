// 沉浸动效：光标聚光 + 卡片 3D 倾斜
// 守卫：仅在精确指针 + 非减动效环境启用；rAF 节流，只写 transform / CSS 变量。
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  function motionOK() {
    return finePointer.matches && !reduceMotion.matches;
  }

  /* —— 光标聚光 —— */
  var spotlight = document.querySelector('.spotlight');
  var px = 0;
  var py = 0;
  var spotQueued = false;

  function flushSpot() {
    spotQueued = false;
    spotlight.style.setProperty('--mx', px + 'px');
    spotlight.style.setProperty('--my', py + 'px');
  }

  function onSpotMove(e) {
    px = e.clientX;
    py = e.clientY;
    if (!spotQueued) {
      spotQueued = true;
      requestAnimationFrame(flushSpot);
    }
  }

  /* —— 卡片 3D 倾斜 —— */
  var MAX_TILT = 5;
  var cards = Array.prototype.slice.call(document.querySelectorAll('.entry.tilt'));

  function applyTilt(card, rect, x, y) {
    var nx = (x - rect.left) / rect.width;
    var ny = (y - rect.top) / rect.height;
    var rotY = (nx - 0.5) * 2 * MAX_TILT;
    var rotX = (0.5 - ny) * 2 * MAX_TILT;
    card.style.transform =
      'rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)';
    card.style.setProperty('--gx', (nx * 100).toFixed(1) + '%');
    card.style.setProperty('--gy', (ny * 100).toFixed(1) + '%');
  }

  function setupCard(card) {
    var rect = null;
    var queued = false;
    var lx = 0;
    var ly = 0;

    function onEnter() {
      if (!motionOK()) return;
      rect = card.getBoundingClientRect();
      card.style.willChange = 'transform';
    }

    function onMove(e) {
      if (!motionOK() || !rect) return;
      lx = e.clientX;
      ly = e.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(function () {
          queued = false;
          if (rect) applyTilt(card, rect, lx, ly);
        });
      }
    }

    function onLeave() {
      rect = null;
      card.style.transform = '';
      card.style.willChange = 'auto';
      card.style.setProperty('--gx', '50%');
      card.style.setProperty('--gy', '50%');
    }

    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointermove', onMove, { passive: true });
    card.addEventListener('pointerleave', onLeave);

    return onLeave; // 供禁用时复位
  }

  /* —— 启停 —— */
  var spotAttached = false;
  var cardResets = cards.map(setupCard);

  function syncMotion() {
    if (motionOK() && !spotAttached) {
      window.addEventListener('pointermove', onSpotMove, { passive: true });
      spotAttached = true;
    } else if (!motionOK() && spotAttached) {
      window.removeEventListener('pointermove', onSpotMove);
      spotAttached = false;
      cardResets.forEach(function (reset) {
        reset();
      });
    }
  }

  syncMotion();
  reduceMotion.addEventListener('change', syncMotion);
  finePointer.addEventListener('change', syncMotion);
})();
