import React, {useEffect, useState} from 'react';
import styles from './FilmsListEditableForm.module.scss';

export const FILMS_LIST_FORM_MODE = {
    EDIT: 'edit',
    ADD: 'add'
};

export const ACTION_BUTTON = {
    EDIT: 'edit',
    ADD: 'add',
    CANCEL: 'cancel',
    DELETE: 'delete'
};

const FilmsListEditableForm = (props) => {

    useEffect(() => {
        setForm(props.selectedFilm);
    }, [props.selectedFilm]);

    const [form, setForm] = useState({
        rating: '',
        name: '',
        description: ''
    });

    const updateForm = (formInput) => {
        const formInputKey = Object.keys(formInput)[0];
        setForm(prevState => ({
            ...prevState,
            [formInputKey]: formInput[formInputKey]
        }));
    };

    const resetForm = () => {
        setForm({
            rating: '',
            name: '',
            description: ''
        });
    };

    const onUpdateList = () => {
        switch (props.formMode) {
            case FILMS_LIST_FORM_MODE.EDIT:
                props.updateFilmOnList({...form, id: props.selectedFilm.id});
                break;
            case FILMS_LIST_FORM_MODE.ADD:
                props.addNewFilm(form);
                break;
            default:
        }
        resetForm();
        props.setFilmFormVisible(false);
    };

    const onDelete = () => {
        if(FILMS_LIST_FORM_MODE.EDIT) {
            props.deleteSelectedFIlm(props.selectedFilm.id)
        }
        props.setFilmFormVisible(false);
    };

    return (
        <div className={`${styles['film-list-editable-form']} ${props.className}`}>
            <div className={styles['form-row']}>
                <label htmlFor="name" className={styles['form-row__label']}>name</label>
                <input type="text"
                       id={'name'}
                       value={form.name || ''}
                       onChange={event => updateForm({name: event.target.value})}
                       className={styles['form-row__input']}/>
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="description" className={styles['form-row__label']}>description</label>
                <input type="text"
                       id={'description'}
                       value={form.description || ''}
                       onChange={event => updateForm({description: event.target.value})}
                       className={styles['form-row__input']}/>
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="rating" className={styles['form-row__label']}>rating</label>
                <input type="text"
                       id={'rating'}
                       value={form.rating || ''}
                       onChange={event => updateForm({rating: event.target.value})}
                       className={styles['form-row__input']}/>
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="image" className={styles['form-row__label']}>image</label>
                <input type="text"
                       id={'image'}
                       onChange={event => updateForm({image: event.target.value})}
                       className={styles['form-row__input']}/>
            </div>
            <div className={styles['buttons-container']}>
                {(() => {
                    switch (props.formMode) {
                        case FILMS_LIST_FORM_MODE.EDIT:
                            return <button
                                onClick={onUpdateList}
                                className={`${styles['action-button']} ${styles['action-button--edit']}`}>
                                {ACTION_BUTTON.EDIT}
                            </button>;
                        case FILMS_LIST_FORM_MODE.ADD:
                            return <button
                                onClick={onUpdateList}
                                className={`${styles['action-button']} ${styles['action-button--add']}`}>
                                {ACTION_BUTTON.ADD}
                            </button>;
                        default:
                            return ``;
                    }
                })()}
                <button className={`${styles['action-button']} ${styles['action-button--cancel']}`}
                        onClick={() => props.setFilmFormVisible(false)}>
                    {ACTION_BUTTON.CANCEL}
                </button>
                <button className={`${styles['action-button']} ${styles['action-button--delete']}`}
                        onClick={onDelete}>
                    {ACTION_BUTTON.DELETE}
                </button>
            </div>
        </div>
    );
};

export default FilmsListEditableForm;
