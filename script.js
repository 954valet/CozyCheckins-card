(() => {
  const card = document.getElementById('businessCard');
  const animator = document.getElementById('flipAnimator');
  const front = document.getElementById('cardFront');
  const back = document.getElementById('cardBack');

  const shareButton = document.getElementById('shareButton');
  const toast = document.getElementById('toast');

  const liveQr = document.getElementById('liveQr');
  const fallbackQr = document.getElementById('fallbackQr');
  const qrCenterLogo = document.getElementById('qrCenterLogo');

  let showingBack = false;
  let flipping = false;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__cozyToast);
    window.__cozyToast = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  function finishSecondHalf() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animator.classList.remove('turn-instant');
        animator.style.transition = '';
        animator.style.transform = 'rotateY(0deg)';
      });
    });
  }

  function flipCard() {
    if (flipping) return;
    flipping = true;

    animator.style.transition = 'transform .27s cubic-bezier(.45,.05,.2,1)';
    animator.style.transform = 'rotateY(90deg)';

    const halfway = () => {
      animator.removeEventListener('transitionend', halfway);

      showingBack = !showingBack;
      front.hidden = showingBack;
      back.hidden = !showingBack;

      card.setAttribute('aria-pressed', String(showingBack));

      // Put the newly visible face at -90° instantly, then animate it to 0°.
      animator.style.transition = 'none';
      animator.style.transform = 'rotateY(-90deg)';

      finishSecondHalf();

      const done = () => {
        animator.removeEventListener('transitionend', done);
        flipping = false;
      };
      animator.addEventListener('transitionend', done);
    };

    animator.addEventListener('transitionend', halfway);
  }

  card.addEventListener('click', flipCard);

  // Generate a QR for the actual GitHub Pages / hosted digital-card URL.
  // If the QR library does not load, the bundled fallback QR remains.
  if (window.QRCode && /^https?:/.test(location.href)) {
    const digitalCardUrl = location.href.split('#')[0];

    QRCode.toCanvas(
      liveQr,
      digitalCardUrl,
      {
        width:720,
        margin:3,
        errorCorrectionLevel:'H',
        color:{
          dark:'#24292D',
          light:'#FFF9ED'
        }
      },
      (error) => {
        if (!error) {
          liveQr.style.display = 'block';
          fallbackQr.style.display = 'none';
          qrCenterLogo.style.display = 'grid';
        }
      }
    );
  }

  shareButton.addEventListener('click', async () => {
    const url = /^https?:/.test(location.href)
      ? location.href.split('#')[0]
      : 'https://www.cozycheckins.com';

    const shareData = {
      title:'Mark Murphy | Cozy Check-ins',
      text:'Mark Murphy, Founder of Cozy Check-ins — Daily peace of mind.',
      url
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showToast('Digital card link copied');
        return;
      }

      showToast('Copy this page address to share the card');
    } catch (error) {
      if (error?.name !== 'AbortError') {
        showToast('Could not share this card');
      }
    }
  });
})();
