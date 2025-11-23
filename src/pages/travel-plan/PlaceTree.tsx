import { memo } from "react";
import type { Plan } from "./model";

import styles from './PlaceTree.module.scss'

interface PlaceTreeProps {
    id: number,
    parentId: number,
    placesById: Plan,
    onComplete: (parentId: number, id: number) => void,
}

export const PlaceTree = memo(({ id, parentId, placesById, onComplete }: PlaceTreeProps) => {
    const place = placesById[id];
    const childIds = place.childIds;
    return (
      <li>
        <div className={styles['place']}>
            {place.title}
            <button onClick={() => {
            onComplete(parentId, id);
            }}>
            Complete
            </button>
        </div>
        {childIds.length > 0 &&
          <ol>
            {childIds.map(childId => (
              <PlaceTree
                key={childId}
                id={childId}
                parentId={id}
                placesById={placesById}
                onComplete={onComplete}
              />
            ))}
          </ol>
        }
      </li>
    );
})