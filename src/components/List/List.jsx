import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { useTranslation } from 'react-i18next';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import hasPermision from '../../utils/has-permission';

import DroppableTypes from '../../constants/DroppableTypes';
import CardContainer from '../../containers/CardContainer';
import NameEdit from './NameEdit';
import CardAdd from './CardAdd';
import ActionsPopup from './ActionsPopup';
// import { ReactComponent as PlusMathIcon } from '../../assets/images/plus-math-icon.svg';

// import styles from './List.module.scss';

const List = React.memo(
  ({ id, index, name, isPersisted, cardIds, onUpdate, onDelete, onCardCreate, max }) => {
    // const [t] = useTranslation();
    const [isAddCardOpened, setIsAddCardOpened] = useState(false);

    const nameEdit = useRef(null);
    const listWrapper = useRef(null);

    const handleHeaderClick = useCallback(() => {
      if (isPersisted) {
        if (nameEdit.current) {
          nameEdit.current.open();
        }
      }
    }, [isPersisted]);

    const handleNameUpdate = useCallback(
      (newName) => {
        onUpdate({
          name: newName,
        });
      },
      [onUpdate],
    );

    // const handleAddCardClick = useCallback(() => {
    //   setIsAddCardOpened(true);
    // }, []);

    // const handleAddCardClose = useCallback(() => {
    //   setIsAddCardOpened(false);
    // }, []);

    const handleNameEdit = useCallback(() => {
      if (nameEdit.current) {
        nameEdit.current.open();
      }
    }, []);

    const [canUpdateContent] = hasPermision('create_and_share_new_content:update');

    // const handleCardAdd = useCallback(() => {
    //   setIsAddCardOpened(true);
    // }, []);

    useEffect(() => {
      listWrapper.current.scrollTop = listWrapper.current.scrollHeight;
    }, [cardIds]);

    const cardsNode = (
      <Droppable
        droppableId={`list:${id}`}
        type={DroppableTypes.CARD}
        isDropDisabled={!isPersisted}
      >
        {({ innerRef, droppableProps, placeholder }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
            <div className="cards" {...droppableProps} ref={innerRef}>
              {cardIds.map((cardId, cardIndex) => (
                <CardContainer key={cardId} id={cardId} index={cardIndex} value = {index} max = {max} />
              ))}
              {placeholder}
              {(isPersisted && canUpdateContent && isAddCardOpened) && (
                <CardAdd
                  onCreate={onCardCreate}
                  cardStatus = {setIsAddCardOpened}
                />
              ) }
            </div>
        )}
      </Droppable>
    );

    return (
      <Draggable draggableId={`list:${id}`} index={index} isDragDisabled={!isPersisted}>
        {({ innerRef, draggableProps, dragHandleProps }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <div {...draggableProps} data-drag-scroller ref={innerRef} className={cardIds && cardIds.length < 1 ? "listWrapper verticalListWrapper" : "listWrapper"}>
            {/* eslint-disable jsx-a11y/click-events-have-key-events,
                               jsx-a11y/no-static-element-interactions,
                               react/jsx-props-no-spreading */}
            <div className={cardIds && cardIds.length < 1 ? "list-wrapper vertical-list" : "list-wrapper"}>
              <div {...dragHandleProps} className="list-header" onClick={handleHeaderClick}>
                {/* eslint-enable jsx-a11y/click-events-have-key-events,
                                  jsx-a11y/no-static-element-interactions,
                                  react/jsx-props-no-spreading */}
              {canUpdateContent && (
                <NameEdit ref={nameEdit} defaultValue={name} onUpdate={handleNameUpdate}>
                  <h3 className="headerName">{name}</h3>
                </NameEdit>
              )}
              {!canUpdateContent && (
                <h3 className="headerName">{name}</h3>
              )}
              {isPersisted && canUpdateContent && (
                <ActionsPopup
                  onNameEdit={handleNameEdit}
                  onDelete={onDelete}
                  cardStatus = {setIsAddCardOpened}/>
              )}
              </div>
                <div className="list"
                ref={listWrapper}>{cardsNode}</div>
            </div>
          </div>
        )}
      </Draggable>
    );
  },
);

List.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isPersisted: PropTypes.bool.isRequired,
  cardIds: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onCardCreate: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired
};

List.defaultProps = {
  onDelete: undefined,
};

export default List;
