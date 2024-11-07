import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { useEvent } from '../../ hooks/useEvent';
import s from './CroppedText.module.sass';

export type CroppedTextProps = {
  className?: string;
  children: string;
  opened: boolean;
  rows?: number;
};

const INITIAL_VALUE = 'I';

export const CroppedText: FC<CroppedTextProps> = ({ className, children, opened, rows = 3 }) => {
  const [text, setText] = useState<string>(INITIAL_VALUE);

  const min = useRef<number>(0);
  const max = useRef<number>(0);
  const mid = useRef<number>(0);
  const root = useRef<HTMLDivElement>();
  const texts = useRef<string[]>([]);
  const items = useRef<string[]>();
  const height = useRef<number>();
  const lineHeight = useRef<number>();

  const reset = useEvent(() => {
    debugger;
    height.current = Math.round(lineHeight.current * rows);
    texts.current = [];
    min.current = mid.current = 0;
    max.current = items.current.length - 1;
  });

  useLayoutEffect(() => {
    debugger;
    lineHeight.current = lineHeight.current ?? root.current.getBoundingClientRect()?.height;
    items.current = children?.split(' ') || [];
    reset();
  }, [reset, children]);

  useLayoutEffect(() => {
    debugger;
    let timeout: number;
    let prevWidth: number = root.current?.getBoundingClientRect()?.width;
    let prevHeight: number = root.current?.getBoundingClientRect()?.height;
    const fn = () => {
      console.log("fn")
      cancelAnimationFrame(timeout);
      timeout = window.requestAnimationFrame(() => {
        console.log("requestAnimationFrame")
        setText(INITIAL_VALUE);
         reset();
       });
    };

    fn();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if ((prevWidth !== entry.contentRect.width) || (prevHeight !== entry.contentRect.height) ) {
          prevWidth = entry.contentRect.width;
          prevHeight = entry.contentRect.height;
          fn();
        }
      }
    });

    observer.observe(root.current);

    return () => observer.disconnect();
  }, [reset, rows]);

  useLayoutEffect(() => {
    debugger;
    const checkoutTexts = (callback: () => void) => {
        console.log("checkoutTexts declare ")
      if (texts.current.length < 3) {
        texts.current.push(text);
        callback();
        return;
      }
      texts.current.splice(0, 1);
      texts.current.push(text);
      if (texts.current[0] === texts.current[2]) {
        reset();
        return;
      }
      callback();
    };
    const getNewText = (count: number): string => {
      if (count >= items.current.length - 1) return items.current.join(' ');
      if (count <= 0) return '';
      return [items.current.slice(0, count).join(' '), '...'].join('');
    };

    checkoutTexts(() => {
        console.log("checkoutTexts  ")
      if (root.current.getBoundingClientRect().height <= height.current) {
        min.current = mid.current;
      } else {
        max.current = mid.current - 1;
      }
      mid.current = Math.round((min.current + max.current) / 2);
      setText(getNewText(mid.current));
    });
  }, [reset, text, children]);

  return (
    <div ref={root} className={cn(s.root,s.resizable_content , className)}>
      {opened ? children : text}
    </div>
  );
};