import { Observable } from "rxjs";

/**
 * 监听元素大小变化
 * @param elem  监听的元素
 * @returns
 */
export function resizeObservable(
  elem: HTMLElement
): Observable<ResizeObserverEntry[]> {
  return new Observable((subscriber) => {
    const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      subscriber.next(entries);
    });
    ro.observe(elem);
    return () => {
      ro.unobserve(elem);
    };
  });
}
