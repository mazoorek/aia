import React, {useEffect, useState} from 'react';
import styles from './FilmsList.module.scss';
import FilmsListHeader, {HEADER_COLUMN_NAME} from "./FilmsListHeader/FilmsListHeader";
import filmsDataBase from "../assets/films"
import FilmsListEditableForm, {FILMS_LIST_FORM_MODE} from "./FilmsListEditableForm/FilmsListEditableForm";

const FilmsList = (props) => {

    const getInitialListState = () => {
        return [...filmsDataBase].map((film, id) => {
            return {...film, id}
        });
    };


    const [filmFormVisible, setFilmFormVisible] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState({});
    const [filmsListState, setFilmsListState] = useState(getInitialListState());
    const [filteredFilmsListState, setFilteredFilmsListState] = useState(getInitialListState());
    const [currentFilter, setCurrentFilter] = useState({
        rating: '',
        name: '',
        description: ''
    });
    const [sortingColumn, setSortingColumn] = useState(HEADER_COLUMN_NAME.RATING);
    const [formMode, setFormMode] = useState(FILMS_LIST_FORM_MODE.ADD);

    const applyFilter = () => {
        setFilteredFilmsListState(() => {
            return filmsListState.filter(film => {
                return (film.rating.toString().includes(currentFilter.rating) || currentFilter.rating === '')
                    && (film.name.toString().includes(currentFilter.name) || currentFilter.name === '')
                    && (film.description.toString().includes(currentFilter.description) || currentFilter.description === '');
            });
        });
    };

    const dynamicSort = (property) => {
        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    };

    const sortByColumn = () => {
        setFilmsListState(prevState => {
            return [...prevState].sort(dynamicSort(sortingColumn));
        });
    };

    const getFilterFormCLassNames = () => {
        return (styles['film-form'] + ' ' + styles['flex-item']
            + ' ' + (filmFormVisible ? '' : styles['flex-item--collapsed']));
    };

    const updateFilmOnList = (updatedFilm) => {
        setFilmsListState(prevState => {
            return [...prevState].map(film => (
                film.id === updatedFilm.id ? updatedFilm : film
            ))
        })
    };

    const addNewFilm = (newFilm) => {
        setFilmsListState(prevState => {
            const updatedList = [...prevState];
            updatedList.push({
                ...newFilm,
                id: Math.max(...prevState.map(film => film.id), 0) + 1
            });
            return updatedList;
        });
    };

    const deleteSelectedFIlm = (filmId) => {
        setFilmsListState(prevState => {
            return [...prevState].filter(film => film.id !==filmId);
        })
    };

    useEffect(() => {
        sortByColumn()
    }, [sortingColumn]);

    useEffect(() => {
        applyFilter();
    }, [currentFilter]);

    useEffect(() => {
        console.log(filmsListState);
        applyFilter();
    }, [filmsListState]);


    return (
        <div className={`${styles['films-list-container']} ${props.className}`}>
            <div className={`${styles['films-list']} ${styles['flex-item']}`}>
                <FilmsListHeader setSortingColumn={setSortingColumn}
                                 setFilmFormVisible={setFilmFormVisible}
                                 setFormMode={setFormMode}
                                 setCurrentFilter={setCurrentFilter}
                                 filmListState={filmsListState}/>
                <div className={styles['rows-container']}>
                    {filteredFilmsListState.map((film) => (
                        <div className={styles['list-row']}
                             onClick={() => {
                                 setSelectedFilm(film);
                                 setFormMode(FILMS_LIST_FORM_MODE.EDIT);
                                 setFilmFormVisible(true);
                             }}
                             key={film.id}>
                            <div className={styles['list-row__item']}>zdjecie</div>
                            <div className={styles['list-row__item']}>{film.rating}</div>
                            <div className={styles['list-row__item']}>{film.name}</div>
                            <div className={styles['list-row__item']}>{film.description}</div>
                        </div>
                    ))}
                </div>
            </div>
            <FilmsListEditableForm className={getFilterFormCLassNames()}
                                   formMode={formMode}
                                   selectedFilm={selectedFilm}
                                   deleteSelectedFIlm={deleteSelectedFIlm}
                                   updateFilmOnList={updateFilmOnList}
                                   addNewFilm={addNewFilm}
                                   setFilmFormVisible={setFilmFormVisible}/>
        </div>

    )
};

export default FilmsList;
