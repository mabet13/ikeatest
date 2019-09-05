const saveToLocalStorage = (props) => {
    localStorage.setItem('userdata', props.details);
    return true;
};

export default saveToLocalStorage;
