import pick from 'lodash/pick';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Link } from 'react-router-dom';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import { closePopup } from '../../lib/popup';
import { Popup } from '../../lib/custom-ui';
import { withPopup } from '../../lib/popup';

import Paths from '../../constants/Paths';
// import DroppableTypes from '../../constants/DroppableTypes';
// import AddPopup from './AddPopup';
import EditPopup from './EditPopup';
import DeletePopup from '../DeleteStep/DeletePopup';

const Boards = React.memo(
  ({ items, currentId, isEditable, onUpdate, onDelete }) => {
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

    const renderItems = useCallback(
      (safeItems) =>
        safeItems.map((item) => (
          <li key={item.id}>
              {item.isPersisted ? (
                  <Link
                  to={Paths.BOARDS.replace(':id', item.id)}
                  title={item.name}
                >
                  <button type='button' className={item.id === currentId ? "glass-btn selected-btn" : "glass-btn"}>
                    <p>{item.name}</p>
                    <span/><span/><span/><span/>
                  </button>
                </Link>
              ) : (
                <button type='button' className={item.id === currentId ? "glass-btn selected-btn disabled" : "glass-btn disabled"}>
                    <p>{item.name}</p>
                    <span/><span/><span/><span/>
                  </button>
              )}
          </li>
        )),
      [currentId],
    );

    const renderEditableItems = useCallback(
      (safeItems) =>
        safeItems.map((item) => (
          <li key={item.id} className='active-board-link'>
              {item.isPersisted ? (
                <>
                <Link
                  to={Paths.BOARDS.replace(':id', item.id)}
                  title={item.name}
                >
                  <button type='button' className={item.id === currentId ? "glass-btn selected-btn" : "glass-btn"}>
                    <p>{item.name}</p>
                    <span/><span/><span/><span/>
                  </button>
                </Link>
                  
                  <EditPopup
                    defaultData={pick(item, 'name')}
                    onUpdate={(data) => handleUpdate(item.id, data)}
                  >
                    <button type = 'button' className="glass-btn edit btn-max board-edit-btn">
                      <i className="fas fa-pencil-alt"/>
                    <span/><span/><span/><span/>
                    </button>
                  </EditPopup>
                    <DeletePopup 
                    onConfirm = {() => handleDelete(item.id)} content = "Are you sure you want to delete this board" buttonContent = "Delete Board">
                      <button type = 'button' className="glass-btn danger btn-max board-edit-btn">
                        <i className="far fa-trash-alt"/>
                        <span/><span/><span/><span/>
                      </button>
                    </DeletePopup>
                </>
              ) : (
                <button type='button' className={item.id === currentId ? "glass-btn selected-btn disabled" : "glass-btn disabled"}>
                    <p>{item.name}</p>
                    <span/><span/><span/><span/>
                  </button>
              )}
          </li>
        )),
      [currentId, handleUpdate, handleDelete],
    );

    return (
      <>  
        <Popup.Header>
          All Boards
        </Popup.Header>
        <Popup.Content>
          <ul className='boards-dropdown'>
          {isEditable ? (
            <>
              {renderEditableItems(items)}
            </>
          ) : (
            <>{renderItems(items)}</>
          )}
          </ul>
        </Popup.Content>
      </>
    );
  },
);

Boards.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  currentId: PropTypes.string,
  isEditable: PropTypes.bool.isRequired,
  // onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  // onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Boards.defaultProps = {
  currentId: undefined,
};

export default withPopup(Boards);
