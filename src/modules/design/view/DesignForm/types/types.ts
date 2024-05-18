import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useStage, useTransformer } from '../hooks';
import { ShapeTypeEnum } from './constant';

export type BaseShape = {
  [ShapeTypeEnum.CUSTOM]: Konva.ShapeConfig & {
    src?: string;

    /**
     * color to fill into svg
     */
    colors: string[];
  };
  [ShapeTypeEnum.IMAGE_FRAME]: Konva.ShapeConfig & {
    src?: string;
    baseNode: ShapeTypeEnum;
  };

  /**
   * Konva default nodes
   */
  [ShapeTypeEnum.TAG]: Konva.TagConfig;
  [ShapeTypeEnum.ARC]: Konva.ArcConfig;
  [ShapeTypeEnum.LINE]: Konva.LineConfig;
  [ShapeTypeEnum.STAR]: Konva.StarConfig;
  [ShapeTypeEnum.RING]: Konva.RingConfig;
  [ShapeTypeEnum.TEXT]: Konva.TextConfig;
  [ShapeTypeEnum.IMAGE]: Konva.ImageConfig & {
    src: string;
  };
  [ShapeTypeEnum.ARROW]: Konva.ArrowConfig;
  [ShapeTypeEnum.LABEL]: Konva.LabelConfig;
  [ShapeTypeEnum.CIRCLE]: Konva.CircleConfig;
  [ShapeTypeEnum.SPRITE]: Konva.SpriteConfig;
  [ShapeTypeEnum.RECTANGLE]: Konva.RectConfig;
  [ShapeTypeEnum.ELLIPSE]: Konva.EllipseConfig;
  [ShapeTypeEnum.REGULAR_POLYGON]: Konva.RegularPolygonConfig;
};

export type BaseShapeRef = Konva.Shape &
  Konva.Arc &
  Konva.Line &
  Konva.Star &
  Konva.Ring &
  Konva.Text &
  Konva.Image &
  Konva.Arrow &
  Konva.Label &
  Konva.Circle &
  Konva.Sprite &
  Konva.Rect &
  Konva.Ellipse &
  Konva.RegularPolygon & { id: string };

export type IShapeConfig<T extends ShapeTypeEnum> = {
  id: string;
  attrs: BaseShape[T] & {
    shapeType: T;

    /**Disabled configuration shape */
    locked?: boolean;

    /** Shape layer zIndex */
    layerIdx?: number;

    /**
     * Shape group ID
     */
    group?: string;
  };

  [key: string]: any;
};

export type IShape = {
  [T in ShapeTypeEnum]: IShapeConfig<T>;
}[ShapeTypeEnum];

export type ITEMS_CONTEXT = {
  selectedItems: Konva.Node[];

  stage: ReturnType<typeof useStage>;
  transformer: ReturnType<typeof useTransformer>;

  onSelect: (e?: KonvaEventObject<MouseEvent>, itemList?: Konva.Node[]) => void;
};

export interface IDesignContent {
  pageNumber: number;
  shapes: IShape[];
  thumbnail?: string;
}

export interface IDesign {
  id: string;
  name: string;
  category: string;
  content: IDesignContent[];
}
