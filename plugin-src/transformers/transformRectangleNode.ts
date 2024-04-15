import { transformDimensionAndPosition } from '@plugin/transformers/partials';
import { translateBlendMode, translateFills } from '@plugin/translators';

import { RectShape } from '@ui/lib/types/rect/rectShape';

export const transformRectangleNode = (
  node: RectangleNode,
  baseX: number,
  baseY: number
): RectShape => {
  return {
    type: 'rect',
    name: node.name,
    fills: translateFills(node.fills, node.width, node.height),
    blendMode: translateBlendMode(node.blendMode),
    opacity: !node.visible ? 0 : node.opacity, //@TODO: check this. If we use the property hidden and it's hidden, it won't export
    ...transformDimensionAndPosition(node, baseX, baseY)
  };
};
