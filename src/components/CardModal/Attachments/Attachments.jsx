import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

const Attachments = React.memo(({ items, onUpdate, onDelete, onCoverUpdate }) => {

  const handleCoverSelect = useCallback(
    (id) => {
      onCoverUpdate(id);
    },
    [onCoverUpdate],
  );

  const handleCoverDeselect = useCallback(() => {
    onCoverUpdate(null);
  }, [onCoverUpdate]);

  const handleUpdate = useCallback(
    (id, data) => {
      onUpdate(id, data);
    },
    [onUpdate],
  );

  const handleDelete = useCallback(
    (id) => {
      onDelete(id); 
    },
    [onDelete],
  );

  return (
    <>
      {(items && items.length > 0) && items.map((item) => (
        <Item
          key={item.id}
          name={item.name}
          url={item.url}
          coverUrl={item.coverUrl}
          createdAt={item.createdAt}
          isCover={item.isCover}
          isPersisted={item.isPersisted}
          onCoverSelect={() => handleCoverSelect(item.id)}
          onCoverDeselect={handleCoverDeselect}
          onUpdate={(data) => handleUpdate(item.id, data)}
          onDelete={() => handleDelete(item.id)}
        />
      ))}
    </>
  );
});

Attachments.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCoverUpdate: PropTypes.func.isRequired,
};

export default Attachments;
