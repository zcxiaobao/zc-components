import { computed, ref } from "vue";
interface virtualOption {
  maxRender: number;
  listItemHeight: number;
  listNumber: number;
}
interface ObserverDom {
  container: HTMLElement;
  firstDom: HTMLElement;
  endDom: HTMLElement;
}

export default function useVirtual(options: virtualOption) {
  const firstIndex = ref<number>(0);
  const currentIndex = ref<number>(0);
  const lastIndex = computed(() => firstIndex.value + options.maxRender);
  const increseNum = computed(() => options.maxRender >> 1);
  const isRender = computed(() => (index: number) => {
    return index >= firstIndex.value && index < lastIndex.value;
  });
  let observerDom: ObserverDom = {} as ObserverDom;
  let observer: IntersectionObserver;
  const domDataCache = {
    currentPaddingTop: 6,
    currentPaddingBottom: 6,
  };
  const getFirstIndex = function (isScrolldown: boolean) {
    if (isScrolldown) {
      firstIndex.value = currentIndex.value + increseNum.value;
    } else {
      firstIndex.value = currentIndex.value - increseNum.value;
    }
    if (firstIndex.value < 0) {
      firstIndex.value = 0;
    } else if (firstIndex.value > options.listNumber - increseNum.value) {
      firstIndex.value = options.listNumber - increseNum.value;
    }
  };
  const adjustPadding = (isScrolldown: boolean) => {
    const alterPadding = options.listItemHeight * increseNum.value;
    let { currentPaddingTop } = domDataCache;
    let newPaddingTop = 0,
      newPaddingBottom = 0;
    if (isScrolldown) {
      newPaddingTop = currentPaddingTop + alterPadding;
      //   if (currentPaddingBottom !== 0) {
      //     newPaddingBottom = currentPaddingBottom - alterPadding;
      //   }
    } else {
      //   newPaddingBottom = currentPaddingBottom + alterPadding;
      if (currentPaddingTop !== 0) {
        newPaddingTop = currentPaddingTop - alterPadding;
      }
    }
    observerDom.container.style.paddingTop = `${newPaddingTop}px`;
    // observerDom.container.style.paddingBottom = `${newPaddingBottom}px`;
    updateDomDataCache({
      currentPaddingTop: newPaddingTop,
      currentPaddingBottom: newPaddingBottom,
    });
  };
  const updateDomDataCache = function (params: any) {
    Object.assign(domDataCache, params);
  };
  const initIntersectionObserver = function () {
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries.length >= 2) return;
      const entry = entries[0];
      if (entry.intersectionRatio <= 0) return;
      if (!entry.isIntersecting) return;
      if (entry.target === observerDom.firstDom) {
        getFirstIndex(false);
        adjustPadding(false);
      } else if (entry.target === observerDom.endDom) {
        getFirstIndex(true);
        adjustPadding(true);
      }
      currentIndex.value = firstIndex.value;
    };

    observer = new IntersectionObserver(callback);
    observer.observe(observerDom.firstDom);
    observer.observe(observerDom.endDom);
  };

  const getIntersectionObserverDom = (selectDom: HTMLElement) => {
    observerDom.container = selectDom.querySelector(
      ".el-select-dropdown__list"
    )!;
    observerDom.firstDom = observerDom.container.querySelector(".start")!;
    observerDom.endDom = observerDom.container.querySelector(".end")!;
  };
  const startObserver = (selectDom: HTMLElement) => {
    getIntersectionObserverDom(selectDom);
    initIntersectionObserver();
  };

  const stopObserver = () => {
    observer.disconnect && observer.disconnect();
    observerDom = {} as ObserverDom;
  };
  return {
    startObserver,
    stopObserver,
    isRender,
  };
}
