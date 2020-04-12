import React, {useEffect, useState} from 'react';
import styles from './FilmsListHeader.module.scss';
import FilmsListHeaderFilter from "./FilmListHeaderFilter/FilmsListHeaderFilter";
import {FILMS_LIST_FORM_MODE} from "../FilmsListEditableForm/FilmsListEditableForm.js"

// function useForceUpdate(){
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => ++value); // update the state to force render
// }
// const forceUpdate = useForceUpdate();
// <button onClick={forceUpdate}>
//     Click to re-render
// </button> //na przyszlosc: tak mozna zrobic custom hooka na re render functional componentu

export const HEADER_COLUMN_NAME = {
    RATING: 'rating',
    NAME: 'name',
    DESCRIPTION: 'description',
};

const FilmsListHeader = (props) => {

    const [selectedColumn, setSelectedColumn] = useState(HEADER_COLUMN_NAME.RATING);

    const onColumnHeaderClicked = (column) => {
        setSelectedColumn(() => (column));
    };

    useEffect(() => {
        props.setSortingColumn(selectedColumn)
    }, [selectedColumn]);


    return (
        <div className={`${styles['film-list-header']} ${props.className}`}>
            <div className={`${styles['film-list-header__title']}`}>
                movie database
            </div>
            <FilmsListHeaderFilter setCurrentFilter={props.setCurrentFilter}
                                   className={styles['film-list-header__filter']}/>
            <div className={`${styles['header-items']}`}>
                <div className={`${styles['header-items__item']} ${styles['header-items__item--button']}`}>
                    <button className={styles['add-button']}
                            onClick={() => {
                                props.setFilmFormVisible(true);
                                props.setFormMode(FILMS_LIST_FORM_MODE.ADD)
                            }}>
                        Add movie
                    </button>
                </div>
                <div className={`${styles['header-items__item']} ${styles['header-items__item--column-name']}`}
                     onClick={() => onColumnHeaderClicked(HEADER_COLUMN_NAME.RATING)}>
                    {(() => {
                        if (selectedColumn === HEADER_COLUMN_NAME.RATING) {
                            return <span>&darr;</span>
                        }
                    })()}
                    {HEADER_COLUMN_NAME.RATING}
                </div>
                <div className={`${styles['header-items__item']} ${styles['header-items__item--column-name']}`}
                     onClick={() => onColumnHeaderClicked(HEADER_COLUMN_NAME.NAME)}>
                    {(() => {
                        if (selectedColumn === HEADER_COLUMN_NAME.NAME) {
                            return <span>&darr;</span>
                        }
                    })()}
                    {HEADER_COLUMN_NAME.NAME}
                </div>
                <div className={`${styles['header-items__item']} ${styles['header-items__item--column-name']}`}
                     onClick={() => onColumnHeaderClicked(HEADER_COLUMN_NAME.DESCRIPTION)}>
                    {(() => {
                        if (selectedColumn === HEADER_COLUMN_NAME.DESCRIPTION) {
                            return <span>&darr;</span>
                        }
                    })()}
                    {HEADER_COLUMN_NAME.DESCRIPTION}
                </div>
            </div>
        </div>
    );
};

export default FilmsListHeader;
