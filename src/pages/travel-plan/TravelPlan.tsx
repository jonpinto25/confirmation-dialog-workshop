import { memo, useCallback, useState } from 'react';
import { initialTravelPlan } from './places';
import { PlaceTree } from './PlaceTree';
import type { Plan } from './model';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/ConfirmationDialog';

export const TravelPlan = memo(() => {
  const [plan, setPlan] = useState<Plan>(initialTravelPlan);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);

  const completePlan = useCallback((parentId: number, childId: number) => {
    const parent = plan[parentId];
    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter(id => id !== childId)
    };
    setPlan({
      ...plan,
      [parentId]: nextParent
    });
  }, [plan])

  const root = plan[0];
  const planetIds = root.childIds;

  const onDialogClose = useCallback(() => {
    setOnConfirmCallback(null)
    setOpenDialog(false)
  }, [])

  const handleComplete = useCallback((parentId: number, childId: number) => {
    setOnConfirmCallback(() => () => {
      completePlan(parentId, childId);
    });
    setOpenDialog(true);
  }, [completePlan,])

  const onConfirm = useCallback(() => {
    if (onConfirmCallback) {
      onConfirmCallback()
    }
    onDialogClose()
  }, [onDialogClose, onConfirmCallback])


  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
      {openDialog && <ConfirmationDialog onClose={onDialogClose} onConfirm={onConfirm} open={openDialog} />}
    </>
  );
})
