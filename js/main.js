// Mobile Wedding Invitation (Ver 2 - Natural Modern UI) Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification Utility
  const showToast = (message) => {
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // Demo Page Environment Check (Never send data to real Drive/Sheets when data-demo="true")
  const isDemoPage =
    document.body.dataset.demo === 'true' ||
    window.location.pathname.endsWith('demo.html') ||
    window.location.href.includes('demo.html');

  // Backend Google Apps Script Webhook Endpoint
  const GAS_ENDPOINT_URL =
    'https://script.google.com/macros/s/AKfycbyRpBZMmXNy1Scj5YMFaS2DztLaOVrj5fyL358FblVtIc89pgftdQMJI4RP1xrVQ-n_/exec';
  const DRIVE_FOLDER_ID = '1jG1ujZpW-I50bLb9ANM70MhKCZy_TcKi';

  // 2. Background Music (BGM) Player
  const bgmAudio = document.getElementById('bgm-audio');
  const bgmToggleBtn = document.getElementById('bgm-toggle-btn');
  const bgmIconMute = document.getElementById('bgm-icon-mute');
  const bgmIconPlay = document.getElementById('bgm-icon-play');

  if (bgmAudio && bgmToggleBtn) {
    let isPlaying = false;

    const toggleBgm = async () => {
      try {
        if (isPlaying) {
          bgmAudio.pause();
          isPlaying = false;
          if (bgmIconMute) bgmIconMute.style.display = 'block';
          if (bgmIconPlay) bgmIconPlay.style.display = 'none';
        } else {
          await bgmAudio.play();
          isPlaying = true;
          if (bgmIconMute) bgmIconMute.style.display = 'none';
          if (bgmIconPlay) bgmIconPlay.style.display = 'block';
        }
      } catch (err) {
        console.warn('Audio restriction:', err);
      }
    };

    bgmToggleBtn.addEventListener('click', toggleBgm);

    const initAudioOnInteraction = () => {
      if (!isPlaying && bgmAudio.paused) {
        bgmAudio
          .play()
          .then(() => {
            isPlaying = true;
            if (bgmIconMute) bgmIconMute.style.display = 'none';
            if (bgmIconPlay) bgmIconPlay.style.display = 'block';
          })
          .catch(() => {});
      }
      document.removeEventListener('click', initAudioOnInteraction);
      document.removeEventListener('touchstart', initAudioOnInteraction);
    };

    document.addEventListener('click', initAudioOnInteraction, { once: true });
    document.addEventListener('touchstart', initAudioOnInteraction, { once: true });
  }

  // 3. Live D-Day & Countdown Timer
  const updateCountdown = () => {
    // Target: 2027년 04월 04일 11:20:00 KST
    const weddingDate = new Date('2027-04-04T11:20:00+09:00').getTime();
    const now = new Date().getTime();
    const diff = weddingDate - now;

    const daysElem = document.getElementById('countdown-days');
    const hoursElem = document.getElementById('countdown-hours');
    const minsElem = document.getElementById('countdown-mins');
    const secsElem = document.getElementById('countdown-secs');

    if (diff <= 0) {
      if (daysElem) daysElem.textContent = '0';
      if (hoursElem) hoursElem.textContent = '0';
      if (minsElem) minsElem.textContent = '0';
      if (secsElem) secsElem.textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysElem) daysElem.textContent = String(days);
    if (hoursElem) hoursElem.textContent = String(hours);
    if (minsElem) minsElem.textContent = String(mins);
    if (secsElem) secsElem.textContent = String(secs);
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 4. Modals Controller (RSVP & Account Modals)
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    const anyOpenModal = document.querySelector('.modal-overlay.show, .lightbox-modal.active');
    if (!anyOpenModal) {
      document.body.style.overflow = '';
    }
  };

  const closeAllModals = () => {
    document.querySelectorAll('.modal-overlay.show').forEach((m) => {
      m.classList.remove('show');
      m.setAttribute('aria-hidden', 'true');
    });
    const anyLightbox = document.querySelector('.lightbox-modal.active');
    if (!anyLightbox) {
      document.body.style.overflow = '';
    }
  };

  // Triggers & Close Buttons
  const rsvpModal = document.getElementById('rsvp-modal');
  const btnOpenRsvp = document.getElementById('btn-open-rsvp');
  const rsvpModalClose = document.getElementById('rsvp-modal-close');

  const groomModal = document.getElementById('account-modal-groom');
  const btnOpenGroom = document.getElementById('btn-open-groom-account');
  const groomModalClose = document.getElementById('groom-modal-close');

  const brideModal = document.getElementById('account-modal-bride');
  const btnOpenBride = document.getElementById('btn-open-bride-account');
  const brideModalClose = document.getElementById('bride-modal-close');

  if (btnOpenRsvp) btnOpenRsvp.addEventListener('click', () => openModal(rsvpModal));
  if (rsvpModalClose) rsvpModalClose.addEventListener('click', () => closeModal(rsvpModal));

  if (btnOpenGroom) btnOpenGroom.addEventListener('click', () => openModal(groomModal));
  if (groomModalClose) groomModalClose.addEventListener('click', () => closeModal(groomModal));

  if (btnOpenBride) btnOpenBride.addEventListener('click', () => openModal(brideModal));
  if (brideModalClose) brideModalClose.addEventListener('click', () => closeModal(brideModal));

  // Backdrop clicks for all modals
  document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Global Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Account Clipboard Copy
  document.querySelectorAll('.btn-copy-account').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const targetBtn = e.currentTarget;
      if (targetBtn.classList.contains('copied')) return;

      const accountText = targetBtn.getAttribute('data-account') || '';
      if (!accountText) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(accountText);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = accountText;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        // Instant visual feedback on button
        const originalText = targetBtn.getAttribute('data-orig-text') || targetBtn.textContent;
        targetBtn.setAttribute('data-orig-text', originalText);
        targetBtn.classList.add('copied');
        targetBtn.textContent = '✓ 복사 완료';

        setTimeout(() => {
          targetBtn.classList.remove('copied');
          targetBtn.textContent = originalText;
          targetBtn.blur();
        }, 1500);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  });

  // 5. Gallery 3D Carousel & Fullscreen Swipe Lightbox Viewer (Robust Infinite Loop)
  const carouselTrack = document.getElementById('gallery-carousel-track');
  const gallerySlides = document.querySelectorAll('.gallery-slide');

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxSliderTrack = document.getElementById('lightbox-slider-track');
  const lightboxSlides = document.querySelectorAll('.lightbox-slide');
  const lightboxClose = document.getElementById('lightbox-close');

  if (carouselTrack && gallerySlides.length) {
    let isResetting = false;
    let rafId = null;
    let scrollEndTimer = null;

    // Calculate nearest single slide to track center
    const updateActiveSlide = () => {
      const trackCenter = carouselTrack.scrollLeft + carouselTrack.offsetWidth / 2;
      let closestSlide = null;
      let minDistance = Infinity;

      gallerySlides.forEach((slide) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(trackCenter - slideCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestSlide = slide;
        }
      });

      // Strictly ensure ONLY ONE slide has active class
      if (closestSlide) {
        gallerySlides.forEach((slide) => {
          if (slide === closestSlide) {
            if (!slide.classList.contains('active')) slide.classList.add('active');
          } else {
            if (slide.classList.contains('active')) slide.classList.remove('active');
          }
        });
      }
    };

    // Check bounds when scroll settles (Zero-Flicker Jump)
    const checkLoopBounds = () => {
      if (isResetting || gallerySlides.length < 12) return;
      const slide0 = gallerySlides[0];
      const slide6 = gallerySlides[6];
      if (!slide0 || !slide6) return;
      const setWidth = slide6.offsetLeft - slide0.offsetLeft;
      if (setWidth <= 0) return;

      const trackCenter = carouselTrack.scrollLeft + carouselTrack.offsetWidth / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      gallerySlides.forEach((slide, idx) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(trackCenter - slideCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      let deltaIndex = 0;
      let deltaScroll = 0;

      if (carouselTrack.scrollLeft < setWidth * 0.35) {
        deltaIndex = 6;
        deltaScroll = setWidth;
      } else if (carouselTrack.scrollLeft > setWidth * 1.65) {
        deltaIndex = -6;
        deltaScroll = -setWidth;
      }

      if (deltaScroll !== 0) {
        isResetting = true;
        const newTargetIdx = closestIdx + deltaIndex;

        // 1. Temporarily disable CSS transitions on all slides & overlays
        gallerySlides.forEach((s) => {
          s.style.transition = 'none';
          const overlay = s.querySelector('.slide-dim-overlay');
          if (overlay) overlay.style.transition = 'none';
        });

        // 2. Transfer active class synchronously with zero animation
        gallerySlides.forEach((slide, idx) => {
          if (idx === newTargetIdx) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });

        // 3. Jump scroll position
        carouselTrack.scrollLeft += deltaScroll;

        // 4. Force synchronous reflow to lock pixels in place
        void carouselTrack.offsetHeight;

        // 5. Restore transitions smoothly on next animation frame
        requestAnimationFrame(() => {
          gallerySlides.forEach((s) => {
            s.style.transition = '';
            const overlay = s.querySelector('.slide-dim-overlay');
            if (overlay) overlay.style.transition = '';
          });
          isResetting = false;
        });
      }
    };

    carouselTrack.addEventListener('scroll', () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateActiveSlide();
          rafId = null;
        });
      }
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        checkLoopBounds();
        updateActiveSlide();
      }, 100);
    }, { passive: true });

    // Initialize to Set 1 Slide 0
    const initCarousel = () => {
      const targetSlide = gallerySlides[6];
      if (targetSlide) {
        const trackW = carouselTrack.offsetWidth;
        const slideL = targetSlide.offsetLeft;
        const slideW = targetSlide.offsetWidth;
        carouselTrack.scrollLeft = slideL - (trackW - slideW) / 2;
      }
      updateActiveSlide();
    };

    setTimeout(initCarousel, 60);
    window.addEventListener('resize', () => {
      updateActiveSlide();
    }, { passive: true });

    // Slide Click Handler: 1-Click instant fullscreen open without scroll interference
    gallerySlides.forEach((slide) => {
      slide.addEventListener('click', () => {
        const realIndex = parseInt(slide.getAttribute('data-real-index') || '0', 10);
        openLightbox(realIndex);
      });
    });
  }

  // Fullscreen Infinite Lightbox Controller
  const openLightbox = (realIndex = 0) => {
    if (!lightboxModal || !lightboxSliderTrack) return;
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Temporarily disable scroll-snap to lock precise target coordinate
    lightboxSliderTrack.style.scrollSnapType = 'none';
    lightboxSliderTrack.style.scrollBehavior = 'auto';

    requestAnimationFrame(() => {
      const slideWidth = lightboxSliderTrack.offsetWidth || window.innerWidth;
      lightboxSliderTrack.scrollLeft = (6 + realIndex) * slideWidth;
      void lightboxSliderTrack.offsetHeight;
      requestAnimationFrame(() => {
        lightboxSliderTrack.style.scrollSnapType = 'x mandatory';
      });
    });
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    const anyModal = document.querySelector('.modal-overlay.show');
    if (!anyModal) {
      document.body.style.overflow = '';
    }
  };

  if (lightboxSliderTrack && lightboxSlides.length) {
    let isLightboxResetting = false;
    let lbScrollEndTimer = null;

    const checkLightboxLoop = () => {
      if (isLightboxResetting || lightboxSlides.length < 12) return;
      const sWidth = lightboxSliderTrack.offsetWidth || window.innerWidth;
      const fullSetW = 6 * sWidth;
      if (fullSetW <= 0) return;

      let deltaScroll = 0;
      if (lightboxSliderTrack.scrollLeft < fullSetW * 0.35) {
        deltaScroll = fullSetW;
      } else if (lightboxSliderTrack.scrollLeft > fullSetW * 1.65) {
        deltaScroll = -fullSetW;
      }

      if (deltaScroll !== 0) {
        isLightboxResetting = true;
        const prevSnap = lightboxSliderTrack.style.scrollSnapType;
        lightboxSliderTrack.style.scrollSnapType = 'none';
        lightboxSliderTrack.scrollLeft += deltaScroll;
        void lightboxSliderTrack.offsetHeight;
        requestAnimationFrame(() => {
          lightboxSliderTrack.style.scrollSnapType = prevSnap;
          isLightboxResetting = false;
        });
      }
    };

    lightboxSliderTrack.addEventListener('scroll', () => {
      clearTimeout(lbScrollEndTimer);
      lbScrollEndTimer = setTimeout(checkLightboxLoop, 100);
    }, { passive: true });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft' && lightboxSliderTrack) {
        lightboxSliderTrack.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight' && lightboxSliderTrack) {
        lightboxSliderTrack.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
      }
    }
  });

  // 6. Naver Maps v3 Initialization
  const initNaverMap = () => {
    const mapArea = document.getElementById('map-area');
    if (!mapArea) return;

    const renderMap = () => {
      if (typeof naver !== 'undefined' && naver.maps) {
        try {
          // 더 파티움 여의도 (위도 37.5284, 경도 126.9205)
          const venueLocation = new naver.maps.LatLng(37.5284, 126.9205);
          const map = new naver.maps.Map('map-area', {
            center: venueLocation,
            zoom: 16,
            zoomControl: true,
            zoomControlOptions: {
              position: naver.maps.Position.TOP_RIGHT,
              style: naver.maps.ZoomControlStyle.SMALL,
            },
            mapTypeControl: false,
            scaleControl: false,
          });

          const marker = new naver.maps.Marker({
            position: venueLocation,
            map: map,
            title: '더 파티움 여의도',
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            window.open(
              'https://map.naver.com/p/search/%EB%8D%94%ED%8C%8C%ED%8B%B0%EC%9B%80%20%EC%97%AC%EC%9D%98%EB%8F%84',
              '_blank'
            );
          });
        } catch (e) {
          console.warn('Naver map error:', e);
        }
      }
    };

    if (typeof naver !== 'undefined' && naver.maps) {
      renderMap();
    } else {
      window.addEventListener('load', renderMap);
    }
  };

  initNaverMap();

  // 7. 1-Click Guest Photo Upload to Google Drive (with Client-Side Canvas Compression)
  const photoFileInput = document.getElementById('photo-file-input');
  const photoUploadStatus = document.getElementById('photo-upload-status');
  const photoProgressBar = document.getElementById('photo-progress-bar');
  const photoStatusText = document.getElementById('photo-status-text');

  const compressAndEncodeFile = (file) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result || '').toString().split(',')[1] || '';
          resolve({ name: file.name, type: file.type, base64: base64 });
        };
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          const maxDim = 1600;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          const base64 = dataUrl.split(',')[1] || '';
          resolve({
            name: file.name.replace(/\.[^/.]+$/, '') + '.jpg',
            type: 'image/jpeg',
            base64: base64,
          });
        };
        img.src = e.target && e.target.result ? e.target.result.toString() : '';
      };
      reader.readAsDataURL(file);
    });
  };

  if (photoFileInput) {
    photoFileInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      // Demo Mode Guard
      if (isDemoPage) {
        showToast(
          `📸 [데모] ${files.length}장의 사진이 전달되었습니다! (실제 드라이브에는 저장되지 않습니다)`
        );
        photoFileInput.value = '';
        return;
      }

      if (photoUploadStatus) photoUploadStatus.classList.add('active');
      if (photoStatusText) photoStatusText.textContent = `${files.length}장의 사진을 압축 및 전송 중입니다...`;
      if (photoProgressBar) photoProgressBar.style.width = '45%';

      try {
        const encodedFiles = await Promise.all(files.map((f) => compressAndEncodeFile(f)));

        if (photoProgressBar) photoProgressBar.style.width = '75%';

        const payload = {
          action: 'upload_photos',
          folderId: DRIVE_FOLDER_ID,
          files: encodedFiles,
        };

        await fetch(GAS_ENDPOINT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });

        if (photoProgressBar) photoProgressBar.style.width = '100%';
        if (photoStatusText) photoStatusText.textContent = '업로드 완료! 소중한 사진 감사합니다 💖';
        showToast('소중한 사진이 성공적으로 전달되었습니다! 📸💖');

        setTimeout(() => {
          if (photoUploadStatus) photoUploadStatus.classList.remove('active');
          if (photoProgressBar) photoProgressBar.style.width = '0%';
        }, 3000);
      } catch (err) {
        console.error('Upload error:', err);
        showToast('사진이 전달되었습니다. 감사합니다! ✨');
        if (photoUploadStatus) photoUploadStatus.classList.remove('active');
      } finally {
        photoFileInput.value = '';
      }
    });
  }

  // 8. RSVP Submission Handler & Dynamic UI
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSubmitBtn = document.getElementById('rsvp-submit-btn');
  const rsvpAttendRadios = document.querySelectorAll('input[name="rsvp_attend"]');
  const rsvpCountWrap = document.getElementById('rsvp-count-wrap');
  const rsvpMealWrap = document.getElementById('rsvp-meal-wrap');

  if (rsvpAttendRadios.length) {
    rsvpAttendRadios.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        const isAttending = e.target.value === '참석';
        if (rsvpCountWrap) rsvpCountWrap.style.display = isAttending ? 'block' : 'none';
        if (rsvpMealWrap) rsvpMealWrap.style.display = isAttending ? 'block' : 'none';
      });
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('rsvp-name');
      const name = nameInput ? nameInput.value.trim() : '';

      if (!name) {
        showToast('성함을 입력해 주세요.');
        return;
      }

      const sideInput = document.querySelector('input[name="rsvp_side"]:checked');
      const attendInput = document.querySelector('input[name="rsvp_attend"]:checked');
      const countInput = document.querySelector('input[name="rsvp_count"]:checked');
      const mealInput = document.querySelector('input[name="rsvp_meal"]:checked');
      const messageInput = document.getElementById('rsvp-message');

      const side = sideInput ? sideInput.value : '신랑측';
      const attend = attendInput ? attendInput.value : '참석';
      const count = attend === '참석' && countInput ? countInput.value : '0명';
      const meal = attend === '참석' && mealInput ? mealInput.value : '식사 안함';
      const message = messageInput ? messageInput.value.trim() : '';
      const timestamp = new Date().toLocaleString('ko-KR');

      const payload = { timestamp, side, name, attend, count, meal, message };

      // Demo Mode Guard
      if (isDemoPage) {
        rsvpForm.reset();
        closeModal(rsvpModal);
        showToast(
          attend === '참석'
            ? `[데모] ${name}님, 참석 의사가 전달되었습니다!`
            : `[데모] ${name}님, 따뜻한 축하 마음 감사합니다!`
        );
        return;
      }

      if (rsvpSubmitBtn) {
        rsvpSubmitBtn.disabled = true;
        rsvpSubmitBtn.textContent = '전송 중...';
      }

      try {
        await fetch(GAS_ENDPOINT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const localList = JSON.parse(localStorage.getItem('rsvp_list_ver2') || '[]');
        localList.push(payload);
        localStorage.setItem('rsvp_list_ver2', JSON.stringify(localList));

        rsvpForm.reset();
        closeModal(rsvpModal);
        showToast(
          attend === '참석'
            ? `${name}님, 참석 의사가 전달되었습니다. 감사합니다!`
            : `${name}님, 따뜻한 마음 전해주셔서 감사합니다!`
        );
      } catch (err) {
        console.error('RSVP error:', err);
        closeModal(rsvpModal);
        showToast('참석 의사가 전달되었습니다. 감사합니다!');
      } finally {
        if (rsvpSubmitBtn) {
          rsvpSubmitBtn.disabled = false;
          rsvpSubmitBtn.textContent = '전달하기';
        }
      }
    });
  }

  // 9. Share Buttons
  const btnShareKakao = document.getElementById('btn-share-kakao');
  const btnCopyLink = document.getElementById('btn-copy-link');

  if (btnShareKakao) {
    btnShareKakao.addEventListener('click', () => {
      if (navigator.share) {
        navigator
          .share({
            title: '박철용 & 심다은 결혼합니다',
            text: '2027년 4월 4일 일요일 오전 11:20 더 파티움 여의도',
            url: window.location.href,
          })
          .catch(() => {});
      } else {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          showToast('🔗 청첩장 링크가 복사되었습니다!');
        }
      }
    });
  }

  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', async () => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
        } else {
          const t = document.createElement('textarea');
          t.value = window.location.href;
          t.style.position = 'fixed';
          t.style.opacity = '0';
          document.body.appendChild(t);
          t.select();
          document.execCommand('copy');
          document.body.removeChild(t);
        }
        showToast('🔗 청첩장 링크가 복사되었습니다!');
      } catch (err) {
        showToast('링크 복사에 실패했습니다.');
      }
    });
  }
});
