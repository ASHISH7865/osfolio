import { useCallback, useMemo } from 'react';
import { DraggableData, RndResizeCallback, RndDragEvent } from 'react-rnd';
import { Window as WindowType } from '@/types/types';

export const useWindowStyles = (window: WindowType, isActive: boolean) => {
  const windowContentStyle = useMemo(() => ({
    width: window.isMaximized ? '100%' : `${window.size.width}px`,
    height: window.isMaximized ? '100%' : `${window.size.height}px`,
  }), [window.isMaximized, window.size.width, window.size.height]);

  const windowClassName = useMemo(() => `
    shadow-2xl overflow-hidden border
    transition-all duration-200 ease-in-out
    ${isActive ? 'z-50' : 'z-40'}
    ${window.isMinimized ? 'hidden' : ''}
    ${window.isMaximized ? 'rounded-0' : 'rounded-[5px]'}
  `, [isActive, window.isMinimized, window.isMaximized]);

  return { windowContentStyle, windowClassName };
};

export const useWindowCallbacks = (
  onUpdatePosition: (position: { x: number; y: number }) => void,
  onUpdateSize: (size: { width: number; height: number }) => void,
  onFocus: () => void,
  setZIndex: (value: number) => void
) => {
  const handleDragStop = useCallback((_e: RndDragEvent, data: DraggableData) => {
    onUpdatePosition({ x: data.x, y: data.y });
  }, [onUpdatePosition]);

  const handleResize: RndResizeCallback = useCallback((_e, _direction, ref) => {
    onUpdateSize({ width: ref.offsetWidth, height: ref.offsetHeight });
  }, [onUpdateSize]);

  const handleFocus = useCallback(() => {
    setZIndex(50);
    onFocus();
  }, [onFocus, setZIndex]);

  return { handleDragStop, handleResize, handleFocus };
};