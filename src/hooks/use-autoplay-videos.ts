import { useEffect } from 'react';

/**
 * 统一管理页面所有 `<video autoplay>` 的自动播放，解决两类问题：
 *
 * 1. React 只把 `muted` 设为 property、不反射为 DOM attribute → 浏览器自动播放策略拦停。
 *    → 强制写入 `muted` / `playsinline` DOM 特性。
 *
 * 2. 浏览器有**并发视频解码上限**：网格里 4 个封面视频常驻播放已接近上限，
 *    打开模态后模态内的 hero 视频抢不到解码配额 → ready=0 黑屏。
 *    → 模态（全屏 fixed 覆盖层，z-index ≥ 90）打开时，暂停模态**外**的视频
 *      （它们本就被模态盖住看不见），把配额让给模态内的 hero；关闭模态再全部恢复。
 *
 * 不做"进视口才播"（会让离屏卡片停在黑帧，被误认为"视频没了"）——无模态时封面全部常驻播放。
 */
export function useAutoplayVideos() {
  useEffect(() => {
    const primed = new WeakSet<HTMLVideoElement>();
    const prime = (v: HTMLVideoElement) => {
      if (primed.has(v)) return;
      primed.add(v);
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute('muted', '');
      v.playsInline = true;
      v.setAttribute('playsinline', '');
    };

    // 当前打开的全屏模态：fixed inset-0 且 z-index ≥ 90 的最高层
    const findModal = (): Element | null => {
      let modal: Element | null = null;
      let maxZ = 89;
      document.querySelectorAll('div.fixed.inset-0').forEach((el) => {
        const z = parseInt(getComputedStyle(el).zIndex || '0', 10);
        if (z >= 90 && z >= maxZ) {
          maxZ = z;
          modal = el;
        }
      });
      return modal;
    };

    const apply = () => {
      const modal = findModal();
      document
        .querySelectorAll<HTMLVideoElement>('video[autoplay], video[autoPlay]')
        .forEach((v) => {
          prime(v);
          const shouldPlay = modal ? modal.contains(v) : true;
          if (shouldPlay) {
            if (v.paused) v.play().catch(() => {});
          } else if (!v.paused) {
            v.pause();
          }
        });
    };

    // 合并突发的 DOM 变更，避免每次 mutation 都跑一遍
    let scheduled = false;
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        apply();
      });
    };

    apply();
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => mo.disconnect();
  }, []);
}
