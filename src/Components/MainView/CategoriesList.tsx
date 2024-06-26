import TaskManager from '../../Structs/TaskManager.js';
import {useEffect, useRef, useState} from "react";
import { useTheme } from '../../ThemeContex.js';

// Load data from storage
TaskManager.loadFromStorage();

// Get categories from the TaskManager
const categories = TaskManager.categories;

function CategoriesList() {
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);    // State to manage search input visibility
    const searchInputRef = useRef(null);    // Reference to the search input
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [isAdding, setIsAdding] = useState(false);    // Flag to check if data is adding
    const [isEditing, setIsEditing] = useState(false);  // Flag to check if data is editing
    const [currentCategory, setCurrentCategory] = useState(null);   //Variable storing single category data
    const [newCategoryTitle, setNewCategoryTitle] = useState('');   //Editing category title
    const [editCategoryTitle, setEditCategoryTitle] = useState('');

    // Handling a click action on search button
    const handleSearchButtonClick = () => {
        setIsSearchInputVisible(true);
    };

    // Handling a clicking outside of search input
    const handleClickOutside = (event) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setIsSearchInputVisible(false);
        }
    };

    // Handling a change of searching input
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handling a change of search input visibility
    useEffect(() => {
        if (isSearchInputVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchInputVisible]);

    // Handling a click action on deleting button
    const handleDeleteCategory = (categoryId) => {
        TaskManager.removeCategory(categoryId);
        TaskManager.saveToStorage();
        window.location.reload();
    };

    // Handling a click action on adding button
    const handleAddClick = () => {
        setIsAdding(true);
    };

    // Handling add category
    const handleAddCategory = () => {
        if (newCategoryTitle.trim()) {
            TaskManager.addCategory(newCategoryTitle.trim());
            setNewCategoryTitle('');
            setIsAdding(false);
            window.location.reload(); // Refresh the page to update the list
        }
    };

    // Handling a click action on editing button
    const handleEditClick = (category) => {
        setCurrentCategory(category);
        setEditCategoryTitle(category.title);
        setIsEditing(true);
    };

    const handleEditCategory = () => {
        if (currentCategory && editCategoryTitle.trim()) {
            TaskManager.updateCategoryTitle(currentCategory.id, editCategoryTitle.trim());
            setCurrentCategory(null);
            setEditCategoryTitle('');
            setIsEditing(false);
            window.location.reload(); // Refresh the page to update the list
        }
    };

    const filteredCategories = categories.filter(category =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { isDarkMode } = useTheme(); // Pobieramy stan trybu z hooka


    // Displaying a list of TaskList categories where user can search, filter, sort and add data
    return (
        <>
            <h3>Lista kategorii</h3>
            <div className={`categoryButtons ${isDarkMode ? 'dark' : 'light'}`}>
                {!isSearchInputVisible && (
                    <button className={`SearchButton ${isDarkMode ? 'dark' : 'light'}`} type="button" onClick={handleSearchButtonClick}>Wyszukaj</button>
                )}
                {isSearchInputVisible && (
                    <input ref={searchInputRef} type="text" className={`SearchInput ${isDarkMode ? 'dark' : 'light'}`} value={searchQuery}
                           onChange={handleSearchInputChange}/>
                )}
                <button className={`AddButton ${isDarkMode ? 'dark' : 'light'}`} onClick={handleAddClick}>Dodaj</button>
            </div>
            <table className={`table ${isDarkMode ? 'dark' : 'light'}`}>
                <thead>
                <tr>
                    <th>Kategoria</th>
                    <th>Liczba zadań</th>
                </tr>
                </thead>
                <tbody>
                {filteredCategories.map(category => (
                    <tr key={category.id}>
                        <td>{category.title}</td>
                        <td className={`CategoryModifiers ${isDarkMode ? 'dark' : 'light'}`} onClick={handleAddClick}>
                            {category.tasks.length}
                            <button className={`DeleteButton ${isDarkMode ? 'dark' : 'light'}`} type="button"
                                    onClick={() => handleDeleteCategory(category.id)}>Usuń
                            </button>
                            <button className={`EditButton ${isDarkMode ? 'dark' : 'light'}`} onClick={() => handleEditClick(category)}>Edytuj</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isAdding && !isEditing && (
                <div className="popup">
                    <h3>Dodaj kategorię</h3>
                    <label>
                        Nazwa kategorii:
                        <input
                            type="text"
                            value={newCategoryTitle}
                            onChange={(e) => setNewCategoryTitle(e.target.value)}
                        />
                    </label>
                    <div className='buttons-container'>
                        <button onClick={handleAddCategory}>Dodaj</button>
                        <button onClick={() => setIsAdding(false)}>Anuluj</button>
                    </div>
                </div>
            )}

            {isEditing && !isAdding && (
                <div className="popup">
                    <h3>Edytuj kategorię</h3>
                    <label>
                        Nazwa kategorii:
                        <input
                            type="text"
                            value={editCategoryTitle}
                            onChange={(e) => setEditCategoryTitle(e.target.value)}
                        />
                    </label>
                    <div className='buttons-container'>
                        <button onClick={handleEditCategory}>Zapisz</button>
                        <button onClick={() => setIsEditing(false)}>Anuluj</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default CategoriesList;
