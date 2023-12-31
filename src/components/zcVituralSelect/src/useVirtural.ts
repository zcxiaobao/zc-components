import { sumArray } from "@/utils";
import { computed, ref } from "vue";
interface virtualOption {
  itemRender: number;
  minItemHeight: number;
  isRandomHei: boolean;
  itemTotal: number;
}
interface ObserverDom {
  container: HTMLElement;
  firstDom: HTMLElement;
  endDom: HTMLElement;
}

export default function useVirtual(options: virtualOption) {
  const nextRenderNum = options.itemRender >> 1;
  const maxFirstIndex = options.itemTotal - options.itemRender;
  const domDataCache = {
    currentPaddingTop: 6,
    currentPaddingBottom: 6,
  };
  let observerDom: ObserverDom = {} as ObserverDom;
  let observer: IntersectionObserver;

  const firstIndex = ref<number>(0);
  const currentIndex = ref<number>(0);
  let allminItemHeight = ref<number[]>(
    new Array(options.itemTotal).fill(options.minItemHeight)
  );
  const lastIndex = computed(() => firstIndex.value + options.itemRender);
  const isRender = computed(() => (index: number) => {
    return index >= firstIndex.value && index < lastIndex.value;
  });

  const calcAlterPadding = function (isScrolldown: boolean) {
    return isScrolldown
      ? sumArray(
          allminItemHeight.value.slice(
            lastIndex.value - nextRenderNum,
            lastIndex.value
          )
        )
      : sumArray(
          allminItemHeight.value.slice(
            firstIndex.value,
            firstIndex.value + nextRenderNum
          )
        );
  };
  const updateAllminItemHeight = function () {
    const liDom = observerDom.container.getElementsByTagName("li");
    for (let i = firstIndex.value; i < lastIndex.value; i++) {
      const newHeight = liDom[i - firstIndex.value + 1].clientHeight;
      allminItemHeight.value[i] = newHeight;
    }
  };
  const calcFirstIndex = function (isScrolldown: boolean) {
    if (isScrolldown) {
      firstIndex.value = currentIndex.value + nextRenderNum;
    } else {
      firstIndex.value = currentIndex.value - nextRenderNum;
    }
    if (firstIndex.value < 0) {
      firstIndex.value = 0;
    } else if (firstIndex.value > maxFirstIndex) {
      firstIndex.value = maxFirstIndex;
    }
  };
  const adjustPadding = (isScrolldown: boolean) => {
    options.isRandomHei && updateAllminItemHeight();
    const alterPadding = options.isRandomHei
      ? calcAlterPadding(isScrolldown)
      : options.minItemHeight * nextRenderNum;
    let { currentPaddingTop } = domDataCache;
    let newPaddingTop = 0;
    if (isScrolldown) {
      newPaddingTop = currentPaddingTop + alterPadding;
    } else {
      if (currentPaddingTop !== 0) {
        newPaddingTop = currentPaddingTop - alterPadding;
      }
    }
    observerDom.container.style.paddingTop = `${newPaddingTop}px`;
    updateDomDataCache({
      currentPaddingTop: newPaddingTop,
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
        calcFirstIndex(false);
        adjustPadding(false);
      } else if (entry.target === observerDom.endDom) {
        calcFirstIndex(true);
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

  const alterOptions = function (newOptions: virtualOption) {
    options = newOptions;
    allminItemHeight.value = new Array(options.itemTotal).fill(
      options.minItemHeight
    );
  };
  return {
    startObserver,
    stopObserver,
    isRender,
    alterOptions,
  };
}
