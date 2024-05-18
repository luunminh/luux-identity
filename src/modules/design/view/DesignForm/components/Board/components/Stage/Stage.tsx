/* eslint-disable react-hooks/exhaustive-deps */
import { COLOR_CODE } from '@core/common';
import { useStage } from '@design/hooks';
import { ITEMS_CONTEXT } from '@design/types';
import { decimalUpToSeven } from '@design/utils';
import { Box, Stack } from '@mantine/core';
import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';
import { ForwardedRef, PropsWithChildren, forwardRef, useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Stage as KonvaStage, Layer, Rect } from 'react-konva';
import { getItemsInBoundary, getOriginFromTwoPoint, getScaledMousePosition } from './Stage.helpers';

type Props = PropsWithChildren & {
  onSelect: ITEMS_CONTEXT['onSelect'];
  stage: ReturnType<typeof useStage>;
};

const Stage = forwardRef(
  ({ children, stage, onSelect }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { stageRef, dragBackgroundOrigin } = stage;

    const moveStage = useCallback(() => {
      const stage = stageRef.current;
      if (!stage || !stage.container().parentElement || !dragBackgroundOrigin.current) {
        return;
      }
      stage.on('mousemove', (e) => {
        if (e.evt.which !== 1) {
          return;
        }
        const currentMousePos = stage.getPointerPosition();
        if (!currentMousePos) {
          return;
        }
        if (dragBackgroundOrigin.current.x === 0 && dragBackgroundOrigin.current.y === 0) {
          dragBackgroundOrigin.current = currentMousePos!;
          return;
        }
        const newPos = {
          x: decimalUpToSeven(stage.x() + (currentMousePos!.x - dragBackgroundOrigin.current.x)),
          y: decimalUpToSeven(stage.y() + (currentMousePos!.y - dragBackgroundOrigin.current.y)),
        };
        stage.position(newPos);
        dragBackgroundOrigin.current = currentMousePos!;
      });
      stage.on('mouseup', (e) => {
        dragBackgroundOrigin.current = { x: 0, y: 0 };
        if (!stageRef.current?.draggable()) {
          stage.removeEventListener('mousemove');
          stage.removeEventListener('mouseup');
        }
      });
      stageRef.current?.draggable(true);
    }, []);

    const onSelectEmptyBackground = useCallback(
      (e: KonvaEventObject<MouseEvent>) => {
        e.target.getType() === 'Stage' && onSelect(e);
      },
      [onSelect],
    );

    const onMouseDownOnStage = useCallback(
      (e: KonvaEventObject<MouseEvent>) => {
        onSelectEmptyBackground(e);
        const stage = e.target.getStage();
        if (!stage) {
          return;
        }
        const selectBox = stage.findOne('.select-box');
        const scaledCurrentMousePos = getScaledMousePosition(stage, e.evt);
        const currentMousePos = stage.getPointerPosition();
        selectBox.position(scaledCurrentMousePos);
        if (stage.getAllIntersections(currentMousePos).length || stageRef.current?.draggable()) {
          selectBox.visible(false);
          return;
        }
        selectBox.visible(true);
      },
      [onSelectEmptyBackground],
    );

    const onMouseMoveOnStage = (e: KonvaEventObject<MouseEvent>) => {
      if (e.evt.which === 1) {
        const stage = e.target.getStage();
        if (!stage) {
          return;
        }
        const selectBox = stage.findOne('.select-box');
        if (!selectBox.visible()) {
          return;
        }
        const currentMousePos = getScaledMousePosition(stage, e.evt);
        const origin = selectBox.position();
        const size = selectBox.size();
        const adjustedRectInfo = getOriginFromTwoPoint(origin, currentMousePos, size);
        selectBox.position({
          x: adjustedRectInfo.x,
          y: adjustedRectInfo.y,
        });
        selectBox.size({
          width: adjustedRectInfo.width,
          height: adjustedRectInfo.height,
        });
        selectBox.getStage()?.batchDraw();
      }
    };

    const onMouseUpOnStage = useCallback(
      (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (!stage) {
          return;
        }
        const selectBox = stage.findOne('.select-box');
        const overlapItems: Node<NodeConfig>[] = getItemsInBoundary(stage, selectBox)
          ? getItemsInBoundary(stage, selectBox)!
              .flat()
              .filter((_item) => _item.className !== 'Label')
          : [];

        selectBox.visible(false);
        selectBox.position({
          x: 0,
          y: 0,
        });
        selectBox.size({
          width: 0,
          height: 0,
        });
        selectBox.getLayer()?.batchDraw();
        overlapItems?.length && onSelect(undefined, overlapItems);
      },
      [onSelect],
    );

    useHotkeys(
      'space',
      (e) => {
        moveStage();
      },
      { keydown: true, enabled: !stageRef.current?.draggable() },
      [stageRef.current, moveStage],
    );

    useHotkeys(
      'space',
      (e) => {
        stageRef.current?.draggable(false);
        stageRef.current?.fire('mouseup');
      },
      { keyup: true },
      [stageRef.current, moveStage],
    );

    return (
      <Stack align="center" justify="center" ref={ref} className="stage-wrapper">
        <Box
          pos="relative"
          style={{
            width: 'fit-content',
            background: COLOR_CODE.WHITE,
            border: COLOR_CODE.BORDER_DEFAULT,
          }}
        >
          <KonvaStage
            draggable={false}
            ref={stageRef}
            width={window.innerWidth * 0.7}
            height={window.innerHeight * 0.7}
            onMouseUp={onMouseUpOnStage}
            onMouseDown={onMouseDownOnStage}
            onMouseMove={onMouseMoveOnStage}
          >
            <Layer>
              {children}
              <Rect
                id="select-box"
                name="select-box"
                x={0}
                y={0}
                width={0}
                height={0}
                fill="skyblue"
                opacity={0.4}
                visible={false}
              />
            </Layer>
          </KonvaStage>
        </Box>
      </Stack>
    );
  },
);

export default Stage;
