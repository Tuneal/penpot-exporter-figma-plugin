import { PenpotFile } from '@ui/lib/penpot';
import { CIRCLE_TYPE } from '@ui/lib/types/circle/circleAttributes';
import { CircleShape } from '@ui/lib/types/circle/circleShape';

import { translateFillGradients } from '../translators';

export const createPenpotCircle = (file: PenpotFile, { type, fills, ...rest }: CircleShape) => {
  file.createCircle({
    type: CIRCLE_TYPE,
    fills: translateFillGradients(fills),
    ...rest
  });
};
