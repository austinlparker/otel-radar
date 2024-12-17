import { ReactNode, forwardRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

interface ZoomWrapperProps {
  children: ReactNode;
  onZoomToPoint?: (x: number, y: number) => void;
}

export const ZoomWrapper = forwardRef<ReactZoomPanPinchRef, ZoomWrapperProps>(
  ({ children }, ref) => {
    return (
      <TransformWrapper
        ref={ref}
        initialScale={0.8}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        limitToBounds={false}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
          contentStyle={{
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </TransformComponent>
      </TransformWrapper>
    );
  },
);

ZoomWrapper.displayName = "ZoomWrapper";
