import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Popup } from '../../lib/custom-ui';
import { withPopup } from '../../lib/popup';
import ActionsPopup from './ActionsPopup';

const ProjectsPopup = React.memo(({projectsList, project, isEditable, onUpdate, onBackgroundImageUpdate, onDelete}) => {
    
    return (
        <>
            <Popup.Header>
                Projects
            </Popup.Header>
            <Popup.Content>
                <ul className='projects-dropdown'>
                    {
                        projectsList.map(item => (
                            <li key = {`project----${item.id}`}>
                                {item.id === project.currentProject ?
                                    <>
                                    {
                                        isEditable? 
                                            <div className='current-project-selected-modal'>
                                                <button type='button' className='glass-btn selected-btn'>
                                                    <p>{item.name}</p>
                                                    <span/>
                                                    <span/>
                                                    <span/>
                                                    <span/>
                                                </button>
                                                <ActionsPopup
                                                onUpdate={onUpdate}
                                                onBackgroundImageUpdate={onBackgroundImageUpdate}
                                                onDelete={onDelete}
                                                project = {project}/>
                                            </div>
                                            :
                                            <button type='button' className='glass-btn selected-btn'>
                                                    <p>{item.name}</p>
                                                    <span/>
                                                    <span/>
                                                    <span/>
                                                    <span/>
                                                </button>
                                    }
                                    </>
                                    :
                                    <Link to = {item.firstBoardId ? `/boards/${item.firstBoardId}` : `/projects/${item.id}`}>
                                    <button type='button' className='glass-btn'>
                                        <p>{item.name}</p>
                                        <span/>
                                        <span/>
                                        <span/>
                                        <span/>
                                    </button>
                                    </Link>
                                }
                            </li>
                        ))
                    }
                </ul>
            </Popup.Content>
        </>
    )
})

ProjectsPopup.propTypes = {
    /* eslint-disable react/forbid-prop-types */
    projectsList : PropTypes.array.isRequired,
    project : PropTypes.object.isRequired,
    isEditable : PropTypes.bool.isRequired,
    onUpdate : PropTypes.func.isRequired,
    onBackgroundImageUpdate : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired
}

export default withPopup(ProjectsPopup)