import React, {useEffect, useState} from 'react';
import styles from './FilmsListHeaderFilter.module.scss';

const FilmsListHeaderFilter = (props) => {

    const [filterState, setFilterState] = useState({
        rating: '',
        name: '',
        description: ''
    });

    const updateFilterParam = (filterParam) => {
        const filterParamKey = Object.keys(filterParam)[0];
        setFilterState(prevState => ({
            ...prevState,
            [filterParamKey]: filterParam[filterParamKey]
        }));
    };

    const resetFilter = () => {
        setFilterState(() => ({
            rating: '',
            name: '',
            description: ''
        }));
    };

    useEffect(() => {
        props.setCurrentFilter(filterState);
    }, [filterState]);

    return (
        <div className={`${styles['film-list-header-filter']} ${props.className}`}>
            <div className={`${styles['film-list-header-filter__item']}`}>
                <button onClick={resetFilter} className={styles['reset-filter-button']}>Reset filter</button>
            </div>
            <div className={`${styles['film-list-header-filter__item']} `}>
                <input type="text"
                       value={filterState.rating}
                       className={styles['filter-input']}
                       onChange={event => updateFilterParam({rating: event.target.value})}/>
            </div>
            <div className={`${styles['film-list-header-filter__item']}`}>
                <input type="text"
                       value={filterState.name}
                       className={styles['filter-input']}
                       onChange={event => updateFilterParam({name: event.target.value})}/>
            </div>
            <div className={`${styles['film-list-header-filter__item']}`}>
                <input type="text"
                       value={filterState.description}
                       className={styles['filter-input']}
                       onChange={event => updateFilterParam({description: event.target.value})}/>
            </div>
        </div>

    );
};

export default FilmsListHeaderFilter;
