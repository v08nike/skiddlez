import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Popup } from '../../../lib/custom-ui';
import { withPopup } from '../../../lib/popup';
import hasPermision from '../../../utils/has-permission';
import AddPopup from '../../Boards/AddPopup';
import CardAddPopup from '../../List/CardAddPopup';
import ListAdd from '../ListAdd';
import AddStepPopup from '../../CardModal/LabelsPopup/AddStepPopup';
// import BoardsContainer from '../../../containers/BoardsContainer';

const Boards = React.memo(
  ({ onCreate, onListCreate, onCardCreate, onLabelCreate, allLabels}) => {

    const [canCreateContent] = hasPermision('create_and_share_new_content:create');
    const [showModel, setShowModel] = useState(null);

    useEffect(() => {
      setShowModel(4)
    }, [setShowModel])

    // // Workaround for CardAdd 'Cancel' button
    // const showCardAdd = (isShow) => {

    //   console.log('showCardAdd : isShow = ', isShow);

    //   if (!isShow) {
    //     setShowModel(4);
    //   }
    // }

    if(showModel === 0) {
      return <AddPopup onCreate={onCreate} setShowModel = {setShowModel}/>
    }
    if(showModel === 1) {
      return <ListAdd onCreate={onListCreate}/>
    }
    if(showModel === 2) {
      return <CardAddPopup onCreate={onCardCreate}/>
    }
    if(showModel === 3 && canCreateContent) {
      return <AddStepPopup allLabels={allLabels} onCreate={onLabelCreate} setShowModel = {setShowModel}/>
    }


    if(showModel === 4) {
      return (
        <>
          <Popup.Content>
              <div className='delete-account-modal-actions'>
                  <button type = "button"
                  className='glass-btn' onClick={() => setShowModel(0)}>
                  Board
                  <span/>
                  <span/>
                  <span/>
                  <span/>
                  </button>
                  <button
                  className='glass-btn'
                  type="button"
                  onClick={() => setShowModel(1)}
                  >
                  List
                  <span/>
                  <span/>
                  <span/>
                  <span/>
                  </button>
                  <button type = 'button'
                  className='glass-btn' onClick={() => setShowModel(2)}>
                  Card
                  <span/>
                  <span/>
                  <span/>
                  <span/>
                  </button>
                  <button type = 'button'
                  className='glass-btn' onClick={() => setShowModel(3)}>
                  Label
                  <span/>
                  <span/>
                  <span/>
                  <span/>
                  </button>
              </div>
          </Popup.Content>
        </>
      );
    }

    return <></>
  },
);

Boards.propTypes = {
    onCardCreate : PropTypes.func.isRequired,
    onLabelCreate : PropTypes.func.isRequired,
    onCreate : PropTypes.func.isRequired,
    onListCreate : PropTypes.func.isRequired,
    allLabels: PropTypes.instanceOf(Array).isRequired
};

export default withPopup(Boards);
